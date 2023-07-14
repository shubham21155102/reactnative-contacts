import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
const ShowAll = ({ route }) => {
  const { storedData, handleDelete, handleEdit } = route.params;
  const [editableIndex, setEditableIndex] = useState(null);
  const [updatedName, setUpdatedName] = useState('');
  const [updatedPhone, setUpdatedPhone] = useState('');
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
  const handleContactEdit = (index, updatedContact) => {
    handleEdit(index, updatedContact);
    setEditableIndex(null);
    setUpdatedName('');
    setUpdatedPhone('');
    retrieveData();
  };

  const isEditable = (index) => {
    return editableIndex === index;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Stored Contacts:</Text>
      {storedData.map((contact, index) => (
        <View key={index} style={styles.contactContainer}>
          {isEditable(index) ? (
            <TextInput
              style={styles.contactInput}
              value={updatedName}
              onChangeText={(text) => setUpdatedName(text)}
            />
          ) : (
            <Text style={styles.contactText}>{contact.name}</Text>
          )}
          {isEditable(index) ? (
            <TextInput
              style={styles.contactInput}
              value={updatedPhone}
              onChangeText={(text) => setUpdatedPhone(text)}
            />
          ) : (
            <Text style={styles.contactText}>{contact.phone}</Text>
          )}
          {isEditable(index) ? (
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() =>
                handleContactEdit(index, {
                  ...contact,
                  name: updatedName,
                  phone: updatedPhone,
                })
              }
            >
              <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => setEditableIndex(index)}
            >
              <Text style={styles.buttonText}>Edit</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => handleDelete(index)}
          >
            <Text style={styles.buttonText}>Delete</Text>
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  contactContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  header: {
    fontSize: 20,
    color: 'black',
    marginTop: 20,
    marginBottom: 10,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  contactText: {
    flex: 1,
    marginRight: 10,
  },
  contactInput: {
    flex: 1,
    marginRight: 10,
    borderWidth: 1,
    borderColor: 'gray',
    padding: 5,
  },
  actionButton: {
    backgroundColor: '#e74c3c',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default ShowAll;
