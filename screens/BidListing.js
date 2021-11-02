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

  const milliseconds = fundRaisingDeadline * 1000; 
  const dateObject = new Date(milliseconds)

  var dateOutput = new Date(dateObject).toLocaleDateString();
  
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

        <Text style={{ fontSize: 18, opacity: 0.7 }}> <Text style={styles.dateText}>No any Bids</Text> </Text>
        <Text style={{ fontSize: 18, opacity: 0.7 }}> <Text style={styles.dateText}>Not yet Bidden</Text> </Text>

        <Text style={styles.dateText}>Will end on <Text style={{ color: '#000000' }}>{dateOutput} </Text></Text>
        
        {/* <Text style={styles.amountRaisedText}>ksh. {goal}</Text> */}
        <Text style={styles.amountRaisedText}> Proposed Price ${totalRaised.toString()} Initial Price  ${goal} of project.</Text>
        {/* <ProgressBar progress={progress} color='#3A95FF' width={350} height={8} style={styles.progress}/>         */}
        
        {currentState === "Fundraising" ? ( 
          <View style={styles.button}>
          <Button title={"Bid for this project Now"} 
            buttonStyle={styles.createFundraiserButton} 
            titleStyle={styles.fundraiserTextStyle} 
            type="solid"  
            onPress={() => navigation.navigate('TenderForm', {projectId: projectId, loggedIn: loggedIn, address: address, creatorName: creatorName, title: title, nav: navigation})}/> 
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
  dateText: {
    fontFamily: 'proximanova_bold',
    fontSize: 18,
    color: '#f15a24',
    marginTop: 5,
    marginBottom:5,
    marginLeft: 5,
    // position: 'absolute', 
    // bottom: normalize(20), 
    right: normalize(4)
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
    marginTop: normalize(5),
    marginBottom: normalize(5)
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
    marginBottom: normalize(10)
  },
  createFundraiserButton: {
    marginTop: normalize(40),
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