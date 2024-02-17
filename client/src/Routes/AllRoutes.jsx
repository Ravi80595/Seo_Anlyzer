import React from 'react'
import {Routes,Route} from 'react-router-dom'
import Dashboard from '../Pages/Dashboard'
import About from '../Pages/About'
import Contact from '../Pages/Contact'



const AllRoute = () => {


return (
  <>
    <Routes>
        <Route path="/" element={<Dashboard/>}></Route>       
        <Route path="/about" element={<About/>}></Route> 
        <Route path="/contact" element={<Contact/>}></Route> 
    </Routes>
    </>
  )
}

export default AllRoute
