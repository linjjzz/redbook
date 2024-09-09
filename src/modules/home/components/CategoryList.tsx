import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native'
import { Category } from '../store'

import icon_arrow from '@/assets/icon_arrow.png'

type Porps = {
  categoryList: Category[]
  onCategoryChange?: (category: Category) => void
}

const CategoryList = (props: Porps) => {
  const { categoryList, onCategoryChange } = props

  const [category, setCategory] = useState<Category>()

  useEffect(() => {
    setCategory(categoryList.find(i => i.name === '推荐'))
  }, [])

  const onCategoryPress = (category: Category) => {
    setCategory(category)
    onCategoryChange?.(category)
  }

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} horizontal showsHorizontalScrollIndicator={false}>
        {categoryList.map((item, index) => {
          const isSelected = item.name === category?.name
          return (
            <TouchableOpacity key={item.name} style={styles.tabItem} onPress={() => onCategoryPress(item)}>
              <Text style={isSelected ? styles.tabItemTextSelected : styles.tabItemText}>{item.name}</Text>
            </TouchableOpacity>
          )
        })}
      </ScrollView>
      <TouchableOpacity style={styles.openBtn}>
        <Image style={styles.openImg} source={icon_arrow} />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 36,
    flexDirection: 'row',
    backgroundColor: 'white',
    marginBottom: 6
  },
  scrollView: {
    flex: 1,
    height: '100%'
  },
  openBtn: {
    width: 40,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  openImg: {
    width: 18,
    height: 18,
    transform: [{ rotate: '-90deg' }]
  },
  tabItem: {
    width: 66,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  tabItemText: {
    fontSize: 16,
    color: '#999'
  },
  tabItemTextSelected: {
    fontSize: 16,
    color: '#333',
    fontWeight: 'bold'
  }
})

export default CategoryList