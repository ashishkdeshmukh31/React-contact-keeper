import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import "./App.css";
import api from "../api/contacts";
import Header from "./Header";
import AddContact from "./AddContact";
import ContactList from "./ContactList";
import ContactDetails from "./ContactDetails";
import EditContact from "./EditContact";

function App() {
 // const LOCAL_STORAGE_KEY = "contacts";
//  const [contacts, setContacts] = useState(() => {
//    const storedContacts = localStorage.getItem(LOCAL_STORAGE_KEY);
//    return storedContacts ? JSON.parse(storedContacts) : [];
 // });
  const [contacts,setContacts]=useState([]);
  const[searchTerm,setSearchTerm]=useState("");
  const[searchResults,setSearchResults]=useState([]);

  const retrievContacts = async () => {
    const response = await api.get("/contacts");
    return response.data;
  };

  const addContactHandler = async (contact) => {
    const request = {
      id: uuidv4(),
      ...contact,
    };
    const response = await api.post("/contacts", request);
    const newContacts = [...contacts, response.data];
    setContacts(newContacts);
  };

  const removeContactHandler = async (id) => {
    await api.delete(`/contacts/${id}`);
    const newContactList = contacts.filter((contact) => contact.id !== id);
    setContacts(newContactList);
  };

  const updateContactHandler = async (updatedContact) => {
    const response = await api.put(
      `/contacts/${updatedContact.id}`,
      updatedContact
    );
    const updatedList = contacts.map((contact) =>
      contact.id === updatedContact.id ? response.data : contact
    );
    setContacts(updatedList);
  };

  const searchHandler=(searchTerm)=>{
    setSearchTerm(searchTerm);
    if(searchTerm!==""){
      const newContactList =contacts.filter((contact)=>{
        return Object.values(contact).join(" ").toLowerCase().includes(searchTerm.toLowerCase())
      });
      setSearchResults(newContactList);
    }
    else{
      setSearchResults(contacts);
    }
  };

  useEffect(() => {
    const getAllContacts = async () => {
      const allContacts = await retrievContacts();
      if (allContacts) setContacts(allContacts);
    };
    getAllContacts();
  }, []);

  useEffect(() => {
    // localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts));
  }, [contacts]);

  return (
    <div className="ui container">
      <Router>
        <Header />
        <Routes>
          <Route
            path="/"
            element={
              <ContactList
                contacts={searchTerm.length<1 ? contacts:searchResults}
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
