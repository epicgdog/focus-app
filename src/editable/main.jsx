import { useState, useEffect, useRef } from "react"
import "./main.css"
import Input from "../customizer/input.jsx"
import { mousePos } from "../index.js"
import { useAtomValue, useAtom, atom } from "jotai"

export const isEditable = atom(false)
const RGB_REGEX = /^rgba?\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})(?:,\s*([01](?:\.\d+)?))?\)$/

function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
  }

// for initial value
function rgbToHex(rgbVal) {
    const match = rgbVal.match(RGB_REGEX);

    if (match) {
        const r = parseInt(match[1], 10);
        const g = parseInt(match[2], 10);
        const b = parseInt(match[3], 10);
        return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
    }
}

// for saving bg color; better to do rgb() so can use rgba()
function hexToRgb(hexColor) {
    const hex = hexColor.replace('#', '');
  
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
  
    return `rgb(${r}, ${g}, ${b})`;
  }

function getIndividualRGB(rgb){
    const match = rgb.match(RGB_REGEX);

    if (match) {
        return [parseInt(match[1], 10), parseInt(match[2], 10), parseInt(match[3], 10)];
    }
}
  
  
export default function Editable({ name, children }){
    const [editable, setEditable] = useAtom(isEditable)
    const [vis, setVis] = useState(true)

    const [style, setStyle] = useState()
    const [element, setElement] = useState()
    const [modalStyle, setModalStyle] = useState({})
    const pos = useAtomValue(mousePos)
    const onMouseOver = (event) => { if (editable) {event.target.style.outline = "3px solid red"} }
    const onMouseLost = (event) => event.target.style.outline = ""
    const onMouseDown = (event) => { if (editable) {const s = window.getComputedStyle(event.target); setStyle(s); setElement(event.target); setVis(true); setBgColor(s.backgroundColor)}  }
    const ref = useRef(null)

    const [bgColor, setBgColor] = useState()
    const [color, setColor] = useState()

    useEffect(() => {
        setModalStyle({
            visibility: vis ? "visible" : "hidden",
            display: editable ? "inline-block" : "none",
            top: pos.y,
            left: pos.x,
        }) 
    }, [style, vis])

    useEffect(() => {
        if (element){
            element.style.backgroundColor = bgColor
            element.style.color = color
        }
    }, [bgColor, color])

    return (
        <>
            { editable && style ? 
                <div ref={ref}className="editable-modal" style={modalStyle}>
                <button onClick={ () => setVis(false)}> X </button>
                <Input name="Background Color: " type="color" initial={rgbToHex(style.backgroundColor) ?? "#000000"} onChange={(val)=> setBgColor( hexToRgb(val) ) }/>
                <Input name="Text Color: " type="color" initial={rgbToHex(style.color) ?? "#000000"} onChange={(val)=> setColor( hexToRgb(val) ) }/>
                <Input name="Background Opacity: " type="range" min="0" max="1" step="0.01" onChange={(val) => { 
                    setBgColor( (prev) => {
                        const result = getIndividualRGB(prev)
                        const cool = `rgba(${result[0]}, ${result[1]}, ${result[2]}, ${val})`
                        return cool
                    } ) 
                    }} />

                </div>
            
            : <></>
            }
        <div className={name} onMouseOver={ onMouseOver } onMouseOut={  onMouseLost } onMouseDown={ onMouseDown }>
            {children}
        </div>
        </>
    )

}