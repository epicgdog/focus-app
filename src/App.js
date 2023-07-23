import TodoList from "./todo-list/main.jsx"
import PomodoroTimer from "./pomo-timer/main.jsx"
import Playlist from "./playlist/main.jsx"
import { useState, useMemo } from "react"

function App( {todos, workTime, breakTime, playlist} ) {
  const [items, setItems] = useState(todos)
  const [wt, setWT] = useState(workTime)
  const [bt, setBT] = useState(breakTime)
  const [pl, setPl] = useState(playlist)

  const newTodo = async (data) => {
    setItems( (prev) => [...prev, data])
    // write to the thing by calling comms
    window.comms.saveData(data, "todo") 
  }

  const removeTodo = (index) => {
    setItems( (prev) => { 
      let newItems = [...prev] 
      newItems.splice(index, 1)
      return newItems 
    } )
    window.comms.removeData(index, "todo")
  }

  const saveTimer = async (data) => {
      const arr = data.split(" ")
      setWT(arr[0])
      setBT(arr[1])

      window.comms.saveData(data, "timer")
  }

  const handleTrack = async (index) => {
    setPl( (prev) => { 
      let newItems = [...prev] 
      newItems.splice(index, 1)
      return newItems 
    } )
    window.comms.removeData(index, "playlist")
  } 

  const openFileDialog = async () => {
    const result = window.comms.openFileDialog() 
    setPl( (prev) => [...prev, result] )
    console.log(result)
  }
  return (
    <div className="App">
      <TodoList todos={ items } remove={ removeTodo } newTodo={ newTodo }/>
      <PomodoroTimer workTime={ wt } breakTime={ bt } save={ saveTimer } />
      <Playlist handle={ handleTrack } saved={ pl } openFileDialog={openFileDialog} />
    </div>
  );
}

export default App;
