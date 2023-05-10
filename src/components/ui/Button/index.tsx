import React from 'react'
import styles from './Button.module.sass'

export const Button = (props: {onClick?: () => void, text: string, color?: string, hoverColor?: string}) => {
    const [hover, setHover] = React.useState(false);
    const style = {
        normal: {
            background: props.color ? props.color : '#2D728F'
        },
        hover: {
            background: props.hoverColor ? props.hoverColor : '#1d3f4e'
        }
    }

    return (
    <button type='submit' className={styles.button} 
        onMouseEnter={() => {
            setHover(true);
        }}
        onMouseLeave={() => {
            setHover(false);
        }}
        style={{
            ...style.normal,
            ...(hover ? style.hover : null)
        }}
        onClick={props.onClick}>

            {props.text}
    </button>
  )
}
