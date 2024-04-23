import SortBy from './SortBy';
import './SortByOptions.scss';

export default function SortByOptions(){
    return(
        <div className="sort-by-options-container">
          <SortBy options={[
               { value: "name-asc", label: "Sort by name (A-Z)" },
               { value: "name-desc", label: "Sort by name (Z-A)" },
               { value: "price-asc", label: "Sort by price (low first)" },
               { value: "price-desc", label: "Sort by price (high first)" },
               { value: "neighborhood-asc", label: "Sort by neighborhood (A-Z)" },
               { value: "neighborhood-desc", label: "Sort by neighborhood (Z-A)" },
          ]}/>
        </div>
    );
}