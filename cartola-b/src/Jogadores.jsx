import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Header from './Header'
import './Home.css'

function Jogadores() {
  const { id, nome } = useParams()
  const [times, setTimes] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsLoading(true)

    fetch(`https://api.cartola.globo.com/atletas/mercado/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('ERRO!')
        }
        return response.json()
      })
      .then((data) => {
        setTimes(data)
        setIsLoading(false)
        console.log(data)
      })
      .catch((error) => {
        console.error(error)
        setIsLoading(false)
        setTimes(null)
      })
  }, [])

  const mudarResolucao = (imagem) => {
    const formato = imagem.replace('FORMATO', '220x220')
    return formato
  }

  if (isLoading) return 'Carregando'
  if (!times || times == null) return <div>ERRO</div>

  return (
    <>
      <Header />
      <div className='container'>
        <div>
          <h2 className='titulo'>Jogadores do {nome}</h2>
          {times.atletas.map((item) => (
            <div className='time-foto' key={item.id}>
              <div className='flex'>
                <img
                  className='jogador'
                  src={mudarResolucao(
                    item.foto ||
                      'https://s.sde.globo.com/media/person_role/2023/12/06/photo_220x220_eCO6g7f.png'
                  )}
                  alt=''
                />
                <h3 key={item.id}>{item.apelido}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default Jogadores
