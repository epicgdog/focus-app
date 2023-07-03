import { useState, useEffect } from "react"
import { atom, useAtom } from "jotai"


export default function PomodoroTimer({ workTime, breakTime, save }){
    const [clock, setClock] = useState(workTime)
    const [clockMode, setClockMode] = useState("work")
    const [pause, setPause] = useState(true)

    // actual timer code
    useEffect(() => {
        if (pause) { return;}
        const timer = setInterval(() => {
            setClock( (prev) => prev-1)

        }, 1000)
        return () => { clearInterval(timer) }
    }, [pause])

    useEffect(() => {
        if (clock >= 0){ return;}
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
            <h1> Pomodoro</h1>
            <h2> {clock} {clockMode}</h2>
            <h3> Work: {workTime} Break: {breakTime}</h3>
            <button onClick={ () => setPause((prev) => !prev)  }> {pause ? "start": "stop"}</button>

            <div>
                <label> 
                    Study Time 
                    <input type="text" onKeyDown={(event) => { 
                        if (event.key === "Enter" && parseInt(event.target.value)){
                            save( event.target.value + " " + breakTime )
                            if ( clockMode === "work" ){
                                setClock( parseInt(event.target.value) )
                            }
                            event.target.value = ""
                        }
                    }}/> 
                </label>
                <label> 
                    Break Time 
                    <input type="text" onKeyDown={(event) => { 
                        if (event.key === "Enter" && parseInt(event.target.value)){
                            save( workTime + " " + event.target.value )
                            if ( clockMode === "break" ){
                                setClock( parseInt(event.target.value) )
                            }
                            event.target.value = ""
                        }
                    }}/> 
                </label>
            </div>
        </>
    )

}