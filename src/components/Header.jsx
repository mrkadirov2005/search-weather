import React from 'react'
import './ComponentStyle.css'
import { useDispatch, useSelector } from 'react-redux'
import { getCurrentCountry, getPending, getPrevWidth, getType } from '../features/selectors/selectors'
import { fetchCountryWeather, fetchData, handleFahrenheit,handleCelcius } from '../features/weatherSlice'
// import '../components/InfoPart/styles.css'
import styled from 'styled-components'


export default function Header() {
  const dispatch = useDispatch()
  const isPending = useSelector(getPending)
  const winWidth=useSelector(getPrevWidth)

  const HEADER=styled.header`
  width: ${winWidth};
  display: flex;
  flex-direction: ${winWidth<1000?'column':'row'};
  `
  const LeftContainer=styled.div`
  display: flex;
  `
const LOGO=styled.h1`
    width: 250px;
    /* font-style: 45px; */
    font-style: italic;
    font-size: ${winWidth>1000?30:winWidth/20}px;
    
    color: var(--font-color);
    font-family: cursive;
    background-color: none;
    margin-top: auto;
    margin-bottom: auto;
    
`
const INPUT=styled.input`
width: ${winWidth/5}px;
height: ${winWidth>600?'25px':winWidth/20+'px'};
padding: 2px 5px;
outline: none;
`
const TYPE=styled.div`
width:${winWidth>1000?"":'80%'};
`



  
 
  let country;
  let celcius;
  let fahrenheit;
  const currentCountry = useSelector(getCurrentCountry)
  
    country = currentCountry.location.country
    celcius = currentCountry.current.temp_c
    fahrenheit=currentCountry.current.temp_f

    const type=useSelector(getType)

    const Fahrenheit=styled.button`
    background-color: ${type==='f'?'grey':'white'};
    border-radius: 7px;

    `
    const Celcius=styled.button`
    background-color: ${type==='c'?'grey':'white'};
    border-radius: 7px;
    `
    const TOGGLER=styled.div` 
    display: flex;
    align-items: center;
    justify-content: center;
    `
  
    return (
      <HEADER>
     <LeftContainer className=''>
      <LOGO >M</LOGO>
      <LOGO >{country}:{type==='c'?celcius:fahrenheit}</LOGO>
     </LeftContainer>
        <TYPE className='header_type_wrapper'>
          <INPUT type='text' className='input' onChange={(e) => localStorage.setItem('variant', e.target.value)} placeholder='type location' />
          <span className='search_bar' onClick={() => dispatch(fetchCountryWeather(localStorage.getItem('variant')))}>🔎</span>

          <div className='type'>
            <TOGGLER >
              <Celcius className='toggler_C' onClick={()=>dispatch(handleCelcius())}>Celcius</Celcius>
              <Fahrenheit className='toggler_F' onClick={()=>dispatch(handleFahrenheit())}>Fah</Fahrenheit>
            </TOGGLER>
            </div>
            <span className='local_time' onClick={() => dispatch(fetchData())}>{winWidth>600?'local time':'📍'}</span>
        </TYPE>

      </HEADER>
    )
  
   



  }  


