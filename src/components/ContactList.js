import React, { useRef } from "react";
import { Link } from "react-router-dom";
import ContactCard from "./ContactCard";

const ContactList = (props) => {
  const inputEl = useRef("");

  const deleteContactHandler = (id) => {
    props.getContactId(id);
  };

  const getSearchTerm = () => {
    props.searchKeyword(inputEl.current.value);
  };

  const renderContactList = props.contacts.map((contact) => {
    return (
      <ContactCard
        contact={contact}
        key={contact.id}
        clickHandler={deleteContactHandler}
      />
    );
  });

  return (
    <div style={{ marginTop: "20px" }}>

      <div
        className="ui grid"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "5px",
        }}
      >
        <div style={{ flex: 1, textAlign: "left", marginTop: "50px" }}>
          <h2 style={{ margin: 0 }}>Contact List</h2>
        </div>
        <div style={{ flex: 1, textAlign: "right", marginTop: "50px" }}>
          <Link to="/add">
            <button className="ui button blue right">Add Contact</button>
          </Link>
        </div>
      </div>


      <div className="ui search" style={{ margin: "20px 0" }}>
        <div className="ui icon input" style={{ width: "100%" }}>
          <input
            ref={inputEl}
            type="text"
            placeholder="Search Contacts"
            className="prompt"
            value={props.term}
            onChange={getSearchTerm}
          />
          <i className="search icon"></i>
        </div>
      </div>

      <div className="ui celled list">
        {renderContactList.length > 0 ? renderContactList : "No Contacts Available"}
      </div>
    </div>
  );
};

export default ContactList;
