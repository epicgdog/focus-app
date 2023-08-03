export default function ColorButton({initial, width}){
    const style={
        width: width,
        height: width,
        backgroundColor: `${initial}`
    }
    return(
        <>
        <button style={style}> </button>
        </>
    )
}