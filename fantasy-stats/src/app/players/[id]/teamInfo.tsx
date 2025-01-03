'use client'
import Image from "next/image";


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

interface TeamHeaderProps {
  TeamStatData: TeamData;
}

// set a loading variable
const TeamHeader: React.FC<TeamHeaderProps> = ({ TeamStatData }) => {
  const { team, position, division, won, lost, ties, streak } = TeamStatData;
  const {name, logo} = team;

  return (
      <div className="font-spartan">
        <div className="flex flex-col items-center gap-2">
          <div className="flex flex-col items-center justify-between gap-5">
            <div className="w-auto h-full flex justify-center">
              <Image
                aria-hidden
                src={logo}
                alt="Team Logo"
                width={64}
                height={64}
              />
            </div>
            <h1 className="text-3xl md:text-6xl font-semibold">{name}</h1>
          </div>
          <div className="flex gap-2">
            <h2>{division}: #{position}</h2>
            <span className="font-semibold"> | </span>
            <div className="flex gap-2">
              <p>{won} - {lost} - {ties}</p>
              <p
                style={{
                  color: streak.charAt(0) == 'W' ? 'green' : 'red'
                }}
              >{streak}</p>
            </div>
          </div>
        </div>
      </div>
    

  );
}

export default TeamHeader;
