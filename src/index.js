import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const pastTodo = await window.comms.getData("todo")
const pastTimer = await window.comms.getData("timer")
let workTime = 60
let breakTime = 5
if (pastTimer && pastTimer.length > 0){
  console.log(pastTimer)
  const arr = pastTimer[0].split(" ")
  workTime = arr[0]
  breakTime = arr[1]
}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App todos={pastTodo} workTime={workTime} breakTime={breakTime}/>
  </React.StrictMode>
);
