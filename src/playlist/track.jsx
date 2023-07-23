import {useState} from "react"
import "./track.css"
export default function Track( { music, index,  remove } ){
    return(
    <>
        <div>
            <p> {music.split("\\").pop()} </p>
            <button onClick={ () => remove(index) }> X </button>
        </div>
    </>
    )
}