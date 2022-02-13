import { FormEvent, useState } from "react"
import { SearchResults } from "./components/SearchResults"

export function App() {
  const [search, setSearch] = useState('')
  const [results, setResults] = useState([])


  async function handleSearch(event: FormEvent) {
    event.preventDefault()

    if(!search.trim())
      return

    const response = await fetch(`http://localhost:3333/products?q=${search}`)
    const data = await response.json()
    
    setResults(data)
  }


  return (
    <div>
      <h1>Search</h1>

      <form onSubmit={handleSearch}>
        <input 
          type="text" 
          value={search} 
          onChange={e => setSearch(e.target.value)} 
        />

        <button type="submit">Buscar</button>
      </form>

      <SearchResults results={results}/>
    </div>
  );
}


// Quando utilizar o memo
/**
 * 1. Pure Functional Components => dados os mesmos parâmetros, retornam o mesmo resultado
 * 2. Renders too often
 * 3. Re-renders with same props 
 * 4. Medium to big size
 */

// Quando utilizar o useMemo
/**
 * 1. Cálculos pesados que não precisam re-renderizar sempre
 * 2. Igualdade referencial (quando repassamos a informação a um componente filho)
 */

// Quando utilizar o useCallback
/**
 * 1. Prop drilling 
 */