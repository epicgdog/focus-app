import { useRef, useState } from "react"

export default function Input({ name, type, initial, onEnter, onChange, min, max, step }){
    const input = useRef(null)
    return (
        <>
        <label>
            {name}
            <input value={initial ?? undefined} ref={input} type={type} onKeyDown={(event) => { 
                if (event.key === "Enter" && onEnter){
                    onEnter(event.target.value)
                    event.target.value = ""
                }
            }}    onChange={(event) => onChange? onChange(event.target.value) : ""}  min={min ?? 0} max={max ?? 0} step={step ?? 0}/>
        </label>
        <br></br>
        </>
    )
}