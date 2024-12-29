'use client'
import Image from "next/image";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useState, useEffect } from "react";
import { useParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"



type TeamData = {
  city:string;
  coach:string;
  name:string;
  logo:string;
  owner:string;
  id:number;
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

type Param = {
  id: string;
}

export default function Home() {
  
  const [teamData, setTeamData] = useState<TeamData[]>([]);
  const [playerData, setPlayerData] = useState<PlayerData[]>([]);
  //const [id, setId] = useState
  const param = useParams();

  useEffect(() => {
    async function fetchTeamStats() {
      if(param) {
        try {
          const response = await fetch(`/api/standings`);
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
    fetchTeamStats();
  }, []);

  useEffect(() => {
    async function fetchPlayers() {
      if(param) {
        try {
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

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center justify-center sm:items-start">
      <Tabs defaultValue="Team" className="w-[400px]">
        <TabsList>
          <TabsTrigger value="Team">Team Stats</TabsTrigger>
          <TabsTrigger value="Players">Players</TabsTrigger>
        </TabsList>
        <TabsContent value="Team">
          Make changes to your account here.
        </TabsContent>
        <TabsContent value="Players">
          <Input/>
          <ul className="flex flex-col lg:flex-row lg:flex-wrap w-full gap-5 justify-center">
            {playerData.map((item, index) => (
              <li key={index}>
                <Card 
                  className="flex items-center justify-end flex-row-reverse cursor-pointer h-auto w-84 lg:w-96 px-5 hover:bg-zinc-200 duration-200 transition-all"
                >
                  <CardHeader className="flex">
                    <CardTitle>{item.name}</CardTitle>
                  </CardHeader>
                  <div className="w-auto h-full flex justify-center">
                    <Image
                      aria-hidden
                      src={item.image}
                      alt="Headshot of player"
                      width={32}
                      height={32}
                    />
                  </div>
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
