import React from "react";
import { useNavigate } from "react-router-dom";
import user from "../images/user1.png";

const ContactCard = (props) => {
  const { id, name, email } = props.contact;
  const navigate = useNavigate();

  return (
    <div className="item" style={{ padding: "10px 0" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <img
          className="ui avatar image"
          src={user}
          alt="user"
          style={{ marginRight: "1rem" }}
        />

        <div
          style={{ flexGrow: 1, cursor: "pointer" }}
          onClick={() => navigate(`/contact/${id}`)}
        >
          <div className="header">{name}</div>
          <div>{email}</div>
        </div>
        <i
          className="edit alternate outline icon"
          style={{
            color: "blue",
            cursor: "pointer",
            fontSize: "1.2rem",
            marginLeft: "1rem",
          }}
          onClick={() => navigate(`/edit/${id}`)}
        ></i>

        <i
          className="trash alternate outline icon"
          style={{
            color: "red",
            cursor: "pointer",
            fontSize: "1.2rem",
            marginLeft: "1rem",
          }}
          onClick={() => props.clickHandler(id)}
        ></i>
      </div>
    </div>
  );
};

export default ContactCard;
