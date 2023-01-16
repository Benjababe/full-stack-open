import { useState } from 'react'

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

const Button = ({ handleClick, text }) => {
    return (
        <button onClick={handleClick}>
            {text}
        </button>
    );
};

const VoteDisplay = ({ anecdotes, points }) => {
    let mostVoteIndex = 0;
    for (let i in anecdotes) {
        if (points[i] > points[mostVoteIndex])
            mostVoteIndex = i;
    }

    if (points[mostVoteIndex] === 0) {
        return (
            <>
                <h1>Anecdote with most votes</h1>
                <div>No votes have been made yet</div>
            </>
        );
    }

    return (
        <>
            <h1>Anecdote with most votes</h1>
            <div>{anecdotes[mostVoteIndex]}</div>
        </>
    )
};

const App = () => {
    const anecdotes = [
        'If it hurts, do it more often.',
        'Adding manpower to a late software project makes it later!',
        'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
        'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
        'Premature optimization is the root of all evil.',
        'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
        'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
        'The only way to go fast, is to go well.'
    ];

    const [selected, setSelected] = useState(0);
    const [points, setPoints] = useState(Array(anecdotes.length).fill(0));

    const vote = () => {
        const copy = [...points];
        copy[selected] += 1;
        setPoints(copy);
    };

    const nextAnecdote = () => {
        const newIndex = getRndInteger(0, anecdotes.length - 1);
        setSelected(newIndex);
    }

    return (
        <div>
            <h1>Anecdote of the day</h1>
            <div>{anecdotes[selected]}</div>
            <Button handleClick={() => vote()} text="vote" />
            <Button handleClick={() => nextAnecdote()} text="next anecdote" />

            <VoteDisplay anecdotes={anecdotes} points={points} />
        </div>
    );
};

export default App;