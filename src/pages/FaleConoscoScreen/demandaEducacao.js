import React, { useState, useCallback } from 'react';

import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import {
  TextInput, Button, Snackbar
} from 'react-native-paper';
import { descricaoValida, unidadeDeSaudeValida } from '../../utils/validadores';
import { postDemandaEducacao } from '../../apis/apiHome';
import { TESTIDS } from '../../constantes/testIDs';
import { analyticsData } from '../../utils/analytics';
import { labelsAnalytics } from '../../constantes/labelsAnalytics';

export default function DemandaEducacaoScreen() {
  const descricaoInput = React.createRef();
  const unidadeDeSaudeInput = React.createRef();
  const emailInput = React.createRef();
  const [descricao, alterarDescricao] = useState('');
  const [unidadeDeSaude, alterarUnidadeDeSaude] = useState('');
  const [email, setEmail] = React.useState('');
  const [sucessoAoEnviar, setSucessoAoEnviar] = React.useState(false);
  const [erroAoEnviar, setErroAoEnviar] = React.useState(false);
  const [mensagemDeErro, setMensagemDeErro] = React.useState('');
  const [carregando, setCarregando] = React.useState(false);

  useFocusEffect(
    useCallback(() => () => limparCampos(), [])
  );

  const onSubmit = async () => {
    try {
      const { data } = await postDemandaEducacao(descricao, unidadeDeSaude, email);
      if (data.errors) {
        setMensagemDeErro(extrairMensagemDeErro(data));
        setErroAoEnviar(true);
        setCarregando(false);
      } else {
        limparCampos();
        setCarregando(false);
        setSucessoAoEnviar(true);
      }
    } catch (err) {
      if (err.message === 'Network Error') setMensagemDeErro('Erro na conexão com o servidor. Tente novamente mais tarde.');
      else setMensagemDeErro('Ocorreu um erro inesperado. Tente novamente mais tarde.');
      setErroAoEnviar(true);
      setCarregando(false);
    }
  };

  const limparCampos = () => {
    alterarDescricao('');
    alterarUnidadeDeSaude('');
    setEmail('');
  };

  const extrairMensagemDeErro = (response) => {
    if (response.errors.descricao) return response.errors.descricao[0];
    if (response.errors.unidadeDeSaude) return response.errors.unidadeDeSaude[0];
    return '';
  };

  return (
    <>
      <View style={{ flex: 1, padding: 15 }}>
        <TextInput
          numberOfLines={5}
          mode="outlined"
          ref={descricaoInput}
          multiline
          value={descricao}
          label="Demandar por Educação Permanente *"
          onChangeText={text => alterarDescricao(text)}
          style={{ marginBottom: 20 }}
        />

        <TextInput
          mode="outlined"
          ref={unidadeDeSaudeInput}
          label="Unidade de Saúde *"
          value={unidadeDeSaude}
          onChangeText={text => alterarUnidadeDeSaude(text)}
          style={{ marginBottom: 20 }}
        />

        <TextInput
          mode="outlined"
          ref={emailInput}
          label="Email"
          value={email}
          onChangeText={text => setEmail(text)}
          style={{ marginBottom: 20 }}
        />

        <Text
          style={{
            letterSpacing: 0.25,
            fontSize: 14,
            lineHeight: 20,
            color: '#828282',
            marginBottom: 18
          }}
        >
          Campo Email não obrigatório
        </Text>
      </View>
      <View>
        <Button
          testID={TESTIDS.BOTAO_DEMANDAEDUCACAO_ENVIAR}
          disabled={!!(!descricaoValida(descricao) || !unidadeDeSaudeValida(unidadeDeSaude))}
          style={descricaoValida(descricao) && unidadeDeSaudeValida(unidadeDeSaude)
            ? styles.button : styles.buttonDisabled}
          labelStyle={{ color: '#fff' }}
          mode="contained"
          loading={carregando}
          onPress={() => {
            analyticsData(labelsAnalytics.ENVIAR_DEMANDA_EDUCACAO, 'Click', 'Fale Conosco');
            setCarregando(true);
            onSubmit();
          }}
        >
          Enviar
        </Button>

        <Snackbar
          style={{ backgroundColor: '#1e1e1e' }}
          visible={sucessoAoEnviar}
          onDismiss={() => setSucessoAoEnviar(false)}
          action={{
            label: 'ok',
            onPress: () => setSucessoAoEnviar(false)
          }}
        >
          Sua demanda foi enviado, obrigado!
        </Snackbar>
        <Snackbar
          style={{ backgroundColor: '#1e1e1e' }}
          visible={erroAoEnviar}
          onDismiss={() => setErroAoEnviar(false)}
          action={{
            label: 'ok',
            onPress: () => setErroAoEnviar(false)
          }}
        >
          {mensagemDeErro}
        </Snackbar>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 50,
    width: 150,
    height: 45,
    alignSelf: 'flex-end',
    margin: 20,
    justifyContent: 'center',
    backgroundColor: '#FF9800'
  },
  buttonDisabled: {
    borderRadius: 50,
    width: 150,
    height: 45,
    alignSelf: 'flex-end',
    margin: 20,
    justifyContent: 'center'
  }
});
