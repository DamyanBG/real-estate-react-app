import { useEffect, useState } from 'react';
import { hostUrl } from '../../common/urls';
import { Link } from 'react-router-dom';
// import exampleLandPhoto from '../../images/3333214_105132040_big.jpg';
import ReactPaginate from 'react-paginate';
import './AllLands.scss';

export default function AllLands() {
    const [lands, setLands] = useState([]);

    // Pagination Configuration
    const [pageNumber, setPageNumber] = useState(0);
    const landsPerPage = 10;
    const pagesVisited = pageNumber * landsPerPage;
    const pageCount = Math.ceil(lands.length / landsPerPage);

    const pageChangeHandler = ({ selected }) => {
        setPageNumber(selected);
    };

    const fetchAllLands = () => {
        fetch(`${hostUrl}/lands`)
            .then((resp) => resp.json())
            .then((json) => {
                console.log(json);
                setLands(json);
            });
    };

    useEffect(fetchAllLands, []);

    return (
        <div className="main-container">
            {lands.slice(pagesVisited, pagesVisited + landsPerPage).map((h) => (
                <article className="home-container" key={`home-${h.id}`}>
                    <div className="image-container">
                        <img className="all-homes-image" src={h.photo_url} alt="Home" />
                    </div>
                    <div className="main-text">
                        <Link to={`/land-details?landId=${h.id}`} className="no-underline">
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

            {lands.length > 10 && (
                <ReactPaginate
                    previousLabel="Previous"
                    nextLabel="Next"
                    pageCount={pageCount}
                    onPageChange={pageChangeHandler}
                    containerClassName="paginationBtns"
                    previousLinkClassName="previousBtn"
                    nextLinkClassName="nextBtn"
                    disabledClassName="paginationDisabled"
                    activeClassName="paginationActive"
                />
            )}
        </div>
    );
}
