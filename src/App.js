import TodoList from "./todo-list/main.jsx"
import PomodoroTimer from "./pomo-timer/main.jsx"
import Playlist from "./playlist/main.jsx"
import { useAtom } from "jotai"
import { playlist, savedTodos, wt, bt } from "./index.js"
import { useState, useEffect } from "react"

function App() {
  // getting all the data to be saved
  const [pl, setPl] = useAtom(playlist)
  const [todos] = useAtom(savedTodos)
  const [workTime] = useAtom(wt)
  const [breakTime] = useAtom(bt)

  // big bug #1: BROOOOOO
  // so this was wrapped in a useEffect hook to be run once cause u know i don't want to keep remounting every frame
  // SOOO the values that it will send will be the FIRST values before any changes are made by the user
  // SOOOO values weren't going to be saved 🤯🤯🤯🤯

  // solution: one useEffect, one function

  // will basically listen for the saveData; only run ONCE because u don't want to connect to the same thing
  // every time u make a change
  // now will just call function and should have updated values
  useEffect(() => {
    window.comms.onSaveData((event) => {
      console.log("sent!")
      event.sender.sendSync("dataToSave", {pl : pl, todos : todos, workTime : workTime, breakTime : breakTime})
    })
  }, [pl, todos, workTime, breakTime])

  const openFileDialog = async (f) => {
    const result = await window.comms.openFileDialog()
    setPl( (prev) => [...prev, ...result] )
  }
  return (
    <div className="App">
        <TodoList />
        <PomodoroTimer />
        <Playlist openFileDialog={openFileDialog} />
    </div>
  );
}

export default App;