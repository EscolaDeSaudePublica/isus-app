import React, { useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Controller } from 'react-hook-form';
import { ScrollView } from 'react-native-gesture-handler';
import {
  ContainerBody,
  ContainerForm,
  RowButton,
  RowInput,
  Title
} from './styles';
import { BotaoLaranja } from '../../components/Botoes/BotoesCirculares';
import ROTAS from '../../constantes/rotas';
import InputCategoria from './InputCategoria';
import InputEspecialidades from './InputEspecialidades';
import InputSetores from './InputSetores';
import FormContext from '../../context/FormContext';
import { atualizarUsuario } from '../../services/usuarioService';

const PreCadastroProfissional = () => {
  const navigator = useNavigation();
  const { control, getValues } = useContext(FormContext);

  return (
    <>
      <ContainerBody>
        <ScrollView>
          <ContainerForm>
            <Title>Cadastro Profissional</Title>
            <RowInput>
              <InputCategoria />
            </RowInput>
            <RowInput>
              <Controller
                control={control}
                name="_hidden.categoriaProfissional"
                defaultValue=""
                render={({ value }) => (
                  <>
                    <InputEspecialidades categoria={value} />
                  </>
                )}
              />
            </RowInput>
            <RowInput>
              <InputSetores />
            </RowInput>
          </ContainerForm>
          <RowButton>
            <BotaoLaranja
              onPress={async () => {
                const result = await atualizarUsuario(getValues());
                if (!result) {
                  return;
                }
                navigator.navigate(
                  ROTAS.PRE_CADASTRO_SUCESSO,
                  { usuario: result }
                );
              }}
            >
              Concluir
            </BotaoLaranja>
          </RowButton>
        </ScrollView>
      </ContainerBody>
    </>
  );
};

export default PreCadastroProfissional;
