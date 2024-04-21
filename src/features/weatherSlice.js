import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


 export const example={
    location: {
      name: 'Tashkent',
      region: 'Toshkent',
      country: 'Uzbekistan',
      lat: 41.32,
      lon: 69.25,
      tz_id: 'Asia/Tashkent',
      localtime_epoch: 1704166356,
      localtime: '2024-01-02 8:32'
    },
    current: {
      last_updated_epoch: 1704166200,
      last_updated: '2024-01-02 08:30',
      temp_c: 6.9,
      temp_f: 44.4,
      is_day: 1,
      condition: {
        text: 'Overcast',
        icon: '//cdn.weatherapi.com/weather/64x64/day/122.png',
        code: 1009
      },
      wind_mph: 3.4,
      wind_kph: 5.4,
      wind_degree: 204,
      wind_dir: 'SSW',
      pressure_mb: 1024,
      pressure_in: 30.23,
      precip_mm: 0,
      precip_in: 0,
      humidity: 40,
      cloud: 100,
      feelslike_c: 6.1,
      feelslike_f: 42.9,
      vis_km: 10,
      vis_miles: 6,
      uv: 2,
      gust_mph: 7,
      gust_kph: 11.2,
      air_quality: {
        co: 654.2,
        no2: 90.5,
        o3: 0,
        so2: 6.6,
        pm2_5: 16.9,
        pm10: 19.4,
        'us-epa-index': 2,
        'gb-defra-index': 2
      }
    }
  }

let initialState = {
    weatherInfo: example,
    state:'fullfilled'| "pending"|'rejected',
    type:'c',
    pending: false,
    error: false,
    isError:false,
    window:0,
    notificationInfo:{
      time:"",
      isOpen:true,
      status:"denied"

    }
   
}


const apiUrl = 'https://api.weatherapi.com/v1/current.json';
const apiKey = '518c1497c9cd42aeabc171154240101';
const location = 'uzbekistan';
const includeAqi = 'yes';

const apiUrlWithParams = `${apiUrl}?key=${apiKey}&q=${location}&aqi=${includeAqi}`;
console.log(apiUrlWithParams)


export const fetchData = createAsyncThunk('weather/fetchWeather', async () => {
    try {
     const response= axios.get(apiUrlWithParams)  
     return response
    } catch (error) {
    return error
    }
})


export const fetchCountryWeather=createAsyncThunk('country/info',async (place)=>{
    const apiUrl = 'https://api.weatherapi.com/v1/current.json';
    const apiUrlWithParamsCountry=`${apiUrl}?key=${apiKey}&q=${place}&aqi=${includeAqi}`
  try {
    const response=axios.get(apiUrlWithParamsCountry)
    return response
  } catch (error) {
    return error.message
  }
})

let weatherSlice = createSlice({
    name: 'weather',
    initialState: initialState,
    reducers: {
        handleFahrenheit(state){
            state.type='f'
        },
        handleCelcius(state){
            state.type="c"
        },
        getWindowWidth(state){
          state.window=window.innerWidth
        },
        SetNote_time(state,action){
          state.notificationInfo.time=action.payload
          state.notificationInfo.status="granted"
          state.notificationInfo.isOpen=false
          alert(`you will be notified at ${action.payload.split(".")[0]}:${action.payload.split(".")[1]}`)
        },
        setDeniedNotifications(state,action){
          state.notificationInfo.status="denied"
          state.notificationInfo.isOpen=false;
          state.notificationInfo.time="0.0";
        }

    },
    extraReducers(builder) {
        builder.addCase(fetchData.pending, (state, action) => {
            state.pending = true;
            state.error = false;
            state.state='pending'
        })
        .addCase(fetchData.fulfilled,(state,action)=>{
            console.log(action)
            state.weatherInfo=action.payload.data;
            state.error=false;
            state.pending=false;
            state.state='fulfilled'
            // state.isError=false
        })
        .addCase(fetchData.rejected,(state,action)=>{

            state.error=action.error.message
            state.pending=false
            state.state='rejected'
            state.isError=true
            // console.log(action.error)

        })
        .addCase(fetchCountryWeather.pending,(state,action)=>{
            state.state='pending'
            state.pending=true
        })
        .addCase(fetchCountryWeather.fulfilled,(state,action)=>{
            state.weatherInfo=action.payload.data
            console.log(action)
            state.state='fulfilled'
            state.isError=false
        })
        .addCase(fetchCountryWeather.rejected,(state,action)=>{
            state.error=action.error.message
            state.isError=true
            state.state='rejected'
           
        })
    }

})



// export const getCurrentState=(state)=>state;
export const { handleFahrenheit,handleCelcius,getWindowWidth,SetNote_time,setDeniedNotifications} = weatherSlice.actions
export default weatherSlice.reducer

