
import { FaStar } from "react-icons/fa"
import { PiImageBrokenFill } from "react-icons/pi"
import { IoIosAddCircle, IoIosCheckmarkCircle } from "react-icons/io"
import { Movie } from "../App"

interface CardProps extends Movie {
    toggleAddToWatchList: (id: string) => void,
    isInWatchList: boolean
}

export default function Card({ 
    id,
    imgUrl,
    title,
    overview,
    voteAvg,
    voteCount,
    popularity,
    releaseDate,
    toggleAddToWatchList,
    isInWatchList
}: CardProps) {
    const imgElement = new Image()
    imgElement.src = imgUrl
    return <div className="card">
        <div className="card-img">
            {imgUrl? <img src={`https://image.tmdb.org/t/p/original${imgUrl}`} /> : <PiImageBrokenFill />}
        </div>
        <div className="card-body">
            <h3>{title}<span><FaStar />{voteAvg}</span></h3>
            <div>
                <span></span>
                <span></span>
                <button onClick={()=>toggleAddToWatchList(id)} className={isInWatchList ? "active" : ""}>{isInWatchList ? <IoIosCheckmarkCircle /> : <IoIosAddCircle />}Watchlist</button>
            </div>
            <div>
                <p>{overview}</p>
            </div>
        </div>

    </div>
}