import { useState, useEffect } from "react"
import { useAtom } from "jotai"
import { workTime, breakTime } from "../index.js"
import { isMovable } from "../movable/main.jsx"
import { isEditable } from "../editable/main.jsx"
import Input from "./input.jsx"
import "./main.css"

function convertToClockTime(seconds) {
    // there are hours; so u have to do it a 3rd time
    if (seconds >= 3600){
        return Math.floor(seconds/3600) + ":" + Math.floor((seconds/60)%60).toLocaleString("en-US", {minimumIntegerDigits: 2, useGrouping: false}) + ":" + (seconds%60).toLocaleString("en-US", {minimumIntegerDigits: 2, useGrouping: false})
    } else {
        return Math.floor(seconds/60).toLocaleString("en-US", {minimumIntegerDigits: 2, useGrouping: false}) + ":" + (seconds%60).toLocaleString("en-US", {minimumIntegerDigits: 2, useGrouping: false})
    }
}

const RGB_REGEX = /^rgba?\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})(?:,\s*([01](?:\.\d+)?))?\)$/
function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
  }

function hexToRgb(hexColor) {
    const hex = hexColor.replace('#', '');
  
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
  
    return `rgb(${r}, ${g}, ${b})`;
  }

function rgbToHex(rgbVal) {
    const match = rgbVal.match(RGB_REGEX);

    if (match) {
        const r = parseInt(match[1], 10);
        const g = parseInt(match[2], 10);
        const b = parseInt(match[3], 10);
        return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
    }
}

function getIndividualRGB(rgb){
    const match = rgb.match(RGB_REGEX);

    if (match) {
        return [parseInt(match[1], 10), parseInt(match[2], 10), parseInt(match[3], 10)];
    }
}
  

export default function Customizer() {
    const [wt, setWt] = useAtom(workTime)
    const [bt, setBt] = useAtom(breakTime)
    const [movable, setMovable] = useAtom(isMovable)
    const [editable, setEditable] = useAtom(isEditable)
    const [visible, setVisible] = useState(false)

    // colors 
    const rootDiv = document.getElementById("root")
    const computedStyle = window.getComputedStyle(rootDiv)
    const[bgColor, setBgColor] = useState(hexToRgb(computedStyle.getPropertyValue("--bg-color")))
    const[mColor, setMColor] = useState(hexToRgb(computedStyle.getPropertyValue("--main-color")))
    const[sColor, setSColor] = useState(hexToRgb(computedStyle.getPropertyValue("--sec-color")))
    useEffect(() => {
        rootDiv.style.setProperty("--bg-color", bgColor)
        rootDiv.style.setProperty("--main-color", mColor)
        rootDiv.style.setProperty("--sec-color", sColor)
    }, [bgColor, mColor, sColor])

    const containerStyle = {
        transform: visible ? "translate(0, 0)" : "translate(-110%, 0)",
    }

    const modalStyle = {
        opacity: visible ? 1 : 0,
        transition: "opacity 0.25s",
        zIndex : visible ? 2 : -1,
    }

    const doneButtonStyle = {
        display: movable || editable ? "inline-block" : "none",
        float: "right",
    }

    const settingButtonStyle = {
        display: movable || editable ? "none" : "inline-block",
    }

    return(
        <>
         <div className="settings-container" style={containerStyle}>
            <h1 style={{margin: 0}}> Settings </h1>
            <button className={"close-settings"} onClick={ () => { setVisible(!visible); setMovable(false); setEditable(false)  } }> X </button>
            <hr></hr>
            <Input name={`Set Study Time (minutes): ${convertToClockTime(wt)} `} type="number" onEnter={(val) => {setWt(val*60)}}/>
            <Input name={`Set Break Time (minutes): ${convertToClockTime(bt)} `} type="number" onEnter={(val) => {setBt(val*60)}}/>
            <br></br>
            <Input name={`Set Theme Color: `} type="color" initial={ rgbToHex(mColor) } onChange={(val) => setMColor(val)}/>
            <Input name={`Set Theme Background Color: `} type="color" initial={ rgbToHex(bgColor) } onChange={(val) => setBgColor(hexToRgb(val))}/>
            <Input name={`Set Secondary Theme Color: `} type="color" initial={ rgbToHex(sColor) } onChange={(val) => setSColor(hexToRgb(val))}/>
            <br></br>
            <Input name={`Background Opacity: `} type="range" min="0" max="1" step="0.01" onChange={(val) => { 
                    setBgColor( (prev) => {
                        const result = getIndividualRGB(prev)
                        const cool = `rgba(${result[0]}, ${result[1]}, ${result[2]}, ${val})`
                        return cool
                    } ) 
            }} />
            <Input name={`Secondary Opacity: `} type="range" min="0" max="1" step="0.01" onChange={(val) => { 
                    setSColor( (prev) => {
                        const result = getIndividualRGB(prev)
                        const cool = `rgba(${result[0]}, ${result[1]}, ${result[2]}, ${val})`
                        return cool
                    } ) 
            }} />
            <br></br>
            <button className="positioning-button" onClick={() => { setMovable(true); setVisible(!visible)} }> Edit Positioning and Size </button>
            <button className="colors-button"onClick={() => { setEditable(true); setVisible(!visible)} }> Edit Colors </button>
        </div>
        <button style={settingButtonStyle}className={"customize-button"}onClick={ () => { setVisible(!visible)  } }> ⩸ </button>
        <button className={"finished-button"} style={doneButtonStyle} onClick={() => { setMovable(false); setEditable(false) }} > Finished </button>
        <div style={modalStyle} className="settings-modal"></div>
        
        </>
    )
}