import React, { useContext, useEffect, useState } from 'react'
import '../global'
import { StyleSheet, StatusBar, RefreshControl, ActivityIndicator, ScrollView, View, Text, Dimensions, Platform } from 'react-native';
import BidingCard from './BidingCard';
import AppContext from '../components/AppContext';
import normalize from 'react-native-normalize';
import { Button, SearchBar } from 'react-native-elements';

function Bids(props) {

  useEffect(() => {
    onLoad();
  }, []);

  const refresh = () => {
    let promise = new Promise(async function(resolve, reject) {
      var result = await props.getFeedData(); 

      if (result === "Success") {
        console.log("Resolved!");
        resolve("Promise resolved!");
      }
      else {
        console.log("Promise error"); 
        reject("Promise error");
      }
    })
    return promise; 
  }

  //

  // Current sort: Most recently created first
  const appContext = useContext(AppContext);
  const projectData = appContext.projectData;

  const activeData = projectData.filter(project => project.result.currentState.includes('0'));
  const expiredData = projectData.filter(project => {return project.result.currentState.includes('1') || project.result.currentState.includes('2')});
  
  var [currentActiveSelected, setActiveSelected] = React.useState(true);
  var [currentActiveTitle, setActiveTitle] = React.useState('Ongoing');
  var [currentButtonTitle, setButtonTitle] = React.useState('View Completed Projects');

  const [refreshing, setRefreshing] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    refresh().then(() => setRefreshing(false));
  }, []);

  const onLoad = React.useCallback(() => {
    setLoading(true);
    refresh().then(() => setLoading(false));
  }, []);


  return (
    <View style={styles.bodyContainer}>
      {/* <StatusBar backgroundColor="#3A95FF" barStyle="light-content" /> */}

      <SearchBar
          containerStyle={{ marginTop: 50, marginBottom: 20, backgroundColor: "transparent", borderBottomColor: "transparent", borderTopColor: "transparent", }}
          searchIcond
          clearIcon
          round
          inputContainerStyle={{ backgroundColor: "white", borderRadius: 40 }}
          placeholder=" Search for Bids..."
          // onChangeText={this.updateSearch}
          // value={search}
        />
      <ScrollView
        refreshControl={
          // Only want pull to refresh when home screen not already loading
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            enabled={!loading} /> }> 
          <View>
            {/* <View style={styles.headerInitial}>
              <View>
                <Text style={styles.titleHeader}> {currentActiveTitle} <Text style={styles.header}>Projects</Text> </Text>
              </View>

              <View style={styles.headerFollow}>
                  <Button title={currentButtonTitle} 
                  buttonStyle={styles.createSettingsButton} 
                  titleStyle={styles.settingsTextStyle} 
                  type="outline"  
                  onPress={() => {

                    if(currentActiveSelected === true){
                      setActiveTitle('Expired');
                      setButtonTitle('View Ongoing Projects');
                      setActiveSelected(false);
                    }else{
                      setActiveTitle('Ongoing');
                      setButtonTitle('View Completed Projects');
                      setActiveSelected(true);
                    }
                 
                  }}/>
              </View>

            </View> */}
            
            {loading ? (
              <ActivityIndicator style={styles.container} color="#999999" size="large" />
            ) : (
              <View style={styles.container}>
                {currentActiveSelected === true ? activeData.map((project, index) => {
                  return <BidingCard key={index} projectId={index} projectData={project.result}/>
                }) : (expiredData.map((project, index) => {
                  return <BidingCard key={index} projectId={index} projectData={project.result}/>
                }))
                }
              </View>
            )}
        </View>
      </ScrollView>
    </View>

  );
}

const styles = StyleSheet.create({
  bodyContainer:{
    flex: 1,
    backgroundColor: '#F5F5F8',
    // width: Dimensions.get('window').width,
    // height: '100%'
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5F5F8'
  },
  headerInitial: { 
    fontSize: 25,
    alignItems: 'center',
    color: '#2E3338',
    // fontFamily: 'proximanova_bold',
    height: normalize(90),
    marginTop: Platform.OS === 'ios' ? normalize(60): normalize(20),
    marginLeft: normalize(10),
  },
  titleHeader: { 
    fontSize: 25,
    color: '#2E3338',
    // fontFamily: 'proximanova_bold',
  },
  header: {
    fontSize: 25,
    color: '#3A95FF',
    // fontFamily: 'proximanova_bold'
  }, 
  centerLoading: {
    flex: 1,
    justifyContent: 'center',
  },
  headerFollow:{
    bottom: normalize(40),
  },
  createSettingsButton: {
    marginLeft: normalize(3),
    marginTop: normalize(50),
    height: normalize(35),
    width: Platform.OS === 'ios' ? normalize(220): normalize(240),
    borderWidth: 1,
    borderColor: '#DDDDDD',
    borderRadius: 15
  }, 
  settingsTextStyle: {
    // fontFamily: 'proximanova_bold',
    fontSize: 16, 
    color: '#2E3338'
  },
});

export default Bids; 
