/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react'
import { StatusBar } from 'react-native'
import { SafeAreaProvider } from "react-native-safe-area-context"
import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator, TransitionPresets } from "@react-navigation/stack"
import Welcome from '@/modules/welcome'
import Login from '@/modules/login'
import HomeTab from '@/modules/mainTab'

const Stack = createStackNavigator()

export type RootStackParamList = {
  Welcome: undefined
  Login: undefined
  HomeTab: undefined
  Home: undefined
  Shop: undefined
  Message: undefined
  Mine: undefined
}

function App(): React.JSX.Element {

  return (
    <SafeAreaProvider>
      <StatusBar
        barStyle='dark-content'
        backgroundColor='white'
      />
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName='Welcome'
          screenOptions={{
            cardStyle: { elevation: 1 }
          }}
        >
          <Stack.Screen
            name='Welcome'
            component={Welcome}
            options={{
              headerShown: false
            }}
          />
          <Stack.Screen
            name='Login'
            component={Login}
            options={{
              headerShown: false,
              ...TransitionPresets.SlideFromRightIOS,
            }}
          />
          <Stack.Screen
            name='HomeTab'
            component={HomeTab}
            options={{
              headerShown: false,
              ...TransitionPresets.SlideFromRightIOS,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default App
