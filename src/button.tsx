
 type TitleBut = {
    name:string
}


export const ButtonName = (props:TitleBut) => {

    const TitleBut = props

    return (
        <div>
            <button>{TitleBut.name}</button>
        </div>
    )

}