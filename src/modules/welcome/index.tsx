import React, { useEffect } from 'react'
import { View, Text, Button, Image, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParamList } from 'App';
import { load } from '@/utils/Storage';

import icon_main_logo from "@/assets/icon_main_logo.png";

type PageANavigationProp = StackNavigationProp<RootStackParamList, 'Welcome'>


type Props = {}

const Welcome = (props: Props) => {

  const navigation = useNavigation<PageANavigationProp>()

  useEffect(() => {
    setTimeout(() => {
      getUserInfo()
    }, 3000)
  }, [])

  const getUserInfo = async () => {
    const cacheUserInfo = await load('userInfo')
    if (cacheUserInfo && JSON.parse(cacheUserInfo)) {
      navigation.replace('HomeTab')
    } else {
      navigation.replace('Login')
    }
  }

  return (
    <View style={styles.root}>
      <Image style={styles.img} source={icon_main_logo} />
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  img: {
    width: 200,
    height: 100,
    marginTop: 100,
    resizeMode: 'contain'
  }
})

export default Welcome