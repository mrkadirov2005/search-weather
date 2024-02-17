import React from 'react'
import { useSelector } from 'react-redux'
import {  getCurrentCountry, getPending, getPrevWidth } from '../../features/selectors/selectors'
import './styles.css'
import humidity from '../humidity.png'
import styled from 'styled-components'



export default function InfoPart() {

  const winWidth=useSelector(getPrevWidth)
  const MainContainer=styled.section`
  font-size: 15px !important;
  `
  const TEXTH2=styled.h2` 
  display: flex;
  color: white;
  font-size: ${winWidth>600?25:winWidth/25}px;
  `


const state=useSelector(getPending)
const info=useSelector(state=>state)
let currentCountry=useSelector(getCurrentCountry) 

  let country=info.weather.weatherInfo.location.name
  let temperature_c=info.weather.weatherInfo.current.temp_c
  let temperature_f=info.weather.weatherInfo.current.temp_f
  let type=info.weather.type
        return (
        <MainContainer>
            <div className='box_part'>
              <h2 className='location_style'>{country} <img src={info.weather.weatherInfo.current.condition.icon} /> </h2>
              <div className='weather_box_bottom'> 
              <h1 className='main_tm_indicator'>{type==='c'?temperature_c:temperature_f} {type}</h1>
              <TEXTH2 className='humidity'> humidity: <img src={humidity}/> {info.weather.weatherInfo.current.humidity}</TEXTH2>
              <TEXTH2 className='humidity'>identity key: <img src='https://upload.wikimedia.org/wikipedia/commons/4/48/Adobe_InDesign_CC_icon.svg'/>  {info.weather.weatherInfo.current.condition.code}</TEXTH2>
              <TEXTH2 className='wind_degree'>wind degree:💨 {info.weather.weatherInfo.current.wind_degree}</TEXTH2>
              <div className='location_info'>
                <TEXTH2>latitude:{info.weather.weatherInfo.location.lat}</TEXTH2>
                <TEXTH2>longtitude:{info.weather.weatherInfo.location.lon}</TEXTH2>
              </div>
              </div>
            <time>last updated: {info.weather.weatherInfo.current.last_updated}</time>
            </div>
        </MainContainer>
      ) 
}

