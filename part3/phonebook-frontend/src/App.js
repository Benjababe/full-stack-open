import { useState, useEffect } from 'react';

import personService from './services/persons';

import { SuccessNotification, ErrorNotification } from './components/Notification';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from "./components/Persons";

const App = () => {
    const [persons, setPersons] = useState([]);
    const [newName, setNewName] = useState('');
    const [newNumber, setNewNumber] = useState('');
    const [filter, setFilter] = useState('');
    const [successMsg, setSuccessMsg] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);

    const hookPersons = () => {
        personService
            .getAll()
            .then((persons) => setPersons(persons));
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

    const showSuccess = (msg) => {
        setSuccessMsg(msg);
        setTimeout(() => { setSuccessMsg(null) }, 3000);
    }

    const showError = (msg) => {
        setErrorMsg(msg);
        setTimeout(() => { setErrorMsg(null) }, 3000);
    }

    const updatePersonNumber = (person) => {
        const updatedPerson = { ...person, number: newNumber };

        personService
            .update(person.id, updatedPerson)
            .then((res) => {
                setPersons(persons.map((p) => (p.id === res.id) ? res : p))
                showSuccess(`Updated ${updatedPerson.name}`);

                setNewName('');
                setNewNumber('');
            })
            .catch((err) => {
                const msg = err.response.data;
                showError(msg.error);
            });
    };

    const uploadNewPerson = () => {
        const newPerson = {
            id: persons[persons.length - 1].id + 1,
            name: newName.trim(),
            number: newNumber.trim()
        };

        personService
            .create(newPerson)
            .then((res) => {
                setPersons(persons.concat(res));
                showSuccess(`Added ${newPerson.name}`);

                setNewName('');
                setNewNumber('');
            })
            .catch((err) => {
                const msg = err.response.data;
                showError(msg.error);
            });
    };

    const addNewName = (e) => {
        e.preventDefault();
        const personsFiltered = persons.filter(p => p.name.toLowerCase() === newName.toLowerCase())

        if (personsFiltered.length !== 0) {
            const person = personsFiltered[0];
            if (window.confirm(`${person.name} is already added to the phonebook, replace the old number with a new one?`)) {
                updatePersonNumber(person);
            }

        } else {
            uploadNewPerson();
        }
    };

    const removeName = (id, name) => {
        const removeFromPersons = (id) => {
            setPersons(persons.filter((p) => p.id !== id));
        };

        if (window.confirm(`Delete ${name}?`)) {
            personService
                .remove(id)
                .then((res) => {
                    if (res.status === 204)
                        removeFromPersons(id);
                })
                .catch((err) => {
                    if (err.response.status === 404) {
                        showError(`Information of ${name} has already been removed from server`)
                    }
                })
        }
    };

    return (
        <div>
            <h1>Phonebook</h1>
            <SuccessNotification message={successMsg} />
            <ErrorNotification message={errorMsg} />
            <Filter filter={filter} handleFilter={handleFilter} />
            <h2>Add a new</h2>
            <PersonForm
                addNewname={addNewName}
                newName={newName}
                handleNewName={handleNewName}
                newNumber={newNumber}
                handleNewNumber={handleNewNumber} />
            <h2>Numbers</h2>
            <Persons persons={persons} filter={filter} handleRemove={removeName} />
        </div>
    );
};

export default App;