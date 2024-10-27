import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Spinner,
  Button,
  Alert,
  Container,
  Row,
  Col,
  Dropdown,
  DropdownButton,
} from "react-bootstrap";
import NewJokeButton from "./NewJokeButton";
import "./App.css";

const API_URL = "https://official-joke-api.appspot.com/jokes/random";

function App() {
  const [joke, setJoke] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [language, setLanguage] = useState("en");

  useEffect(() => {
    fetchJoke();
  }, []);

  const fetchJoke = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(API_URL);
      setJoke(response.data);
    } catch (err) {
      setError("Failed to load joke. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
  };

  return (
    <Container className="app-container">
      {/* Language Dropdown at the top */}
      <div className="language-dropdown">
        <DropdownButton
          id="dropdown-basic-button"
          title={language === "en" ? "Change Language" : "Cambiar idioma"}
        >
          <Dropdown.Item onClick={() => handleLanguageChange("en")}>
            English
          </Dropdown.Item>
          <Dropdown.Item onClick={() => handleLanguageChange("es")}>
            Español
          </Dropdown.Item>
        </DropdownButton>
      </div>

      {/* Joke and Punchline Layout */}
      <Row className="joke-layout">
        <Col md={6}>
          {loading && (
            <div className="spinner-container">
              <Spinner animation="border" />
            </div>
          )}

          {joke && !loading && (
            <div className="joke-box">
              <h2>{joke.setup}</h2>
            </div>
          )}
        </Col>

        <Col md={3}>
          {joke && !loading && (
            <div className="punchline-box">
              <p>{joke.punchline}</p>
            </div>
          )}
        </Col>
      </Row>

      {error && <Alert className="error-notification">{error}</Alert>}

      {/* New Joke Button */}
      <div className="button-container">
        <NewJokeButton onClick={fetchJoke} language={language} />
      </div>
    </Container>
  );
}

export default App;
