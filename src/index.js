import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { atom } from "jotai"

const pastTodo = await window.comms.getData("todo")
const pastTimer = await window.comms.getData("timer")
const pastPlaylist = await window.comms.getData("playlist")
let workTime = 60
let breakTime = 5
if (pastTimer && pastTimer.length > 0){
  console.log(pastTimer)
  const arr = pastTimer[0].split(" ")
  workTime = arr[0]
  breakTime = arr[1]
}
console.log(pastPlaylist)
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

    <App todos={pastTodo} workTime={workTime} breakTime={breakTime} />
);


export const playlist = atom(pastPlaylist)
export const savedTodos = atom(pastTodo)
export const wt = atom(workTime)
export const bt = atom(breakTime)