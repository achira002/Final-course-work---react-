import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Category from './pages/Category'
import Home from './pages/Home'
import Item from './pages/Item'
import Locations from './pages/Locations'
import Stock from './pages/Stock'
import Orders from './pages/orders/Orders'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/categories' element={<Category/>}/>
        <Route path='/locations' element={<Locations/>}/>
        <Route path='/item' element={<Item/>}/>
        <Route path='/stock' element={<Stock/>}/>
        <Route path='/order' element={<Orders/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
