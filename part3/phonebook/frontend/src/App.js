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

const AddNew = ({ persons, setPersons, setNotification }) => {
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
            setNotification({
              type: "info",
              message: `Changed ${updatedPerson.name}'s phone number`,
            });
            setTimeout(() => {
              setNotification(null);
            }, 5000);
          })
          .catch((error) => {
            setPersons(persons.filter((p) => p.id !== person.id));
            setNotification({
              type: "error",
              message: `Information of ${person.name} has already been removed from server`,
            });
            setTimeout(() => {
              setNotification(null);
            }, 5000);
          });
      }
    } else {
      const person = {
        name: newName,
        number: newNumber,
      };
      create(person).then((newPerson) => {
        setPersons(persons.concat(newPerson));
        setNewName("");
        setNewNumber("");
        setNotification({
          type: "info",
          message: `Added ${newPerson.name}`,
        });
        setTimeout(() => {
          setNotification(null);
        }, 5000);
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

const Delete = ({ person, persons, setPersons, setNotification }) => {
  const { id } = person;
  const handleClick = () => {
    if (window.confirm(`Delete ${person.name}?`)) {
      delete_(id).then(() => {
        setPersons(persons.filter((person) => person.id !== id));
        setNotification({
          type: "info",
          message: `Deleted ${person.name}`,
        });
        setTimeout(() => {
          setNotification(null);
        }, 5000);
      });
    }
  };

  return <button onClick={handleClick}>delete</button>;
};

const Person = ({ person, persons, setPersons, setNotification }) => {
  return (
    <>
      {person.name} {person.number}{" "}
      <Delete
        person={person}
        persons={persons}
        setPersons={setPersons}
        setNotification={setNotification}
      />
    </>
  );
};

const Persons = ({ persons, filter, setPersons, setNotification }) => {
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
          setNotification={setNotification}
        />
      </div>
    ));
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [filter, setFilter] = useState("");
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    getAll().then((persons) => {
      setPersons(persons);
    });
  }, []);

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification notification={notification} />
      <Filter filter={filter} setFilter={setFilter} />
      <h2>add a new</h2>
      <AddNew
        persons={persons}
        setPersons={setPersons}
        setNotification={setNotification}
      />
      <h2>Numbers</h2>
      <Persons
        persons={persons}
        filter={filter}
        setPersons={setPersons}
        setNotification={setNotification}
      />
    </div>
  );
};

export default App;
