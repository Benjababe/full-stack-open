import { useState } from 'react'

const Button = ({ handleClick, text }) => {
    return (
        <button onClick={handleClick}>
            {text}
        </button>
    );
};

const StatisticLine = ({ name, value, isPercent }) => {
    return (
        <tr>
            <td>{name}</td>
            <td>{value} {(isPercent) ? "%" : ""}</td>
        </tr>
    );
};

const Statistics = ({ good, neutral, bad }) => {
    if ((good + neutral + bad) === 0) {
        return <div>No feedback given</div>;
    }
    return (
        <table>
            <StatisticLine name="good" value={good} />
            <StatisticLine name="neutral" value={neutral} />
            <StatisticLine name="bad" value={bad} />
            <StatisticLine name="all" value={good + neutral + bad} />
            <StatisticLine name="average" value={(good - bad) / (good + neutral + bad)} />
            <StatisticLine name="positive" value={good * 100 / (good + neutral + bad)} isPercent="true" />
        </table>
    );
};

const App = () => {
    // save clicks of each button to its own state
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    return (
        <div>
            <h1>give feedback</h1>
            <Button handleClick={() => setGood(good + 1)} text="good" />
            <Button handleClick={() => setNeutral(neutral + 1)} text="neutral" />
            <Button handleClick={() => setBad(bad + 1)} text="bad" />

            <h1>statistics</h1>
            <Statistics good={good} neutral={neutral} bad={bad} />
        </div>
    )
};

export default App