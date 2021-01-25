import Boletins from '../../../assets/icons/forcaTarefa/boletins.svg';
import NotificacaoDeCasos from '../../../assets/icons/forcaTarefa/notificacaoDeCasos.svg';
import FarmacoVigilancia from '../../../assets/icons/forcaTarefa/farmacoVigilancia.svg';
import NotasTecnicas from '../../../assets/icons/forcaTarefa/notasTecnicas.svg';
import CentralDeVentiladores from '../../../assets/icons/forcaTarefa/centralDeVentiladores.svg';
import Denuncias from '../../../assets/icons/forcaTarefa/denuncias.svg';
import VacinaCOVID19 from '../../../assets/icons/forcaTarefa/vacinaCovid19.svg';
import rotas from '../../../constantes/rotas';
import estaAtiva from '../../../utils/estaAtiva';
import features from '../../../constantes/features';


const listForcaTarefa = [
  {
    id: 'acao-boletins',
    titulo: 'Boletins',
    ativo: true,
    labelDoAnalytics: 'boletins',
    icone: Boletins,
    navegacao: {
      componente: 'webview',
      titulo: 'Boletins',
      url: 'https://coronavirus.ceara.gov.br/boletins/'
    }
  },
  {
    id: 'acao-notificacao',
    titulo: 'Notificação de casos',
    ativo: true,
    labelDoAnalytics: 'notificacao_de_casos',
    icone: NotificacaoDeCasos,
    navegacao: {
      componente: 'webview',
      titulo: 'Notificações de casos',
      url: 'https://notifica.saude.gov.br/login'
    }
  },
  {
    id: 'acao-farmaco-viligancia',
    titulo: 'Farmaco-vigilância',
    ativo: true,
    labelDoAnalytics: 'farmaco_vigilancia',
    icone: FarmacoVigilancia,
    navegacao: {
      componente: 'webview',
      titulo: 'Farmaco-vigilância',
      url: 'https://coronavirus.ceara.gov.br/isus/farmacovigilancia/'
    }
  },
  {
    id: 'acao-notas-tecnicas',
    titulo: 'Notas Técnicas',
    ativo: true,
    labelDoAnalytics: 'notas_tecnicas',
    icone: NotasTecnicas,
    navegacao: {
      componente: 'webview',
      titulo: 'Notas Técnicas',
      url: 'https://coronavirus.ceara.gov.br/profissional/documentos/notas-tecnicas/'
    }
  },
  {
    id: 'acao-central',
    titulo: 'Central de Ventiladores',
    ativo: true,
    labelDoAnalytics: 'central_de_ventiladores',
    icone: CentralDeVentiladores,
    navegacao: {
      componente: 'webview',
      titulo: 'Central de Ventiladores',
      url: 'https://coronavirus.ceara.gov.br/centraldeventiladores/'
    }
  },
  {
    id: 'acao-denuncias',
    titulo: 'Denúncias',
    ativo: true,
    labelDoAnalytics: 'denuncias',
    icone: Denuncias,
    navegacao: {
      componente: rotas.DENUNCIAR,
      titulo: 'Denunciar'
    }
  }
];

if (estaAtiva(features.VACINACOVID19)) {
  listForcaTarefa.unshift({
    id: 'acao-vacinaCOVID19',
    titulo: 'Vacinação',
    ativo: true,
    icone: VacinaCOVID19,
    navegacao: {
      componente: 'webview',
      titulo: 'Vacinação',
      url: 'https://coronavirus.ceara.gov.br/centraldeventiladores/'
    }
  });
}
export default listForcaTarefa;
