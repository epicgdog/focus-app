

export default function Input({ name, type, onEnter }){
    return (
        <>
        <label>
            {name}
            <input type={type} onKeyDown={(event) => { 
                if (event.key === "Enter"){
                    onEnter(event.target.value)
                    event.target.value = ""
                }
            }}/>
        </label>
        </>
    )
}