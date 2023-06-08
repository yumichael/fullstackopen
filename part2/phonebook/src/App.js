import { useState, useEffect } from "react";
import axios from "axios";

const Filter = ({ filter, setFilter }) => {
  const handleChange = (event) => {
    setFilter(event.target.value);
  };

  return (
    <div>
      filter shown with <input value={filter} onChange={handleChange} />
    </div>
  );
};

const AddNew = ({ persons, setPersons }) => {
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const addPerson = (event) => {
    event.preventDefault();
    if (persons.map((person) => person.name).includes(newName)) {
      alert(`${newName} is already added to phonebook`);
      return;
    }
    const person = {
      name: newName,
      number: newNumber,
    };
    setPersons(persons.concat(person));
    setNewName("");
  };

  return (
    <form>
      <div>
        name: <input value={newName} onChange={handleNameChange} />
      </div>
      <div>
        number: <input value={newNumber} onChange={handleNumberChange} />
      </div>
      <div>
        <button type="submit" onClick={addPerson}>
          add
        </button>
      </div>
    </form>
  );
};

const Person = ({ person }) => {
  return (
    <>
      {person.name} {person.number}
    </>
  );
};

const Persons = ({ persons, filter }) => {
  return persons
    .filter((person) =>
      person.name.toLowerCase().startsWith(filter.toLowerCase())
    )
    .map((person) => (
      <div key={person.name}>
        <Person person={person} />
      </div>
    ));
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3001/db").then((response) => {
      setPersons(response.data.persons);
    });
  }, []);

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter filter={filter} setFilter={setFilter} />
      <h2>add a new</h2>
      <AddNew persons={persons} setPersons={setPersons} />
      <h2>Numbers</h2>
      <Persons persons={persons} filter={filter} />
    </div>
  );
};

export default App;
