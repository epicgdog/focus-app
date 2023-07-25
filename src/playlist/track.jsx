
import "./track.css"
import { useAtom } from "jotai"
import { playlist } from "../index.js"


export default function Track( { music, index } ){
    const [pl, setPl] = useAtom(playlist)
    return(
    <>
        <div>
            <p> {music.split("\\").pop()} </p>
            <button onClick={ () => {
                setPl( (prev) => {
                    const arr = [...prev]
                    arr.splice(index, 1)
                    return arr
                })

            }  }> X </button>
        </div>
    </>
    )
}