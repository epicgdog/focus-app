import { useState } from "react"
import "./main.css"

export default function Accordion({ className, name, children }){
    const [visible, setVisible] = useState(false)
    const invisibleStyle={
        maxHeight : visible ? "1000px" :"0",
        display: visible ? "inline-block" : "none",
        transitionProperty: "max-height",
        transitionDuration: "1s",
        transitionTimingFunction: "ease-in-out",
    }
    return (
    <>
    <div>
        <div className="accordion-top"> <h3>{name}</h3> <button onClick={ () => setVisible((prev) => !prev) }> ⩒ </button> </div>
        <div style={invisibleStyle}>
            {children}
        </div>

    </div>


    </>
    )



}