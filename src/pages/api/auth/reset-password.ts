import type { NextApiRequest, NextApiResponse } from "next";
import connectToDatabase from "@/lib/db"; // adjust path to your db connection
import User from "@/models/User"; // adjust path to your User model
import bcrypt from "bcryptjs";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end();

  const { email, newPassword } = req.body;
  if (!email || !newPassword) return res.status(400).json({ error: "Missing fields" });

  try {
    await connectToDatabase();
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: "User not found" });

    const hashed = await bcrypt.hash(newPassword, 10);
    await User.updateOne({ email }, { $set: { password: hashed } });

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("Reset password error:", err);
    return res.status(500).json({ error: err instanceof Error ? err.message : "Server error" });
  }
}