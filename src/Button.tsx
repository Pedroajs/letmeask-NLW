type ButtonProps = {
    text: string;
} 


export function Button(props: ButtonProps){
    return( 
        <button>{props.text || 'default'}</button>

    )
}