import React, { useContext } from 'react'
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';
import LogOut from '../components/LogOut'; 
import LogIn from '../components/LogOut'; 
import AppContext from '../components/AppContext';  
import normalize from 'react-native-normalize';

function Settings(props) {
  const context = useContext(AppContext);
  const loggedIn = context.loggedIn; 
  const address = context.address; 
  const balance = parseFloat(context.balance).toFixed(2); 
  
  console.log(balance);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
            <View style={styles.profileSection}>
                <Image style={styles.profile}
                  source={require("../assets/profile/Community-amico.png")} />
                <View middle>
                    <Text style={styles.username}>cUSD balance: ${balance}</Text>
                    <Text style={styles.email}>{address}</Text>
                </View>
                </View>
            </View>
            <View style={[styles.footer]}>
              <Text style={styles.headerInitial}>Settings</Text>
      {loggedIn ? ( 
        <View>
          {/* <Text style={styles.headerStart}> Logged into </Text>
          <Text style={styles.headerEnd}>{address}</Text> 

          <Text style={styles.headerStartBal}> cUSD balance: </Text>
          <Text style={styles.headerEndBal}>${balance}</Text>  */}

          <LogOut handleLogOut={props.handleLogOut}/>
        </View>
      ) : (
        <View style={styles.centerLogin}>
          <LogIn reason={"please login view your settings!"} handleLogIn={context.handleLogIn}/>
        </View>
      )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    backgroundColor: '#F5F5F8',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
  },
  header: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 80,
    backgroundColor:'#3A95FF'
  },

  profileSection: {
    alignItems:'center',
    paddingBottom: 10,
  },

  profile: {
    top: 50,
    width: 100,
    height: 100,
    alignItems: 'center',
    borderRadius: 150 / 2,
    overflow: "hidden",
    borderWidth: 3,
  },
  profile: {
    top: 50,
    width: 100,
    height: 100,
    alignItems: 'center',
    borderRadius: 150 / 2,
    overflow: "hidden",
    borderWidth: 3,
  },
  username: {
    top: 55,
    color: '#fff',
    marginBottom: 5,
    fontWeight: "900",
    fontSize: 26,
  },

  email: {
    top: 56,
    color: '#fff',
    marginBottom: 10,
  },

  footer: {
    flex: 3,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30
  },
  headerInitial: { 
    fontSize: 25,
    color: '#2E3338',
    fontFamily: 'proximanova_bold',
    marginTop: Platform.OS === 'ios' ? normalize(60): normalize(20),
    marginLeft: normalize(10),
    marginRight: normalize(10),
    marginBottom: normalize(30),
  },
  headerStart: {
    fontSize: 20,
    color: '#2E3338',
    fontFamily: 'proximanova_bold',
    marginLeft: normalize(10),
    marginBottom: normalize(5)
  },
  headerEnd: {
    fontSize: 15,
    color: '#2E3338',
    fontFamily: 'proxima',
    marginLeft: normalize(15),
  },
  headerStartBal:{
    fontSize: 20,
    color: '#2E3338',
    fontFamily: 'proximanova_bold',
    marginLeft: normalize(10),
    marginTop: normalize(20),
    marginBottom: normalize(5)
  },
  headerEndBal:{
    fontSize: 15,
    color: '#2E3338',
    fontFamily: 'proxima',
    marginLeft: normalize(15),
    marginBottom: normalize(40),
  },
  centerLogin: {
    flex: 1, 
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default Settings;