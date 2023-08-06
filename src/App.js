import TodoList from "./todo-list/main.jsx"
import PomodoroTimer from "./pomo-timer/main.jsx"
import Playlist from "./playlist/main.jsx"
import Customizer from "./customizer/main.jsx"
import { useAtom, useAtomValue, useSetAtom } from "jotai"
import { mousePos, todos, workTime, breakTime, playlist, positions, sizes, variables  } from "./index.js"
import { useEffect } from "react"
import { HuePicker, AtomPicker } from "react-color"

let updatedData
// heres where data is saved actually
window.comms.onSaveData((event) => {
  event.sender.send("dataToSave", updatedData)
})


function App() {
  // getting all the data to be saved
  const t = useAtomValue(todos)
  const wt = useAtomValue(workTime)
  const bt = useAtomValue(breakTime)
  const [pl, setPl] = useAtom(playlist)
  const pos = useAtomValue(positions)
  const sz = useAtomValue(sizes)
  const vars = useAtomValue(variables)
  const setMousePos = useSetAtom(mousePos)

  // big bug #1: BROOOOOO
  // so the connection to the savedata event was wrapped in a useEffect hook to be run once cause u know i don't want to keep remounting every frame
  // SOOO the values that it will send will be the FIRST values before any changes are made by the user
  // SOOOO NEW values weren't going to be saved 🤯🤯🤯🤯

  // solution: one useEffect to update data to global variables which will be used to actually save the stuff
  // the actual connection to the save data will be outside so only connected ONCE too
  useEffect(() => {
    updatedData = {
      todos: t,
      workTime: wt,
      breakTime: bt,
      playlist: pl,
      positions: pos,
      sizes: sz, 
      variables: vars,
    }
  }, [t, wt, bt, pl, pos, sz, vars])

  const openFileDialog = async () => {
    const result = await window.comms.openFileDialog()
    setPl( (prev) => [...prev, ...result] )
  }

  useEffect(() => {
    window.onmousemove = (event) => {
      setMousePos({ x:event.clientX, y:event.clientY })
    }
  }, [])

  for (const i in vars){
    document.getElementById("root").style.setProperty(i, vars[i])
  }

  return (
    <div className="App">
        <Customizer />
        <PomodoroTimer />
        <TodoList />
        <Playlist openFileDialog={openFileDialog} />
    </div>
  );
}

export default App;