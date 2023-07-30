export default function Setting({name, children, excludeDefault}){
    const divStyle={
        textAlign: "center",
        width: "25%",
        backgroundColor: "var(--sec-color)",
        margin: "auto",
        paddingBottom: "10px",
        borderRadius: "10px",
        display: "inline-block",
    }

    const butStyle={
        display: "block",
        margin: "auto",

    }

    return(
        <>
            <div className={`${name}-settings`} style={divStyle}>
                <h2> {name} </h2>
                {children}
                {excludeDefault ? "": 
                <>
                    <button style={butStyle}> Set Background Color </button>
                    <button style={butStyle}> Set Main Color </button>
                    <button style={butStyle}> Set Secondary Color </button>
                    <button style={butStyle}> Set Font Size</button>
                    <button style={butStyle}> Set Font Family</button>
                    <button style={butStyle}> Set Font Style</button>
                </>
                
                }
            </div>
        </>
    )
}