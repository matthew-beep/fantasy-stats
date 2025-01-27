'use client'
import { useState, useEffect } from "react";
import { useParams } from 'next/navigation'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link";
import TeamHeader from './teamInfo';
import GameCard from "./GameCard";
import PlayerList from "./playerInfo";

type TeamData = {
  city:string;
  coach:string;
  name:string;
  logo:string;
  owner:string;
  id:number;
  team: {
    name:string;
    logo:string;
  }
  division: string;
  position:number;
  won:number;
  lost:number;
  ties:number;
  streak:string;
}

type PlayerData = {
  id:number;
  name:string;
  age:number;
  height:string;
  weight:string;
  college:string;
  group:string;
  position:string;
  number:number;
  salary:string;
  experience:number;
  image:string;
}

type GameData = {
  game: {
    stage:string;
    id:number;
    venue:string;
    week:string;
    date: {
      date:string;
    }
    status: {
      short:string;
    }
  }
  scores: {
    away:{
      total:number;
    }
    home:{
      total:number;
    }
  }
  teams:{
    away:TeamData;
    home:TeamData;
  }
}

// set a loading variable
export default function Home() {
  
  const [teamStatData, setTeamStatData] = useState<TeamData | null>(null);
  const [playerData, setPlayerData] = useState<PlayerData[]>([]);
  const [id, setId] = useState<string>("");
  const param = useParams();
  const [gameData, setGameData] = useState<GameData[]>([]); 

  useEffect(() => {
    async function fetchTeamStats() {
      if(param) {
        console.log(param.id)
        setId(id);
        try {
          const response = await fetch(`/api/teamStandings/?id=${param.id}`);
          const result = await response.json();
          
          // Check if the result is structured as expected
          if (result && result.response && Array.isArray(result.response)) {
            setTeamStatData(result.response[0]); // Assign the response data
            console.log(result);
          } else {
            console.error("Invalid data format from API");
          }
        } catch (error) {
          console.error("Failed to fetch teams", error);
        }
      }
    }
    fetchTeamStats();
  }, []);

  useEffect(() => {
    async function fetchGames() {
      if(param) {
        try {
          console.log("getting games...")
          const response = await fetch(`/api/games/?team=${param.id}`);
          const result = await response.json();
          
          // Check if the result is structured as expected
          if (result && result.response && Array.isArray(result.response)) {
            console.log(result.response)
            setGameData(result.response); // Assign the response data
          } else {
            console.error("Invalid data format from API");
          }
        } catch (error) {
          console.error("Failed to fetch teams", error);
        }
      }
    }
    fetchGames();
  }, []);

  useEffect(() => {
    async function fetchPlayers() {
      if(param) {
        try {
          console.log("getting games...")
          const response = await fetch(`/api/players/?id=${param.id}`);
          const result = await response.json();
          
          // Check if the result is structured as expected
          if (result && result.response && Array.isArray(result.response)) {
            setPlayerData(result.response); // Assign the response data
            console.log(result);
          } else {
            console.error("Invalid data format from API");
          }
        } catch (error) {
          console.error("Failed to fetch teams", error);
        }
      }
    }
    fetchPlayers();
  }, []);

  // need to turn header to component
  return (
    <div className="items-center justify-start flex flex-col min-h-screen font-[family-name:var(--font-geist-sans)] py-10 gap-5">
      <header className="w-11/12">
        <Link href="/" className="border-2 border-black rounded-full px-3 py-1">
          Back
        </Link>
      </header>
      <main className="flex flex-col gap-8 row-start-2 w-11/12 h-full">
        <div className="">
          {teamStatData ? (
            <TeamHeader TeamStatData={teamStatData} />
          ) : (
            <p>Loading team data...</p>
          )}
        </div>
        <Tabs defaultValue="Team" className="w-full">
          <TabsList>
            <TabsTrigger value="Team">Schedule</TabsTrigger>
            <TabsTrigger value="Players">Players</TabsTrigger>
          </TabsList>
          <TabsContent value="Team" className="">
            <ul className="flex flex-col items-center lg:flex-row lg:flex-wrap w-full gap-2 justify-between">
              {gameData.filter(game => game.game.stage === "Regular Season").map((game, index) => (
                teamStatData && <GameCard gameObject={game} team={teamStatData.team.name} key={index}/>
              ))}
            </ul>
          </TabsContent>
          <TabsContent value="Players" className="flex flex-col justify-center gap-10">
            {teamStatData && <PlayerList playerObjects={playerData} team={teamStatData.team.name}/>}
          </TabsContent>
        </Tabs>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">

      </footer>
    </div>
  );
}
