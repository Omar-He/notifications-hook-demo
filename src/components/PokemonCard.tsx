import React, { useState, useEffect } from "react";
import { getPokemonInfo } from "@utils/requests";
import Image from "next/image";
import { useRouter } from "next/router";

const PokemonCard = ({ url }: any) => {
  const router = useRouter();
  const [pokemon, setPokemon] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);
  console.log(router);
  const getInfo = async () => {
    const res = await getPokemonInfo(url);
    setPokemon(res?.results);
    setLoading(false);
  };
  useEffect(() => {
    setLoading(true);
    getInfo();
  }, []);
  return (
    <div>
      {loading ? (
        <span>Loading ....</span>
      ) : (
        <Image src={pokemon.sprites.other["official-artwork"].front_default} />
      )}
    </div>
  );
};

export default PokemonCard;
