
import { useSetAtom } from "jotai"
import { playlist } from "../index.js"


export default function Track( { music, index, current, looped } ){
    const setPl = useSetAtom(playlist)

    const currentStyle = {
        backgroundColor: "white",
        color: "rgb(99, 99, 99)",
        borderLeft: looped ? "5px solid rgb(177, 150, 0)" : "5px solid rgb(0, 141, 196)",
        borderRadius: "5px",
    }

    return(
    <>
        <div className="track" >
            <p style={index === current ? currentStyle : {}}> {music.split("\\").pop().replace(".mp3", "")} </p>
            <button onClick={ () => {
                setPl( (prev) => {
                    prev.splice(index, 1)
                    return prev
                })

            }  }> X </button>
        </div>
    </>
    )
}