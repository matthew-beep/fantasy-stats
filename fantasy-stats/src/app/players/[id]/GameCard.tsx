'use client'
import Image from "next/image";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent
} from "@/components/ui/card";
import { useState, useEffect } from "react";

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

interface TeamGameProps {
  gameObject:GameData;
  team:string;
}

// set a loading variable
const GameCard: React.FC<TeamGameProps> = ({ gameObject, team}) => {
  const { game, scores, teams} = gameObject;
  const [isWinner, setWinner] = useState<string>("W");


  useEffect(() => {
    if ((teams.away.name === team) && (scores.away.total > scores.home.total)) {
      setWinner("W");
    } else {
      setWinner("L");
    }
  }, [team]);

  return (
    <li>
      <Card 
        className="flex items-center flex-col h-auto w-84 lg:w-96"
      >
        <CardHeader className="flex w-full">
          <CardDescription className="border-2 flex justify-between">
            <h2>{game.week} - {game.stage}</h2>
            <p>{isWinner}</p>
          </CardDescription>
          <CardTitle className="text-sm flex">
            <span className="flex flex-col w-full items-center">                    
              <Image
                aria-hidden
                src={teams.home.logo}
                alt="Headshot of player"
                width={32}
                height={32}
              />
              <div>
                {teams.home.name}
              </div>
              <div></div>                       
            </span> vs                       
            <span className="flex flex-col w-full items-center">                    
              <Image
                aria-hidden
                src={teams.away.logo}
                alt="Headshot of player"
                width={32}
                height={32}
              />
              <div>
                {teams.away.name}
              </div>       
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent className="border-2 flex  flex-col items-center justify-center">
          <p>
            {scores.home.total} - {scores.away.total} 
          </p>
          <button>Show Game Summary</button>
        </CardContent>
      </Card>
    </li>
  );
}

export default GameCard;
