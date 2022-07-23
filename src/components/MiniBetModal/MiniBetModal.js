import React, { useRef, useState } from 'react'
import { BtnPlay } from '../BtnPlay'
import { useBetContext } from '../../useContext/betContext';
import { useTransition, animated} from 'react-spring'



export const MiniBetModal = (props) => {
    const transtition = useTransition(props.items,{
        from:{ x: 100, y:-800, opacity:0, witdh:10, height: 10},
        enter:item=>async (next)=>{
            await next({y:item.y, opacity:1., delay: item.delay});
            await next({x: 100,witdh:150, height:80})
        },
        leave:{x: -100, y:800, opacity:0, delay:1000},

    })
    const {betMoney,setBetMoney} = useBetContext()
    return (
    <div className='MiniModalContainer'>
            {transtition((style, item)=>
            item ? <animated.div style={style}className={"MiniBtnModal"}>
            <p>your bet</p>
            <p>{betMoney}</p>
        </animated.div> : "")}
    </div>
    )
}
