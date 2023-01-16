import { useState, useEffect } from 'react';
import env from 'react-dotenv';
import axios from 'axios';

const CountryLanguages = ({ languages }) => {
    return (
        Object.keys(languages).map((l) => <li key={l}>{languages[l]}</li>)
    );
};

const CapitalWeather = ({ capital, weather, setWeather }) => {
    const hookWeather = () => {
        const updateWeather = (res) => {
            const weather = res.data.data.current_condition[0];
            setWeather({
                temp: weather.temp_C,
                icon: weather.weatherIconUrl[0].value,
                wind: weather.windspeedKmph
            })
        };

        axios
            .get(`https://api.worldweatheronline.com/premium/v1/weather.ashx?key=${env.WEATHER_KEY}&q=${capital}&format=json`)
            .then(updateWeather);
    };

    useEffect(hookWeather, [capital, setWeather]);

    return (
        <>
            <div>temperature {weather.temp} Celcius</div>
            <img src={weather.icon} alt={`${capital} weather icon`}></img>
            <div>wind {weather.wind} km/h</div>
        </>
    );
};

const CountryInfo = ({ country }) => {
    const [weather, setWeather] = useState({ temp: 0, icon: '', wind: 0 });

    return (<>
        <h1>{country.name.common}</h1>
        <div>capital {country.capital.join(",")}</div>
        <div>area {country.area}</div>
        <h3>languages:</h3>
        <ul>
            <CountryLanguages languages={country.languages} />
        </ul>
        <img src={country.flags.png} alt={`${country.name.common} flag`}></img>

        <h2>Weather in {country.capital}</h2>
        <CapitalWeather capital={country.capital} weather={weather} setWeather={setWeather} />
    </>);
};

const CountryList = ({ countries, filter, setFilter }) => {
    const filteredCountries = countries.filter((c) =>
        c.name.common.toLowerCase().includes(filter)
    );

    if (filteredCountries.length > 10) {
        return (<div>Too many matches, specify another filter</div>);
    }

    else if (filteredCountries.length > 1) {
        return (<>{filteredCountries.map((c) =>
            <div key={c.name.common}>
                {c.name.common}
                <button onClick={() => setFilter(c.name.common.toLowerCase())}>show</button>
            </div>)
        }</>);
    }

    else if (filteredCountries.length === 1) {
        const country = filteredCountries[0];
        return (<CountryInfo country={country} />);
    }
}

export default CountryList;