import React from 'react'
import Home from './screens/Home';
import { web3, kit } from './root'
import 'react-native-gesture-handler';
import { StatusBar, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FundraiserListing from './screens/FundraiserListing';
import CreateListing from './screens/CreateListing'; 
import Manage from './screens/Manage'; 
import CeloCrowdfundContract from './contracts/CeloCrowdfund.json';
import ProjectInstanceContract from './contracts/ProjectInstance.json';
import { Entypo } from '@expo/vector-icons';
import DonationReceipt from './screens/DonationReceipt';
import DonationForm from './screens/DonationForm'; 
import TenderForm from './screens/TenderForm';
import Bids from './screens/Bids';
import BidListing  from './screens/BidListing';
import TenderUpload from './screens/TenderUpload';
import VerifyWork from './screens/VerifyWork';
import ConfirmationProposal from './screens/ConfirmationProposal';
import Approval from './screens/Approval';
import Payment from './screens/Payment';
import Settings from './screens/Settings';
import CreateReceipt from './screens/CreateReceipt';
import AppOnboarding from './screens/AppOnboarding';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { requestAccountAddress, waitForAccountAuth, } from '@celo/dappkit';
import * as Linking from 'expo-linking';
import AppContext from './components/AppContext'; 
import * as Font from 'expo-font';
import ManageFundraiserListing from './screens/ManageFundraiserListing';

const Tab = createBottomTabNavigator();
const HomeStack = createStackNavigator();

function HomeStackScreen(props) {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Home" 
        children={()=>
          <Home 
            getFeedData={props.getFeedData}
            />
          }
        options={{ headerShown: false }}
      />
      <HomeStack.Screen name="FundraiserListing"  
        component={FundraiserListing}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen name="DonationReceipt"  
        component={DonationReceipt}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen name="DonationForm"  
        component={DonationForm}
        options={{ headerShown: false }}
      />
      
      <HomeStack.Screen name="TenderForm"  
        component={TenderForm}
        options={{ headerShown: false }}
      />

      <HomeStack.Screen name="VerifyWork"  
        component={VerifyWork}
        options={{ headerShown: false }}
      />  
    </HomeStack.Navigator>
  );
}

function BidStackScreen(props){
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Bids" 
        children={()=>
          <Bids 
            getFeedData={props.getFeedData}
            />
          }
        options={{ headerShown: false }}
      />
      <HomeStack.Screen name="BidListing"  
        component={BidListing}
        options={{ headerShown: false }}
      />
     <HomeStack.Screen name="TenderUpload"
           component={TenderUpload}
           options={{ headerShown: false }}
        />
    <HomeStack.Screen name="ConfirmationProposal"  
        component={ConfirmationProposal}
        options={{ headerShown: false }}
      />
    <HomeStack.Screen name="Approval"  
        component={Approval}
        options={{ headerShown: false }}
      /> 
    <HomeStack.Screen name="Payment"  
        component={Payment}
        options={{ headerShown: false }}
      />
    </HomeStack.Navigator>
  )

}

function CreateStackScreen(props) {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Create"
        children={()=>
          <CreateListing 
            celoCrowdfundContract={props.celoCrowdfundContract}
            />
          }
        options={{ headerShown: false }}
      />
      <HomeStack.Screen name="CreateReceipt"  
        component={CreateReceipt}
        options={{ headerShown: false }}
      />
    </HomeStack.Navigator>
  );
}

function ManageStackScreen(props) {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Manage"
        children={()=>
          <Manage
            getFeedData={props.getFeedData} />
          }
        options={{ headerShown: false }}
      />
      <HomeStack.Screen name="Settings"  
        children={()=>
          <Settings 
            handleLogOut={props.handleLogOut}
          />
        }
        options={{ headerShown: false }}
      />
      <HomeStack.Screen name="ManageFundraiserListing"  
        component={ManageFundraiserListing}
        options={{ headerShown: false }}
      />
    </HomeStack.Navigator>
  );
}

class App extends React.Component {
  constructor() {
    super(); 
    this.logOut = this.logOut.bind(this);
    this.logIn = this.logIn.bind(this);
    this.getFeedData = this.getFeedData.bind(this); 
  }

  state = {
    projectData: [],
    celoCrowdfundContract: '', 
    projectInstanceContract: '', 
    address: '', 
    balance: 'Not logged in', 
    loggedIn: false, 
    onboardingFinished: false, 
    loading: false, 
  }

  logOut() {
    this.setState({loggedIn: false});
    console.log("logging out");

    const removeLogInData = async () => {
      try {
        await AsyncStorage.removeItem('@userAddress');
        await AsyncStorage.removeItem('@userBalance');
        
        // can remove this if we want user to not see onboarding after logging out
        await AsyncStorage.removeItem('@onboardingFinished');

        console.log("Removed user's login data from local storage");
      } catch (e) {
        // saving error
        console.log("Error removing user's login data from local storage in App.js: ", e);
      }
    }
    removeLogInData(); 
  }

  async logIn() {
    // A string you can pass to DAppKit, that you can use to listen to the response for that request
    const requestId = 'login';
    
    // A string that will be displayed to the user, indicating the DApp requesting access/signature
    const dappName = 'Citizen Dapp';
    
    // The deeplink that the Celo Wallet will use to redirect the user back to the DApp with the appropriate payload.
    const callback = Linking.makeUrl('/my/path');
    
    // Ask the Celo Alfajores Wallet for user info
    requestAccountAddress({
      requestId,
      dappName,
      callback,
    });
  
    try {
      // Wait for the Celo Wallet response
      const dappkitResponse = await waitForAccountAuth(requestId);
      console.log(dappkitResponse);
  
      // Set the default account to the account returned from the wallet
      kit.defaultAccount = dappkitResponse.address;
  
      // Get the stable token contract
      const stableToken = await kit.contracts.getStableToken();
  
      // Get the user account balance (cUSD)
      const cUSDBalanceBig = await stableToken.balanceOf(kit.defaultAccount);
      
      const balance = cUSDBalanceBig / 1E18
  
      // Convert from a big number to a string
      let cUSDBalance = balance.toString();
      
      this.storeData(dappkitResponse.address, cUSDBalance);
    }
    catch (e) {
      var exception = e.toString(); 

      Alert.alert("A login error occurred. Please try again");
      
      console.log("Error caught:", exception);
    }

  }
  
  async storeData(address, balance) {
    try {
      await AsyncStorage.setItem('@userAddress', address)
      await AsyncStorage.setItem('@userBalance', balance)
      
      console.log("Balance: ", balance);

      this.setState({loggedIn: true})
      console.log("Saved login data to local storage");
    } catch (e) {
      // saving error
      Alert.alert("A login error occurred. Please try again")
      console.log("Error saving login data to local storage in LogIn.js: ", e);
    }
  }

  async loadFromStorage() {
    try {
      const onboarding = await AsyncStorage.getItem('@onboardingFinished');
      const value = await AsyncStorage.getItem('@userAddress')
      const userBalance = await AsyncStorage.getItem('@userBalance');

      if(value !== null) {
        this.setState({ address: value, balance: userBalance, loggedIn: true, onboardingFinished: onboarding})
        console.log("user logged in");
        console.log("Onboarding finished: ", onboarding);
        console.log("BALANCE in App.js: ", this.state.balance);
      }
      else {
        console.log('User not logged in');
      }
    } catch(e) {
      // error reading value
      console.log("Error: ", e);
      return "Error";
    }
  }    

  async getFeedData() {
    // Check the Celo network ID
    const networkId = await web3.eth.net.getId();
    console.log("NETWORK ID: ", networkId);

    // Get the deployed celo crowdfund contract info for the appropriate network ID
    const deployedNetwork = CeloCrowdfundContract.networks[networkId];
    console.log("Deployed network: ", deployedNetwork);

    // Create a new contract instance with the Project contract info
    const celoCrowdfundContract = new web3.eth.Contract(
      CeloCrowdfundContract.abi,
      deployedNetwork && deployedNetwork.address
    );

    var projectData = []; 
 
    // Return results inside each individual project
    var result = await celoCrowdfundContract.methods.returnProjects().call();
  
    /* Note: For some reason using forEach is asynchronous, but for...of  
       maintains the synchronous results of using await. 
    */
    for (const projectAddress of result) {  
      const projectInstanceContract = new web3.eth.Contract(
        ProjectInstanceContract.abi,
        deployedNetwork && projectAddress
      );
  
      await projectInstanceContract.methods.getDetails().call().then((result) => {
        projectData.push({result: result, projectInstanceContract: projectInstanceContract});
      });
    }

    // Current sort: Most recently created first
    this.setState({ projectData : projectData.reverse() })
    this.setState({ celoCrowdfundContract: celoCrowdfundContract })

    const stableToken = await kit.contracts.getStableToken();

    if (this.state.loggedIn) {
      const cUSDBalanceBig = await stableToken.balanceOf(this.state.address);
      const balance = cUSDBalanceBig / 1E18
      this.setState({ balance: balance })
    }

    return "Success";
  }

  componentDidMount = async () => {
    try {
      await Font.loadAsync({
        'proxima': require('./assets/fonts/proxima.ttf'),
        'proximanova_bold': require('./assets/fonts/proximanova_bold.ttf'),
      });
    } catch (error){
      console.log(error);
    }
    
    this.loadFromStorage();
  }

  completeOnboarding = async () => {
    try {
      await AsyncStorage.setItem("@onboardingFinished", 'true');
    }
    catch (e) {
      console.log("exception: ", e);
    }

    // finished onboarding
    this.setState({onboardingFinished: true});
  }

  render() {
    return (
      <>

      {
        (!this.state.onboardingFinished) ? (
            <AppOnboarding done={this.completeOnboarding} />
        ) : (
          <AppContext.Provider value={{ 
            projectData: this.state.projectData, 
            loggedIn: this.state.loggedIn,
            address: this.state.address,
            balance: this.state.balance, 
            onboardingFinished: this.state.onboardingFinished,
            handleLogIn: this.logIn, }}>
            
            <NavigationContainer>
              <StatusBar backgroundColor="#3A95FF" barStyle="light-content"/>
              <Tab.Navigator
                screenOptions={({ route }) => ({
                  tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                    
                    if (route.name === 'Home') {
                      iconName = focused
                        ? 'home'
                        : 'home';
                    } else if (route.name === 'Create') {
                      iconName = focused 
                        ? 'circle-with-plus'
                        : 'circle-with-plus';
                    } else if (route.name === 'Bids') {
                      iconName = focused 
                        ? 'price-tag'
                        : 'price-tag';
                    }
                    else if (route.name === 'Manage') {
                      iconName = focused 
                        ? 'magnifying-glass'
                        : 'magnifying-glass';
                    }
        
                    // You can return any component that you like here!
                    return <Entypo name={iconName} size={size} color={color} />;
                  },
                })}
                tabBarOptions={{
                  activeTintColor: '#3A95FF',
                  inactiveTintColor: '#FFB500',
                  keyboardHidesTabBar: true
                }}
              > 
                <>
                  <Tab.Screen name="Home"
                    children={()=><HomeStackScreen
                    getFeedData={this.getFeedData}/>
                    }
                  />
                  <Tab.Screen name="Create" 
                    children={()=><CreateStackScreen 
                      celoCrowdfundContract={this.state.celoCrowdfundContract}
                      handleLogIn={this.logIn}
                      />
                    }
                  />
                  <Tab.Screen name="Bids" 
                    children={()=><BidStackScreen 
                      getFeedData={this.getFeedData}/>
                    }
                  />
                  <Tab.Screen name="Manage"
                    children={()=><ManageStackScreen  
                      handleLogOut={this.logOut}
                      handleLogIn={this.logIn}
                      getFeedData={this.getFeedData}
                      />
                    }
                  />
                </>
             
              </Tab.Navigator>
            </NavigationContainer>
          </AppContext.Provider>
        )
      }
      </>
    );
  }
}

export default App;