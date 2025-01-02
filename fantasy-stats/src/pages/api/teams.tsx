import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';
// import { BalldontlieAPI } from "@balldontlie/sdk";

export default async function handler(req:NextApiRequest, res:NextApiResponse) {

  console.log("getting teams")
  console.log("Request URL:", req.url);
  /*
  if (!process.env.BALL_API_KEY) {
    throw new Error("BALL_API_KEY environment variable is not set.");
  }

  const api = new BalldontlieAPI({apiKey: process.env.BALL_API_KEY});
  try {
    const teams = await api.nfl.getTeams();
    res.status(200).json(teams);
  } catch (err) {
    console.log(err);
    res.status(500).json({error: 'Failed to fetch leagues'});
  }
  */
  
  try {
    const response = await axios.get("https://v1.american-football.api-sports.io/teams", {
      params: {
        league:1,
        season:2024
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
