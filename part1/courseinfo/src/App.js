const Header = ({ course }) => {
  return <h1>{course.name}</h1>;
};

const Part = ({ part, exercises_count }) => {
  return (
    <p>
      {part} {exercises_count}
    </p>
  );
};

const Content = ({ parts }) => {
  return (
    <div>
      <Part part={parts[0].name} exercises_count={parts[0].exercises} />
      <Part part={parts[1].name} exercises_count={parts[1].exercises} />
      <Part part={parts[2].name} exercises_count={parts[2].exercises} />
    </div>
  );
};

const Total = ({ parts }) => {
  const total = parts[0].exercises + parts[1].exercises + parts[2].exercises;
  return <p>Number of exercises {total}</p>;
};

const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
      },
      {
        name: "State of a component",
        exercises: 14,
      },
    ],
  };

  return (
    <div>
      <Header course={course} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};

export default App;
