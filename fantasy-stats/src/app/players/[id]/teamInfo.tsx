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
const TeamHeader: React.FC<TeamHeaderProps> = ({ TeamStatData}) => {
  const { team, position, division, won, lost, ties, streak } = TeamStatData;
  const {name, logo} = team;

  return (


      <div>
        <div>
          <div className="flex items-center justify-between">
            <h1 className="text-3xl md:text-6xl">{name}</h1>
            <div className="w-auto h-full flex justify-center">
              <Image
                aria-hidden
                src={logo}
                alt="Team Logo"
                width={32}
                height={32}
              />
            </div>
          </div>
          <h1>Rank: #{position} in {division}</h1>
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
    

  );
}

export default TeamHeader;
