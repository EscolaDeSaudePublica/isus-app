import React from 'react';
// eslint-disable-next-line import/no-unresolved
import { fireEvent, render } from 'util-teste';
import { analyticsData } from '../../../src/utils/analytics';
import Termos from '../../../src/pages/Login/Termos';
import { TESTIDS } from '../../../src/constantes/testIDs';

const mockedNavigate = jest.fn();

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: () => ({
    navigate: mockedNavigate,
    setOptions: jest.fn(),
  }),
  useIsFocused: jest.fn(),
}));

test('deve chamar o analytics data ao clicar em "Termos de Uso"', () => {
  const { getByTestId } = render(
    <Termos alterarPossuirIDSaude={mockedNavigate} />
  );
  const item = getByTestId(TESTIDS.HYPERLINK_TERMOS_USO);

  fireEvent.press(item);
  expect(analyticsData).toHaveBeenCalled();
});

test('deve chamar o analytics data ao clicar em "Termos de Uso" com os parâmetros corretos', () => {
  const { getByTestId } = render(
    <Termos alterarPossuirIDSaude={mockedNavigate} />
  );
  const item = getByTestId(TESTIDS.HYPERLINK_TERMOS_USO);

  fireEvent.press(item);
  expect(analyticsData).toHaveBeenCalledWith('termos_uso', 'Click', 'Perfil');
});
