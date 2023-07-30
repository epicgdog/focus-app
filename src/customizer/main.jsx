import { useState } from "react"
import { useAtom } from "jotai"
import { workTime, breakTime } from "../index.js"
import { isMovable } from "../movable/main.jsx"
import "./main.css"
import Input from "./input.jsx"
import Setting from "./setting.jsx"

const convertToClockTime = (seconds) => {
    // there are hours; so u have to do it a 3rd time
    if (seconds >= 3600){
        return Math.floor(seconds/3600) + ":" + Math.floor((seconds/60)%60).toLocaleString("en-US", {minimumIntegerDigits: 2, useGrouping: false}) + ":" + (seconds%60).toLocaleString("en-US", {minimumIntegerDigits: 2, useGrouping: false})
    } else {
        return Math.floor(seconds/60).toLocaleString("en-US", {minimumIntegerDigits: 2, useGrouping: false}) + ":" + (seconds%60).toLocaleString("en-US", {minimumIntegerDigits: 2, useGrouping: false})
    }
}

export default function Customizer() {
    const [wt, setWt] = useAtom(workTime)
    const [bt, setBt] = useAtom(breakTime)
    const [movable, setMovable] = useAtom(isMovable)
    const [visible, setVisible] = useState(false)

    const style = {
        display: !visible ? "none" : "block",
    }

    const doneButtonStyle = {
        display: !movable ? "none" : "inline-block"
    }

    return(
        <>
        <div className="settings-modal" style={style}>
            <div className="settings-container">
                <h1> Settings </h1>
                <button className="close-settings" onClick={ () => { setVisible(!visible); setMovable(false) } } > Close</button>
                <hr></hr>
                <Setting name="Sizing and Repositioning" excludeDefault={true}>
                    <button onClick={() => { setMovable(true); setVisible(!visible)} }> Edit Positioning and Size </button>
                </Setting>
                <Setting name="Todo List"></Setting>
                <Setting name="Timer">
                    <Input name={`Set Study Time (minutes): ${convertToClockTime(wt)} `}type="number" onEnter={ (val) => setWt(Math.abs(val*60)) }/>
                    <Input name={`Set Break Time (minutes): ${convertToClockTime(bt)} `} type="number" onEnter={ (val) => setBt(Math.abs(val*60)) }/>
                </Setting>
                <Setting name="Playlist"></Setting>
            </div>
        </div>
        <button style={{position: "absolute", top: "100%"}}onClick={ () => { setVisible(!visible)  } }> Customize </button>
        <button style={doneButtonStyle} onClick={() => { setMovable(false) }} > Done Moving and Sizing </button>
        
        </>
    )
}