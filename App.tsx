import React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CurrentWeatherScreen from './screens/CurrentWeatherScreen';
import { createDrawerNavigator } from '@react-navigation/drawer';
import SearchScreen from './screens/SearchScreen';
import DailyForcast from './screens/DailyForcast';
import TodayForcastScreen from './screens/TodayForcastScreen';
import SplashScreen from './screens/SplashScreen';


export type RootStack = {
  Home: {
    long: String,
    lat: String,
    city: String,
  } | undefined,
  Search: undefined,
  Daily: any,
  Today: any,
  Splash: undefined,
};

const Stack = createNativeStackNavigator<RootStack>();
const App = () => (
  <NavigationContainer>
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName='Splash'>
      <Stack.Screen name='Home' component={CurrentWeatherScreen} />
      <Stack.Screen name='Search' component={SearchScreen} />
      <Stack.Screen name='Daily' component={DailyForcast} />
      <Stack.Screen name='Today' component={TodayForcastScreen} />
      <Stack.Screen name='Splash' component={SplashScreen} />
    </Stack.Navigator>
  </NavigationContainer>
);







export default App;
