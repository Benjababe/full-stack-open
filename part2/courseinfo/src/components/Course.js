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

const Content = ({ parts }) => {
    return (
        <div>
            {parts.map((p) => <Part key={p.id} name={p.name} exercises={p.exercises} />)}
        </div>
    );
};

const Total = ({ parts }) => {
    return (
        <b>total of {parts.reduce((s, p) => (s + p.exercises), 0)} exercises</b>
    );
}

const Course = ({ course }) => {
    return (
        <div>
            <Header course={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </div>
    );
};

export default Course;