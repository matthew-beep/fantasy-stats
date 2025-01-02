'use client'
import Image from "next/image";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useState, useEffect } from "react";
import Link from "next/link";


type LeagueData = {
  league: {
    id:number;
    name:string;
    logo:string;
  }

  country: {
    name:string;
    code:string;
    flag:string;
  }
}

type TeamData = {
  city:string;
  coach:string;
  name:string;
  logo:string;
  owner:string;
  id:number;
}

// need to cache team data
export default function Home() {
  
  const [data, setData] = useState<LeagueData[]>([]);
  const [teamData, setTeamData] = useState<TeamData[]>([]);

  useEffect(() => {
    async function fetchLeagues() {
      try {
        const response = await fetch("/api/leagues");
        const result = await response.json();
        
        // Check if the result is structured as expected
        if (result && result.response && Array.isArray(result.response)) {
          setData(result.response); // Assign the response dat
        } else {
          console.error("Invalid data format from API");
        }
      } catch (error) {
        console.error("Failed to fetch leagues", error);
      }
    }

    fetchLeagues();
    console.log(data);
  }, []);

  useEffect(() => {
    async function fetchTeams() {
      try {
        const response = await fetch("/api/teams");
        const result = await response.json();
        
        // Check if the result is structured as expected
        if (result && result.response && Array.isArray(result.response)) {
          setTeamData(result.response); // Assign the response data
          console.log(result);
        } else {
          console.error("Invalid data format from API");
        }
        

      } catch (error) {
        console.error("Failed to fetch teams", error);
      }
    }

    fetchTeams();
  }, []);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center justify-center sm:items-start w-full">
        <Input/>
          <ul className="flex flex-col lg:flex-row lg:flex-wrap w-full gap-5 justify-center">
          {teamData.map((item, index) => (
            <li key={index}>
              <Card 
                className="flex items-center justify-end flex-row-reverse cursor-pointer h-auto w-84 lg:w-96 px-5 hover:bg-zinc-200 duration-200 transition-all"
              >
                <Link href={`/players/${item.id}`} className="w-full h-full flex items-center justify-end flex-row-reverse" passHref>
                  <CardHeader className="flex">
                    <CardTitle>{item.name}</CardTitle>
                  </CardHeader>
                  <div className="w-auto h-full flex justify-center">
                    <Image
                      aria-hidden
                      src={item.logo}
                      alt="Team Logo"
                      width={32}
                      height={32}
                    />
                  </div>
                </Link>
              </Card>
            </li>
            ))}
          </ul>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">

      </footer>
    </div>
  );
}
