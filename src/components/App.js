import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import "./App.css";
import Header from "./Header";
import AddContact from "./AddContact";
import ContactList from "./ContactList";
import ContactDetails from "./ContactDetails";
import EditContact from "./EditContact";

function App() {
  const LOCAL_STORAGE_KEY = "contacts";
  const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  // Load contacts from localStorage
  useEffect(() => {
    const storedContacts = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (storedContacts) setContacts(storedContacts);
  }, []);

  // Save contacts to localStorage
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts));
  }, [contacts]);

  const addContactHandler = (contact) => {
    const request = {
      id: uuidv4(),
      ...contact,
    };
    setContacts([...contacts, request]);
  };

  const updateContactHandler = (updatedContact) => {
    const updatedList = contacts.map((contact) =>
      contact.id === updatedContact.id ? updatedContact : contact
    );
    setContacts(updatedList);
  };

  const removeContactHandler = (id) => {
    const newContactList = contacts.filter((contact) => contact.id !== id);
    setContacts(newContactList);
  };

  const searchHandler = (searchTerm) => {
    setSearchTerm(searchTerm);
    if (searchTerm !== "") {
      const newContactList = contacts.filter((contact) =>
        Object.values(contact).join(" ").toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSearchResults(newContactList);
    } else {
      setSearchResults(contacts);
    }
  };

  return (
    <div className="ui container">
      <Router>
        <Header />
        <Routes>
          <Route
            path="/"
            element={
              <ContactList
                contacts={searchTerm.length < 1 ? contacts : searchResults}
                getContactId={removeContactHandler}
                term={searchTerm}
                searchKeyword={searchHandler}
              />
            }
          />
          <Route
            path="/add"
            element={<AddContact addContactHandler={addContactHandler} />}
          />
          <Route
            path="/contact/:id"
            element={<ContactDetails contacts={contacts} />}
          />
          <Route
            path="/edit/:id"
            element={
              <EditContact
                updateContactHandler={updateContactHandler}
                contacts={contacts}
              />
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
