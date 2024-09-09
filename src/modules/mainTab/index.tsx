import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { BottomTabBarProps, createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { ImagePickerResponse, launchImageLibrary } from 'react-native-image-picker'
import Home from '../home'
import Shop from '../shop'
import Message from '../message'
import Mine from '../mine'

import icon_tab_publish from '@/assets/icon_tab_publish.png'

type Props = {}

const BottomTab = createBottomTabNavigator()

const HomeTab = (props: Props) => {

  const RedBookTabBar = ({ state, descriptors, navigation }: BottomTabBarProps) => {
    const { routes, index } = state

    const styles = StyleSheet.create({
      tabBarContainer: {
        width: '100%',
        height: 56,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white'
      },
      tabItem: {
        height: '100%',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
      },
      tabItemText: {
        fontSize: 16,
        color: '#999'
      },
      tabItemTextSelect: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333'
      },
      tabItemPublish: {
        width: 58,
        height: 42,
        resizeMode: 'contain'
      }
    })

    return (
      <View style={styles.tabBarContainer}>
        {routes.map((route, i) => {
          const { key, name } = route
          const { options } = descriptors[key]
          const { title } = options
          const isFocused = index === i
          const PUBLISH_INDEX = 2
          if (i === PUBLISH_INDEX) {
            return (
              <TouchableOpacity
                key={title}
                style={styles.tabItem}
                onPress={() => {
                  launchImageLibrary(
                    {
                      mediaType: 'photo',
                      quality: 1,
                      includeBase64: true
                    },
                    (res: ImagePickerResponse) => {
                      const { assets } = res
                      if (!assets?.length) {
                        console.log('选择图片失败');
                        return
                      }
                      const { uri, width, height, fileName, fileSize, type } = assets[0]
                    }
                  )
                }}
              >
                <Image style={styles.tabItemPublish} source={icon_tab_publish} />
              </TouchableOpacity>
            )
          }
          return (
            <TouchableOpacity
              key={title}
              style={styles.tabItem}
              onPress={() => {
                navigation.navigate(name)
              }}
            >
              <Text style={isFocused ? styles.tabItemTextSelect : styles.tabItemText}>{title}</Text>
            </TouchableOpacity>
          )
        })}
      </View>
    )
  }

  return (
    <View style={styles.root}>
      <BottomTab.Navigator
        initialRouteName='Home'
        // screenOptions={({ route }) => {
        //   return {
        //     tabBarIcon: ({ focused, color, size }) => {
        //       let img
        //       if (route.name === 'Home') {
        //         img = focused ? icon_tab_home_selected : icon_tab_home_normal
        //       } else if (route.name === 'Shop') {
        //         img = focused ? icon_tab_shop_selected : icon_tab_shop_normal
        //       } else if (route.name === 'Message') {
        //         img = focused ? icon_tab_message_selected : icon_tab_message_normal
        //       } else if (route.name === 'Mine') {
        //         img = focused ? icon_tab_mine_selected : icon_tab_mine_normal
        //       }
        //       return <Image
        //         style={{
        //           width: size,
        //           height: size,
        //           tintColor: color
        //         }}
        //         source={img}
        //       />
        //     },
        //   }
        // }}
        tabBar={props => <RedBookTabBar {...props} />}
      >
        <BottomTab.Screen
          name='Home'
          component={Home}
          options={{
            title: '首页',
            headerShown: false
          }}
        />
        <BottomTab.Screen
          name='Shop'
          component={Shop}
          options={{
            title: '购物',
            headerShown: false
          }}
        />
        <BottomTab.Screen
          name='Publish'
          component={Shop}
          options={{
            title: '发布',
            headerShown: false
          }}
        />
        <BottomTab.Screen
          name='Message'
          component={Message}
          options={{
            title: '消息',
            headerShown: false
          }}
        />
        <BottomTab.Screen
          name='Mine'
          component={Mine}
          options={{
            title: '我',
            headerShown: false
          }}
        />
      </BottomTab.Navigator>
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: '100%',
  }
})

export default HomeTab