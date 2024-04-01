import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import './Home.css'
import Header from './Header'

function Home() {
  const [times, setTimes] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://api.cartola.globo.com/clubes`)
        const data = response.data

        if (typeof data === 'object' && !Array.isArray(data)) {
          const timesArray = Object.values(data)

          const filteredTimes = timesArray.filter(
            (item) =>
              item.id !== null &&
              item.escudos['60x60'] !==
                'https://s.glbimg.com/es/sde/f/organizacoes/escudo_default_65x65.png'
          )

          const sortedTimes = [...filteredTimes].sort((a, b) =>
            a.nome.localeCompare(b.nome)
          )

          setTimes(sortedTimes)
        } else {
          console.error('ERROR!')
        }
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [])

  return (
    <>
      <Header />
      <div className='container'>
        {times.map((item) => (
          <div className='flex escudo-foto ' key={item.id}>
            <img
              src={
                item.escudos['60x60'] !==
                'https://s.glbimg.com/es/sde/f/organizacoes/escudo_default_65x65.png'
                  ? item.escudos['60x60']
                  : ''
              }
            />
            <Link to={`jogadores/${item.nome}/${item.id}`}>
              <div className='escudo'>
                <h1>{item.nome}</h1>
                <h2>{item.apelido}</h2>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </>
  )
}

export default Home
