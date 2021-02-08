import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  Keyboard,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Button,
  ImageBackground
} from 'react-native';
import DropdownAlert from 'react-native-dropdownalert-jia';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-community/async-storage';

const App = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [data, setData] = useState([]);
  const [toggle, setToggle] = useState('true');
  const [itemId, setItemId] = useState(null);
 
 //Save Data in Asyncstorage Logic
  const saveData = async () => {
  
        let user = {
          name,
          email,
          phone, 
          key: Math.random(),
        };

        const arrData = [user];

        const storedData = await AsyncStorage.getItem('user');
        const storedDataParsed = JSON.parse(storedData);
        setData(storedDataParsed);
        console.log('value set info', JSON.stringify(storedDataParsed));

        let newData = [];

        if (storedData === null) {
          // save
          await AsyncStorage.setItem('user', JSON.stringify(arrData));
          console.log('value set info', JSON.stringify(arrData));
        } else {
          newData = [...storedDataParsed, user];
          await AsyncStorage.setItem('user', JSON.stringify(newData));
        }

        Keyboard.dismiss();
        setName('');
        setEmail('');
        setPhone('');
        alert('Data Added Successfully')
      }

//Life cycle method
      useEffect(() => {
        //AsyncStorage.clear();
        retrieveData();
      });
    
    
 //Get Data from AsyncStorage/Local Storage Logic
      const retrieveData = async () => {
        try {
          const valueString = await AsyncStorage.getItem('user');
          const value = JSON.parse(valueString);
          setData(value);
          // console.log('value Get info', value);
        } catch (error) {
          console.log(error);
        }
      };
      
  //Delete Data Logic    
    
      const clearData = async id => {
        if (data !== null) {
          const newData = data.filter((_, index) => index !== id);
          setData(newData);
          await AsyncStorage.setItem('user', JSON.stringify(newData));
          console.log('value delete info', JSON.stringify(newData));
        }
        
        alert('Data Deleted succesfully')
      };
      
      //Update Data Logic

      const changeData = async id => {
        setToggle(false);
        const changedData = data.map((item, index) => {
          if (index === id) {
            setName(item.name);
            setEmail(item.email);
            setPhone(item.phone);
          }
          return item;
        });
    
        setData(changedData);
        setItemId(id);
        await AsyncStorage.setItem('user', JSON.stringify(changedData));
      };
    
      const updateData = async () => {
        setToggle(true);
        data[itemId].name = name;
        data[itemId].phone = phone;
        data[itemId].email = email;
        await AsyncStorage.setItem('user', JSON.stringify(data));
        Keyboard.dismiss();
        setName('');
        setEmail('');
        setPhone('');
        alert('Data Updated Succesfully')
      };
  
  return(
    <ImageBackground style={{flex:1}} source={require('../Images/form.jpg')} >
    <View>
      <Text style={{fontSize:20, textAlign:'center', margin:5}}>Please Enter Your Details</Text>

      <TextInput
      placeholder="Full Name"
      value={name}
      onChangeText={text => setName(text)}
      style={{borderWidth:2, backgroundColor:'#fff'}}>
      </TextInput>

      <TextInput
      placeholder="Email"
      value={email}
      onChangeText={text => setEmail(text)} keyboardType='name-phone-pad'
      style={{borderWidth:2, backgroundColor:'#fff'}}>
      </TextInput>

      <TextInput
      placeholder="Phone"
      value={phone}
      onChangeText={text => setPhone(text)}
      style={{borderWidth:2, backgroundColor:'#fff'}}>
      </TextInput>

      {/* <Button onPress={saveData} title='Save Data' /> */}
     
      <Button
            title={toggle ? 'save data' : 'update changes'}
            name="add"
            onPress={toggle ? saveData : updateData}
          />

      <ScrollView style={{height: '60%', paddingVertical: 10}}>
            {data !== null
              ? data.map((item, index) => {
                  // const highlightColor = item.show ? 'gold' : '#e3e3e3';

                  return (
                    <View key={index}>
                      <View >
                        <Text style={{fontSize:20}}>{index + 1}. </Text>
                        <View>
                          <Text style={{fontSize:20}}>{item.name}</Text>
                          <Text style={{fontSize:20}}>{item.email}</Text>
                          <Text style={{fontSize:20}}>{item.phone}</Text>
                        </View>
                      </View>
                      <View style={{flexDirection:'row'}}>
                        <TouchableOpacity style={{width:80, height:30, backgroundColor:'pink', margin:5, borderRadius:15}}
                          onPress={() => clearData(index)}
                         >
                          <Text style={{color:'red', fontSize:20, textAlign:'center'}}>Delete</Text>
                        </TouchableOpacity>
                      
                        <TouchableOpacity style={{width:80, height:30,  margin:5, backgroundColor:'#A0EE81', borderRadius:15}}
                          onPress={() => changeData(index)}
                          >
                           <Text style={{color:'green', fontSize:20, textAlign:'center'}}>Update</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  );
                })
              : null}
          </ScrollView>
    </View>
    </ImageBackground>
  );
  };



  export default App;
