import { useState, useRef, useEffect } from "react"
import { useAtomValue, useAtom, atom, useSetAtom } from "jotai"
import { mousePos, positions, sizes } from "../index.js"
import "./main.css"
import Editable from "../editable/main.jsx"

export const isMovable = atom(false)
export const movables = atom ({})

export default function Movable({ className, children }){
    const pos = useAtomValue(mousePos)
    const canMove = useAtomValue(isMovable)
    const setMovables = useSetAtom(movables)

    const [change, setChange] = useState(false)
    const [posData, setPosData] = useAtom(positions)
    const [size, setSize] = useAtom(sizes)
    const [currentPos, setCurrentPos] = useState(posData[className] ?? {x:0, y:0})
    const [currentSize, setCurrentSize] = useState(size[className] ?? {x:"600px", y:"100px"})
    const [offset, setOffset] = useState(0)

    const div = useRef(null)

    const style = {
        position: "absolute",
        top: change ? pos.y : currentPos.y,
        left: change ? pos.x : currentPos.x, 
        userSelect:  "none",
        transform: `translate(-${ offset }px, -5px)`,
        resize: canMove ? "both" : "none",
        overflow: "auto",
        cursor: change ? "grab" : "default",
        width: canMove? size[className] :currentSize.x,
        height: canMove? size[className] :currentSize.y,
    }

    const buttonStyle = {
        visibility: canMove ? "visible" : "hidden", 
    }

    useEffect(() => {
        if (!canMove) {return;}
        const newSize = {x:div.current?.offsetWidth, y:div.current?.offsetHeight}
        setCurrentSize(newSize)
        setSize( (prev) => {
            prev[className] = newSize
            return prev
        } )
    }, [div.current?.offsetWidth, div.current?.offsetHeight])

    useEffect(() => {
        setMovables( (prev) => {prev[className] = div.current; return prev} )
    }, [div])

    const onMouseDown = () => {
        if (canMove){
            setChange(true)
            setOffset(pos.x - currentPos.x)
        }
    }

    const onMouseUp = () => {
        if (canMove){
            const newPos = {x: pos.x - offset, y: pos.y}
            setChange(false) 
            setCurrentPos(newPos)
            setOffset(0)
            setPosData( (prev) => {
                prev[className] = newPos
                return prev
            } )
        }
    }

    
    return( 
        <>
        <Editable name={className + "-editable"} >
            <div ref={div} className={className} style={style}> 
                    <button className = "move-panel-button" onMouseDown={onMouseDown} onMouseUp={onMouseUp}  style={buttonStyle}> {offset} </button>
                {children} 
            </div>
        </Editable>
        </>
    )
}