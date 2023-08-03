import Track from "./track.jsx"
import { useState, useRef, useEffect } from "react"
import { useAtom } from "jotai"
import { playlist } from "../index.js"
import "./main.css"
import Movable from "../movable/main.jsx"

export default function Playlist({ openFileDialog }){
    const [pl, setPl] = useAtom(playlist)
    const [pos, setPos] = useState(0)
    const [test, setTest] = useState(0) // only for debugging
    const [loopCurrent, setLoopCurrent] = useState(false)
    const [reload, setReload] = useState(false)

    const audio = useRef(null)  
    const loadAndPlay = (play) => {
        const aux = audio.current
        aux.source = pl[pos]
        aux.load()
        if (play){ aux.play() }
    }

    const playlistLength = pl.length
    useEffect(() => {
        console.log("changed!")
        setPos( (prev) => Math.min(prev, playlistLength) )
        loadAndPlay()
    }, [pl])

    return (
        <>
        <Movable className="pl">
            <h1> Playlist </h1>
            <audio ref={audio} controls onEnded={() => {
                setPos( (prev) => loopCurrent ? prev : prev + 1 >= playlistLength ? 0 : prev + 1 )
                loadAndPlay(true)
            }}>
                this ain't working chief
                <source src={pl[pos]} type="audio/mpeg" />
            </audio>
            <div className="pl-controls">
                <button className="add-tracks" onClick={() => openFileDialog() }> + </button>
                <button className="skip-to-previous" onClick={() => {
                    setPos( (prev) => prev - 1 < 0 ? playlistLength-1 : prev - 1 )
                    loadAndPlay(true)
                } }> ← </button>
                <button className="skip-to-next" onClick={() => {
                    setPos( (prev) => prev + 1 >= playlistLength ? 0 : prev + 1 )
                    loadAndPlay(true)
                } }> → </button>
                <button className="loop-song" onClick={() => {
                    setLoopCurrent((prev) => !prev)
                } }> ↺ </button>
            </div>
            <ul>
            {
                pl.map((val, index) => (
                    val.length > 0 ? <Track music={val} key={index} index={index} current={pos} looped={loopCurrent} setPl={setPl}/> : ""
                ))
            }
            </ul>
        </Movable>
        </>
    )
}