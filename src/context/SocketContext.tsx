"use client"
// src/context/SocketContext.tsx
import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

type SocketContextType = {
  ws: WebSocket | null;
  sendMessage: (msg: string) => void;
  user: any | null;
  loading: boolean;
  notifications: string[];
  unread: boolean;
  markRead: () => void;
};

const SocketContext = createContext<SocketContextType | undefined>(undefined);

export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const wsRef = useRef<WebSocket | null>(null);
  const [user, setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [notifications, setNotifications] = useState<string[]>([]);
  const [unread, setUnread] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    const role = localStorage.getItem("role");

    if (!userId || !role) {
      router.push("/");
      return;
    }

    // Fetch user data
    fetch(`/api/user/${userId}`)
      .then(res => res.json())
      .then(data => setUser(data))
      .catch(() => router.push("/"))
      .finally(() => setLoading(false));

    // Initialize WebSocket
    const ws = new WebSocket(`ws://localhost:8000/ws/${role}/${userId}`);
    wsRef.current = ws;

    ws.onopen = () => console.log("WebSocket connected");
    ws.onmessage = (event) => {
      if (event.data.startsWith("NOTIFICATION:")) {
        setNotifications((prev) => [event.data.replace("NOTIFICATION:", ""), ...prev]);
        setUnread(true);
      } else {
        console.log("Received:", event.data);
      }
    };
    ws.onclose = () => console.log("WebSocket closed");
    ws.onerror = (event) => console.error("WebSocket error:", event);

    return () => {
      ws.close();
    };
  }, [router]);

  const sendMessage = (msg: string) => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(msg);
    } else {
      console.warn("WebSocket not open");
    }
  };

  const markRead = () => setUnread(false);

  return (
    <SocketContext.Provider value={{ ws: wsRef.current, sendMessage, user, loading, notifications, unread, markRead }}>
      {children}
    </SocketContext.Provider>
  );
};

// Hook to use socket context
export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) throw new Error("useSocket must be used within SocketProvider");
  return context;
};
