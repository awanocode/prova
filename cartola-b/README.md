codigo comentado para facilitar o entendimento do processo de criação

=== === === === === ===   Home.jsx  === === === === === ===

import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import './Home.css'
import Header from './Header'

function Home() {
  // Inicialize o state com um array vazio de times
  const [times, setTimes] = useState([])

  // Executa a função fetchData uma vez quando o componente é montado
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://api.cartola.globo.com/clubes`)
        const data = response.data

        // Filtra os registros sem id válido ou logo
        const filteredTimes = data.filter(
          (item) =>
            item.id!== null &&
            item.escudos['60x60']!==
            'https://s.glbimg.com/es/sde/f/organizacoes/escudo_default_65x65.png'
        )

        // Ordena os times filtrados por nome
        const sortedTimes = filteredTimes.sort((a, b) =>
          a.nome.localeCompare(b.nome)
        )

        // Atualiza o state com os times ordenados
        setTimes(sortedTimes)
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
          <div className='flex time-foto ' key={item.id}>
            {/* Exibe o logo do clube */}
            <img
              src={
                item.escudos['60x60']!==
                'https://s.glbimg.com/es/sde/f/organizacoes/escudo_default_65x65.png'
                 ? item.escudos['60x60']
                  : ''
              }
            />

            {/* Cria um link para a página de detalhes */}
            <Link to={`detalhes/${item.nome}/${item.id}`}>
              <div className='times-nome'>
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

=== === === === === ===   Detalhes.jsx  === === === === === ===

import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import './Home.css'
import Header from './Header'

function Home() {
  // Inicialize o state com um array vazio de times
  const [times, setTimes] = useState([])

  // Use o useEffect hook para buscar os dados da API quando o componente for montado
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Usar a biblioteca axios para buscar dados da API
        const response = await axios.get(`https://api.cartola.globo.com/clubes`)

        // Extrair os dados do objeto de resposta
        const data = response.data

        // Filtrar os registros sem ID válido ou logo
        const filteredTimes = data.filter(
          (item) =>
            item.id!== null &&
            item.escudos['60x60']!==
'https://s.glbimg.com/es/sde/f/organizacoes/escudo_default_65x65.png'
        )

        // Ordenar os times filtrados pelo nome
        const sortedTimes = filteredTimes.sort((a, b) =>
          a.nome.localeCompare(b.nome)
        )

        // Atualizar o state com os times ordenados
        setTimes(sortedTimes)
      } catch (error) {
        console.error('Erro ao buscar os dados:', error)
      }
    }

    // Chamar a função fetchData
    fetchData()
  }, [])

  // Renderizar o JSX que mostra a lista de times
  return (
    <>
      <Header />
      <div className='container'>
        {times.map((item) => (
          <div className='flex time-foto ' key={item.id}>
            {/* Mostrar o logo do clube */}
            <img
              src={
                item.escudos['60x60']!==
'https://s.glbimg.com/es/sde/f/organizacoes/escudo_default_65x65.png'
                ? item.escudos['60x60']
                  : ''
              }
            />

            {/* Criar um link para a página de detalhes */}
            <Link to={`detalhes/${item.nome}/${item.id}`}>
              <div className='times-nome'>
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

// Exportar o componente Home
export default Home