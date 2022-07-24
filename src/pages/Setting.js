import React, { useState } from 'react'
import Btn from '../components/Btn/Btn'
import { useTransition, animated} from 'react-spring'
function Setting() {
    // const [isVisible, setIsVisible]=useState(false)
    const [items, setItems]=useState([])
    const transtition = useTransition(items,{
        from:{ x: 100, y:-800, opacity:0, witdh:10, height: 10},
        enter:item=>async (next)=>{
            await next({y:item.y, opacity:1., delay: item.delay});
            await next({x: 100,witdh:150, height:100})
        },
        leave:{x: -100, y:800, opacity:0},

    })
    return (
        <div>
            <h1>Setting</h1>
            <h1>Coming Soon!!!!</h1>
            <Btn text={"back"} to="/" />


        </div>
  )
}

export default Setting