export async function getAllPokemon(perPage: number, page: number) {
  const req = fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=${perPage}&offset=${page}`
  );
  const res = await req;
  if (res.status === 200) {
    return res.json();
  }
}
export async function getPokemonInfo(url: string) {
  const req = fetch(url);
  const res = await req;
  if (res.status === 200) {
    return res.json();
  }
}
