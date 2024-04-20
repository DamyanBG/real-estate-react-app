import { useEffect, useState } from 'react';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useQuery, keepPreviousData, useQueryClient } from '@tanstack/react-query';

import Spinner from '../../common/Spinner';
import { fetchPaginatedHomes } from '../../common/homesApi';
import HomeCard from '../common/HomeCard';

import './AllHomes.scss';
import './Homes.scss';

const searchValuesInitialState = {
    city: '',
    neighborhood: '',
    minPrice: '',
    maxPrice: '',
};

export default function AllHomes() {
    const [pageNumber, setPageNumber] = useState(0);
    const queryClient = useQueryClient();
    const homesPerPage = 10;
    const [isLongLoading, setIsLongLoading] = useState(false);
    const [searchValues, setSearchValues] = useState(searchValuesInitialState);
    const { data, isPlaceholderData, isLoading } = useQuery({
        queryKey: ['homes', pageNumber],
        queryFn: () => fetchPaginatedHomes(pageNumber, homesPerPage),
        placeholderData: keepPreviousData,
        staleTime: 5000,
    });
    const homes = data || [];
    console.log(homes);
    console.log('homes');

    useEffect(() => {
        if (!isPlaceholderData) {
            queryClient.prefetchQuery({
                queryKey: ['homes', pageNumber + 1],
                queryFn: () => fetchPaginatedHomes(pageNumber + 1, homesPerPage),
            });
        }
    }, [data, isPlaceholderData, pageNumber, queryClient]);

    useEffect(() => {
        if (!isLoading) {
            setIsLongLoading(false);
            return;
        }
        const timeOutId = setTimeout(() => {
            console.log('Loading');
            setIsLongLoading(true);
        }, 3000);

        return () => {
            clearTimeout(timeOutId);
        };
    }, [isLoading]);

    const handleSearchChange = (e) => {
        setSearchValues({
            ...searchValues,
            [e.target.name]: e.target.value,
        });
    };

    if (isLoading) {
        return (
            <>
                {isLongLoading && (
                    <h2 style={{ textAlign: 'center', marginTop: '36px' }}>
                        The loading time can be long, because the back end is deployed on free
                        service!
                    </h2>
                )}
                <Spinner />
            </>
        );
    }

    return (
        <section className="main-container">
            <section className="home-search">
                <input
                    name="city"
                    placeholder="City"
                    value={searchValues.city}
                    type="text"
                    onChange={handleSearchChange}
                />
                <input
                    name="neighborhood"
                    placeholder="Neighborhood"
                    value={searchValues.neighborhood}
                    type="text"
                    onChange={handleSearchChange}
                />
                <input
                    name="minPrice"
                    placeholder="Min. Price"
                    value={searchValues.minPrice}
                    type="text"
                    onChange={handleSearchChange}
                />
                <input
                    name="maxPrice"
                    placeholder="Max. Price"
                    value={searchValues.maxPrice}
                    type="text"
                    onChange={handleSearchChange}
                />
                <select name="sortBy">
                    <option value="">Sort by</option>
                </select>
                <button>
                    Search
                </button>
            </section>
            <section className="homes-list-container">
                {homes?.map((home) => (
                    <HomeCard
                        key={home.id}
                        homeId={home.id}
                        photoUrl={home.photo_url}
                        city={home.city}
                        neighborhood={home.neighborhood}
                        title={home.title}
                        description={home.description}
                        price={home.price}
                    />
                ))}
            </section>

            <section style={{ display: 'flex', alignItems: 'center' }}>
                <button
                    type="button"
                    onClick={() => {
                        setPageNumber((old) => Math.max(old - 1, 0));
                        scrollTo(0, 0);
                    }}
                    disabled={pageNumber === 0}
                >
                    Previous
                </button>
                <article>Current page: {pageNumber + 1}</article>
                <button
                    onClick={() => {
                        setPageNumber((old) => old + 1);
                        scrollTo(0, 0);
                    }}
                >
                    Next
                </button>
            </section>
            <ReactQueryDevtools initialIsOpen />
        </section>
    );
}
