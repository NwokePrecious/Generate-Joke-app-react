import React from "react";
import { Button } from "react-bootstrap";

const NewJokeButton = ({ onClick, language }) => {
  return (
    <Button variant="primary" onClick={onClick}>
      {language === "en" ? "Get Another Joke" : "Obtener otro chiste"}
    </Button>
  );
};

export default NewJokeButton;
