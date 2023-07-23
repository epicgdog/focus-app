import Track from "./track.jsx"
import { useState } from "react"

export default function Playlist({ saved, handle, openFileDialog }){
    const [test, setTest] = useState(saved)
    return (
        <>
        <h1> Playlist </h1>
        <audio controls>
            
        </audio>
        <ul>
        {
            saved.map((val, index) => (
                val.length > 0 ? <Track music={val} key={index} index={index} remove={handle}/> : <li></li>
            ))
        }
        </ul>

        <button onClick={() => {
            openFileDialog()
        }}> Add Music to Playlist</button>
        </>
    )
}