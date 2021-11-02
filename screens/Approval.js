import React from 'react'
import { View, Text, StyleSheet, Image, Dimensions, TouchableWithoutFeedback } from 'react-native';
import { Button } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';

function Approval() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Image style={styles.Image} source={require("../assets/approval.png")}></Image>
      <Text style={styles.bigText}>Thank you!</Text>

      <Text style={styles.title}>Your proposal for the TENDER FOR PROVISION </Text>
      <Text style={styles.title}>OF FUNDS IN TRANSIT SERVICES has been approved.</Text>
      <Text style={styles.title}>Kindly click on the button below to continue with  the process.</Text>
      
      <Button title={"Continue"} 
        buttonStyle={styles.createFundraiserButton} 
        titleStyle={styles.fundraiserTextStyle} 
        type="solid"  
        onPress={() => navigation.navigate('Payment')}/>
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

export default Approval; 