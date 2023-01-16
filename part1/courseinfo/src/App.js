const Header = ({ course }) => {
    return (
        <h1>{course}</h1>
    );
};

const Part = ({ name, exercises }) => {
    return (
        <p>{name} {exercises}</p>
    );
};

const Content = (props) => {
    let partArr = [];

    for (let { name, exercises } of props.parts) {
        partArr.push((
            <Part name={name} exercises={exercises} />
        ));
    }

    return (
        <div>
            {partArr}
        </div>
    );
};

const Total = ({ parts }) => {
    let exerciseSum = 0;

    for (let { exercises } of parts) {
        exerciseSum += exercises;
    }

    return (
        <p>Number of exercises: {exerciseSum}</p>
    );
}

const App = () => {
    const course = {
        name: 'Half Stack application development',
        parts: [
            {
                name: 'Fundamentals of React',
                exercises: 10
            },
            {
                name: 'Using props to pass data',
                exercises: 7
            },
            {
                name: 'State of a component',
                exercises: 14
            }
        ]
    }

    return (
        <div>
            <Header course={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </div>
    );
};

export default App;