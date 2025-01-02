'use client'
import Image from "next/image";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import { useState, useEffect } from "react";
import { useParams } from 'next/navigation'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link";
import TeamHeader from './teamInfo';
import GameCard from "./GameCard";

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
  const [search, setSearch] = useState<string>("");
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
    <div className="items-center justify-items-center min-h-screen gap-16 font-[family-name:var(--font-geist-sans)]">
      <header className="w-full">
        <Link href="/">
          Back
        </Link>
        
      </header>
      <main className="flex flex-col gap-8 row-start-2 sm:items-start w-11/12 h-full">
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
            <ul className="flex flex-col lg:flex-row lg:flex-wrap w-full gap-5 justify-center">
              {gameData.filter(game => game.game.stage === "Regular Season").map((game, index) => (
                teamStatData && <GameCard gameObject={game} team={teamStatData.team.name} key={index}/>
              ))}
            </ul>
          </TabsContent>
          <TabsContent value="Players" className="flex flex-col justify-center gap-10">
            <Input 
              placeholder="Search for a player"
              value={search}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
            />
            <ul className="flex flex-col lg:flex-row lg:flex-wrap w-full gap-5 justify-center">
            {playerData.filter(player => player.name.toLowerCase().includes(search.toLowerCase())).map((item, index) => (
              <li key={index}>
                <Card 
                  className="flex items-center justify-end flex-row-reverse cursor-pointer h-auto w-84 lg:w-96 px-5 hover:bg-zinc-200 duration-200 transition-all"
                >
                  <CardHeader className="flex">
                    <CardTitle>{item.name}</CardTitle>
                  </CardHeader>
                  <div className="w-auto h-full flex justify-cente">
                    <Image
                      aria-hidden
                      src={item.image}
                      alt="Headshot of player"
                      width={32}
                      height={32}
                    />
                  </div>
                  <h4>{item.position}</h4>
                </Card>
              </li>
            ))}
            </ul>
          </TabsContent>
        </Tabs>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">

      </footer>
    </div>
  );
}
