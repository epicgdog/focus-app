import TodoList from "./todo-list/main.jsx"
import PomodoroTimer from "./pomo-timer/main.jsx"
import { useState } from "react"

function App( {todos} ) {
  const [items, setItems] = useState(todos)

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
  return (
    <div className="App">
      <TodoList todos={ items } remove={ removeTodo } newTodo={ newTodo }/>
      <PomodoroTimer workTime={ 10 } breakTime={ 5 } />
    </div>
  );
}

export default App;
