import { useSearchParams } from "react-router-dom";
import Select from '../common/Select';

export default function SortBy({options}){
    const [searchParams, setSearchParams] = useSearchParams();
    const sortByValue = searchParams.get("sortBy") || "";

    const updateSearchquery = (newQuery) => {
        setSearchParams({ query: newQuery });
        // searchParams.set('sortBy', e.target.value);
        // setSearchParams(searchParams);
 
     }

     return(
        <Select options={options} type='white' value={sortByValue} onChange={(e) => updateSearchquery(e.target.value)}/>
    );

}