import axios from 'axios';
import { langColors } from './config';

// Defina a URL base diretamente no código
const api = axios.create({
  baseURL: 'https://api.github.com', // URL da API GitHub
});

// Função para obter informações do usuário
export const getUser = async (login) => api.get(`/users/${login}`);

// Função para obter repositórios do usuário
export const getRepos = async (login) => api.get(`/users/${login}/repos`);

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
