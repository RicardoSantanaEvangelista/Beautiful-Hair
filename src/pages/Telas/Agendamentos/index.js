import React, {useState , useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Alert,
  } from 'react-native';



import styles from "./styles";
import { AntDesign } from "@expo/vector-icons";
import firebase from "../../../config/firebase";


export default function Agendamento({navigation}) {
  
  const [agendamentos, setAgendamentos] = useState([]);

  const database = firebase.firestore();

    function  deleteAgendamento(id){
      Alert.alert(
        "ATENÇÃO !",
        "Deseja mesmo exluir o agendamento ?",
        [
            {
            text: "Não",
            onPress: () => console.log("Cancelado, opção: Não"),
            style: "cancel"
            },
            { text: "Sim", onPress: () => {
              database.collection("Agendamentos").doc(id).delete()}
            }
        ],
        { cancelable: false }
        );
    }


    function formatarData(data) {
      function adicionaZero(numero) {
        if (numero <= 9)
          return "0" + numero;
        else
          return numero;
      }
      let dataFormatada = adicionaZero(data.getDate().toString()) + "/" + (adicionaZero(data.getMonth() + 1).toString()) + "/" + data.getFullYear();
      dataFormatada += ' ' + adicionaZero(data.getHours().toString()) + ':' + adicionaZero(data.getMinutes().toString());
      return dataFormatada;
    }

    function getAgendamentos() {

      let dbConsulta = database.collection('Agendamentos').where('status', '==', 'agendado').where('idUsuario', '==', global.idUsuario);
  
      if (global.tipoUsuario == 'admin') {
        dbConsulta = database.collection('Agendamentos').where('status', '==', 'agendado');
      }
  
      dbConsulta.onSnapshot(
        result => {
         
          const vetAgendamentos = [];
  
          
          result.docs.forEach(doc => {
           
            const { idServico, precoServico,
              status,idUsuario, nomeUsuario, emailUsuario,
              telefoneUsuario, obs } = doc.data();
              vetAgendamentos.push(
              {
                id: doc.id,
                dataHora: new Date(doc.data().dataHora.seconds * 1000),
                dataHoraFormatada: formatarData(new Date(doc.data().dataHora.seconds * 1000)),
                idServico,
                precoServico,
                precoServicoFormatado: 'R$ ' + doc.data().precoServico.toFixed(2).replace(".", ","),
                status,
                idUsuario,
                nomeUsuario,
                emailUsuario,
                telefoneUsuario,
                obs,
              }
            );
          });
          setAgendamentos(vetAgendamentos);
        });
    }

    useEffect(() => {
     
      getAgendamentos();
  
    }, []);

  return (
    <View style={styles.container}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={agendamentos}
        renderItem={({item}) => {
          return(
          <View style={styles.agendamentos}>
              <TouchableOpacity 
                style={styles.deleteAgendamentos}
                onPress={() => {
                  deleteAgendamento(item.id)
                }}
              >
               <AntDesign name="delete" size={35} color="#FFF" />
            </TouchableOpacity>
            <Text style={styles.textAgendamentos}
              onPress={() =>{
                navigation.navigate("Alterar Agendamento", {
                  id: item.id,
                  nomeUsuario: item.nomeUsuario,
                  idServico: item.idServico,
                  dataHora: item.dataHora,
                  telefoneUsuario: item.telefoneUsuario,
                  obs: item.obs
                })
              }}
            >
              <Text style={styles.titleDados}>Nome: {item.nomeUsuario}</Text>{"\n"}
              <Text style={styles.titleDados}>Serviço: {item.idServico}</Text>{"\n"}
              <Text style={styles.titleDados}>Preço: {item.precoServicoFormatado}</Text> {"\n"}
              <Text style={styles.titleDados}>Data/Hora: {item.dataHoraFormatada}</Text>{"\n"}
              <Text style={styles.titleDados}>Telofone: {item.telefoneUsuario}</Text>{"\n"}
              <Text style={styles.titleDados}>Email: {item.emailUsuario}</Text> {"\n"}
              <Text style={styles.titleDados}>Observação: {item.obs}</Text>
              
            </Text>
          </View>
          )
        }}
      />
    </View>
  );
}