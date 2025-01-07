'use client'
import Image from "next/image";
import {
  Card,
  CardHeader,
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
    status: {
      short:string;
    }
    date: {
      date:string;
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

interface TeamGameProps {
  gameObject:GameData;
  team:string;
}

// set a loading variable
const GameCard: React.FC<TeamGameProps> = ({ gameObject, team }) => {
  const { game, scores, teams} = gameObject;
  const [isWinner, setWinner] = useState<string>("W");
  const [versus, setVersus] = useState<string>("vs");
  const [otherTeam, setOtherTeam] = useState<string>("");
  const [logo, setLogo] = useState<string>("");
  const [day, setDay] = useState<string>("");
  const [teamScore, setTeamScore] = useState<number>(0);
  const [opponentScore, setOpponentScore] = useState<number>(0);

  useEffect(() => {
    const isAway = teams.away.name === team;
    if (isAway) {
      setVersus("@");
      setOtherTeam(teams.home.name);
      setLogo(teams.home.logo);
    } else {
      setVersus("vs");
      setOtherTeam(teams.away.name);
      setLogo(teams.away.logo);
    }

    if (scores.away.total == scores.home.total) {
      setWinner("T");
      setTeamScore(scores.home.total);
      setOpponentScore(scores.away.total);
      return;
    }
    
    if (isAway) {
      if (scores.away.total < scores.home.total) {
        setWinner("L");
      } else {
        setWinner("W");
      }
      setTeamScore(scores.away.total);
      setOpponentScore(scores.home.total);
    } else {
      if (scores.home.total < scores.away.total) {
        setWinner("L");
      } else {
        setWinner("W");
      }
      setTeamScore(scores.home.total);
      setOpponentScore(scores.away.total);
    }
  }, [teams]);

  useEffect(() => {
    const date = new Date(game.date.date);
    const dayOfWeek = date.toLocaleString('en-US', { weekday: 'short' });
    const formatted = date.toLocaleDateString('en-US', {
      month: '2-digit',
      day: '2-digit',
    });
    setDay(dayOfWeek + " " + formatted);
  }, [game])

  return (
    <li className="w-full lg:w-auto font-spartan cursor-pointer">
      <Card 
        className="flex items-center flex-col gap-2 h-auto w-full lg:w-96 px-5 py-2  hover:bg-slate-200"
      >
        <CardHeader className="flex w-full p-0">
          <CardDescription className="flex justify-between w-full">
            <h2>{day} - {game.week}</h2>
          </CardDescription>
        </CardHeader>
        <CardContent className="flex items-center h-auto w-full p-0 gap-3">
          <div className="flex items-center gap-2">
            <p className="text-blue-600 font-semibold">
              {versus}
            </p>
            <div className="gap-2 flex">                     
              <span className="flex w-full items-center gap-2">                    
                {logo && (          
                  <Image
                    aria-hidden
                    src={logo}
                    alt="Headshot of player"
                    width={32}
                    height={32}
                  />
                )}
                <p>
                  {otherTeam}
                </p>       
              </span>
            </div>               
          </div>
          <div className="flex items-center gap-2">
            <p>
              {teamScore} - {opponentScore} 
            </p>
            {game.status.short === "NS" ? (
              <p className="text-gray-500">
                Not Started
              </p> 
            ) : (
              <p
              style={{
                color: isWinner === "W"? "green" : "red"
              }}
              >
                {isWinner}
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </li>
  );
}

export default GameCard;
