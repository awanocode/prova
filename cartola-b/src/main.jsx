import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import Home from './Home.jsx'
import Jogadores from './Jogadores';
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/jogadores/:nome/:id',
    element: <Jogadores />,
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
