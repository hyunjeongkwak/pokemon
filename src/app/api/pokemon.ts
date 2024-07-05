export const fetchPokemonData = async (id: string) => {
  try {
    const apiUrl = 'http://localhost:3000';
    const response = await fetch(`${apiUrl}/detail/${id}`);

    if (!response.ok) {
      throw new Error('API 요청 실패');
    }

    return response.json();
  } catch (error) {
    console.error('fetchData 가져오기 실패', error);
    return null;
  }
};
