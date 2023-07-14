import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  ImageBackground,
  Alert,
} from 'react-native';
const image = { uri: "https://static.vecteezy.com/system/resources/previews/008/506/400/original/telephone-contact-icon-in-black-circle-shape-free-png.png" };
const LogIn = ({ navigation }) => {
  const [username, setusername] = useState('');
  const [password, setpassword] = useState('');

  const Submit = () => {
    if (username === 'keertan' && password === 'keertan') {
      navigation.navigate('contacts');
    } else {
      Alert.alert('Invalid Credentials');
    }
  };

  return (
    <View style={styles.container}>
      {/* <Text style={styles.logo}>Your Logo</Text> */}
        {/* <ImageBackground source={image} style={styles.logo}>
        <Text style={styles.text}>kkjjolk</Text>
        </ImageBackground> */}
        <Image source={image} style={styles.image}></Image>
      <Text style={styles.description}>Enter your credentials to continue</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          autoCapitalize="none"
          autoCorrect={false}
          value={username}
          onChangeText={(username) => setusername(username)}
          placeholder="Enter your email"
        />
        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry={true}
          value={password}
          onChangeText={(password) => setpassword(password)}
          placeholder="Enter your password"
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={Submit}>
        <Text style={styles.buttonText}>Log In</Text>
      </TouchableOpacity>
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
  description: {
    fontSize: 20,
    color: 'black',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    color: '#7d7d7d',
    marginTop: 10,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.3)',
    paddingHorizontal: 15,
    paddingVertical: 7,
    borderRadius: 10,
    fontSize: 18,
  },
  button: {
    backgroundColor: 'black',
    borderRadius: 14,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
  },
  image: {
    // flex: 1,
    resizeMode: 'contain',
    justifyContent: 'center',
    alignItems: 'center',
    left:"30%",
    width: "25%", // Set the desired width for the logo
    height: 100, // Set the desired height for the logo
  }
  
});

export default LogIn;
