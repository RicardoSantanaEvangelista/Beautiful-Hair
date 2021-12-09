import  React, {useState} from 'react';
import { 
  Text,
  View,
  TouchableOpacity,
  Alert,
} from 'react-native';

import DatePicker from 'react-native-datepicker';
import {Picker} from '@react-native-picker/picker';

import {MaterialCommunityIcons, MaterialIcons} from "@expo/vector-icons";
import firebase from "../../config/firebase";
import styles from "./styles";


export default function AlterarAgendamento( {navigation, route} ) {

  const [hora, setHora] = useState("");
  const [data, setData] = useState("");
  const [status, setStatus] = useState("");
  const [servico, setServico] = useState("");
  const [servicos, setServicos] = useState([]);
  const [idServico, setIdServico] = useState("");
  const [precoServico,setPrecoServico] = useState("");
  const [obs, setObs] = useState("Nenhuma observação !");
  
  const [dataOriginal, setDataOriginal] = useState('');
  const [horaOriginal, setHoraOriginal] = useState('');
  const [messageSaveError, setMessageSaveError] = useState("");
  const [statusSaveError, setStatusSaveError] = useState(false);
 
  const [idUser, serIdUser] = useState( global.idUsuario);
  const [idName, setIdName] = useState( global.nomeUsuario);
  const [idPhone, setIdphone] = useState(global.telefoneUsuario);
  const [idEmail, setIdemail] = useState(global.emailUsuario);
  

  const database = firebase.firestore();

  const [id, setId] = useState(route.params.id);
  
  function adicionaZero(numero) {
    if (numero <= 9)
        return "0" + numero;
    else
        return numero;
  }


  function formatarData(data) {
    let dataFormatada = adicionaZero(data.getDate().toString()) + "/" + (adicionaZero(data.getMonth() + 1).toString()) + "/" + data.getFullYear();
    return dataFormatada;
  }

  async function getAgendamento(id) {
   
    const doc = await database.collection('Agendamentos').doc(id).get();

    
    const agendamento = doc.data();
    
    let objAgendamento = {
        ...agendamento,
        id: doc.id,
        data: formatarData(new Date(doc.data().dataHora.seconds * 1000)),
        hora: adicionaZero((new Date(doc.data().dataHora.seconds * 1000)).getHours()) + ':' + adicionaZero((new Date(doc.data().dataHora.seconds * 1000)).getMinutes()),
    }

    
    setDataOriginal(objAgendamento.data);
    setHoraOriginal(objAgendamento.hora);
}

React.useEffect(() => {
  getAgendamento(route.params.id);

  Promise.all([
      database.collection('Servicos').where('disponivel', '==', true).get()
  ]).then((results) => {
      const servicosDisponiveis = results[0]; 
      let vetServicos = [];

      servicosDisponiveis.forEach((doc) => {
          vetServicos.push({ label: `${doc.data().descricao} (R$ ${doc.data().preco.toFixed(2).replace(".", ",")})`, value: doc.id, preco: doc.data().preco });
      });

      setServicos(vetServicos);
  }
  ).catch((error) => {
      Alert.alert(
          'ERRO',
          'Erro ao tentar obter Serviços e Formas de Pagamento!'
      );
  });
}, []);

const handleChangeServico = (id, preco) => {
  if (statusSaveError) {
      setStatusSaveError(false);
  };
  setIdServico(id);
  setPrecoServico(preco);
}


function fieldsFilleds() {
  if (data && hora && idServico)
      return true;
  else
      return false;
}

function LimpaVariaveisEstado() {
  setDataOriginal(''),
  setHoraOriginal(''),
  setData(""),
  setHora(""),
  setStatus(""),
  setServico(""),
  setObs(""),
  serIdUser(global.idUsuario),
  setIdName(global.nomeUsuario),
  setIdphone(global.telefoneUsuario),
  setIdemail(global.emailUsuario)
}

function updateSchedule() {

  if (!fieldsFilleds()) {

      setMessageSaveError('Apenas o campo "Recado/Observação" não é de \npreenchimento obrigatório!');
      setStatusSaveError(true);
  }
  else {
      let dataHoraAgendamento = new Date(
          Date.parse(data.slice(6, 10) + '/' +
              data.slice(3, 5) + '/' + data.slice(0, 2) + ' ' +
              hora.slice(0, 2) + ':' + hora.slice(3, 5))
      );

      let objUpdate = {
          dataHora: dataHoraAgendamento,
          status: 'agendado',
          precoServico: precoServico,
          idServico: idServico,
          idUsuario: idUser,
          nomeUsuario: nomeUsuario,
          emailUsuario: emailUsuario,
          telefoneUsuario: telefoneUsuario,
          obs: obs,
      };

      if ((data == dataOriginal) && (hora == horaOriginal)) {

          database.collection('Agendamentos').doc(id).update(objUpdate).then(() => {
              LimpaVariaveisEstado();
              Alert.alert(
                  'Data/Horário Disponível',
                  'Agendamento atualizado com SUCESSO!'
              );
              navigation.navigate("Agendamentos");
          }).catch((error) => {
              // console.log('error-> ', error);
              Alert.alert(
                  'ERRO',
                  'Erro ao tentar atualizar o agendamento!'
              );
          });
      } else {
          database.collection('Agendamentos').doc(dataHoraAgendamento.getTime().toString()).get()
              .then(
                  (doc) => {
                      if (doc.exists) {
                          Alert.alert(
                              'Data/Horário Ocupado',
                              'Infelizmente alguém já agendou nesta data e horário!'
                          );
                      } else {
                          database.collection('Agendamentos').doc(dataHoraAgendamento.getTime().toString()).set(objUpdate).then(() => {
                  
                              let dataHoraOriginal = new Date(
                                  Date.parse(dataOriginal.slice(6, 10) + '/' +
                                      dataOriginal.slice(3, 5) + '/' + dataOriginal.slice(0, 2) + ' ' +
                                      horaOriginal.slice(0, 2) + ':' + horaOriginal.slice(3, 5))
                              );
                              database.collection("Agendamentos").doc(dataHoraOriginal.getTime().toString()).delete().then(() => {
                                  console.log('Documento deletado com sucesso!');
                              }).catch((error) => {
                                  console.error('Erro ao tentar deletar documento de id anterior', error);
                              });

                              
                              LimpaVariaveisEstado();
                              Alert.alert(
                                  'Data/Horário Disponível',
                                  'Agendamento atualizado com SUCESSO!'
                              );
                             
                              navigation.navigate("Agendamentos");
                          })
                              .catch((error) => {
                                  
                                  Alert.alert(
                                      'ERRO',
                                      'Erro ao tentar gravar o agendamento!'
                                  );
                              });
                      }
                  }
              );
      }
  }
}

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Serviços</Text>
      <View style={styles.containerPicker}>
        <Picker
          style={styles.picker}
          selectedValue={idServico}
          onValueChange={(value, itemIndex) => handleChangeServico(value, servicos[itemIndex - 1].preco)}
        >
          <Picker.Item key='0' label='Selecione o Serviço' value='' />
          {servicos.map(servico => <Picker.Item key={servico.value.id} label={servico.label} value={servico.value} />)}
        </Picker>
      </View>

      <View style={styles.DataHoraContainer}>
      <Text style={styles.titleData}>Data</Text>
        <Text style={styles.titleHorario}>Hora</Text>
      </View>

    <View style={styles.contaiberCentral}>
        <View style={styles.dataContainer}>
                      <DatePicker
                        style={styles.datePicker}
                        date={data} 
                        placeholder='00/00/0000'
                        mode='date' // date, datetime and time
                        format='DD/MM/YYYY'
                        minDate={new Date()}
                        // androidMode='spinner'
                        // maxDate='01/01/2050'
                        confirmBtnText='Confirmar'
                        cancelBtnText='Cancelar'
                        iconComponent={
                            <MaterialCommunityIcons
                                style={{ marginTop: 5 }}
                                size={30}
                                color='#FFF'
                                name='calendar-month'
                            />
                        }
                        customStyles={{
                            dateInput: {
                                marginLeft: 0,
                                marginTop: 0,
                                height: "100%",
                                width: '50%',
                            },
                            placeholderText: {
                                color: '#FFF'
                                
                            }
                        }}
                        onDateChange={(value) =>
                            setData(value)}
                    />
          
        </View>

        <View style={styles.containerHora}>
          <Picker
            style={styles.pickerHora}
            selectedValue={hora}
            onValueChange={ (itemValue) => setHora(itemValue) }
          >
            <Picker.Item label="00:00" value=""/>
            <Picker.Item label="08:00" value="08:00"/>
            <Picker.Item label="09:00" value="09:00"/>
            <Picker.Item label="10:00" value="10:00"/>
            <Picker.Item label="11:00" value="11:00"/>
            <Picker.Item label="12:00" value="12:00"/>
            <Picker.Item label="14:00" value="14:00"/>
            <Picker.Item label="15:00" value="15:00"/>
            <Picker.Item label="16:00" value="16:00"/>
            <Picker.Item label="17:00" value="17:00"/>
            <Picker.Item label="18:00" value="18:00"/>
          </Picker>
          <Text 
            style={styles.pickerRelogio}>
            <MaterialCommunityIcons 
              name="clock-outline" size={24} 
              color="#FFF" />
          </Text>
        </View>

      </View>

      <Text style={styles.tileObs}>Observação</Text>

      <View style={styles.containerObs}>
          <Picker
              style={styles.pickerObs}
              selectedValue={obs}
              onValueChange={ (itemValue) => setObs(itemValue) }
            >
              <Picker.Item label="Nenhuma observação !" value="Nenhuma observação !"/>
              <Picker.Item label="Chegarei atrasado !" value="Chegarei atrasado !"/>
              <Picker.Item label="Agendando para outra pessoa !" value="Agendando para outra pessoa !"/>
            </Picker>
      </View>

      {statusSaveError === true
                ?
                <View style={styles.contentAlert}>
                    <MaterialIcons
                        name='mood-bad'
                        size={24}
                        color="#F92E6A"
                    />
                    <Text style={styles.warningAlert}>{messageSaveError}</Text>
                </View>
                :
                <View></View>
            }

      <TouchableOpacity
        style={styles.buttonagendar}
        onPress={updateSchedule}
      >
        <Text style={styles.textAgendar}>Alterar</Text>
      </TouchableOpacity>
    </View>
  );
}