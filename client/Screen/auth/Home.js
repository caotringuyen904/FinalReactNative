import { StyleSheet, ScrollView, View } from 'react-native'
import React from 'react'
import Carousel from '../components/Carousel'
import Title from '../components/Title'
import Restaurant from '../components/Restaurant'
import Footer from '../components/Footer'
import { SafeAreaView } from 'react-native-safe-area-context'

const Home = () => {
  return (
    <View>
    <ScrollView styleScroll={styles.scrollViewContainer}>
      <Carousel />
      <Title />
      <Restaurant />
      {/* <Footer /> */}
    </ScrollView> 
    </View>
  )
  }

export default Home

const styles = StyleSheet.create({
    scrollViewContainer: {
      flexGrow: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingTop: 20,
    }
  })