import { useState } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from "./components/Persons";

const App = () => {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas', number: '040-123456', id: 1 },
        { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
        { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
        { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
    ]);
    const [newName, setNewName] = useState('');
    const [newNumber, setNewNumber] = useState('');
    const [filter, setFilter] = useState('');

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