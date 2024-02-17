import { useDispatch, useSelector, } from "react-redux";
import {  fetchData, getWindowWidth } from "./features/weatherSlice";
import CustomInfo from "./pages/CustomInfo";
import { getErrorcontidion, getPrevWidth } from "./features/selectors/selectors";
import ErrorPage from "./pages/ErrorPage";
import './App.css'
import { useEffect } from "react";




function App() {
  const dispatch=useDispatch()
const prevWidth=useSelector(getPrevWidth)

console.log(prevWidth)

window.innerWidth!==prevWidth?dispatch(getWindowWidth()):console.log(prevWidth)
useEffect(() => {
  window.addEventListener('resize',()=>{
    return dispatch(getWindowWidth())
  })
}, [])

      
   
   
    
    
        const render=()=>{
          dispatch(fetchData())
        }
        render()
const isError=useSelector(getErrorcontidion)

        
          return (
            <div className="App">
           <CustomInfo/>
           
            </div>
          )
        }
              

export default App;
