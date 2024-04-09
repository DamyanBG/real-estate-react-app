import { useContext, useEffect, useState } from 'react';
import exampleHomePhoto from '../../images/home-main-photo-example.jpg';
import './Homes.scss';
import './AllHomes.scss';
import Spinner from '../../common/Spinner';
import { Link } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import { HomesContext } from '@/context/HomesContext';
import useUpdateHomes from '@/hooks/useUpdateHomes';
import { useQuery, keepPreviousData, useQueryClient } from '@tanstack/react-query';
import { fetchAllHomes, fetchPaginatedHomes } from '../../common/homesApi';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

export default function AllHomes() {
    const [pageNumber, setPageNumber] = useState(0);
    const queryClient = useQueryClient()
    const { data, isPlaceholderData, isLoading } = useQuery({
        queryKey: ["homes", pageNumber],
        queryFn: () => fetchPaginatedHomes(pageNumber, homesPerPage),
        placeholderData: keepPreviousData,
        staleTime: 5000
    })
    const homes = data?.map((home) => home)
    const updatedHomes = useUpdateHomes()

    // Pagination Configuration
    const homesPerPage = 10;
    const pagesVisited = pageNumber * homesPerPage;
    const pageCount = Math.ceil(homes?.length / homesPerPage);

    // useEffect(() => {
    //     if (!loading) {
    //         const now = new Date()
    //         const toReloadTime = new Date(updated.getTime() + 1 * 60000)
    //         if (now > toReloadTime) {
    //             console.log("old info")
    //             updatedHomes()
    //         }
    //     }
    // }, [loading]);

    useEffect(() => {
        if (!isPlaceholderData) {
            queryClient.prefetchQuery({
                queryKey: ['homes', pageNumber + 1],
                queryFn: () => fetchPaginatedHomes(pageNumber + 1, homesPerPage),
            })
        }
    }, [data, isPlaceholderData, pageNumber, queryClient])

    if (isLoading) {
        return <Spinner/>;
    }
    

    return (
      
        <div className="main-container">
            {homes?.map((h) => (
                <article className="home-container" key={`home-${h.id}`}>
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
                        <Link to={`/home-details?homeId=${h.id}`} className="no-underline">
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


            {/* <ReactPaginate
                previousLabel="Previous"
                nextLabel="Next"
                pageCount={pageCount}
                onPageChange={pageChangeHandler}
                containerClassName="paginationBtns"
                previousLinkClassName="previousBtn"
                nextLinkClassName="nextBtn"
                disabledClassName="paginationDisabled"
                activeClassName="paginationActive"
            /> */}

            <section style={{ display: "flex", alignItems: "center" }}>
                <button
                    type='button'
                    onClick={() => {
                        setPageNumber((old) => Math.max(old - 1, 0))
                        scrollTo(0, 0)
                    }}
                    disabled={pageNumber === 0}
                >
                    Previous
                </button>
                <article>Current page: {pageNumber + 1}</article>
                <button
                    onClick={() => {
                        setPageNumber((old) => old + 1)
                        scrollTo(0, 0)
                    }}
                >
                    Next
                </button>
            </section>
            <ReactQueryDevtools initialIsOpen />
        </div>
    );
}
