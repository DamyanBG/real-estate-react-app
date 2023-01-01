import { useEffect, useState } from "react";
import { hostUrl } from "../../common/urls";
import { Link } from "react-router-dom"
import exampleLandPhoto from "../../images/3333214_105132040_big.jpg"

export default function AllLands() {
  const [lands, setLands] = useState([]);

  const fetchAllLands = () => {
    fetch(`${hostUrl}/lands`)
      .then((resp) => resp.json())
      .then((json) => {
        console.log(json);
        setLands(json);
      });
  };

  useEffect(fetchAllLands)

  return (
    <div>
      {lands.map((h) => (
        <article className="home-container" key={`home-${h._id}`}>
          <div className="image-container">
            <img
              className="all-homes-image"
              src={exampleLandPhoto}
              alt="Home"
            />
          </div>
          <div className="main-text">
            <Link to={`/land-details?landId=${h._id}`} className="no-underline">
              <h3>{h.name}</h3>
            </Link>
            <p>Location: {h.place}</p>
            <p>Price: {h.price}</p>
          </div>
          <div className="description-text">
            <p>{h.description}</p>
          </div>
        </article>
      ))}
    </div>
  );
}
