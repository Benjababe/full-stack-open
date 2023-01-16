const Person = ({ id, name, number, handleRemove }) => {
    return (
        <div>
            {name} {number}
            <button onClick={() => handleRemove(id, name)}>delete</button>
        </div>
    );
}

const Persons = ({ persons, filter, handleRemove }) => {
    return (
        <>
            {persons
                .filter((p) => p.name.toLowerCase().includes(filter))
                .map((p, i) =>
                    <Person
                        key={i}
                        id={p.id}
                        name={p.name}
                        number={p.number}
                        handleRemove={handleRemove}
                    />
                )
            }

        </>
    );
};

export default Persons;