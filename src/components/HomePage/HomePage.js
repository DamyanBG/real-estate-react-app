import { useEffect, useState } from "react"
import "./HomePage.scss"
import { hostUrl } from "../../common/urls"

export default function HomePage() {
    const [homes, setHomes] = useState([])

    useEffect(() => {
        fetchAllHomes()
    }, [])

    const fetchAllHomes = () => {
        fetch(`${hostUrl}/homes`)
            .then(resp => resp.json())
            .then(setHomes)
    }

    return (
        <div className="home-articles-container">
            {
                homes.map((h) => (
                    <article className="home-article">
                        <h4>{h.name}</h4>
                        <p>Address: {h.place}</p>
                        <p>Price: {h.price}</p>
                    </article>
                ))
            }
        </div>
    )
}