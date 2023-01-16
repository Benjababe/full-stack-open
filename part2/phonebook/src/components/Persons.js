const Person = ({ name, number }) => {
    return (
        <div>{name} {number}</div>
    );
}

const Persons = ({ persons, filter }) => {
    return (
        <>
            {persons
                .filter((p) => p.name.toLowerCase().includes(filter))
                .map((p, i) =>
                    <Person key={i} name={p.name} number={p.number} />
                )
            }
        </>
    );
};

export default Persons;