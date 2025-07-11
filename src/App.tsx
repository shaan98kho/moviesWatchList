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
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1YmQ5YmFhYjA2YzljYTU3NDY2ZmFhZTRkYzU3OTQ1MSIsIm5iZiI6MTc1MjIyMTcyOS4zMzc5OTk4LCJzdWIiOiI2ODcwYzgyMTc4N2I4ZTA4MjllZDcyMDkiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.5-wjahVig3N9X0wdSPU6uWDHG8E3H3ibf2NbN28cBrE'
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
