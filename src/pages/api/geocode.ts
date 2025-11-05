import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { address } = req.query;
  const apiKey = "eyJvcmciOiI1YjNjZTM1OTc4NTExMTAwMDFjZjYyNDgiLCJpZCI6ImZmZjY5YjU4M2EyZDQ4ZjY4OGYyMGUwMDNmZDQ1NmIyIiwiaCI6Im11cm11cjY0In0=";
  const url = `https://api.openrouteservice.org/geocode/search?api_key=${apiKey}&text=${encodeURIComponent(address as string)}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      const errorText = await response.text();
      console.error("ORS Geocode API error:", response.status, errorText);
      return res.status(response.status).json({ error: errorText });
    }
    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    console.error("API route error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
}