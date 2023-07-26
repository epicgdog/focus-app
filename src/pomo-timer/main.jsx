import { useState, useEffect, useMemo } from "react"
import { useAtom } from "jotai"
import { wt, bt } from "../index.js"
import "./main.css"

const convertToClockTime = (seconds) => {
    // there are hours; so u have to do it a 3rd time
    if (seconds >= 3600){
        return Math.floor(seconds/3600) + ":" + Math.floor((seconds/60)%60).toLocaleString("en-US", {minimumIntegerDigits: 2, useGrouping: false}) + ":" + (seconds%60).toLocaleString("en-US", {minimumIntegerDigits: 2, useGrouping: false})
    } else {
        return Math.floor(seconds/60).toLocaleString("en-US", {minimumIntegerDigits: 2, useGrouping: false}) + ":" + (seconds%60).toLocaleString("en-US", {minimumIntegerDigits: 2, useGrouping: false})
    }
}

export default function PomodoroTimer(){
    const [workTime, setWorkTime] = useAtom(wt)
    const [breakTime, setBreakTime] = useAtom(bt)
    const [clock, setClock] = useState(workTime)
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
            setClock(breakTime)
            setClockMode("break")
        } else if (clockMode === "break") {
            setClock(workTime)
            setClockMode("work")
        }
    }, [clock])

    return(
        <>
        <div className="pomo">
            <h1> {displayTrueClock} </h1>
            <button className="startButton" onClick={ () => setPause((prev) => !prev) }> {pause ? "start": "stop"}</button>
            <h3> Work: {workTime} Break: {breakTime}</h3>

            <div className="pomo-settings">
                <label> 
                    Study Time 
                    <input type="text" onKeyDown={(event) => { 
                        if (event.key === "Enter" && parseInt(event.target.value)){
                            setWorkTime( event.target.value )
                            if ( clockMode === "work" ){
                                setClock( parseInt(event.target.value) )
                            }
                            event.target.value = ""
                        }
                    }}/> 
                </label>
                <br></br>
                <label> 
                    Break Time 
                    <input type="text" onKeyDown={(event) => { 
                        if (event.key === "Enter" && parseInt(event.target.value)){
                            setBreakTime( event.target.value )
                            if ( clockMode === "break" ){
                                setClock( parseInt(event.target.value) )
                            }
                            event.target.value = ""
                        }
                    }}/> 
                </label>
            </div>
        </div>
        </>
    )

}