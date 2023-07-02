import { useState, useEffect } from "react"


export default function PomodoroTimer({ workTime, breakTime}){
    const [workClock, setWorkClock] = useState(workTime)
    const [breakClock, setBreakClock] = useState(breakTime)
    const [clockState, setClockState] = useState("work")
    const [btnState, setBtnState] = useState("start")

    useEffect(() => {
        if (btnState === "stop"){return;}
        const timer = setInterval( () => {
            if (clockState === "work"){
                setWorkClock( (prev) => prev-1 >= 0 ? prev-1 : 0 )
                console.log(workClock <= 0)
                if (workClock <= 0){
                    setClockState("break")
                    setWorkClock(workTime)
                }
            } else {
                setBreakClock( (prev) => prev-1 >= 0 ? prev-1 : 0 )
                if (breakClock <= 0){
                    setClockState("work")
                    setBreakClock(breakTime)
                }
            }

            console.log(workClock, breakClock)
        }, 1000 )

        return () => {
            clearInterval(timer)
        }
        
    }, []) // don't mount to anything; will be a forever loop bc easier to handle
  
    return(
        <>
            <h1> { breakClock} { workClock } </h1>
            <p> {clockState} </p>
            <button onClick={ () => {
                setBtnState( (prev) => prev === "start" ? "stop": "start" )
            }}> work </button>
            
        </>
    )

}