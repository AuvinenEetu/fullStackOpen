import { useState, useEffect } from 'react'
import Form from './components/Form'
import Search from './components/Search'
import Phonebook from './components/Phonebook'
import personService from './services/persons'
import Notification from './components/Notification'


const App = () => {

  // state deklaraatiot
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)

  // datan hakeminen json-serveriltä
  useEffect(() => {
    personService
      .getAll()
      .then(persons => {
        setPersons(persons)
      })
  }, [])
  console.log('render', persons.length, 'notes')

  // komponentin tai sovelluksen funktionaalisuus
  const addName = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName,
      number: newNumber
    }

    const existingPerson = persons.find(p => p.name.toLowerCase() === newName.toLowerCase())
    if(existingPerson){
      if(window.confirm(`${newName} is already added, do you want to update the number?`)) {
        const changedPerson = { ...existingPerson, number: newNumber}

        personService
          .updatePerson(changedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(p => p.id !== returnedPerson.id ? p : returnedPerson))
            setNewName('')
            setNewNumber('')
            setErrorMessage(
              `Person ${returnedPerson.name} updated succesfully`
            )
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
          })
          .catch(error => {
            setErrorMessage(`The person ${existingPerson.name} was already removed from the server`)
            setPersons(persons.filter(p => p.id !== existingPerson.id))
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
            console.log(error)
          })
      }
      return
    }
    if(newNumber === ''){
      alert(`please insert a number`)
      return
    }
    if(newName === ''){
      alert(`please insert a name`)
      return
    }
    personService
      .create(nameObject)
      .then(newPerson => {
        setPersons(persons.concat(newPerson))
        setErrorMessage(
          `Person ${newPerson.name} added succesfully`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
    setNewName('')
    setNewNumber('')
  }

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value)
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  const deletePerson = (id) => {
    const person = persons.find(p => p.id === id)
    if(window.confirm(`delete ${person.name}?`)) {
      personService.deletePerson(id)
      .then(() => {
        setPersons(persons.filter(p => p.id !== id))
        setErrorMessage(
          `Person ${person.name} deleted succesfully`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
    }
  }

  // asetetaan searchedListiin joko persons taulukko jos searchTerm tyhjä tai sitten filtteröidään taulukosta termillä ja asetetaan tuloksena tuleva taulukko muuttujaan
  const searchedList = searchTerm === ''
    ? persons
    : persons.filter(person =>
       person.name.toLowerCase().includes(searchTerm.toLowerCase())
      )

  // palautetaan template
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage} />
      <Search 
      searchTerm={searchTerm}
      handleSearchChange={handleSearchChange}
      />
      <h2>Form</h2>
      <Form 
      onSubmit={addName}
      newName={newName}
      handleNameChange={handleNameChange}
      newNumber={newNumber}
      handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Phonebook persons={searchedList} deletePerson={deletePerson}/>

    </div>
  )

}

export default App