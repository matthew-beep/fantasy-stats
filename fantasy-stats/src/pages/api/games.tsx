import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req:NextApiRequest, res:NextApiResponse) {
  
  console.log("Request URL:", req.url);
  const { team } = req.query;
  try {
    const response = await axios.get("https://v1.american-football.api-sports.io/games", {
      
      params: {
        season: 2024,
        team:team
      },
      headers: {
        'X-RapidAPI-Key': process.env.SPORTS_API_KEY,
        'X-RapidAPI-Host': 'v1.american-football.api-sports.io'
      }
    });
    res.status(200).json(response.data);
  } catch (error) {
    console.log(error);
    res.status(500).json({error: 'Failed to fetch leagues'});
  }
}
