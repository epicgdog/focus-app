import TodoList from "./todo-list/main.jsx"
import PomodoroTimer from "./pomo-timer/main.jsx"
import Playlist from "./playlist/main.jsx"
import { useAtom } from "jotai"
import { playlist, savedTodos, wt, bt } from "./index.js"
import { useEffect } from "react"

let updatedPlaylist, updatedTodos, updatedWt, updatedBt
// heres how we save the data actual
window.comms.onSaveData((event) => {
  event.sender.send("dataToSave", {pl : updatedPlaylist, todos : updatedTodos, workTime : updatedWt, breakTime : updatedBt})
})


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

  // solution: one useEffect to update data to global variables which will be used to actually save the stuff
  // the actual connection to the save data will be outside so only connected ONCE
  useEffect(() => {
    updatedPlaylist = pl
    updatedTodos = todos
    updatedWt = workTime
    updatedBt = breakTime
  }, [pl, todos, workTime, breakTime])

  const openFileDialog = async (f) => {
    const result = await window.comms.openFileDialog()
    setPl( (prev) => [...prev, ...result] )
  }
  return (
    <div className="App">
        <PomodoroTimer />
        <TodoList />
        <Playlist openFileDialog={openFileDialog} />
    </div>
  );
}

export default App;