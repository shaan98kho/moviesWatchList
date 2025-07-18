import { useEffect, useState, useMemo, useCallback } from 'react'
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
	const [searchText, setSearchText] = useState<string>("")
	const [error, setError] = useState<Boolean>(false)
	const [page, setPage] = useState(1)
	const [hasMore, setHasMore] = useState<Boolean>(true)
	const [loading, setLoading] = useState<Boolean>(false)
	const [watchList, setWatchList] = useState<Movie[]>([])
	const [isShowWatchList, setIsShowWatchList] = useState<Boolean>(false)
	const [isDay, setIsDay] = useState<Boolean>(false)

	const API_KEY = process.env.REACT_APP_TMDB_API_KEY
	const BASE_POPULAR = "https://api.themoviedb.org/3/movie/popular"
	const BASE_SEARCH = "https://api.themoviedb.org/3/search/movie"

	const options = {
		method: 'GET',
		headers: {
			accept: 'application/json',
			Authorization: `Bearer ${process.env.REACT_APP_TMDB_API_KEY}`
		}
	}  

	useEffect(() => {
		if(!API_KEY) return setError(true)
		
		setLoading(true)
		const endpoint = searchText
						? `${BASE_SEARCH}?query=${encodeURIComponent(searchText)}&page=${page}`
						: `${BASE_POPULAR}?language=en-US&page=${page}`

		const fetchMovies = async () => {
			try {
				const res = await fetch(endpoint, options)
				if(!res.ok) throw new Error(`TMDB ${res.status}`)

				const data = await res.json()
				// console.log()
				const mappedMovies: Movie[] = data.results.map((movie:any) => ({
					imgUrl: movie.backdrop_path,
					id: movie.id,
					title: movie.title,
					releaseDate: movie.release_date,
					popularity: movie.popularity,
					voteAvg: movie.vote_average.toFixed(1),
					voteCount: movie.vote_count,
					overview: movie.overview
				}))

				setMovies(prev => page === 1 
										? mappedMovies 
										: [...prev, ...mappedMovies])
				setHasMore(page < data.total_pages)

			} catch(e: any) {
				throw new Error('error fetching data', e)
			} finally {
				setLoading(false)
			}
		}

		fetchMovies()
	}, [page, searchText, API_KEY])

	useEffect(() => {
		setPage(1)
		setHasMore(true)
		setError(false)
	}, [searchText])

	//handle scroll to load more
	const handleScroll = useCallback(() => {
		if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 200 && hasMore && !loading) {
			setPage(prev => prev + 1)
		}
	}, [hasMore, loading])

	useEffect(() => {
		window.addEventListener('scroll', handleScroll)
		return () => void window.removeEventListener('scroll', handleScroll)
	}, [handleScroll])

	const filtered = useMemo(() => {
		if(!searchText) {
			return movies
		} else {
			const query = searchText.toLowerCase()
			const results = movies.filter(movie => movie.title.toLowerCase().includes(query))

			return results
		}
	}, [movies, searchText])

	const toggleAddToWatchList = (id: string) => {
		setWatchList(prev => {
			if(prev.some(m => m.id === id)) {
				//remove from watchlist if already existed
				return prev.filter(m=> m.id !== id)
			} else {
				//otherwise add to watchlist
				const movieToAdd = movies.find(m=> m.id === id)
				return movieToAdd ? [...prev, movieToAdd]
									: [...prev, ]
			}
		})
	}

  const toggleShowWatchList = () => setIsShowWatchList(prev => !prev)

  const watchListIds = new Set(watchList.map(m=>m.id))

//   console.log(watchList)

  if (error) return <div>Error loading movies. Please try again later.</div>
  if (movies.length === 0 && loading) return <div>Loading…</div>;


	const movieListEl = filtered?.map(movie => {
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
			toggleAddToWatchList={toggleAddToWatchList}
			isInWatchList={watchListIds.has(movie.id)}
		/>
	})

	const watchListEl = watchList.map(movie => {
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
			toggleAddToWatchList={toggleAddToWatchList}
			isInWatchList={watchListIds.has(movie.id)}
		/>
	})

	return (<>
		<Header toggleShowWatchList={toggleShowWatchList}/>
		{isShowWatchList ? "" : <SearchBar searchText={searchText} setSearchText={setSearchText}/>}
		<div className='card-wrap'>
			{isShowWatchList ? watchList.length == 0 ? "No movies saved, go explore!" : watchListEl
							 : movieListEl}
		</div>
	</>

	);
}

export default App;
