import {BrowserRouter , Routes, Route, } from 'react-router-dom'
import Register from './pages/Register'
import Login from './pages/Login'

import './App.css'
import ToDoList from './pages/ToDoList'

function App() {


  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/todolist" element={<ToDoList/>} />
        </Routes>
    
    </BrowserRouter>
  )
}

export default App
