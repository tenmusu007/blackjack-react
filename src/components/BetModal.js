import React, { useRef, useState } from 'react'
import { BtnPlay } from './BtnPlay'
import { useBetContext } from '../useContext/betContext';


export const BetModal = (props) => {
    const {betMoney,setBetMoney} = useBetContext()
    // const [betMoney, setBetMoney]=useState()
    const [preMoney, setPreMoney]=useState([])
    const [balance, setbalance]=useState(props.money)
    // console.log("now",preMoney);
    console.log("now",props.money);
    // for(let i=0; i < 1; i++){
        //     setPreMoney(props.money)
        // }
    //     const balanceList = []
    //     balanceList.push(props.money)
    // console.log(balanceList);
    const handlerBetMoney = (event) => {
        console.log(event.target.value);
        setBetMoney(Number(event.target.value))
        const balance = props.money - Number(event.target.value)
        if(event.target.value === "0"){
            props.set(props.money)
            setbalance(props.money)
            // console.log('0');
            // const maxAmount =preMoney.reduce(function(a,b){
            //     return Math.max(a,b);
            // });
            // console.log("Max",maxAmount);
            // props.set(maxAmount)
        }else{
            // setPreMoney([...preMoney, props.money]);
            // // console.log("balance", balance);
            // console.log("preMoney",preMoney);
            // localStorage.setItem("balance",balance)
            setbalance(balance)
            setBetMoney(Number(event.target.value))
            // props.set(balance)
        }
    }
    return (
        <div className={props.modal?'BtnModal':"BtnModal move"}>
            <p className='modaltext'>Bet Your Money</p>
            {/* <p>Blance : {props.money}</p> */}
            <p>Blance : {balance}</p>
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
