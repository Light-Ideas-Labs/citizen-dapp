import React, { useContext, useState } from 'react'
import { View, ActivityIndicator, Text, ScrollView, StyleSheet, TextInput, Dimensions, Keyboard, TouchableWithoutFeedback, Image, Alert, TouchableWithoutFeedbackComponent } from 'react-native';
import { Icon } from 'react-native-elements';
import { kit } from '../root';
import { useNavigation } from '@react-navigation/native';
import {   
  requestTxSig,
  waitForSignedTxs,
  FeeCurrency
} from '@celo/dappkit';
import { toTxResult } from "@celo/connect";
import * as Linking from 'expo-linking';
import LogIn from '../components/LogIn';
import firebaseStorageRef from '../components/Firebase';
import * as ImagePicker from 'expo-image-picker';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import AppContext from '../components/AppContext';
import { Button } from 'react-native-elements';
import normalize from 'react-native-normalize';

function VerifyWork(props) {
  const navigation = useNavigation();
  
  // Get context variables
  const context = useContext(AppContext);
  const address = context.address; 
  const loggedIn = context.loggedIn; 

  // Paload info
  const [title, onChangeTitle] = useState('');
  const [name, onChangeName] = useState('');
  const [description, onChangeDescription] = useState('');
  const [amount, onChangeAmount] = useState(0);
  const [deadline, onChangeDeadline] = useState(0);
  const [image, imageResponse] = useState(null);
  const [imageState, setImageState] = useState('No Image Selected'); 
  const [imageDownloadUrl, setImageDownloadUrl] = useState('');

  const [imageSelected, setImageSelected] = useState(null);

  // loading
  var [loading, setLoading] = useState(false);

  // ui
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  var currentDate = new Date();

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {   
    //date is a Date object, convert to unix timestamp
    var currentDate = new Date();
    console.log(currentDate);

    currentDate = Math.floor(currentDate.getTime()/1000);
    var userDefinedDate = Math.floor(date.getTime()/1000);
    
    var differenceDateTime = Math.ceil(((userDefinedDate-currentDate)/3600)/24);

    console.log(differenceDateTime);

    if(differenceDateTime < 0){
      onChangeDeadline(0);
    }else{
      onChangeDeadline(differenceDateTime);
    }

    hideDatePicker();
  };

  const pickImage = async () => {
    let selectedImage = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      includeBase64: false,
      maxHeight: 200,
      maxWidth: 300,
    });
    
    if(!selectedImage.cancelled){
      imageResponse(selectedImage.uri);
      firestorePost(selectedImage.uri);
      setImageSelected(true);
    }
  }

  const firestorePost = async (localImageUrl) => {
    // Transform to blob
    const fetchResponse = await fetch(localImageUrl);
    const blob = await fetchResponse.blob();

    // Change filename
    const storageFileName = localImageUrl.substring(localImageUrl.lastIndexOf('/')+1);

    var uploadImage = firebaseStorageRef.ref('fundraiserImages').child(storageFileName).put(blob);

    console.log("the uploading",uploadImage)

    uploadImage.on('state_changed', (snapshot) => {
      setImageState('Image Uploading');
    }, (error) => {
        setImageState(null);
    }, () => {
        uploadImage.snapshot.ref.getDownloadURL().then((downloadURL) => {
            setImageDownloadUrl(downloadURL);
            setImageState('Image Uploaded');
        });
    });
  }
  
  const write = async () => {
    //problem with image upload
    if(imageState == null){
      Alert.alert(
        "Reupload image!"
      ); 

      return;
    }

    if(imageSelected == null){
      Alert.alert(
        "Upload an image!"
      ); 

      return;
    }

    if(name.length == 0){
      Alert.alert(
        "Add a name!"
      ); 

      return;
    }

    if(title.length == 0){
      Alert.alert(
        "Add a title!"
      );

      return;
    }

    if(description.length == 0){
      Alert.alert(
        "Add a description!"
      );

      return;
    }

    // if fundraising amount is 0 then alert 
    if(amount <= 0){
      Alert.alert(
        "Project  amount must be greater than 0 cUSD!"
      ); 

      return;
    }

    if(amount < 1 && amount > 0){
      Alert.alert(
        "Minimum project  amount is $1 cUSD"
      ); 

      return;
    }

    if(deadline == 0){
      Alert.alert(
        "Add a deadline!"
      );

      return;
    }

    const requestId = 'update_projects'
    const dappName = 'Citizen Dapp'
    const callback = Linking.makeUrl('/my/path')

    /* 
    Solidity function: 
    
    function startProject(string calldata title, string calldata description, 
      string calldata imageLink, uint durationInDays, uint amountToRaise)
    */    

    const stableToken = await kit.contracts.getStableToken();

    // Create a transaction object to update the contract
    const txObject = await props.celoCrowdfundContract.methods.startProject(stableToken.address, name, title, description, imageDownloadUrl, deadline, amount);
    // Send a request to the Celo wallet to send an update transaction to the HelloWorld contract
    requestTxSig(
      kit,
      [
        {
          from: address,
          to: props.celoCrowdfundContract._address, // interact w/ address of CeloCrowdfund contract
          tx: txObject,
          feeCurrency: FeeCurrency.cUSD
        }
      ],
      { requestId, dappName, callback }
    )

    // Get the response from the Celo wallet
    const dappkitResponse = await waitForSignedTxs(requestId)
    const tx = dappkitResponse.rawTxs[0]
    
    setLoading(true); 

    try {
      let result = await toTxResult(kit.web3.eth.sendSignedTransaction(tx)).waitReceipt();

      setLoading(false); 
      // Get the transaction result, once it has been included in the Celo blockchain
      console.log(`Project created transaction receipt: `, result);
      navigation.replace('CreateReceipt');
    }
    catch (e) {
      var exception = e.toString(); 

      Alert.alert("A transaction error occurred. Please try again");
      setLoading(false); 
      
      console.log("Error caught:", exception);
    }
  }

  return (
    <View style={styles.entireThing}>
      {loggedIn ? ( 
        <ScrollView>
          <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}> 
              <View>
                <Text style={styles.headerInitial}> Verify <Text style={styles.header}> Work </Text> </Text>
                  <View > 
                  
                    {/* Image Picker */}
                    <View style={styles.imagePickerView}> 
                      <Icon style={styles.imageIcon} raised name='photo-camera' size={18} onPress={pickImage} />
                      <Text style={styles.imageStateText}> {imageState} </Text>
                      {image && <Image source={{ uri: image, cache: 'only-if-cached' }} style={styles.imagePreview} />}
                    </View> 
                    
                    {/* Name of the contractor */}
                    <Text style={styles.headers}>Company name</Text>
                    <TextInput style={styles.textbox} onChangeText={onChangeName} onSubmitEditing={Keyboard.dismiss} placeholder='Bricks Stationeries Limited' maxLength={50} value={name}/>


                    {/* Title 
                    <Text style={styles.headers}>Title</Text>
                    <TextInput style={styles.textbox} onChangeText={onChangeTitle} onSubmitEditing={Keyboard.dismiss} placeholder='Stationery supply' maxLength={50} value={title}/> */}

                    {/* Description */}
                    <Text style={styles.headers}>Description</Text>
                    <TextInput 
                    multiline={true} 
                    numberOfLines={10} 
                    style={styles.textboxDescription} 
                    onChangeText={onChangeDescription} 
                    placeholder='Supply of 200 notebooks and 100 pens.'
                    underlineColorAndroid="transparent" 
                    maxLength={300} 
                    value={description}/>
                    
                    {/* Amount (cUSD) */}
                    {/* <Text style={styles.headers}>Cost(cUSD)</Text>
                    <TextInput style={styles.textbox} keyboardType='numeric' onChangeText={onChangeAmount} value={amount.toString()} placeholder='Amount'/> */}
          
                    {/* project Deadline */}
                    {/* <View style={styles.imagePickerView}> 
                      <Icon style={styles.imageIcon2} raised name='schedule' size={18} onPress={showDatePicker} />
                      <DateTimePickerModal isVisible={isDatePickerVisible} mode="date" onConfirm={(date) => {handleConfirm(date)}} onCancel={hideDatePicker}/>  
                      <Text style={styles.imageStateText}> Project ends in {deadline.toString()} days from now.</Text>
                    </View> */}
                    {/* <Button title={"Project Timline (deadline)"} 
                    buttonStyle={styles.createFundraiserButton} 
                    titleStyle={styles.fundraiserTextStyle} 
                    type="solid"  
                    onPress={showDatePicker}/> */}



                    {loading && 
                      <>
                        <ActivityIndicator color="#999999" size="large" />
                      </>
                    }

                    <Button title={"Submit"} 
                    buttonStyle={styles.createFundraiserButton} 
                    titleStyle={styles.fundraiserTextStyle} 
                    type="solid"  
                    disabled={loading}
                    onPress={() => write()}/>
                  
                  </View>
              </View>
            </TouchableWithoutFeedback>
          </ScrollView>
      ) : (
        <View style={styles.centerLogin}>
          <Image style={styles.Image} source={require("../assets/create-project.png")}></Image>
          <LogIn reason={"please login to create your project now!"} handleLogIn={context.handleLogIn}/>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  entireThing: {
    width: Dimensions.get('window').width,
    height: '100%',
    backgroundColor: '#ffffff'
  },
  headerInitial: { 
    fontSize: 25,
    color: '#2E3338',
    // fontFamily: 'proximanova_bold',
    marginTop: Platform.OS === 'ios' ? normalize(60): normalize(20),
    marginLeft: normalize(10),
  },
  header:{
    fontSize: 25,
    color: '#3A95FF',
    // fontFamily: 'proximanova_bold',

  },
  headers:{
    fontSize: 20,
    color: '#2E3338',
    // fontFamily: 'proximanova_bold',
    marginLeft: normalize(15),
    marginRight: normalize(10),
    marginBottom: normalize(6)
  },
  imageIcon:{
    backgroundColor: '#ABADAF'
  },
  imageIcon2:{
    backgroundColor: '#3A95FF'
  },
  imagePickerView: {
    flexDirection: "row",
    marginTop: normalize(10), 
    marginLeft: normalize(6),
    marginBottom: normalize(10),
  },
  imageStateText: {
    fontSize: 15,
    marginTop: normalize(18),
    color: '#2E3338',
    fontFamily: 'proxima',
  }, 
  imagePreview: {
    marginLeft: normalize(135), 
    width: normalize(50), 
    height: normalize(50),
    borderRadius: 10
  },
  textbox: {
    height: 40,
    width: Dimensions.get('window').width - 30,
    marginLeft: normalize(15),
    marginBottom: normalize(15),
    paddingLeft: 10,
    paddingRight: 10,
    borderBottomColor: '#2D466F', 
    borderBottomWidth: 1,
  }, 
  textboxDescription: {
    height: 70,
    width: Dimensions.get('window').width - 30,
    marginRight: normalize(15),
    marginLeft: normalize(15),
    marginBottom: normalize(15),
    paddingLeft: 10,
    paddingRight: 10,
    borderBottomColor: '#2D466F', 
    borderBottomWidth: 1, 
  },
  deadlineText: {
    fontFamily: 'proxima',
    color: '#2E3338',
    fontSize: 16,
    marginTop: normalize(10),
    marginRight: normalize(30),
    marginLeft: normalize(30),
  },
  deadlineButton: {
    borderColor: '#DDDDDD'
  }, 
  deadlineTextStyle: {
    fontFamily: 'proxima',
    fontSize: 18, 
    color: '#2E3338'
  },
  centerLogin: {
    marginTop: normalize(193),
    marginBottom: normalize(300),
    justifyContent: 'center',
    alignItems: 'center',
  },
  createFundraiserButton: {
    alignItems: 'center',
    marginLeft: normalize(100),
    marginTop: normalize(70),
    marginBottom: normalize(10),
    height: normalize(50),
    width: 180,
    borderTopLeftRadius: 30,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: "#3A95FF"
  }, 
  fundraiserTextStyle: {
    // fontFamily: 'proximanova_bold',
    fontSize: 18, 
    color: '#FFFFFF'
  },
  Image: {
    width: normalize(250),
    height: normalize(250),
    marginBottom: 20,
    resizeMode: 'contain',
  },
});

export default VerifyWork;