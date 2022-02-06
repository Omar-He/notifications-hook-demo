import { getAllPokemon } from "@utils/requests";
import React, { useState, useEffect } from "react";

const NotificationsPopup = ({ open }: { open: boolean }) => {
  const [pokemon, setPokemon] = useState([]);

  const getPokemonInfo = async () => {
    const res = await getAllPokemon();
    setPokemon(res?.results);
  };
  useEffect(() => {
    getPokemonInfo();
  }, []);

  const showDetails = () => {};
  return (
    <div
      className={`
          ${open ? "visible opacity-100" : "invisible opacity-0"} 
          absolute top-[40px] right-2 w-[350px] max-h-[600px] overflow-y-scroll bg-gray-400 dark:bg-gray-600 dark:text-white
          transition-all duration-200 ease-linear shadow-lg
        `}
    >
      {pokemon.map((i: any, index) => (
        <div
          className="py-8 px-5 border-b-2 hover:bg-purple-300 cursor-pointer over"
          key={index}
          onClick={showDetails}
        >
          <span className="block font-bold text-lg">{i.name}</span>
          <span className="block text-ellipsis overflow-hidden flex-wrap">
            {i.url}
          </span>
        </div>
      ))}
    </div>
  );
};

export default NotificationsPopup;
