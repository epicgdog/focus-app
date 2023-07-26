import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { atom, Provider } from "jotai"

const database = await window.comms.getData()
// index 0 are the todos
let todos = []
if (database[0]) {
  todos = database[0].split(":")
}

// index 1 is the timer
let workTime = 60
let breakTime = 5
if (database[1]){
  const arr = database[1].split(" ")
  console.log(arr)
  workTime = arr[0]
  breakTime = arr[1]
}

// index 2 is the playlist
let pl = []
if (database[2]) {
  console.log(database[2].split(" : "))
  pl = database[2].split(" : ")
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider>
    <App  />
  </Provider>
);

export let savedTodos = atom(todos)
export let wt = atom(workTime)
export let bt = atom(breakTime)
export let playlist = atom(pl)
