import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TextInput } from 'react-native-paper';
import ShowAll from './allcontacts';

const LocalStorageDemo = ({ navigation }) => {
  const [storedData, setStoredData] = useState([]);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('contacts');
      if (value) {
        setStoredData(JSON.parse(value));
      } else {
        setStoredData([]);
      }
    } catch (error) {
      console.log('Error retrieving data:', error);
    }
  };
  useEffect(() => {
    retrieveData('contacts');
  }, []);

  const storeData = async (key, value) => {
    try {
      const existingData = await AsyncStorage.getItem(key);
      const newData = existingData ? JSON.parse(existingData) : [];
      newData.push(value);
      await AsyncStorage.setItem(key, JSON.stringify(newData));
      console.log('Data stored successfully.');
      retrieveData(key);
    } catch (error) {
      console.log('Error storing data:', error);
    }
  };
  const handleEdit = (index, updatedContact) => {
    const updatedData = [...storedData];
    updatedData[index] = updatedContact;
    setStoredData(updatedData);
    AsyncStorage.setItem('contacts', JSON.stringify(updatedData))
      .then(() => {
        console.log('Data updated successfully.');
      })
      .catch((error) => {
        console.log('Error updating data:', error);
      });
  };

  const handleDelete = (index) => {
    const updatedData = [...storedData];
    updatedData.splice(index, 1);
    setStoredData(updatedData);
    AsyncStorage.setItem('contacts', JSON.stringify(updatedData))
      .then(() => {
        console.log('Data removed successfully.');
      })
      .catch((error) => {
        console.log('Error removing data:', error);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>Contact Storage</Text>
      <TextInput
        value={name}
        onChangeText={(text) => setName(text)}
        placeholder="Enter Name"
      />
      <TextInput
        value={phone}
        onChangeText={(text) => setPhone(text)}
        placeholder="Enter Phone Number"
      />
      <View style={styles.buttonContainer}>
        <Button
          title="Add Contact"
          onPress={() => {
            if (name && phone) {
              storeData('contacts', { name, phone });
              setName('');
              setPhone('');
            }
          }}
        />
        <Button
          title="View Contacts"
          onPress={() =>
            navigation.navigate('ShowAll', {
              storedData,
              handleEdit,
              handleDelete,
            })
          }
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 30,
    backgroundColor: 'powderblue',
  },
  logo: {
    fontSize: 25,
    color: '#344055',
    fontWeight: '500',
    alignSelf: 'center',
    marginBottom: 20,
  },
  buttonContainer: {
    marginBottom: 20,
  },
});

export default LocalStorageDemo;

 {/* <Text style={styles.header}>Stored Contacts:</Text> */}
            {/* {storedData.map((contact, index) => (
        <View style={styles.contactContainer} key={index}>
          <Text style={styles.contactName}>{contact.name}</Text>
          <Text style={styles.contactPhone}>{contact.phone}</Text>
            <Button
                title="Remove"
                onPress={() => removeData('contacts')}
                    />
        </View>
      ))} */}
