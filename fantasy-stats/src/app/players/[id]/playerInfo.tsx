'use client'

import Image from "next/image";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useState, useEffect } from "react";

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

interface PlayerListProps {
  playerObjects:PlayerData[];
  team:string;
}

// set a loading variable
const PlayerList: React.FC<PlayerListProps> = ({ playerObjects, team }) => {
  const playerData = playerObjects;
  const [search, setSearch] = useState<string>("");

  useEffect(() => {

    console.log(team);
  })
  return (
    <>
      <Input 
        placeholder="Search for a player"
        value={search}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
      />
      <ul className="flex flex-col lg:flex-row lg:flex-wrap w-full gap-5 justify-center">
      {playerData.filter(player => player.name.toLowerCase().includes(search.toLowerCase())).map((item, index) => (
        <li key={index}>
          <Drawer>
            <DrawerTrigger className="w-full h-full">
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
            </DrawerTrigger>
            <DrawerContent className="h-[90vh]">
              <DrawerHeader className="flex flex-col items-center">
                <Image
                  aria-hidden
                  src={item.image}
                  alt="Headshot of player"
                  width={128}
                  height={128}
                />
                <DrawerTitle>{item.name}</DrawerTitle>
              </DrawerHeader>
              <DrawerDescription className="flex flex-col w-full border-2 items-center">
                <span>Age: {item.age}</span>
                <span>Height: {item.height}</span>
                <span>Weight: {item.weight}</span>
                <span>College: {item.college}</span>
                <span>Group: {item.group}</span>
                <span>Position: {item.position}</span>
                <span>Number: {item.number}</span>
                <span>Salary: {item.salary}</span>
                <span>Experience: {item.experience}</span>
              </DrawerDescription>
              <DrawerFooter className="flex justify-end">
                <DrawerClose />
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        </li>
      ))}
      </ul>
    </>
  );
}

export default PlayerList;
