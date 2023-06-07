import { useState } from "react";

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0));
  const [selected, setSelected] = useState(0);

  const mostVoted = votes
    .map((x, i) => [x, i])
    .reduce((r, a) => (a[0] > r[0] ? a : r))[1];

  function handleVote() {
    const nextVotes = [...votes];
    nextVotes[selected]++;
    setVotes(nextVotes);
  }

  function handleNext() {
    setSelected(Math.floor(Math.random() * anecdotes.length));
  }

  return (
    <div>
      <h2>Anecdote of the day</h2>
      <div>{anecdotes[selected]}</div>
      <div>
        {votes[selected]} vote{votes[selected] > 1 && "s"}
      </div>
      <div>
        <button onClick={handleVote}>vote</button>
        <button onClick={handleNext}>next anecdote</button>
      </div>
      <h2>Anecdote with most votes</h2>
      <div>{anecdotes[mostVoted]}</div>
    </div>
  );
};

export default App;
