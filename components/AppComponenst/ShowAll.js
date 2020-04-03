import React, { useState } from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, TouchableWithoutFeedback, Keyboard, ActivityIndicator ,Button} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import * as firebase from 'firebase';
import config from '../../constants/ApiKeys';
import 'firebase/firestore';

export default function ShowAll({navigation}) {
    const [data, setData] = useState([
        { name: "Holo", details: "Good game", key: 1 },
        { name: "Doom", details: "Boor Game", key: 2 },
        { name: "Sekiro", details: "Very Very bad game", key: 3 }
    ])
    if (!firebase.apps.length) {
      firebase.initializeApp(config.FirebaseConfig);
    }
    
    const submitHandler = (name,details) => {
        if (name.length > 3) {
          setData((prevTodos) => {
            return [
              { name: name, details: details, key: Math.random() },
              ...prevTodos
            ];
          })
        } else {
          Alert.alert('oppos', 'todo must be over 3 chars long', [
            { text: 'Understood', onPress: () => console.log('alert closed') }
    
          ]);
        }
    

      }


      firebase.firestore().collection('test').add({a:'test 2 ',b:'test 2'}).then(console.warn('done'))
      .catch(error =>{
        console.error('error ' ,error.message)
      })
      const testDB = () => {
       
        // firebase.firestore().collection('test').get()
        // .then(snapshot => {
        //   console.log('snap');
        //    snapshot.docs.map(snap =>{
        //      console.log(snap.data())
        //    })
        // })
        // .catch(error=>console.error(error.message))
        
        // firebase.firestore().collection("test").add({details:'hello',title:'hello'})
        // .then((docRef)=>console.log("Document written with ID: ", docRef.id))
        // .catch((error)=> console.error("Error adding document: ", error))
            }
    return (
        <View>
            <FlatList
                data={data}
                renderItem={({ item }) => (

                    <View>
                        <Text>{item.name}: {item.details}</Text>
                        
                    </View>

                )}
            />
            <TouchableOpacity  onPress={() => navigation.navigate('AddGame',{submitHandler})}>
                <Text >Add Game</Text>
            </TouchableOpacity>
            <TouchableOpacity  onPress={() => {testDB()}}>
                <Text >Add Game testDB</Text>
            </TouchableOpacity>
        </View>
    )
}
