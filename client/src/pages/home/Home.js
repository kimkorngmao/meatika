import React from 'react'
import { Header } from '../../components/header/Header'
import { Slider } from '../../components/slider/Slider'
import { LatestSection } from '../../components/latestSection/LatestSection'
import { TrendingSection } from '../../components/trendingSection/TrendingSection'

export const Home = () => {
  return (
    <>
        <Header/>
        <Slider/>
        <TrendingSection/>
        <LatestSection/>
    </>
  )
}
