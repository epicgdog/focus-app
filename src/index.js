import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const pastTodo = await window.comms.getData("todo")
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App todos={pastTodo}/>
  </React.StrictMode>
);
