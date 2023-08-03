export default function Track( { music, index, current, looped, setPl } ){

    return(
    <>
        <div className="track" >
            <p className={index === current ? (looped ? "looping-track" : "current-track")  : ""}> {music.split("\\").pop().replace(".mp3", "")} </p>
            <button onClick={ () => {   
                setPl( (prev) => prev.filter((_, i) => i !== index) )
            }  }> X </button>
        </div>
    </>
    )
}