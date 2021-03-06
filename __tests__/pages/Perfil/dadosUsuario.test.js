import React from 'react';
// eslint-disable-next-line import/no-unresolved
import { fireEvent, render } from 'util-teste';
import { DadosUsuario } from '../../../src/pages/Perfil/DadosUsuario';
import dadosUsuario from '../../../__mocks__/valores/dadosUsuario';

const mockedNavigate = jest.fn();

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: () => ({
    navigate: mockedNavigate,
  }),
}));

test('verifica se o botao de edicao esta na tela', () => {
  const {
    getByTestId
  } = render(<DadosUsuario dados={dadosUsuario} />);
  const botao = getByTestId('botao-editar-dado-pessoal');

  expect(botao).not.toBeNull();
});

test('deve chamar navigate ao clicar no botao de editar', () => {
  const {
    getByTestId
  } = render(<DadosUsuario dados={dadosUsuario} />,);
  const botao = getByTestId('botao-editar-dado-pessoal');
  fireEvent.press(botao);

  expect(mockedNavigate).toHaveBeenCalled();
});
