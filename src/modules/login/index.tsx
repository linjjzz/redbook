import React, { useState } from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity, Linking, TextInput, LayoutAnimation, ToastAndroid } from 'react-native'
import { StackNavigationProp } from '@react-navigation/stack'
import { useNavigation } from '@react-navigation/native'
import { RootStackParamList } from 'App'
import { UserStore } from '@/stores/UserStore'

import icon_main_logo from "@/assets/icon_main_logo.png"
import icon_unselected from "@/assets/icon_unselected.png"
import icon_selected from "@/assets/icon_selected.png"
import icon_arrow from "@/assets/icon_arrow.png"
import icon_wx_small from "@/assets/icon_wx_small.png"
import icon_triangle from "@/assets/icon_triangle.png"
import icon_eye_open from "@/assets/icon_eye_open.png"
import icon_eye_close from "@/assets/icon_eye_close.png"
import icon_exchange from "@/assets/icon_exchange.png"
import icon_wx from "@/assets/icon_wx.png"
import icon_qq from "@/assets/icon_qq.webp"
import icon_close_modal from "@/assets/icon_close_modal.png"
import { formatPhone, replaceBlank } from '@/utils/StringUtil'


type Props = {}

type PageANavigationProp = StackNavigationProp<RootStackParamList, 'Login'>

const Login = (props: Props) => {

  const [loginType, setLoginType] = useState<'quick' | 'input'>('quick')
  const [check, setCheck] = useState(false)
  const [eyeOpen, setEyeOpen] = useState(true)
  const [phone, setPhone] = useState('')
  const [pwd, setPwd] = useState('')

  const { userInfo, requestLogin } = UserStore()

  const navigation = useNavigation<PageANavigationProp>()

  const renderQucikLogin = () => {
    const styles = StyleSheet.create({
      root: {
        width: '100%',
        height: '100%',
        flexDirection: 'column-reverse',
        alignItems: 'center',
        paddingHorizontal: 56
      },
      protocolLayout: {
        width: '100%',
        flexDirection: 'row',
        marginBottom: 40
      },
      radioButton: {
        width: 20,
        height: 20,
      },
      lableText: {
        fontSize: 12,
        color: '#999',
        marginLeft: 6
      },
      protocolText: {
        fontSize: 12,
        color: '#1020ff',
      },
      otherLoginButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 20,
        paddingHorizontal: 10,
        marginBottom: 100
      },
      otherLoginText: {
        fontSize: 16,
        color: '#303080'
      },
      iconArrow: {
        width: 16,
        height: 16,
        resizeMode: 'contain',
        marginLeft: 6,
        transform: [{ rotate: '180deg' }]
      },
      wxLogin: {
        width: '100%',
        height: 56,
        backgroundColor: '#05c160',
        borderRadius: 28,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
      },
      wxIcon: {
        width: 40,
        height: 40
      },
      wxLoginText: {
        fontSize: 18,
        color: 'white',
        marginLeft: 6
      },
      oneKeyLogin: {
        width: '100%',
        height: 56,
        backgroundColor: '#ff2442',
        borderRadius: 28,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        marginBottom: 20
      },
      oneKeyLoginText: {
        fontSize: 18,
        color: 'white',
      },
      logoMain: {
        width: 180,
        height: 95,
        resizeMode: 'contain',
        position: 'absolute',
        top: 170
      },
    })

    return (
      <View style={styles.root}>
        <View style={styles.protocolLayout}>
          <TouchableOpacity onPress={() => setCheck(!check)}>
            <Image style={styles.radioButton} source={check ? icon_selected : icon_unselected} />
          </TouchableOpacity>
          <Text style={styles.lableText}>
            我已阅读并同意
          </Text>
          <TouchableOpacity onPress={() => Linking.openURL('https://www.baidu.com')}>
            <Text style={styles.protocolText}>《用户协议》 和 《隐私政策》</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.otherLoginButton}
          onPress={() => {
            LayoutAnimation.easeInEaseOut()
            setLoginType('input')
          }}
        >
          <Text style={styles.otherLoginText}>
            其他登录方式
          </Text>
          <Image style={styles.iconArrow} source={icon_arrow} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.wxLogin} activeOpacity={0.7}>
          <Image style={styles.wxIcon} source={icon_wx_small} />
          <Text style={styles.wxLoginText}>
            微信登录
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.oneKeyLogin} activeOpacity={0.7}>
          <Text style={styles.oneKeyLoginText}>
            一键登录
          </Text>
        </TouchableOpacity>
        <Image style={styles.logoMain} source={icon_main_logo} />
      </View >
    )
  }

  const renderInputLogin = () => {
    const styles = StyleSheet.create({
      root: {
        width: '100%',
        height: '100%',
        flexDirection: 'column',
        alignItems: 'center',
        paddingHorizontal: 56
      },
      pwdLogin: {
        fontSize: 24,
        color: '#333',
        fontWeight: 'bold',
        marginTop: 56
      },
      tip: {
        fontSize: 14,
        color: '#bbb',
        marginTop: 6
      },
      phoneLayout: {
        width: '100%',
        height: 60,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        marginTop: 28
      },
      pre86: {
        fontSize: 24,
        color: '#bbb'
      },
      triangle: {
        width: 12,
        height: 6,
        marginLeft: 6
      },
      phoneInput: {
        flex: 1,
        height: 64,
        backgroundColor: 'transparent',
        textAlign: 'left',
        textAlignVertical: 'center',
        fontSize: 24,
        color: '#333',
        marginLeft: 16
      },
      passwordLayout: {
        width: '100%',
        height: 60,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        marginTop: 8
      },
      posswordInput: {
        marginLeft: 0,
        marginRight: 16
      },
      iconEye: {
        width: 30,
        height: 30
      },
      changeLayout: {
        width: '100%',
        marginTop: 10,
        alignItems: 'center',
        flexDirection: 'row'
      },
      exchangeIcon: {
        width: 16,
        height: 16
      },
      codeLoginText: {
        fontSize: 14,
        color: '#303080',
        flex: 1,
        marginLeft: 4
      },
      forgetPwdText: {
        fontSize: 14,
        color: '#303080',
      },
      loginBtn: {
        width: '100%',
        height: 56,
        backgroundColor: '#ff2442',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 28,
        marginTop: 20,
      },
      loginBtnDisable: {
        width: '100%',
        height: 56,
        backgroundColor: '#ddd',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 28,
        marginTop: 20,

      },
      loginText: {
        fontSize: 20,
        color: 'white'
      },
      protocolLayout: {
        width: '100%',
        flexDirection: 'row',
        marginBottom: 40,
        marginTop: 12
      },
      lableText: {
        fontSize: 12,
        color: '#999',
        marginLeft: 6
      },
      radioButton: {
        width: 20,
        height: 20,
      },
      protocolText: {
        fontSize: 12,
        color: '#1020ff',
      },
      wxqqLayout: {
        width: '100%',
        flexDirection: 'row',
        marginTop: 100,
        justifyContent: 'space-around'
      },
      iconwxqq: {
        width: 52,
        height: 52
      },
      closeBtn: {
        position: 'absolute',
        top: 40,
        left: 40
      },
      closeIcon: {
        width: 30,
        height: 30,
      }
    })
    const canLogin = phone?.length === 13 && pwd?.length === 6
    return (
      <View style={styles.root}>
        <Text style={styles.pwdLogin}>密码登录</Text>
        <Text style={styles.tip}>未注册的手机号登录成功后将自动注册</Text>
        <View style={styles.phoneLayout}>
          <Text style={styles.pre86}>+86</Text>
          <Image style={styles.triangle} source={icon_triangle} />
          <TextInput
            style={styles.phoneInput}
            placeholderTextColor='#bbb'
            placeholder='请输入手机号'
            autoFocus={false}
            keyboardType='number-pad'
            maxLength={13}
            value={phone}
            onChangeText={(text: string) => {
              setPhone(formatPhone(text))
            }}
          />
        </View>
        <View style={styles.passwordLayout}>
          <TextInput
            style={[styles.phoneInput, styles.posswordInput]}
            placeholderTextColor='#bbb'
            placeholder='请输入密码'
            autoFocus={false}
            keyboardType='number-pad'
            maxLength={6}
            secureTextEntry={!eyeOpen}
            value={pwd}
            onChangeText={(text: string) => {
              setPwd(text)
            }}
          />
          <TouchableOpacity
            onPress={() => setEyeOpen(!eyeOpen)}
          >
            <Image style={styles.iconEye} source={eyeOpen ? icon_eye_open : icon_eye_close} />
          </TouchableOpacity>
        </View>
        <View style={styles.changeLayout}>
          <Image style={styles.exchangeIcon} source={icon_exchange} />
          <Text style={styles.codeLoginText}>验证码登录</Text>
          <Text style={styles.forgetPwdText}>忘记密码？</Text>
        </View>
        <TouchableOpacity
          style={canLogin ? styles.loginBtn : styles.loginBtnDisable}
          disabled={!canLogin}
          activeOpacity={0.7}
          onPress={async () => {

            const purePhone = replaceBlank(phone)
            // login
            const data = await requestLogin(purePhone, pwd)
            if (data) {
              navigation.replace('HomeTab')
            } else {
              ToastAndroid.show('登录失败，请检查用户名和密码', ToastAndroid.LONG)
            }
          }}
        >
          <Text style={styles.loginText}>登录</Text>
        </TouchableOpacity>
        <View style={styles.protocolLayout}>
          <TouchableOpacity onPress={() => setCheck(!check)}>
            <Image style={styles.radioButton} source={check ? icon_selected : icon_unselected} />
          </TouchableOpacity>
          <Text style={styles.lableText}>
            我已阅读并同意
          </Text>
          <TouchableOpacity onPress={() => Linking.openURL('https://www.baidu.com')}>
            <Text style={styles.protocolText}>《用户协议》 和 《隐私政策》</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.wxqqLayout}>
          <Image style={styles.iconwxqq} source={icon_wx} />
          <Image style={styles.iconwxqq} source={icon_qq} />
        </View>
        <TouchableOpacity
          style={styles.closeBtn}
          onPress={() => {
            LayoutAnimation.easeInEaseOut()
            setLoginType('quick')
          }}>
          <Image style={styles.closeIcon} source={icon_close_modal} />
        </TouchableOpacity>
      </View>
    )
  }

  return (
    <View style={styles.root}>
      {
        loginType === 'quick' ?
          renderQucikLogin() :
          renderInputLogin()
      }
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
    flexDirection: 'column',
    alignItems: 'center'
  }
})

export default Login