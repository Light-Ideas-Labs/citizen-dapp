import React from 'react'
import { View, Text, ScrollView, StyleSheet, Dimensions, TouchableWithoutFeedback} from 'react-native';
import ProgressBar from 'react-native-progress/Bar';
import CachedImage from 'react-native-expo-cached-image';
import { Button } from 'react-native-elements';
import normalize from 'react-native-normalize';
import { TouchableOpacity } from 'react-native-gesture-handler';

function FundraiserListing(props) {
  var navigation = props.route.params.nav;
  
  var projectId = props.route.params.projectId;
  var loggedIn = props.route.params.loggedIn; 
  var address = props.route.params.address; 
  
  var data = props.route.params.projectData;

  var currentState = '';
  
  if (data['currentState'] === '0') {
    currentState = "Fundraising"; 
  }
  else if (data['currentState'] === '1') {
    currentState = "Expired"; 
  }
  else {
    currentState = "Successful"; 
  }

  var title = data['projectTitle'];
  var creatorName = data['projectCreatorName'];
  var image = data['projectImageLink'];
  var totalRaised = data['projectTotalRaised'] / 1E18;
  var goal = data['projectGoalAmount'];
  var description = data['projectDescription'];
  var currentAmount = data['currentAmount'] / 1E18; // Gotta convert from bigNumber to regular integer
  var fundRaisingDeadline = data['fundRaisingDeadline'];
  
  var progress = totalRaised / goal;
  let imageURL = {uri: image};
  
  return (
    <ScrollView style={styles.scrollViewContainer}>
      <CachedImage source={imageURL} style={styles.image} />

      <View style={[styles.footer]}>
      <View style={styles.viewStyle}>
        <Text style={styles.title}>{title}</Text>

        <Text style={styles.creatorInitialText}>Created by <Text style={styles.creatorText}>{creatorName}</Text> </Text>

        {/* <Text style={styles.creatorInitialText}> Status: <Text style={styles.creatorText}>{currentState} </Text> </Text> */}
        
        <Text style={styles.descriptionTitle}>Description</Text>
        <Text style={styles.description}>{description}</Text>
        
        <Text style={styles.amountRaisedText}>ksh. {goal}</Text>
        {/* <Text style={styles.amountRaisedText}>${totalRaised.toString()} raised of ${goal} goal.</Text> */}
        {/* <ProgressBar progress={progress} color='#3A95FF' width={350} height={8} style={styles.progress}/>         */}
        
        {currentState === "Fundraising" ? ( 
          <View style={styles.button}>
            <Button title={"Verify Now"} 
            buttonStyle={styles.createFundraiserButton} 
            titleStyle={styles.fundraiserTextStyle} 
            type="solid"  
            onPress={() => navigation.navigate('VerifyWork', {projectId: projectId, loggedIn: loggedIn, address: address, creatorName: creatorName, title: title, nav: navigation})}/>
          {/* <Button title={"Apply Now"} 
            buttonStyle={styles.createFundraiserButton} 
            titleStyle={styles.fundraiserTextStyle} 
            type="solid"  
            onPress={() => navigation.navigate('TenderForm', {projectId: projectId, loggedIn: loggedIn, address: address, creatorName: creatorName, title: title, nav: navigation})}/>  */}
            </View>       
        ) : (
          <Text style={styles.fundraisingEnded}>This project has ended</Text>
        )}

      </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollViewContainer:{
    backgroundColor: '#FFFFFF',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
  },
  button: {
    alignItems: "center",
    marginTop: 50,
  },
  footer: {
    flex: 3,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30
  },
  viewStyle: {
    marginLeft: normalize(10),
    marginTop: normalize(5),
  },
  image:{
    height: normalize(250), 
    width: '100%',
    borderColor: '#DDDDDD',
    resizeMode : 'cover', 
    // borderBottomLeftRadius: 10,
    // borderBottomRightRadius: 10,
    marginBottom: normalize(5)
  },
  divider:{
    borderBottomColor: '#ABADAF',
    borderBottomWidth: 1,
  },
  creatorInitialText: {
    fontFamily: 'proxima',
    fontSize: 16, 
    color: '#2E3338',
    marginTop: normalize(5)
  }, 
  creatorText: {
    fontFamily: 'proximanova_bold',
    fontSize: 16,
    color: '#2E3338',
  },
  title: {
    fontFamily: 'proximanova_bold',
    fontSize: 30, 
    color: '#2E3338', 
    marginTop: 5
  },
  descriptionTitle:{
    fontFamily: 'proximanova_bold',
    fontSize: 19,
    color: '#2E3338',
    marginTop: normalize(30)
  },
  amountRaisedText:{
    fontFamily: 'proximanova_bold',
    fontSize: 18,
    color: '#2E3338',
    marginBottom: normalize(5)
  },
  description: {
    fontFamily: 'proxima',
    fontSize: 19,
    color: '#2E3338',
    marginTop: normalize(5),
    marginRight: normalize(10),
    marginBottom: normalize(30)
  },
  createVerifyButton: {
    marginTop: normalize(40),
    marginBottom: normalize(5),
    marginRight: normalize(40),
    height: normalize(40),
    borderRadius: 30,
    alignItems: 'center',
    width: 200,
    backgroundColor: "#FFB500"
  },
  createFundraiserButton: {
    marginTop: normalize(10),
    marginBottom: normalize(40),
    marginRight: normalize(40),
    height: normalize(40),
    borderRadius: 30,
    alignItems: 'center',
    width: 200,
    backgroundColor: "#3A95FF"
  }, 
  fundraiserTextStyle: {
    fontFamily: 'proximanova_bold',
    fontSize: 18, 
    color: '#FFFFFF'
  }, 
  fundraiserTextStyle: {
    fontFamily: 'proximanova_bold',
    fontSize: 18, 
    color: '#FFFFFF'
  }, 
  status: {
    marginTop: normalize(10)
  },
  buttonOpacity:{}, 
  fundraisingEnded: {
    marginTop: normalize(30),
    fontFamily: 'proxima',
    fontSize: 18, 
  }
});

export default FundraiserListing;