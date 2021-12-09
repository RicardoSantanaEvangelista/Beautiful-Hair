import  React, {useState, useEffect} from 'react';
import { 
  Text,
  View,
  TouchableOpacity,
  Alert,
} from 'react-native';

import DatePicker from 'react-native-datepicker';
import {Picker} from '@react-native-picker/picker';

import {MaterialCommunityIcons, MaterialIcons} from "@expo/vector-icons";
import firebase from "../../../config/firebase";
import styles from "./styles";


export default function Agendar( {navigation} ) {
  
  const [servico, setServico] = useState("");
  const [servicos, setServicos] = useState([]);

  const [hora, setHora] = useState("");
  const [data, setData] = useState("");
  const [status, setStatus] = useState("");
  const [obs, setObs] = useState("Nenhuma observação !");


  const [statusSaveError, setStatusSaveError] = useState(false);
  const [messageSaveError, setMessageSaveError] = useState("");

  const [idUser, serIdUser] = useState( global.idUsuario);
  const [idName, setIdName] = useState( global.nomeUsuario);
  const [idPhone, setIdphone] = useState(global.telefoneUsuario);
  const [idEmail, setIdemail] = useState(global.emailUsuario);

  const database = firebase.firestore();

    useEffect(() => {
      Promise.all([
          database.collection('Servicos').where('disponivel', '==', true).get()
      ]).then((results) => {
          const servicosDisponiveis = results[0];

          let vetServicos = [];

          servicosDisponiveis.forEach((doc) => {
              vetServicos.push({ label: `${doc.data().descricao} (R$ ${doc.data().preco.toFixed(2).replace(".", ",")})`, value: { id: doc.id, preco: doc.data().preco } });
          });

          setServicos(vetServicos);
      }
      ).catch((error) => {
          Alert.alert(
              'ERRO',
              'Erro ao tentar obter as formas de pagamento!'
          );
      });
  }, [navigation]);

  function requiredFields() {
    if (!data || !hora || !servico)
        return false;
    else
        return true;
  }

  function saveNewSchedule() {
    if (!requiredFields()) {
        setMessageSaveError('Apenas o campo "Recado/Observação" não é de \npreenchimento obrigatório!');
        setStatusSaveError(true);
    }
    else {
        let dataHoraAgendamento = new Date(
            Date.parse(data.slice(6, 10) + '/' +
                data.slice(3, 5) + '/' + data.slice(0, 2) + ' ' +
                hora.slice(0, 2) + ':' + hora.slice(3, 5))
        );
        database.collection('Agendamentos').doc(dataHoraAgendamento.getTime().toString()).get()
            .then(
                (doc) => {
                    if (doc.exists) {
                        Alert.alert(
                            'Data/Horário Ocupado',
                            'Infelizmente alguém já agendou nesta data e horário!'
                        );
                    } else {
                        database.collection('Agendamentos').doc(dataHoraAgendamento.getTime().toString()).set({
              
                            dataHora: dataHoraAgendamento,
                            status: 'agendado',
                            obs: obs,
                            precoServico: servico.preco,
                            idServico: servico.id,
                            idUsuario: idUser,
                            nomeUsuario: idName,
                            emailUsuario: idEmail,
                            telefoneUsuario: idPhone,

                        }).then(() => {
                           setData(""),
                           setHora(""),
                           setStatus(""),
                           setServico(""),
                           setObs(""),
                           serIdUser(global.idUsuario),
                           setIdName(global.nomeUsuario),
                           setIdphone(global.telefoneUsuario),
                           setIdemail(global.emailUsuario),

                            Alert.alert(
                                'Data/Horário Disponível',
                                'Agendamento efetuado com SUCESSO!'
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


   
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Serviços</Text>
      <View style={styles.containerPicker}>
        <Picker
          style={styles.picker}
          selectedValue={servico}
          onValueChange={ (itemValue) => setServico(itemValue) }
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
                        mode='date'
                        format='DD/MM/YYYY'
                        minDate={new Date()}
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
        onPress={saveNewSchedule}
      >
        <Text style={styles.textAgendar}>Agendar</Text>
      </TouchableOpacity>
    </View>
  );
}