import TodoList from "./todo-list/main.jsx"
import PomodoroTimer from "./pomo-timer/main.jsx"
import Playlist from "./playlist/main.jsx"
import { useState, useEffect } from "react"
import { atom, Provider, useAtom } from "jotai"
import { playlist } from "./index.js"

function App() {

  const openFileDialog = async () => {
    const result = window.comms.openFileDialog() 
    result.then((res) => {
      
    })
  }
  return (
    <div className="App">
      <Provider>
        <TodoList />
        <PomodoroTimer />
        <Playlist openFileDialog={openFileDialog} />
      </Provider>
    </div>
  );
}

export default App;