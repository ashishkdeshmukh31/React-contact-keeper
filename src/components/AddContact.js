import React from "react";
import { useNavigate } from "react-router-dom";

function AddContact(props) {
  const navigate = useNavigate();
  const [formData, setFormData] = React.useState({ name: "", email: "" });

  const add = (e) => {
    e.preventDefault();
    const { name, email } = formData;

    if (name === "" || email === "") {
      alert("All fields are mandatory!");
      return;
    }

    props.addContactHandler({ name, email });
    setFormData({ name: "", email: "" });
    navigate("/");
  };

  return (
    <div className="ui main">
      <br />
      <h2>Add Contact</h2>
      <form className="ui form" onSubmit={add}>
        <div className="field">
          <label>Name</label>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={(e) =>
              setFormData({ ...formData, name: e.target.value })
            }
          />
        </div>
        <div className="field">
          <label>Email</label>
          <input
            type="text"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
        </div>
        <button className="ui button blue">Add</button>
      </form>
    </div>
  );
}

export default AddContact;
