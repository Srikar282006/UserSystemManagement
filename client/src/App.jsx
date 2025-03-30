import React from 'react'
import './App.css'
import {createBrowserRouter,RouterProvider} from "react-router-dom"
import ReadPage from './pages/ReadPage'
import Home from './pages/Home'
import Login from './pages/Login'
import AddUser from './pages/AddUser'
import UserDetails from './pages/Userdetails'
import EditUser from './pages/EditUser'


const router=createBrowserRouter([
  
    {path:"/",element:<Home/>},
    {path:'/login',element:<Login/>},
    {path:"/dashboard",element:<ReadPage/>},
    {path:"/add-user",element:<AddUser/>},
    {path:"/user/:id",element:<UserDetails/>},
    {path:"/edit-user/:id",element:<EditUser/>}
])
  


export default function App() {
  return (
    <>
    <RouterProvider router={router} ></RouterProvider>
    </>
  )
}