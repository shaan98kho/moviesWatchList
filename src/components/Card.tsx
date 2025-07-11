
import { FaStar } from "react-icons/fa"
import { PiImageBrokenFill } from "react-icons/pi"
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
    return <div>
        {imgUrl? <img src={imgUrl} /> : <PiImageBrokenFill />}
        <div>
            <h3>{title}<span><FaStar />{voteAvg}</span></h3>
            <div>
                <span></span>
                <span></span>
                <button>Watchlist</button>
            </div>
            <div>
                <p>{overview}</p>
            </div>
        </div>

    </div>
}