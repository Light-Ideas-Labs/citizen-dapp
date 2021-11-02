import React from 'react';
import { View, Text, StyleSheet, Dimensions, Pressablem} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ProgressBar from 'react-native-progress/Bar';
import { TouchableOpacity } from 'react-native-gesture-handler';
import normalize from 'react-native-normalize';

function SingleListingCard(props) {
  const navigation = useNavigation();
  
  var data = props.projectData; 

  var currentState = '';
  
  if (data.currentState === '0') {
    currentState = "Fundraising"; 
  }
  else if (data.currentState === '1') {
    currentState = "Expired"; 
  }
  else {
    currentState = "Successful"; 
  }

  //Data 
  var currentAmount = data.currentAmount / 1E18; // Gotta convert from bigNumber to regular integer; 
  var fundraisingDeadline = data.fundRaisingDeadline; 
  var projectCreator = data.projectCreator.toString().substring(0, 16);
  var creatorName = data.projectCreatorName; 
  var projectDescription = data.projectDescription.length > 115 ? data.projectDescription.substring(0, 115) : data.projectDescription;
  var projectGoalAmount = data.projectGoalAmount;
  var projectImageLink = data.projectImageLink;
  var totalRaised = data.projectTotalRaised / 1E18; 
  var projectTitle = data.projectTitle; 
  var currentProgress = totalRaised / projectGoalAmount; 

  const milliseconds = fundraisingDeadline * 1000; 
  const dateObject = new Date(milliseconds)

  var dateOutput = new Date(dateObject).toLocaleDateString();
  
  return (
   <View>
    <TouchableOpacity 
      onPress={() => navigation.navigate('ManageFundraiserListing', {projectId: props.projectId, loggedIn: props.loggedIn, address: props.address, projectData: data, projectAddy:projectCreator, nav: navigation})}
      activeOpacity={0.8}
      // Tweak so cards don't get opaque on scroll
      delayPressIn={50}>   

      <View style={styles.cardView}>
      <View style={styles.itemLeft}>
        <View style={{ justifyContent: "flex-start" }}>
          <Text style={{ fontSize: 22, fontWeight: "700" }}>{projectTitle} </Text>
          <Text style={{ fontSize: 18, opacity: 0.7 }}>ksh {projectGoalAmount}</Text>

          <Text style={{ fontSize: 14, opacity: 0.8, color: "#0099cc" }}>Project ends on {dateOutput}. All Level</Text>

        </View>
        {currentState === "Fundraising" ? (
            <Text style={styles.dateText}>Project ends on {dateOutput} </Text>
          ) : (
            <>
              <Text style={styles.currentRaisedTextDone}>You have terminate your project!</Text>
              <Text style={styles.dateText}>Project ended</Text>
            </>
          )}


        <ProgressBar progress={currentProgress} color='#3A95FF' width={normalize(330)} height={normalize(8)} style={styles.progress}/>
      </View> 
        <View style={styles.textView}>
          <Text style={styles.titleText}>{projectTitle} </Text>
          <Text style={styles.currentRaisedText}>ksh. {projectGoalAmount}</Text>

          {/* <Text style={styles.currentRaisedText}>${totalRaised} used funds of ${projectGoalAmount} goal. </Text> */}
          
          <Text style={styles.currentRaisedText}>Status: {currentState} </Text>
          
          
          

        </View>
      </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({ 
  cardViewDone: {
    width : Dimensions.get('window').width - 25,
    height : normalize(80),
    marginBottom : normalize(15),
    borderRadius : 15,
    backgroundColor : '#FFFFFF',
    borderColor: '#EDEEEF',
    borderWidth: 1,
    overflow : 'hidden',
  }, 
  cardView: {
    width : Dimensions.get('window').width - 25,
    height : normalize(105),
    marginBottom : normalize(15),
    backgroundColor : '#FFFFFF',
    borderColor: '#EDEEEF',
    borderWidth: 1,
    overflow : 'hidden',
    padding: 10,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowOpacity: 0.3,
    shadowRadius: 20,
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap'
}, 
  textView : {
    flex : 1,
    alignItems : 'flex-start',
    justifyContent : 'flex-start',
    marginTop: normalize(6),
    marginLeft: normalize(7),
    marginRight: normalize(5)  
}, 
  titleText: {
    fontFamily: 'proximanova_bold',
    fontSize: 23, 
    color: '#2E3338',    
  },
  creatorInitialText: {
    fontFamily: 'proxima',
    fontSize: 15, 
    color: '#2E3338',
    marginTop: normalize(5), 
  }, 
  creatorText: {
    fontFamily: 'proxima',
    fontSize: 14,
    color: '#767676',
  },
  projectDescriptionText: {
    fontFamily: 'proxima',
    fontSize: 16,
    color: '#2E3338',
    marginTop: normalize(15), 
    marginRight: normalize(6)
  },
  currentRaisedText: {
    fontFamily: 'proxima',
    fontSize: 15,
    color: '#2E3338',
    marginTop: normalize(10),
    marginBottom: normalize(10)
  },
  currentRaisedTextDone: {
    fontFamily: 'proxima',
    fontSize: 15,
    color: '#2E3338',
    marginTop: normalize(10),
  },
  progress: {
    marginTop: normalize(7),
  },
  dateText: {
    fontFamily: 'proxima',
    fontSize: 15,
    color: '#2E3338',
    // position: 'absolute', 
    bottom: normalize(2), 
    right: normalize(4)
  },
});

export default SingleListingCard;