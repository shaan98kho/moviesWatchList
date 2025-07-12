import { useEffect, useState, useMemo } from 'react'
import Header from './components/Header'
import Card from './components/Card'
import './App.css'
import SearchBar from './components/SearchBar'

export interface Movie {
  imgUrl: string,
  id: string,
  title: string,
  popularity: number,
  voteAvg: number,
  voteCount: number,
  releaseDate: Date,
  overview: string
}

function App() {
  const [movies, setMovies] = useState<Movie[]>([])
  const [searchText, setSearchText] = useState("")
  const [error, setError] = useState(false)

  useEffect(() => {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.REACT_APP_TMDB_API_KEY}`
      }
    }  

    const fetchMovies = async () => {
      try {
        const res = await fetch("https://api.themoviedb.org/3/movie/popular?language=en-US&page=1", options)
        if(!res.ok) throw new Error(`error fetching data: ${res.status}`)
  
        const data = await res.json()
        // console.log(data.results)
        const mappedMovies: Movie[] = data.results.map((movie:any) => ({
          imgUrl: movie.backdrop_path,
          id: movie.id,
          title: movie.title,
          releaseDate: movie.release_date,
          popularity: movie.popularity,
          voteAvg: movie.vote_average,
          voteCount: movie.vote_count,
          overview: movie.overview
        }))

        setMovies(mappedMovies)
      }
      catch(e: any) {
        console.log(e)
        setError(true)
        throw new Error(e)
      }
    }

    fetchMovies()
  }, [])

  const filtered = useMemo(() => {
    if(!searchText) {
      return movies
    } else {
      const query = searchText.toLowerCase()
      const results = movies.filter(movie => movie.title.toLowerCase().includes(query))

      return results
    }
  }, [movies, searchText])

  if (error) {
    return <div>Error loading movies. Please try again later.</div>;
  }

  if (movies.length === 0) {
    return <div>Loading movies…</div>;
  }

  const movieList = filtered?.map(movie => {
    return <Card
      key={movie.id}
      imgUrl={movie.imgUrl}
      title={movie.title}
      overview={movie.overview}
      voteAvg={movie.voteAvg}
      voteCount={movie.voteCount}
      id={movie.id}
      popularity={movie.popularity}
      releaseDate={movie.releaseDate}
    />
  })

  return (<>
    <Header />
    <SearchBar searchText={searchText} setSearchText={setSearchText}/>
    <div className='card-wrap'>{movieList}</div> 
  </>
    
  );
}

export default App;
