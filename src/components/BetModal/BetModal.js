import React, { useRef, useState } from 'react'
import { BtnPlay } from '../BtnPlay'
import { useBetContext } from '../../useContext/betContext';
import { useBalanceContext } from '../../useContext/balanceContext';



export const BetModal = (props) => {
    const {balance, setBalance} = useBalanceContext()
    const {betMoney,setBetMoney} = useBetContext()
    const [preMoney, setPreMoney]=useState([])
    const [preBalance, setPreBalance]=useState(props.balance)
    const handlerBetMoney = (event) => {
        // console.log(props.money);
        // console.log(event.target.value);
        setBetMoney(Number(event.target.value))
        const balanceTotal = props.balance - Number(event.target.value)
        if(event.target.value === "0"){
            props.set(balance)
            setPreBalance(props.balance)
        }else{
            setPreBalance(balanceTotal)
            // props.set(balanceTotal)
            setBetMoney(Number(event.target.value))
        }
    }
    return (
        <div className={props.modal?'BtnModal':"BtnModal move"}>
            <p className='modaltext'>Bet Your Money</p>
            <p>Blance : {preBalance}</p>
            <p>Bet : {betMoney}</p>
            <div className='betMoneyConatiner'>
                <form className='betBar' onChange={handlerBetMoney}>
                    {/* <input  type="number" min="1" max="5"  /> */}
                    {/* {props.balance((value)=>{
                        // let betValue = va
                        return(
                            <option value="" key=""></option>
                        )
                    })} */}
                    <select>
                            <option value="0" key="0">0</option>
                            <option value="100" key="100">100</option>
                            <option value="200" key="200">200</option>
                            <option value="500" key="500">500</option>
                            <option value={props.balance} key={props.balance} >{props.balance}</option>
                    </select>
                </form>
            </div>
            <div className='btnModalConatiner'>
                <BtnPlay className={"btnModal"} onClick={() => props.onClick()} text={props.text} />
            </div>
        </div>
    )
}
