import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React, { useState, useEffect } from 'react'

import icon_daily from '@/assets/icon_daily.png'
import icon_search from '@/assets/icon_search.png'

type Props = {
  tab?: 0 | 1 | 2,
  onTabChanged?: (tabIndex: 0 | 1 | 2) => void
}

const TitleBar = (props: Props) => {
  const { tab, onTabChanged } = props
  const [tabIndex, setTabIndex] = useState<0 | 1 | 2>(1)

  useEffect(() => {
    if (tab) {
      setTabIndex(tab)
    }
  }, [tab])

  return (
    <View style={styles.titleLayout}>
      <TouchableOpacity style={styles.dailyBtn}>
        <Image style={styles.icon} source={icon_daily} />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.tabBtn}
        onPress={() => {
          setTabIndex(0)
          onTabChanged?.(0)
        }}
      >
        <Text style={tabIndex === 0 ? styles.tabTextSelect : styles.tabText}>关注</Text>
        {tabIndex === 0 && <View style={styles.line} />}
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.tabBtn}
        onPress={() => {
          setTabIndex(1)
          onTabChanged?.(1)
        }}
      >
        <Text style={tabIndex === 1 ? styles.tabTextSelect : styles.tabText}>发现</Text>
        {tabIndex === 1 && <View style={styles.line} />}
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.tabBtn}
        onPress={() => {
          setTabIndex(2)
          onTabChanged?.(2)
        }}
      >
        <Text style={tabIndex === 2 ? styles.tabTextSelect : styles.tabText}>武汉</Text>
        {tabIndex === 2 && <View style={styles.line} />}
      </TouchableOpacity>

      <TouchableOpacity style={styles.searchBtn}>
        <Image style={styles.icon} source={icon_search} />
      </TouchableOpacity>
    </View >
  )
}

const styles = StyleSheet.create({
  titleLayout: {
    width: '100%',
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 16
  },
  dailyBtn: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: 12,
    marginRight: 42
  },
  searchBtn: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 12,
    marginLeft: 42
  },
  icon: {
    width: 28,
    height: 28,
  },
  line: {
    width: 28,
    height: 2,
    backgroundColor: '#ff2442',
    borderRadius: 1,
    position: 'absolute',
    bottom: 6
  },
  tabBtn: {
    flex: 1,
    height: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  tabText: {
    fontSize: 16,
    color: '#999'
  },
  tabTextSelect: {
    fontSize: 17,
    color: '#333',
  }
})

export default TitleBar