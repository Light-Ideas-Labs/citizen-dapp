import React from 'react'
import { View, Text, StyleSheet, Image, Dimensions, TouchableWithoutFeedback } from 'react-native';
import { Button } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';

function Payment() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Image style={styles.Image} source={require("../assets/payment.png")}></Image>
      <Text style={styles.bigText}>Paid and Confirmed</Text>

      <Text style={styles.title}>Funds successfuly sent to:</Text>
      <Text style={styles.title1}>0x98FD53DGV839VXV262G222V2GGDGDHSD2</Text>
      
      <Button title={"Continue"} 
        buttonStyle={styles.createFundraiserButton} 
        titleStyle={styles.fundraiserTextStyle} 
        type="solid"  
        onPress={() => navigation.reset({
          index: 0,
          routes: [{name: 'Home'}],
        })}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bigText: { 
    marginTop: 30,
    fontSize: 30,
    color: '#2E3338',
    fontFamily: 'proximanova_bold',
    marginBottom: 40
  },
  title1: {
    marginTop: 10,
    fontFamily: 'proxima',
    fontSize: 16, 
    color: '#3A95FF',
  },
  title: {
    fontFamily: 'proxima',
    fontSize: 16, 
    color: '#2E3338',
  },
  Image: {
    width: 250,
    height: 250,
    resizeMode: 'contain',
  },
  createFundraiserButton: {
    marginTop: 40,
    height: 40,
    width: 180,
    borderTopLeftRadius: 30,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: "#3A95FF"
  }, 
  fundraiserTextStyle: {
    fontFamily: 'proximanova_bold',
    fontSize: 18, 
    color: '#FFFFFF'
  }
});

export default Payment; 