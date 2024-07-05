import { Pokemon } from '@/app/types/Pokemon';
import Image from 'next/image';
import Link from 'next/link';

async function getData(id: string): Promise<Pokemon> {
  const response = await fetch(`http://localhost:3000/api/pokemons/${id}`);

  if (!response.ok) {
    throw new Error('fetch data 가져오기 실패...');
  }

  return response.json();
}

const detailPage = async ({ params }: Pokemon) => {
  const pokemon = await getData(params.id);

  return (
    <div className="flex max-w-xl text-center mx-auto mt-20 flex-col bg-white rounded-lg mb-20">
      <header className="bg-gray-100 rounded-t-lg p-4">
        <h1 className="font-semibold text-2xl pt-2 mb-1">{pokemon.korean_name}</h1>
        <p className="text-sm">No. {pokemon.id.toString().padStart(4, '0')}</p>
      </header>
      <main className="p-4">
        <div className="flex justify-center items-center mb-3">
          <Image src={pokemon.sprites.front_default} alt={pokemon.korean_name} width={96} height={96} priority={true} />
        </div>
        <section>
          <h2 className="text-lg pb-2">이름: {pokemon.korean_name}</h2>
          <p className="pb-2">
            키: {pokemon.height}m 무게: {pokemon.weight}kg
          </p>
        </section>
        <section className="flex justify-center items-center mb-3">
          <div className="flex items-center font-semibold">
            <p className=" mr-2">타입: </p>
            {pokemon.types.map((data, index) => (
              <span key={index} className="bg-orange-500 inline-block rounded-md px-2 py-1 mr-2 text-white">
                {data.type.korean_name}
              </span>
            ))}
          </div>
          <div className="flex items-center font-semibold ">
            <p className="mr-2">특성: </p>
            {pokemon.abilities.map((data, index) => (
              <span key={index} className="bg-green-500 inline-block rounded-md px-2 py-1 mr-2 text-white">
                {data.ability.korean_name}
              </span>
            ))}
          </div>
        </section>
        <section>
          <h2 className="font-semibold mb-5">기술:</h2>
          <div className="flex flex-wrap justify-center">
            {pokemon.moves.map((data, index) => (
              <span key={index} className="flex mr-2 mb-2">
                {data.move.korean_name}
              </span>
            ))}
          </div>
        </section>
        <div className="flex justify-center my-3">
          <Link href={'/'} className="flex justify-center items-center w-32 h-9 bg-blue-600 rounded-md text-white">
            뒤로 가기
          </Link>
        </div>
      </main>
    </div>
  );
};

export default detailPage;
