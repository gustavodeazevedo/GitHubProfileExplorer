import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Profile from './Profile';
import Filter from './Filter';
import Repositories from './Repositories';
import { Loading, Container, Sidebar, Main } from './styles';
import { getUser, getRepos, getLangsFrom } from '../../services/api';

const RepositoriesPage = () => {
  const { login } = useParams();
  const [user, setUser] = useState(null);
  const [repositories, setRepositories] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [currentLanguage, setCurrentLanguage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadData = async () => {
      try {
        setError(''); // Limpa o erro anterior
        const [userResponse, repositoriesResponse] = await Promise.all([
          getUser(login),
          getRepos(login),
        ]);

        if (userResponse.status === 404 || repositoriesResponse.status === 404) {
          throw new Error('Usuário não encontrado.');
        }

        setUser(userResponse.data);
        setRepositories(repositoriesResponse.data);
        setLanguages(getLangsFrom(repositoriesResponse.data));
      } catch (err) {
        setUser(null);
        setRepositories([]);
        setLanguages([]);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (login) {
      loadData();
    }
  }, [login]);

  const onFilterClick = (language) => {
    setCurrentLanguage(language);
  };

  if (loading) {
    return <Loading>Carregando...</Loading>;
  }

  return (
    <Container>
      <Sidebar>
        {error ? (
          <p>{error}</p>
        ) : (
          <>
            <Profile user={user} />
            <Filter
              languages={languages}
              currentLanguage={currentLanguage}
              onClick={onFilterClick}
            />
          </>
        )}
      </Sidebar>
      <Main>
        <Repositories
          repositories={repositories}
          currentLanguage={currentLanguage}
        />
      </Main>
    </Container>
  );
};

export default RepositoriesPage;
