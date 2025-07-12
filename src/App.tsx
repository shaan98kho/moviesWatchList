import { useEffect, useState } from 'react'
import Header from './components/Header'
import Card from './components/Card'
import './App.css'

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
  const [movies, setMovies] = useState<Movie[]>()

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
        throw new Error(e)
      }
    }

    fetchMovies()
  }, [])

  if(!movies) return <div>Error loading movies, please try again</div>
  console.log(movies)

  const movieList = movies?.map(movie => {
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
    <div>{movieList}</div> 
  </>
    
  );
}

export default App;
