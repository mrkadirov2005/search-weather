import {  useDispatch, useSelector } from 'react-redux'
import { getErrorMessage, getErrorcontidion, getState } from '../features/selectors/selectors'
import Header from '../components/Header'
import InfoPart from '../components/InfoPart/InfoPart'
import laodingIcon from '../assets/loading.jpg'
import './styles.css'
import ErrorPage from './ErrorPage'

export default function CustomInfo(){
  const errorStatus=useSelector(getErrorcontidion)
  const errorMessage=useSelector(getErrorMessage)
  const stateStatus=useSelector(getState)
   
  
  if( stateStatus==='pending'){
    return(<div className='loading_wrapper'><img className='animated_loading' src={laodingIcon}/>
    <div className='background'></div>
    </div>)
  }else if(errorStatus && stateStatus=='fulfilled'){
    return(
      <main>
        <div>Request failed with status code 403</div>
      </main>
    )
  } else if(errorStatus){

      return(
         <div>
         {errorMessage}
         </div>
         
         )
    }else if(!errorStatus){
      return(
        <main>
          <Header/>
          <InfoPart/>
        </main>
      )
    }

}
