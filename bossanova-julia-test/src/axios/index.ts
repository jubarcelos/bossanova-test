import axios from 'axios';

const API_URL = 'http://localhost:5050/beaches';

export interface Location {
  link: string;
}

export interface Beach {
  id: string;
  title: string;
  image: string;
  location: Location;
  description: string;
}

export const getBeaches = async (): Promise<Beach[]> => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar as praias:', error);
    throw new Error('Não foi possível buscar as praias.');
  }
};

export const createBeach = async (newBeach: Beach): Promise<number> => {
  try {
    const response = await axios.post<Beach>(API_URL, newBeach);
    return response.status;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return error.response.status;
    }
    return 500;
  }
};

export const updateBeach = async (updatedBeach: Beach): Promise<number> => {
  try {
    const response = await axios.put<Beach>(`${API_URL}/${updatedBeach.id}`, updatedBeach);
    return response.status;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return error.response.status;
    }
    return 500;
  }
};
