import React, { useState } from 'react';
import { MdSearch } from 'react-icons/md';
import { Container, Logo, Title, Form, Input, Button, ErrorMessage } from './styles';
import githubLogo from '../../assets/images/github-logo.svg';

const MainPage = () => {
  const [login, setLogin] = useState(''); // Armazena o nome do usuário
  const [error, setError] = useState(''); // Armazena a mensagem de erro

  const handleSearch = () => {
    // Verifica se o campo está vazio
    if (login.trim() === '') {
      setError('Por favor, insira um nome de usuário.');
    } else {
      setError(''); // Limpa o erro se houver algo digitado
      // Navega para a tela de repositórios, que validará se o usuário existe
    }
  };

  return (
    <Container>
      <Logo src={githubLogo} alt="API Github" />
      <Title>API Github</Title>
      <Form>
        <Input
          placeholder="usuário"
          value={login}
          onChange={(event) => setLogin(event.target.value)}
        />
        <Button
          to={login ? `/${login}/repositories` : '#'} // Se login estiver preenchido, navega
          onClick={handleSearch} // Chama a função handleSearch no clique
        >
          <MdSearch size={42} />
        </Button>
      </Form>
      {error && <ErrorMessage>{error}</ErrorMessage>} {/* Exibe mensagem de erro */}
    </Container>
  );
};

export default MainPage;
