import React from 'react'
import { useSelector } from 'react-redux'
import { getErrorMessage } from '../features/selectors/selectors'
import CustomInfo from './CustomInfo'
import './styles.css'

export default function ErrorPage() {
    const errorMessage=useSelector(getErrorMessage)
  return (
    <div>
    {errorMessage}
    return to main page
    </div>
  )
}
