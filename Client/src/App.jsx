import React from 'react'
import {Routes,Route} from 'react-router-dom'
import Home from './pages/Home.jsx'
import Profile from './pages/Profile.jsx' 
import { AppProvider } from './context/AppContext.jsx' 

const App = () => {
  return (
    <AppProvider> 
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/profile' element={<Profile/>}></Route> 
      </Routes>
    </AppProvider>
  )
}

export default App