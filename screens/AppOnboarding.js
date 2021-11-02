import { Image, StyleSheet, StatusBar, Text, View, Dimensions, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import React from 'react'; 
import Onboarding from 'react-native-onboarding-swiper';
import { Button } from 'react-native-elements';
class AppOnboarding extends React.Component {

  render(){

    const Next = ({ ...props }) => (
      // <TouchableOpacity  
      // style={styles.createFundraiserButton}
      // {...props}>
      //   <Text style={{color: 'white', fontWeight: "bold", fontSize: 20, alignSelf: 'center'}}>Next Step</Text>
      // </TouchableOpacity>
      <Button
        title={'Next Step'}
        buttonStyle={styles.NextButtonComponent}
        containerViewStyle={{
          marginVertical: 10,
          width: 70,
          backgroundColor: 'blue',
        }}
        textStyle={{ color: 'blue' }}
        {...props}
      />
    );

    return (
      <View style={{ flex: 1}}>
      <StatusBar backgroundColor="#F8F6F0" barStyle="light-content" />
      <Onboarding
      skipLabel=''
      NextButtonComponent={Next}
      showPagination={true}
      showDone={false}
      titleStyles={styles.fundraiserHeaderStyle}
      pages={[
        {
          backgroundColor: '#F8F6F0',
          image: <Image style={{height:300, width: 300}} source={require('../assets/onBoarding/post.png')}/>,
          title: <Text style={{ fontSize: 20, textAlign: 'center'}}> 
                 <Text style={{color: '#FFB500', fontWeight: "bold"}}>Post</Text> Government/organizational tenders and projects.</Text>,
          subtitle: '',
        },
        {
          backgroundColor: '#F8F6F0',
          image: <Image style={{height:300, width: 300}} source={require('../assets/onBoarding/apply_bid.png')} />,
          title: <Text style={{ fontSize: 20, textAlign: 'center'}}> 
                   Securely <Text style={{color: '#FFB500', fontWeight: "bold"}}> Apply/Bid </Text> 
                   for tenders from the government or other procurement entities.</Text>,
          subtitle: ''
        },
        {
          backgroundColor: '#F8F6F0',
          image: <Image style={{height:300, width: 300}} source={require('../assets/onBoarding/vote.png')} />,
          title: <Text style={{ fontSize: 20, textAlign: 'center'}}> As a citizen, <Text style={{ fontWeight: "bold", color: '#FFB500'}}> Vote </Text> 
          for the most qualified and uncorrupt organization for tenders.</Text>,
          subtitle: ''
        },
        {
          backgroundColor: '#F8F6F0',
          image: <Image style={{height:300, width: 300}} source={require('../assets/onBoarding/citizen.png')}/>,
          title: <Text style={{ fontSize: 20, textAlign: 'center'}}>
                  With <Text style={{fontWeight: "bold"}}></Text>Citizen, the power to <Text style={{color: '#FFB500', fontWeight: "bold"}}> Make change </Text>  is a botton a way.</Text>,
          subtitle:
          <TouchableOpacity onPress={() => {
            this.props.done();
          }} style={styles.createFundraiserButton}>
            <Text style={{color: 'white', fontWeight: "bold", fontSize: 20}}>Let's Get Started</Text>
          </TouchableOpacity>
            // <Button
            //   title={'Let Get Started'}
            //   buttonStyle={styles.createFundraiserButton} 
            //   titleStyle={styles.fundraiserTextStyle} 
            //   onPress={() => {
            //     this.props.done();
            //   }}/>
        } 
      ]}
      ></Onboarding>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  NextButtonComponent: {
    width: 130,
    height: 46,
    borderTopLeftRadius: 30,
    borderBottomLeftRadius: 30,
    backgroundColor: "#3A95FF"
  },
  createFundraiserButton: {
    position: 'absolute',
    right: 0,
    bottom: 70,
    width: 180,
    height: 46,
    paddingLeft: 20,
    justifyContent: 'center',
    borderTopLeftRadius: 30,
    borderBottomLeftRadius: 30,
    backgroundColor: "#3A95FF"
  }, 
  fundraiserHeaderStyle: {
    fontFamily: 'proximanova_bold',
    fontSize: 20, 
    color: '#2E3338'
  },
  fundraiserTextStyle: {
    fontFamily: 'proximanova_bold',
    fontSize: 18, 
    color: '#FFFFFF'
  }
})

export default AppOnboarding; 
