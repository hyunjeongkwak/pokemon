'use client';

import Image from 'next/image';
import { Pokemon } from '@/app/types/Pokemon';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Home() {
  const [pokemonData, setPokemonData] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/pokemons');
        const data = await response.json();
        setPokemonData(data);
      } catch (error) {
        console.error('fetchData를 가져오지 못했습니다.', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center flex-col">
        <div className="w-16 h-16 rounded-full border border-solid border-gray-400 border-t-white border-4 mt-96 animate-spin"></div>
        <div className="text-white text-center mt-8">Loading...</div>
      </div>
    );
  }

  return (
    <main>
      <div className="flex max-w-screen-xl text-center mx-auto flex-col text-white">
        <span className="text-3xl my-10 font-semibold my-14">포켓몬 도감</span>
        <ul className="flex grid grid-cols-6 gap-4 mb-24">
          {pokemonData.map((pokemon) => (
            <li key={pokemon.id} className="border border-white bg-black rounded-lg p-4">
              <Link href={`/detail/${pokemon.id}`}>
                <div className="flex justify-center items-center mb-3">
                  <Image
                    src={pokemon.sprites.front_default}
                    width={96}
                    height={96}
                    alt={pokemon.name}
                    priority={true}
                  />
                </div>
                <p className="text-left mb-1.5">{pokemon.korean_name}</p>
                <p className="text-left">도감번호: {pokemon.id}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
