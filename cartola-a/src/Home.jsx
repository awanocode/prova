import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import './Home.css'
import Logo from './assets/cartola.png'

function Home() {
  const [clubes, setClubes] = useState([])

  useEffect(() => {
    const fetchClubes = async () => {
      try {
        const response = await axios.get('https://api.cartola.globo.com/clubes')
        const data = response.data
        setClubes(Object.values(data))
      } catch (error) {
        console.error('Erro ao buscar clubes:', error)
      }
    }

    fetchClubes()
  }, [])

  if (!Array.isArray(clubes) || clubes.length === 0) return 'Carregando'

  return (
    <div className='linha'>
      <img src={Logo} />
      <ul>
        {clubes.map((clube) => (
          <li key={clube.id}>
            <Link to={`/detalhes/${clube.id}`}>
              <img src={clube.escudos['60x60']} alt={clube.nome} />
              
              {clube.nome}<h6>{clube.abreviacao}</h6>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Home