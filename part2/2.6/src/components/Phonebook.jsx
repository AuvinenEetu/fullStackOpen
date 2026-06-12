import Person from "./Person"
const Phonebook = ({persons, deletePerson}) => {
    return(
    <div>
    {persons.map((person )=>
      <div key={person.id}>
        <Person name={person.name} number={person.number} deletePerson={deletePerson}/>  
        <button onClick={() => deletePerson(person.id)}>delete</button>
      </div>
      )}
    </div>
    )
}


export default Phonebook