import Track from "./track.jsx"
import { useState, useRef, useEffect, useMemo } from "react"
import { useAtom } from "jotai"
import { playlist } from "../index.js"
import "./main.css"

export default function Playlist({ openFileDialog }){
    const [pl, setPl] = useAtom(playlist)
    const [pos, setPos] = useState(0)
    const [test, setTest] = useState(0) // only for debugging
    const [loopCurrent, setLoopCurrent] = useState(false)
    const audio = useRef(null)  
    const loadAndPlay = (play) => {
        const aux = audio.current
        aux.source = pl[pos]
        aux.load()
        if (play){ aux.play() }
    }

    useEffect( () => {
        setPos( (prev) => Math.min(prev, pl.length-1) )
        loadAndPlay()
    }, [pl])

    return (
        <>
        <div className="pl">
            <div className="pl-controls">
                <button className="add-tracks" onClick={() => openFileDialog(setPl) }> + </button>
                <button className="skip-to-previous" onClick={() => {
                    setPos( (prev) => prev - 1 < 0 ? pl.length-1 : prev - 1 )
                    loadAndPlay(true)
                } }> ← </button>
                <button className="skip-to-next" onClick={() => {
                    setPos( (prev) => prev + 1 >= pl.length ? 0 : prev + 1 )
                    loadAndPlay(true)
                } }> → </button>
                <button className="loop-song" onClick={() => {
                    setLoopCurrent((prev) => !prev)
                } }> ↺ </button>
            </div>
            <h1> Playlist </h1>
            <audio ref={audio} controls onEnded={() => {
                setPos( (prev) => loopCurrent ? prev : prev + 1 >= pl.length ? 0 : prev + 1 )
                loadAndPlay(true)
            }}>
                this ain't working chief
                <source src={pl[pos]} type="audio/mpeg" />
            </audio>
            <ul>
            {
                pl.map((val, index) => (
                    val.length > 0 ? <Track music={val} key={index} index={index} current={pos} looped={loopCurrent}/> : ""
                ))
            }
            </ul>
        </div>
        </>
    )
}