import { useState, useEffect, useMemo } from "react"
import { useAtomValue } from "jotai"
import { workTime, breakTime } from "../index.js"
import "./main.css"
import Movable from "../movable/main.jsx"

const convertToClockTime = (seconds) => {
    // there are hours; so u have to do it a 3rd time
    if (seconds >= 3600){
        return Math.floor(seconds/3600) + ":" + Math.floor((seconds/60)%60).toLocaleString("en-US", {minimumIntegerDigits: 2, useGrouping: false}) + ":" + (seconds%60).toLocaleString("en-US", {minimumIntegerDigits: 2, useGrouping: false})
    } else {
        return Math.floor(seconds/60).toLocaleString("en-US", {minimumIntegerDigits: 2, useGrouping: false}) + ":" + (seconds%60).toLocaleString("en-US", {minimumIntegerDigits: 2, useGrouping: false})
    }
}

export default function PomodoroTimer(){
    const wt = useAtomValue(workTime)
    const bt = useAtomValue(breakTime)
    const [clock, setClock] = useState(wt)
    const [clockMode, setClockMode] = useState("work")
    const [pause, setPause] = useState(true)

    const displayTrueClock = useMemo(() => {
        return convertToClockTime(clock)
    }, [clock])

    // actual timer code
    useEffect(() => {
        // if it is paused, no need to do anything and timer automatically stops
        if (pause) { return;}

        // once we hit play again, start a NEW timer
        const timer = setInterval(() => {
            setClock( (prev) => prev-1)
        }, 1000)

        // win run the NEXT time the button is paused
        return () => { clearInterval(timer) }
    }, [pause])

    useEffect(() => {
        if (clock >= 0){ return;} // if a timer hasn't expired, no need to change modes
        if (clockMode === "work"){
            setClock(bt)
            setClockMode("break")
        } else if (clockMode === "break") {
            setClock(wt)
            setClockMode("work")
        }
    }, [clock])

    useEffect( () => {
        if (clock <= 0){ return; }
        if (clockMode === "work"){
            setClock(wt)
        } else {
            setClock(bt)
        }
    }, [wt, bt] )

    return(
        <>
        <Movable className="pomo">
            <h1> {displayTrueClock} </h1>
            <button className="startButton" onClick={ () => setPause((prev) => !prev) }> {pause ? "start": "stop"}</button>
        </Movable>
        </>
    )

}