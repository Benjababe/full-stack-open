import { useState, useEffect } from 'react';
import axios from 'axios';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from "./components/Persons";

const App = () => {
    const [persons, setPersons] = useState([]);
    const [newName, setNewName] = useState('');
    const [newNumber, setNewNumber] = useState('');
    const [filter, setFilter] = useState('');

    const hookPersons = () => {
        const initPersons = (response) => setPersons(response.data);

        axios
            .get('http://localhost:3001/persons')
            .then(initPersons);
    };

    useEffect(hookPersons, []);

    const handleNewName = (e) => {
        setNewName(e.target.value);
    };

    const handleNewNumber = (e) => {
        setNewNumber(e.target.value);
    }

    const handleFilter = (e) => {
        setFilter(e.target.value.toLowerCase().trim());
    }

    const addNewName = (e) => {
        e.preventDefault();

        if (persons.filter(p => p.name.toLowerCase() === newName.toLowerCase()).length !== 0) {
            alert(`${newName} is already added to phonebook`);
        } else {
            setPersons(persons.concat({ id: persons.length, name: newName.trim(), number: newNumber.trim() }));
            setNewName('');
            setNewNumber('');
        }
    };

    return (
        <div>
            <h1>Phonebook</h1>
            <Filter filter={filter} handleFilter={handleFilter} />
            <h2>Add a new</h2>
            <PersonForm
                addNewname={addNewName}
                newName={newName}
                handleNewName={handleNewName}
                newNumber={newNumber}
                handleNewNumber={handleNewNumber} />
            <h2>Numbers</h2>
            <Persons persons={persons} filter={filter} />
        </div>
    );
};

export default App;