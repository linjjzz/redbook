import { View, Text, StyleSheet, Dimensions, Image } from 'react-native'
import React, { useEffect } from 'react'
import { ArticleSimple, HomeStore } from './store'
import FlowList from '@/components/flowlist/FlowList'
import ResizeImage from '@/components/ResizeImage'
import Heart from '@/components/Heart'
import TitleBar from './components/TitleBar'
import CategoryList from './components/CategoryList'

type Props = {}

const { width: SCREEN_WIDTH } = Dimensions.get('window')

const Home = (props: Props) => {

  const { homeList, refreshing, categoryList, getCategoryList, requestHomeList, resetPage } = HomeStore()

  useEffect(() => {
    requestHomeList()
    getCategoryList()
  }, [])

  const renderItem = ({ item, index }: { item: ArticleSimple, index: number }) => {

    return <View style={styles.item}>
      <ResizeImage uri={item.image} />
      <Text style={styles.itemTitle}>{item.title}</Text>
      <View style={styles.nameLayout}>
        <Image style={styles.itemavatar} source={{ uri: item.avatarUrl }} />
        <Text style={styles.itemUserName}>{item.userName}</Text>
        <Heart value={item.isFavorite} />
        <Text style={styles.itemFavoriteCount}>{item.favoriteCount}</Text>
      </View>
    </View>
  }

  const Footer = () => {
    return <Text style={styles.footerText}>没有更多数据</Text>
  }

  return (
    <View style={styles.root}>
      <TitleBar />
      <FlowList
        style={styles.flatList}
        data={homeList}
        keyExtrator={(item: ArticleSimple) => `${item.id}`}
        extraData={[refreshing]}
        renderItem={renderItem}
        numColumns={2}
        refreshing={refreshing}
        onRefresh={() => {
          resetPage()
          requestHomeList()
        }}
        onEndReachedThreshold={0.1}
        onEndReached={() => {
          requestHomeList()
        }}
        ListFooterComponent={<Footer />}
        ListHeaderComponent={<CategoryList categoryList={categoryList.filter(i => i.isAdd)} onCategoryChange={() => { }} />}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: '100%',
    backgroundColor: '#f0f0f0'
  },
  flatList: {
    width: '100%',
    height: '100%',
  },
  item: {
    width: (SCREEN_WIDTH - 16) / 2,
    backgroundColor: 'white',
    marginLeft: 6,
    marginBottom: 6,
    borderRadius: 8,
    overflow: 'hidden'
  },
  itemTitle: {
    fontSize: 14,
    color: '#333',
    marginHorizontal: 10,
    marginVertical: 4
  },
  nameLayout: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginBottom: 10
  },
  itemavatar: {
    width: 20,
    height: 20,
    borderRadius: 10,
    resizeMode: 'cover'
  },
  itemUserName: {
    fontSize: 12,
    color: '#999',
    marginLeft: 6,
    flex: 1
  },
  itemFavoriteCount: {
    fontSize: 14,
    color: '#999',
    marginLeft: 4
  },
  footerText: {
    width: '100%',
    fontSize: 14,
    color: '#999',
    marginVertical: 16,
    textAlign: 'center',
    textAlignVertical: 'center'
  }
})

export default Home