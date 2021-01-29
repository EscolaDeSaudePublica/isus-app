import React from 'react';
// eslint-disable-next-line import/no-unresolved
import { fireEvent, render } from 'util-teste';
import { labelsAnalytics } from '../../../src/constantes/labelsAnalytics';
import { TESTIDS } from '../../../src/constantes/testIDs';
import AlertaFaltaDeEpiScreen from '../../../src/pages/FaleConoscoScreen/alertaFaltaDeEpi';
import { analyticsData } from '../../../src/utils/analytics';

const mockedNavigate = jest.fn();
jest.mock('../../../src/utils/validadores.js', () => ({
  descricaoValida: jest.fn(() => true),
  unidadeDeSaudeValida: jest.fn(() => true)
}));

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: () => ({
    navigate: mockedNavigate,
    setOptions: mockedNavigate,
  }),
  useFocusEffect: jest.fn(),
  useIsFocused: jest.fn()
}));
let BotaoFaltaDeEPI = null;

beforeEach(() => {
  const { getByTestId } = render(<AlertaFaltaDeEpiScreen />);
  BotaoFaltaDeEPI = getByTestId(TESTIDS.BOTAO_ALERTAEPI_ENVIAR);
});


describe('descreve os testes de Fale conosco', () => {
  test('deve renderizar o botão de enviar ao renderizar o alertaFaltaEPI', () => {
    expect(BotaoFaltaDeEPI).not.toBeNull();
  });

  test('deve  chamar o analyticsData quando clicar no bota botão de enviar', () => {
    fireEvent.press(BotaoFaltaDeEPI);
    expect(analyticsData).toHaveBeenCalled();
  });

  test('deve  chamar o analyticsData com os parâmetros corretos quando clicar no bota botão de enviar', () => {
    fireEvent.press(BotaoFaltaDeEPI);
    expect(analyticsData).toHaveBeenCalledWith(labelsAnalytics.ENVIAR_ALERTA_FALTA_EPI, 'Click', 'Fale Conosco');
  });
});
