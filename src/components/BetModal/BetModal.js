import React, { useRef, useState } from 'react'
import { BtnPlay } from '../BtnPlay'
import { useBetContext } from '../../useContext/betContext';


export const BetModal = (props) => {
    const {betMoney,setBetMoney} = useBetContext()
    const [preMoney, setPreMoney]=useState([])
    const [balance, setbalance]=useState(props.money)
    const handlerBetMoney = (event) => {
        // console.log(props.money);
        // console.log(event.target.value);
        setBetMoney(Number(event.target.value))
        const balance = props.money - Number(event.target.value)
        if(event.target.value === "0"){
            props.set(props.money)
            setbalance(props.money)
        }else{
            setbalance(balance)
            setBetMoney(Number(event.target.value))
        }
    }
    return (
        <div className={props.modal?'BtnModal':"BtnModal move"}>
            <p className='modaltext'>Bet Your Money</p>
            <p>Blance : {balance}</p>
            <p>Bet : {betMoney}</p>
            <div className='betMoneyConatiner'>
                <form className='betBar' onChange={handlerBetMoney}>
                    <input  type="range" min="1" max={props.money}  />
                </form>
            </div>
            <div className='btnModalConatiner'>
                <BtnPlay className={"btnModal"} onClick={() => props.onClick()} text={props.text} />
            </div>
        </div>
    )
}
