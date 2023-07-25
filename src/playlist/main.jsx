import Track from "./track.jsx"
import { useState, useRef, useEffect,useMemo } from "react"
import { useAtom } from "jotai"
import { playlist } from "../index.js"

export default function Playlist({ handle, openFileDialog }){
    const [pl, setPl] = useAtom(playlist)
    const [pos, setPos] = useState(0)
    const [test, setTest] = useState(0) // only for debugging
    const audio = useRef(null)  

    useEffect( () => {
        const aux = audio.current
        aux.source = pl[pos]
        aux.load()
    }, [pl])

    return (
        <>
        <div className="pl">
            <h1> Playlist </h1>
            <audio ref={audio} controls onEnded={() => {
                setPos((prev) => prev + 1) 
                const aux = audio.current
                aux.source = pl[pos]
                aux.load()
                aux.play()
            }}>
                this ain't working chief
                <source src={pl[pos]} type="audio/mpeg" />
            </audio>
            <ul>
            {
                pl.map((val, index) => (
                    val.length > 0 ? <Track music={val} key={index} index={index} remove={handle}/> : <li></li>
                ))
            }
            </ul>
            <button onClick={() => openFileDialog() }> Add Music to Playlist</button>
        </div>
        </>
    )
}