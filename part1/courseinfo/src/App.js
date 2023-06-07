const course = "Half Stack application development";
const part1 = "Fundamentals of React";
const exercises1 = 10;
const part2 = "Using props to pass data";
const exercises2 = 7;
const part3 = "State of a component";
const exercises3 = 14;

const Header = ({ course }) => {
  return <h1>{course}</h1>;
};

const Part = ({ part, exercises_count }) => {
  return (
    <p>
      {part} {exercises_count}
    </p>
  );
};

const Content = () => {
  return (
    <div>
      <Part part={part1} exercises_count={exercises1} />
      <Part part={part2} exercises_count={exercises2} />
      <Part part={part3} exercises_count={exercises3} />
    </div>
  );
};

const Total = ({ total }) => {
  return <p>Number of exercises {total}</p>;
};

const App = () => {
  return (
    <div>
      <Header course={course} />
      <Content />
      <Total total={exercises1 + exercises2 + exercises3} />
    </div>
  );
};

export default App;
