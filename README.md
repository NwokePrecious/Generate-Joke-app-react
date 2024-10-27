Your full name - Nwoke Precious

Your course implementation (Joensuu EN)

A list of all the resources that you have used to complete the exam. This includes all URLs and, in case you use AI, the conversation or shared link to the conversation.

ChatGPT conversation link https://chatgpt.com/c/671b778f-3664-8009-b071-d835012f47c8

You are asked to create a React web app that displays a random joke. The joke is retrieved from the Official Joke API (https://github.com/15Dkatz/official_joke_api). PLEASE READ ALL THE REQUIREMENTS CAREFULLY

A random joke is obtained every time the URL https://official-joke-api.appspot.com/random_joke is accessed via HTTP GET.

This API returns a joke in JSON format that has two parts: a setup (question), and a punchline (“funny” response). You can just click in the previous URL to see what it looks like. The app should show both parts of the joke in a layout similar to the one presented in the screenshot.

Besides loading a random joke when the web app is accessed, there should be a button with the text “Get Another Joke” that uses the REST API again to retrieve another joke and display it in place of the old one. This button should be implemented as a separate component named NewJokeButton

Moreover, the web app should be styled using React Bootstrap components and CSS.

Additional requirements:

The app shows a spinner animation while a joke is loading.

The app shows an error notification in the bottom left corner of the page when there is an error retrieving the joke from the REST API or there is any other problem in this step

The app has a button to change languages. There should be two languages available: English, and any other language that you choose. The only text that needs to be available in the two languages is the one in the two buttons “Get Random joke” and “Change language”.

The app should be responsive and should be able to be consumed from mobile phones and tablets.

please take note i am making use of react vite

ChatGPT said:
ChatGPT
Here's a step-by-step guide on creating the requested React web app using React Vite, react-bootstrap for styling, and handling API calls and error management.

Project Setup
Initialize Vite Project

bash
Copy code
npm create vite@latest joke-app --template react
cd joke-app
npm install
Install Dependencies Install react-bootstrap and bootstrap for styling, as well as axios for making HTTP requests.

bash
Copy code
npm install react-bootstrap bootstrap axios
Import Bootstrap Styles Add the following line to main.jsx to apply Bootstrap styles globally:

javascript
Copy code
import 'bootstrap/dist/css/bootstrap.min.css';
File Structure
The following components are needed:

App.jsx: Main app component to handle the joke and error states, along with the language toggle.
NewJokeButton.jsx: Button component to fetch a new joke.
ErrorNotification.jsx: Notification component to show error messages.

1. Create App.jsx
   Here’s the main component where we handle the joke fetching logic, error handling, and language toggling.

javascript
Copy code
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Button, Spinner, Alert } from 'react-bootstrap';
import NewJokeButton from './components/NewJokeButton';
import ErrorNotification from './components/ErrorNotification';

const App = () => {
const [joke, setJoke] = useState({ setup: '', punchline: '' });
const [loading, setLoading] = useState(false);
const [error, setError] = useState('');
const [language, setLanguage] = useState('en');

// Fetch random joke function
const fetchJoke = async () => {
setLoading(true);
setError('');
try {
const response = await axios.get('https://official-joke-api.appspot.com/random_joke');
setJoke({ setup: response.data.setup, punchline: response.data.punchline });
} catch (err) {
setError('Failed to load joke. Please try again.');
} finally {
setLoading(false);
}
};

// Fetch joke on initial render
useEffect(() => {
fetchJoke();
}, []);

// Toggle language
const toggleLanguage = () => {
setLanguage((prevLang) => (prevLang === 'en' ? 'es' : 'en'));
};

return (
<Container className="d-flex flex-column align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
<h1 className="mb-4">Random Joke Generator</h1>
{loading ? (
<Spinner animation="border" />
) : (
<>
<div className="joke-container text-center">
<p><strong>{joke.setup}</strong></p>
<p>{joke.punchline}</p>
</div>
<NewJokeButton fetchJoke={fetchJoke} language={language} />
</>
)}
<Button variant="secondary" onClick={toggleLanguage} className="mt-3">
{language === 'en' ? 'Change Language' : 'Cambiar Idioma'}
</Button>
{error && <ErrorNotification message={error} />}
</Container>
);
};

export default App; 2. Create NewJokeButton.jsx
This component renders the button to fetch a new joke, displaying the text based on the selected language.

javascript
Copy code
import React from 'react';
import { Button } from 'react-bootstrap';

const NewJokeButton = ({ fetchJoke, language }) => {
return (
<Button variant="primary" onClick={fetchJoke} className="mt-4">
{language === 'en' ? 'Get Another Joke' : 'Obtener Otro Chiste'}
</Button>
);
};

export default NewJokeButton; 3. Create ErrorNotification.jsx
This component handles error notifications.

javascript
Copy code
import React from 'react';
import { Alert } from 'react-bootstrap';

const ErrorNotification = ({ message }) => {
return (
<Alert variant="danger" style={{ position: 'fixed', bottom: '20px', left: '20px', zIndex: 1000 }}>
{message}
</Alert>
);
};

export default ErrorNotification;
Styling (Optional CSS)
Add some basic styling to make it look clean. Create a styles.css file in the src folder if necessary:

css
Copy code
.joke-container {
font-size: 1.5rem;
max-width: 600px;
margin: auto;
}
Testing Responsiveness
React Bootstrap ensures the app is responsive, but test it on various screen sizes to verify the layout adapts smoothly.

Run the Application
Start the development server:
bash
Copy code
npm run dev
Open http://localhost:3000 in a browser to view the app.
Now you have a fully functional and responsive React app that retrieves a random joke with options to switch languages, handle errors, and update jokes on request!
