import { useEffect, useState } from 'react';
import { hostUrl } from '../../common/urls';
import exampleHomePhoto from '../../images/home-main-photo-example.jpg';
import './Homes.scss';
import './AllHomes.scss';
import { Link } from 'react-router-dom';
import ReactPaginate from 'react-paginate';

export default function AllHomes() {
    const [homes, setHomes] = useState([]);

    // Pagination Configuration
    const [pageNumber, setPageNumber] = useState(0);
    const homesPerPage = 10;
    const pagesVisited = pageNumber * homesPerPage;
    const pageCount = Math.ceil(homes.length / homesPerPage);

    const pageChangeHandler = ({ selected }) => {
        setPageNumber(selected);
    };

    useEffect(() => {
        fetchAllHomes();
    }, []);

    const fetchAllHomes = () => {
        fetch(`${hostUrl}/homes`)
            .then((resp) => resp.json())
            .then((json) => {
                console.log(json);
                setHomes(json);
            });
    };

    return (
        <div className="main-container">
            {homes.slice(pagesVisited, pagesVisited + homesPerPage).map((h) => (
                <article className="home-container" key={`home-${h._id}`}>
                    <div className="image-container">
                        <img
                            className="all-homes-image"
                            src={h.photo_url}
                            onError={(e) => {
                                e.target.onError = null;
                                e.target.src = exampleHomePhoto;
                            }}
                            alt="Home"
                        />
                    </div>
                    <div className="main-text">
                        <Link to={`/home-details?homeId=${h._id}`} className="no-underline">
                            <h3>{h.title}</h3>
                        </Link>
                        <p className="main-text-par">Location: {h.city}</p>
                        <p>Price: {h.price}</p>
                    </div>
                    <div className="description-text">
                        <p className="description-text-par">{h.description}</p>
                    </div>
                </article>
            ))}

            {homes.length > 10 && (
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
