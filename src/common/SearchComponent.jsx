import { useState } from 'react';

const searchValuesInitialState = {
    city: '',
    neighborhood: '',
    minPrice: '',
    maxPrice: '',
};

export default function SearchComponent({ data }) {
    const [filteredHomes, setFitleredHomes] = useState(data);
    const [searchValues, setSearchValues] = useState(searchValuesInitialState);

    const handleSearchChange = (e) => {
        setSearchValues({
            ...searchValues,
            [e.target.name]: e.target.value,
        });
    };

    function handleSubmitResult(e) {
        e.preventDefault();
        if (
            searchValues.city !== '' ||
            searchValues.neighborhood !== '' ||
            searchValues.maxPrice !== '' ||
            searchValues.minPrice !== ''
        ) {
            let filtered = filteredHomes.filter((home) => {             
                return (
                    home.city.toLowerCase().includes(searchValues.city.toLowerCase()) &&
                    home.neighborhood
                        .toLowerCase()
                        .includes(searchValues.neighborhood.toLowerCase()) &&
                    home.price >= searchValues.minPrice &&
                    home.price < searchValues.maxPrice
                );
            });
           
            setFitleredHomes(filtered);
        } else {
            setFitleredHomes(data);
        }
    }

    return (
        <section className="home-search">
            <form onSubmit={handleSubmitResult}>
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
                <button>Search</button>
            </form>
        </section>
    );
}
