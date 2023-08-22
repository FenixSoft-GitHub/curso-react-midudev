import { useCatImage } from './hooks/useCatImage'
import { useCatFact } from './hooks/useCatFact'

export function App () {
  const { fact, refreshFact } = useCatFact()
  const { imageUrl } = useCatImage({ fact })

  const handleClick = async () => {
    refreshFact()
  }

  return (
    <main>
      <h1>App de gatitos</h1>
      {/* <section> */}
      <button onClick={handleClick}>Get new fact</button>
      {fact && <p>{fact}</p>}
      {imageUrl && <img src={imageUrl} alt={`Image extracted using the firstrhee words for ${fact} `} />}
      {/* </section> */}
    </main>
  )
}

// devuelve la primera palabra de un arreglo
// const firsWord = fact.split(' ')[0]
// devuelve las 3 primeras palabras del arreglo
// const firsWord = fact.split(' ').slice(0, 3).join(' ')
