import React from 'react'
import { View, Text, Dimensions, StyleSheet, Alert, TouchableWithoutFeedback } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Button } from 'react-native-elements';

function LogOut(props) {
  const navigation = useNavigation();

  const logOutAlert = () =>
    Alert.alert(
      "Log out?",
      " ",
      [
        {
          text: "Cancel",
          onPress: () => console.log("LogOut cancel pressed"),
          style: "cancel"
        },
        { text: "Log Out", onPress: () => logOut() }
      ]
    );
  // Passed from App.js since it needs to modify the loggedIn state in App.js 
  const logOut = () => {
    props.handleLogOut();
    navigation.navigate('Manage')
  }

  return(
    <View style={styles.button}>
      <Button title={"Log Out"} 
      buttonStyle={styles.createFundraiserButton} 
      titleStyle={styles.fundraiserTextStyle} 
      type="solid"  
      onPress={()=> logOutAlert()} />
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    marginVertical: 8, 
    fontSize: 20, 
    fontWeight: 'bold', 
    textAlign: 'center'
  },
  button: {
    alignItems: "center",
    marginTop: 50,
  },
  createFundraiserButton: {
    marginLeft: 10,
    marginTop: 20,
    height: 46,
    width: 200,
    alignItems: 'center',
    borderRadius: 30,
    backgroundColor: "#3A95FF"
  }, 
  fundraiserTextStyle: {
    fontFamily: 'proximanova_bold',
    fontSize: 18, 
    color: '#FFFFFF'
  },
});

export default LogOut;
