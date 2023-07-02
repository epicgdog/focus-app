import {useState} from "react"
import Item from "./item.jsx"
import "./main.css"

export default function Todolist( { todos, remove, newTodo } ){
    const [input, setInput] = useState("")
    const createNewTodo = (event) => {
        newTodo(input); event.target.value=""
    }
    return (
        <>
            <div className="todo">
            <h1> To-Do </h1>
            <ul>
                { 
                    todos.map((val, index) => (
                        <Item text={val} key={index} index={index} remove={remove}/>
                    ))
                }
            </ul>
            <input type="text"  
                onKeyDown={ (event) => {
                    (event.key != "Enter") ? setInput(event.target.value) : createNewTodo(event)
                }} 
                onChange={ (event) => {
                    setInput(event.target.value)   
                }}
            /> 
            <button onClick={ () => { newTodo(input) } }> + </button>
            </div>
        </>
    )

}