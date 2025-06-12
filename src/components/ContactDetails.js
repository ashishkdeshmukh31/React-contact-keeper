import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import user from '../images/user.png';

const ContactDetails = ({ contacts }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const contact = contacts.find((contact) => contact.id === id);

  if (!contact) return <div>Contact not found</div>;

  return (
    <div className="main" style={{ marginTop: '50px' }}>
      <div className="ui card centered">
        <div className="image">
          <img src={user} alt="user" />
        </div>
        <div className="content">
          <div className="header">{contact.name}</div>
          <div className="description">{contact.email}</div>
        </div>
      </div>

      <div className="center-div" style={{ textAlign: 'center', marginTop: '20px' }}>
        <button className="ui button blue" onClick={() => navigate('/')}>
          Back to Contact List
        </button>
      </div>
    </div>
  );
};

export default ContactDetails;
