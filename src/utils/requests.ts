export async function getAllPokemon() {
  const req = fetch("https://pokeapi.co/api/v2/pokemon?limit=10");
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
