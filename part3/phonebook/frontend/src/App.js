import { useState, useEffect } from "react";
import { getAll, create, delete_, update } from "./services/persons";

const Notification = ({ notification }) => {
  return (
    notification && (
      <div className={notification.type}>{notification.message}</div>
    )
  );
};

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

const AddNew = ({ persons, setPersons, flashNotification }) => {
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
    const existingPerson = persons.find((person) => person.name === newName);
    if (existingPerson) {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        const person = {
          ...existingPerson,
          number: newNumber,
        };
        update(person.id, person)
          .then((updatedPerson) => {
            setPersons(
              persons.map((p) =>
                p.id === updatedPerson.id ? updatedPerson : p
              )
            );
            setNewName("");
            setNewNumber("");
            flashNotification({
              type: "info",
              message: `Changed ${updatedPerson.name}'s phone number`,
            });
          })
          .catch((error) => {
            setPersons(persons.filter((p) => p.id !== person.id));
            flashNotification({
              type: "error",
              message: `Information of ${person.name} has already been removed from server`,
            });
          });
      }
    } else {
      const person = {
        name: newName,
        number: newNumber,
      };
      create(person)
        .then((newPerson) => {
          setPersons(persons.concat(newPerson));
          setNewName("");
          setNewNumber("");
          flashNotification({
            type: "info",
            message: `Added ${newPerson.name}`,
          });
        })
        .catch((error) => {
          flashNotification({
            type: "error",
            message: error.response.data.error,
          });
        });
    }
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

const Delete = ({ person, persons, setPersons, flashNotification }) => {
  const { id } = person;
  const handleClick = () => {
    if (window.confirm(`Delete ${person.name}?`)) {
      delete_(id).then(() => {
        setPersons(persons.filter((person) => person.id !== id));
        flashNotification({
          type: "info",
          message: `Deleted ${person.name}`,
        });
      });
    }
  };

  return <button onClick={handleClick}>delete</button>;
};

const Person = ({ person, persons, setPersons, flashNotification }) => {
  return (
    <>
      {person.name} {person.number}{" "}
      <Delete
        person={person}
        persons={persons}
        setPersons={setPersons}
        flashNotification={flashNotification}
      />
    </>
  );
};

const Persons = ({ persons, filter, setPersons, flashNotification }) => {
  return persons
    .filter((person) =>
      person.name.toLowerCase().startsWith(filter.toLowerCase())
    )
    .map((person) => (
      <div key={person.id}>
        <Person
          person={person}
          persons={persons}
          setPersons={setPersons}
          flashNotification={flashNotification}
        />
      </div>
    ));
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [filter, setFilter] = useState("");
  const [notification, setNotification] = useState(null);
  const [clearNotification, setClearNotification] = useState(null);

  useEffect(() => {
    getAll().then((persons) => {
      setPersons(persons);
    });
  }, []);

  const flashNotification = ({ type, message }) => {
    setNotification({
      type,
      message,
    });
    if (clearNotification !== null) {
      clearTimeout(clearNotification);
    }
    const newClearNotification = setTimeout(() => {
      setNotification(null);
    }, 5000);
    setClearNotification(newClearNotification);
  };

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification notification={notification} />
      <Filter filter={filter} setFilter={setFilter} />
      <h2>add a new</h2>
      <AddNew
        persons={persons}
        setPersons={setPersons}
        flashNotification={flashNotification}
      />
      <h2>Numbers</h2>
      <Persons
        persons={persons}
        filter={filter}
        setPersons={setPersons}
        flashNotification={flashNotification}
      />
    </div>
  );
};

export default App;
