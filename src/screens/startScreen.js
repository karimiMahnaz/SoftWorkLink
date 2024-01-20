import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Alert,
  ImageBackground,
  ToastAndroid,
  StyleSheet,
  SafeAreaView,
  Dimensions
} from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Svg, {Path} from 'react-native-svg';

import {styles} from '../styles/startScreen';
import CustomButton from '../components/customButton';
import {MyStatusBar} from '../components';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const StartScreen = ({navigation}) => {
  const [email, setEmail] = useState('');

  const GfGToast = toasText => {
    if (Platform.OS === 'android') {
      ToastAndroid.showWithGravity(
        toasText,
        ToastAndroid.LONG,
        ToastAndroid.CENTER,
      );
    } else {
      Alert.alert(toasText);
    }
  };

  useEffect(() => {
    const checkForNet = async () => {
      const state = await NetInfo.fetch();
      if (!state.isConnected) {
        GfGToast('please connect to the internet');
      } else {
        navigation.setOptions({
          tabBarStyle: {display: 'none'},
        });
      }
    };
    checkForNet();
  }, []);

  useEffect(() => {
    const readStorage = async () => {
      const x = await AsyncStorage.getItem('email');
      setEmail(JSON.parse(x));
      return email;
    };
    readStorage();
  }, [setEmail]);

  const handleLogout = async () => {
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('userId');
    await AsyncStorage.removeItem('email');
    setEmail(null);
    ///   navigation.dispatch(StackActions.replace("Welcome"));
    GfGToast('Logout');
  };

  return (
     <ImageBackground
         source={require("../assets/images/enter.jpeg")}
         style={styles.background}
         blurRadius={1}
     >
    <SafeAreaView style={styles.background}> 

     <MyStatusBar backgroundColor="rgb(181,181,201)" barStyle="light-content" />
     
      {/* <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <Path
          fill="rgba(9,19,128,1)"
          fill-opacity="1"
          d="M0,96L120,128C240,160,480,224,720,256C960,288,1200,288,1320,288L1440,288L1440,0L1320,0C1200,0,960,0,720,0C480,0,240,0,120,0L0,0Z"></Path>
      </Svg> */}

      <View style={styles.logoContainer}>
        <View style={styles.circle} />
        <View style={styles.circle4} />
        <View style={styles.circle2} />
        <View style={styles.circle3} />
        {/* <Image
                    source={require("../assets/images/logo.jpg")}
                    style={styles.logo}
                /> */}

        <Text style={[styles.title, style.margintop1]}>SofTesting</Text>
        <Text style={[styles.firstText]}>
          Software Design, Development & Testing
        </Text>
        <Text style={[styles.email]}>hello@SofTestingCa.com</Text>

        {email ? <Text style={[styles.useremail]}> Welcome {email} </Text> : null}
      </View>
      <View style={styles.buttonContainer}>
       
        <CustomButton
          title="Start"
          color="rgba(9,19,128,1)"
          onPress={() => {
            navigation.navigate('Home');
          }}
        />

      </View>
    
    </SafeAreaView>
 </ImageBackground>
  );
};

export default StartScreen;

const style = StyleSheet.create({
    margintop1: {
      marginTop: screenHeight- (.95*screenHeight),    
    },
    
  });