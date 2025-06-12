import React from "react";
import { useNavigate, useParams } from "react-router-dom";

function EditContact({ contacts, updateContactHandler }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const contact = contacts.find((c) => c.id === id);

  const [formData, setFormData] = React.useState({
    id: contact?.id || "",
    name: contact?.name || "",
    email: contact?.email || "",
  });

  const update = (e) => {
    e.preventDefault();
    const { name, email } = formData;

    if (name === "" || email === "") {
      alert("All fields are mandatory!");
      return;
    }

    updateContactHandler(formData); 
    navigate("/"); 
  };

  return (
    <div className="ui main">
      <br />
      <h2>Edit Contact</h2>
      <form className="ui form" onSubmit={update}>
        <div className="field">
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={(e) =>
              setFormData({ ...formData, name: e.target.value })
            }
          />
        </div>
        <div className="field">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
        </div>
        <button className="ui button blue">Update</button>
      </form>
    </div>
  );
}

export default EditContact;
