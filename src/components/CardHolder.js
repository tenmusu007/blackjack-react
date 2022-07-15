import React from 'react'
import { useEffect, useState } from 'react';
import axios from 'axios';
import PlayField from '../pages/PlayField';
import { useHandsContext } from '../useContext/handContext';

// let playerHandsArr = []
function CardHolder() {
    const [notification, setNotification] = useState("not set")
    const [playerAllHands, setPlayerAllHands] = useState()
    const [displayHands, setdisplayHands] = useState()
    const [playerInfo, setplayerInfo] = useState(
    {
        hands:[],
        total:0,
    }
    )
    // const {playerInfo, setplayerInfo}= useHandsContext()
    // console.log("deck ID", deckId);
    // console.log("card info", cardsInfo);
    // console.log("player Hands", playerHands);
    // console.log("player AllHands", playerAllHands);
    console.log("Info", playerInfo);
    // console.log("Hands", displayHands);
    useEffect(() => {
        axios.get(`https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1`)
            .then(res => {
                axios.get(`https://www.deckofcardsapi.com/api/deck/${res.data.deck_id}/draw/?count=6`)
                    .then(data => setPlayerAllHands(data.data.cards))
            })
    }, [])
    const handlerShowHnds = () => {
        setNotification("all set")
        let keepCards = []
        const selectFirstHands = () => {
            for (let i = 0; i < 2; i++) {
                console.log(playerAllHands[i]);
                keepCards.push(playerAllHands[i])
            }
            console.log(keepCards);
            addCardToHands()
        }
        const addCardToHands = () => {
            const renderHands = keepCards.map((value, index) => {
                console.log("map", value);
                return (
                    <div key={index} >
                        {/* <p>{value.suite}</p>
                        <h2>{value.value}</h2> */}
                        <img src={value.image} alt=""  className='cardImg'/>
                    </div>
                )
            })
            caculateTotal(keepCards)
            setdisplayHands(renderHands)
        }
        selectFirstHands()
    }
    
    const handlerDraw = () => {  
        console.log(playerInfo.hands);
        const hands =[...playerInfo.hands, playerAllHands[playerInfo.hands.length]]
        caculateTotal(hands)
        // let hands =playerHands
        console.log(hands);
        const renderHands = hands.map((value, index) => {
            console.log("working");
            console.log("map", value);
            return (
                <div key={index} >
                    {/* <p>{value.suite}</p> */}
                    {/* <h2>{value.code}</h2> */}
                    {/* <h2>{value.value}</h2> */}
                    <img src={value.image} alt="" className='cardImg'/>
                </div>
            )
        })
        setdisplayHands(renderHands)
    }
    const caculateTotal =(data)=>{
        const handsValue = data.map((card)=>{
            if(card.value === "JACK"||card.value === "QUEEN"||card.value === "KING"){
                return {...card, value:10}
            }else if(card.value === "ACE"){
                return {...card, value:1}
            }else{
                return {...card, value:Number(card.value)}
            }
        })
        const total = handsValue.map((element)=>{
            return element.value
        })
        const handsTotal =total.reduce((a,b)=>{
            return a + b
        })
        console.log("value", handsValue);
        console.log("total",handsTotal);
        if(playerInfo.hands.length === 0){
            console.log("test");
            setplayerInfo({
                hands:handsValue,
                total:handsTotal
            })
        }else{
            console.log("koki");
            setplayerInfo({
                hands:[...playerInfo.hands, playerAllHands[playerInfo.hands.length]],
                total:handsTotal
            })
        }
    }          
    return (
        <div className='playerSection'>
            <p>total</p>
            <p>{notification}</p>
            <p className='totalNumber'>{playerInfo.total}</p>
            <div className="conatinerCard">
                {displayHands}
            </div>
            <button onClick={handlerShowHnds}>set</button>
            <button onClick={handlerDraw}>draw</button>
        </div>
    )
}

export default CardHolder


// const [arr, setArr] =useState([1,2])
// setArr([...arr,3])


