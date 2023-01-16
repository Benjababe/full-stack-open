import { useState, useEffect } from 'react';
import axios from 'axios';
import Filter from './components/Filter';
import CountryList from "./components/CountryList";

const App = () => {
    const [countries, setCountries] = useState([]);
    const [filter, setFilter] = useState('');

    const hookCountries = () => {
        const initCountries = (response) => setCountries(response.data);

        axios
            .get('https://restcountries.com/v3.1/all')
            .then(initCountries);
    };

    useEffect(hookCountries, []);

    const handleFilter = (e) => {
        setFilter(e.target.value.toLowerCase().trim());
    }

    return (
        <div>
            <Filter filter={filter} handleFilter={handleFilter} />
            <CountryList countries={countries} filter={filter} setFilter={setFilter} />
        </div>
    );
};

export default App;