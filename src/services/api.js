import axios from 'axios';
import { langColors } from './config';

const api = axios.create({
  baseURL: 'https://api.github.com', // URL da API GitHub
});

// Função para obter informações do usuário
export const getUser = async (login) => {
  try {
    return await api.get(`/users/${login}`);
  } catch (error) {
    throw new Error('Usuário não encontrado.');
  }
};

// Função para obter repositórios do usuário
export const getRepos = async (login) => {
  try {
    return await api.get(`/users/${login}/repos`);
  } catch (error) {
    throw new Error('Repositórios não encontrados.');
  }
};

// Função para obter estatísticas das linguagens de programação
export const getLangsFrom = (repositories) => {
  let stats = repositories
    .map((repository) => repository.language)
    .reduce(
      (data, language) => ({
        ...data,
        [language]: (data[language] || 0) + 1,
      }),
      []
    );

  delete stats.null;

  stats = Object.keys(stats)
    .map((language) => ({
      name: language,
      count: stats[language],
      color: langColors[language.toLowerCase()],
    }))
    .sort((a, b) => b.count - a.count);

  return stats;
};

export default api;
