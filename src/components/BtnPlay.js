import React from 'react'

export const BtnPlay = (props) => {
  return (
        <div className={props.className} onClick={props.onClick}>{props.text}</div>
  )
}
