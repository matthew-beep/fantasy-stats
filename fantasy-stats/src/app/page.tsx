'use client'
import Image from "next/image";
import {
  Card,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useState, useEffect } from "react";
import Link from "next/link";
import { LoaderCircle } from 'lucide-react';

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
  
  const [teamData, setTeamData] = useState<TeamData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchTeams() { // fetch teams from api
      try {
        const response = await fetch("/api/teams");
        const result = await response.json();
        setLoading(true);
        // Check if the result is structured as expected
        if (result && result.response && Array.isArray(result.response)) {
          setTeamData(result.response); // Assign the response data
          const dataResult = {
            data: result.response,
            timestamp: new Date().toISOString(),
          }

          localStorage.setItem("teamData", JSON.stringify(dataResult)); // Cache the response data
        } else {
          console.error("Invalid data format from API");
        }
        
      } catch (error) {
        console.error("Failed to fetch teams", error);
      } finally {
        setLoading(false);
      }
    }

    // check if any team data is cached
    const cachedData = localStorage.getItem("teamData");
    if (cachedData) {
      setLoading(true);
      console.log("Team data already exists");
      const parsedData = JSON.parse(cachedData);

      const timestamp:any = new Date(parsedData.timestamp);
      const currentTime:any = new Date();
      const diffTime:number = Math.abs(currentTime - timestamp);
      console.log(diffTime);
      if (diffTime > 1000 * 60 * 60 * 24) {
        localStorage.removeItem("teamData");
        fetchTeams();
        console.log("Fetching team data");
        
      } else {
        setTeamData(parsedData.data);
        setLoading(false);
      }
    } else {
      fetchTeams();
      console.log("Fetching team data")
    }
  }, []);

  return (
    <div className="items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      {loading &&
        <LoaderCircle />
      }
      {!loading && 
        <main className="flex flex-col gap-8 row-start-2 items-center justify-center sm:items-start w-full">
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
      }
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">

      </footer>
    </div>
  );
}
