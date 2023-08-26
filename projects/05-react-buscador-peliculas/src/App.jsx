// import { useRef } from 'react'
import { useState, useEffect, useRef, useCallback } from 'react'
import './App.css'
import { Movies } from './components/Movies'
import { useMovies } from './hooks/useMovies'
import debounce from 'just-debounce-it'

function useSearch () {
  const [search, setSearch] = useState('')
  const [error, setError] = useState(null)
  const isFirsInput = useRef(true)

  useEffect(() => {
    if (isFirsInput.current) {
      isFirsInput.current = search === ''
      return
    }

    if (search === '') {
      setError('No se puede buscar una película vacía')
      return
    }

    if (search.match(/^\d+$/)) {
      setError('No se puede buscar una película con números')
      return
    }

    if (search.length < 3) {
      setError('La busqueda debe tener al menos 3 carácteres')
      return
    }

    setError(null)
  }, [search])

  return { search, setSearch, error }
}

function App () {
  const [sort, setSort] = useState(false)
  const { search, setSearch, error } = useSearch()
  const { movies, loading, getMovies } = useMovies({ search, sort })

  const debounceGetMovies = useCallback(
    debounce(search => {
      console.log('search: ', search)
      getMovies({ search })
    }, 300), [getMovies])

  const handleSubmit = (event) => {
    event.preventDefault()
    getMovies({ search })
  }

  const handleChange = (event) => {
    const newSearch = event.target.value
    setSearch(newSearch)
    debounceGetMovies(newSearch)
  }

  const handleSort = (event) => {
    setSort(!sort)
  }

  return (
    <>
      <div className='page'>
        <header>
          <h1>Buscador de Películas</h1>
          <form className='form' onSubmit={handleSubmit}>
            <input onChange={handleChange} value={search} name='query' type='text' placeholder='Avengers, Star Wars, The Matrix...' />
            <input type='checkbox' onClick={handleSort} checked={sort} />
            <button type='submit'>Buscar</button>
          </form>
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </header>

        <main>
          {
            loading ? <p>Cargando...</p> : <Movies movies={movies} />
          }
        </main>
      </div>
    </>
  )
}

export default App

// const inputRef = useRef()

// Esta es la forma de hacerlo con JavaScript
// const handleSubmit = (event) => {
//   event.preventDefault()
//   const fields = new window.FormData(event.target)
//   const query = fields.get('query')
//   console.log(query)
// }
