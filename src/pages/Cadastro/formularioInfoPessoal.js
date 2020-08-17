import React, {
  useLayoutEffect, useContext, useCallback, useEffect
} from 'react';
import {
  TouchableOpacity, StyleSheet, View, Text
} from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  TextInput, DefaultTheme, Button
} from 'react-native-paper';
import Autocomplete from 'react-native-autocomplete-input';
import { aplicaMascaraNumerica } from '../../utils/mascaras';
import FormContext from '../../context/FormContext';
// eslint-disable-next-line import/no-cycle
import WizardContext from '../../context/WizardContext';
// eslint-disable-next-line import/no-cycle
import FormularioInfoProfissional from './formularioInfoProfissional';
import Regex from '../../utils/regex';
import { getMunicipiosCeara } from '../../apis/apiCadastro';
import { salvarDados, pegarDados } from '../../services/armazenamento';


export default function FormularioInfoPessoal() {
  const theme = {
    ...DefaultTheme,
    colors: {
      primary: '#304FFE'
    }
  };
  const [botaoAtivo, alteraBotaoAtivo] = React.useState(false);
  const [listaCidades, esconderListaCidades] = React.useState(false);
  const [dataFiltrada, alteraDataFiltrada] = React.useState([]);
  const [data, alteraData] = React.useState(() => []);
  const [query, alteraQuery] = React.useState('');
  const navigator = useNavigation();
  const { alterarTelaAtual } = useContext(WizardContext);

  const {
    register, setValue, trigger, errors, getValues
  } = useContext(FormContext);
  useEffect(() => {
    register('nomeCompleto', { required: true, validate: nome => nomeValido(nome) });
    register('email', { required: true, validate: email => emailValido(email) });
    register('telefone', { required: true, minLength: 14 });
    register('cidade', { required: true, validate: cidade => cidadeValida(cidade) });
    register('cpf', { required: true, minLength: 14 });
  }, [register]);

  useFocusEffect(
    useCallback(() => {
      async function pegarMunicipios() {
        const response = await getMunicipiosCeara();
        alteraData(response.data.map(item => item.nome));
      }
      pegarMunicipios();
    }, [])
  );

  useEffect(() => {
    async function guardarMunicipios() {
      await salvarDados('municipios', data);
    }
    guardarMunicipios();
  }, [data]);

  useEffect(() => {
    alteraDataFiltrada(data.filter(item => query && item.startsWith(query)));
  }, [query]);

  const cidadeValida = async (cidade) => {
    const cidades = await pegarDados('municipios');
    return cidades.includes(cidade);
  };
  const emailValido = email => Regex.EMAIL.test(email.toLowerCase());
  const nomeValido = nome => Regex.NOME.test(nome.toLowerCase());
  const alteraValor = async (campo, valor) => {
    setValue(campo, valor);
    await trigger();
    alteraBotaoAtivo(Object.entries(errors).length === 0);
  };
  useLayoutEffect(() => {
    navigator.setOptions({
      headerStyle: {
        backgroundColor: '#304FFE'
      },
      headerTintColor: '#FFF',
      headerTitleAlign: 'center',
      headerTitle: 'Cadastro',
      headerLeft: () => (
        <TouchableOpacity
          style={{
            marginHorizontal: 19
          }}
          onPress={() => {
            navigator.goBack();
          }}
        >
          <Icon name="arrow-left" size={28} color="#FFF" />
        </TouchableOpacity>
      )
    });
  });

  return (
    <>
        <Text style={estilos.informacoesPessoais}>Informações Pessoais</Text>
        <View style={{ marginHorizontal: 16 }}>
              <TextInput
                label="Nome Completo"
                name="nomeCompleto"
                value={getValues('nomeCompleto')}
                underlineColor="#BDBDBD"
                onChangeText={text => alteraValor('nomeCompleto', text)}
                style={estilos.campoDeTexto}
                mode="outlined"
                theme={theme}
              />
              <TextInput
                label="E-mail"
                name="email"
                keyboardType="email-address"
                style={estilos.campoDeTexto}
                onChangeText={text => alteraValor('email', text)}
                mode="outlined"
                theme={theme}
              />
              <TextInput
                label="Telefone"
                name="telefone"
                value={aplicaMascaraNumerica(getValues('telefone'), '(##)#####-####')}
                keyboardType="number-pad"
                style={estilos.campoDeTexto}
                onChangeText={text => alteraValor('telefone', text)}
                mode="outlined"
                theme={theme}
                maxLength={14}
              />
              <TextInput
                label="CPF"
                name="cpf"
                value={aplicaMascaraNumerica(getValues('cpf'), '###.###.###-##')}
                keyboardType="number-pad"
                style={estilos.campoDeTexto}
                onChangeText={text => alteraValor('cpf', text)}
                mode="outlined"
                theme={theme}
                maxLength={14}
              />
              <Autocomplete
                label="Cidade"
                name="cidade"
                placeholder="Cidade"
                inputContainerStyle={estilos.campoDeTextoAutocomplete}
                listStyle={estilos.listaAutocomplete}
                listContainerStyle={{ height: dataFiltrada.length * 20 }}
                data={dataFiltrada}
                defaultValue={query}
                hideResults={listaCidades}
                onChangeText={(text) => {
                  alteraQuery(text);
                  esconderListaCidades(false);
                  alteraValor('cidade', text);
                }}
                renderItem={({ item }) => (
                  <TouchableOpacity onPress={() => {
                    alteraQuery(item);
                    esconderListaCidades(true);
                    alteraValor('cidade', item);
                  }}
                  >
                  <Text>{item}</Text>
                  </TouchableOpacity>
                )}
              />
        </View>
        <Button
          disabled={!botaoAtivo}
          label="Próximo"
          labelStyle={{ color: '#fff' }}
          mode="contained"
          onPress={() => alterarTelaAtual({ indice: 1, tela: <FormularioInfoProfissional /> })}
        >
            Próximo
        </Button>
    </>
  );
}

const estilos = StyleSheet.create({
  apresentacao: {
    fontSize: 24,
    marginTop: 40,
    lineHeight: 28,
    color: 'rgba(0, 0, 0, 0.87)'
  },
  informacoesPessoais: {
    fontWeight: '500',
    marginTop: 24,
    fontSize: 20,
    lineHeight: 23,
    letterSpacing: 0.15,
    paddingBottom: 16
  },
  campoDeTexto: {
    paddingBottom: 28,
    backgroundColor: '#FFF'
  },
  botao: {
    borderRadius: 50,
    width: 150,
    height: 45,
    alignSelf: 'flex-end',
    margin: 20,
    justifyContent: 'center',
    backgroundColor: '#BDBDBD'
  },
  botaoHabilitado: {
    borderRadius: 50,
    width: 150,
    height: 45,
    alignSelf: 'flex-end',
    margin: 20,
    justifyContent: 'center',
    backgroundColor: '#304FFE'
  },
  campoDeTextoAutocomplete: {
    backgroundColor: '#FFF',
    borderRadius: 5,
    borderColor: 'gray',
    height: 56,
  },
  listaAutocomplete: {
    padding: 10,
    borderColor: 'gray'
  }
});
