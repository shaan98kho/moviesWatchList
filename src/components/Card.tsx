
import { FaStar } from "react-icons/fa"
import { PiImageBrokenFill } from "react-icons/pi"
import { IoIosAddCircle } from "react-icons/io"
import { Movie } from "../App"

export default function Card({ 
    id,
    imgUrl,
    title,
    overview,
    voteAvg,
    voteCount,
    popularity,
    releaseDate
}: Movie) {
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
                <button><IoIosAddCircle />Watchlist</button>
            </div>
            <div>
                <p>{overview}</p>
            </div>
        </div>

    </div>
}