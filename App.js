import React, {useState, useEffect} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, SafeAreaView } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  const [task, setTask] = useState('');

  const USER_1 = [
    { id: 1, nome: 'Clayton Tavares', idade: 29 },
    { id: 2, nome: 'Rodrigo Souza',   idade: 39 },
    { id: 3, nome: 'Lais Silva',      idade: 32 },
  ];

  async function async(){
    await AsyncStorage.setItem('@task', JSON.stringify(USER_1));
    const currentUser = await AsyncStorage.getItem('@task');
    setTask(JSON.parse(currentUser));
  }

  async function limpar(){
    await AsyncStorage.removeItem('@task');    
  }

  function remove(taskId){
    const newTasks = task.filter(item => item.id !== taskId);
    setTask(newTasks);
  }

  useEffect(() => {
    async function load(){
      const currentUser = await AsyncStorage.getItem('@task');
      setTask(JSON.parse(currentUser));
    }
    load();
  },[]);

  function lista(props){
    return(
      <View>
        <Text>Nome:  {props.item.nome} </Text>
        <Text>Idade: {props.item.idade}</Text>
        <TouchableOpacity onPress={() => remove(props.item.id)} style={{marginBottom: 50}}>
          <Text>Clique aqui para limpar a lista</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <TouchableOpacity onPress={async}>
        <Text>Clique aqui</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={limpar} style={{marginBottom: 50}}>
        <Text>Clique aqui para limpar a lista</Text>
      </TouchableOpacity>
        <FlatList 
          data={task}
          renderItem={lista}
          keyExtractor={item => item.id}
        />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 150
  },
});
