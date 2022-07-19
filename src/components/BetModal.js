import React, { useRef, useState } from 'react'
import { BtnPlay } from './BtnPlay'

export const BetModal = (props) => {
    const [betMoney, setBetMoney]=useState()
    const [preMoney, setPreMoney]=useState([])
    const handlerBetMoney = (event) => {
        console.log(event.target.value);
        setBetMoney(Number(event.target.value))
        if(event.target.value === "0"){
            console.log('0');
            const maxAmount =preMoney.reduce(function(a,b){
                return Math.max(a,b);
            });
            props.set(maxAmount)
        }else{
            console.log(preMoney);
            setPreMoney([...preMoney, props.money]);
            const balance = props.money - Number(event.target.value)
            // console.log("balance", balance);
            props.set(balance)
        }
    }
    return (
        <div className='BtnModal'>
            <p >Bet Your Money</p>
            <p>Blance : {props.money}</p>
            <p>Bet : {betMoney}</p>
            <div className='betMoneyConatiner'>
                <form onChange={handlerBetMoney}>
                    <select>
                        <option value="0" key="0" >0</option>
                        <option value="100" key="100">100</option>
                        <option value="200" key="200">200</option>
                    </select>
                </form>
            </div>
            <div className='btnModalConatiner'>
                <BtnPlay className={"btnModal"} onClick={() => props.onClick()} text={props.text} />
            </div>
        </div>
    )
}
