import React from 'react'
import { useEffect, useState } from 'react';
import axios from 'axios';
import PlayField from '../pages/PlayField';
import { useHandsContext } from '../useContext/handContext';
import Btn from './Btn';

// let playerHandsArr = []
function CardHolder() {
    const [notification, setNotification] = useState("not set")
    const [playerAllHands, setPlayerAllHands] = useState(" ")
    const [displayHands, setdisplayHands] = useState()
    const [playerInfo, setplayerInfo] = useState(
        {
            hands: [],
            total: 0,
        }
    )
    const [cpuAllHands, setcpuAllHands] = useState()
    const [displayCpuHands, setdisplayCpuHands] = useState()
    const [cpuInfo, setCpuInfo] = useState(
        {
            hands: [],
            total: 0,
        }
    )
    // result/////////
    const [result, setResult] = useState()
    const [showResult, setShowResult] = useState(false)
    console.log("cpu", cpuInfo);
    console.log("Info", playerInfo);
    // console.log("Cpu", cpuAllHands);
    // console.log("player",playerAllHands);
    useEffect(() => {
        axios.get(`https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1`)
            .then(res => {
                axios.get(`https://www.deckofcardsapi.com/api/deck/${res.data.deck_id}/draw/?count=6`)
                    .then(data => {
                        addValueToCpuHands(data.data.cards)
                        axios.get(`https://www.deckofcardsapi.com/api/deck/${res.data.deck_id}/draw/?count=6`)
                            .then(cpuData => addValueToPlayerHands(cpuData.data.cards))
                    })
            })
    }, [])
    // player part//////////
    const addValueToPlayerHands = (obj) => {
        const handsValue = obj.map((card) => {
            if (card.value === "JACK" || card.value === "QUEEN" || card.value === "KING") {
                return { ...card, value: 10 }
            } else if (card.value === "ACE") {
                return { ...card, value: 11}
            } else {
                return { ...card, value: Number(card.value) }
            }
        })
        setPlayerAllHands(handsValue)

    }

    const handlerShowHnds = () => {
        setNotification("all set")
        let keepCards = []
        let keepCpuCards = [cpuAllHands[0]]
        // console.log("first cpu", keepCpuCards);
        const selectFirstHands = () => {
            for (let i = 0; i < 2; i++) {
                // console.log(playerAllHands[i]);
                keepCards.push(playerAllHands[i])
            }
            // console.log("player",keepCards);
            addCardToHands(keepCards)
            addCardToHands(keepCpuCards)
        }
        const addCardToHands = (cards) => {
            if (cards.length > 1) {
                // console.log("player");
                setdisplayHands(renderHands(cards))
                caculateTotal(keepCards)
            } else {
                // console.log("cpu");
                setdisplayCpuHands(renderHands(cards))
                caculateCpuTotal(keepCpuCards)
            }
            // caculateTotal(keepCpuCards)

        }
        selectFirstHands()
    }

    const handlerDraw = () => {
        console.log(playerInfo.hands);
        const hands = [...playerInfo.hands, playerAllHands[playerInfo.hands.length]]
        caculateTotal(hands)
        // let hands =playerHands
        // console.log(hands);
        setdisplayHands(renderHands(hands))
    }

    const caculateTotal = (data) => {
        const total = data.map((element) => {
            return element.value
        })
        if(total.includes(11)){
            const handsTotal = handsTotalCalculate(total)
            updatePlayerHands(data,handsTotal)
            if (handsTotal> 21) {
                const aceTotal =handsTotal-10
                if(aceTotal >21){
                    setplayerInfo({
                        hands: data,
                        total: aceTotal
                    })
                    return [setResult("You are busted"), setShowResult(!showResult)]
                }else{
                updatePlayerHands(data,aceTotal)
                }
            }
                // console.log("return result");
        }else{
            const handsTotal = handsTotalCalculate(total)
            updatePlayerHands(data,handsTotal)
            if (handsTotal > 21) {
                // console.log("return result");
                return [setResult("You are busted"), setShowResult(!showResult)]
            }
            console.log(handsTotal);
        }
        // console.log(total);

    }


    // cpu/////////////////
    const addValueToCpuHands = (obj) => {
        const handsValue = obj.map((card) => {
            if (card.value === "JACK" || card.value === "QUEEN" || card.value === "KING") {
                return { ...card, value: 10 }
            } else if (card.value === "ACE") {
                return { ...card, value: 1 }
            } else {
                return { ...card, value: Number(card.value) }
            }
        })
        setcpuAllHands(handsValue)
    }
    const caculateCpuTotal = (data) => {
        // console.log(data);
        const total = data.map((element) => {
            return element.value
        })
        const handsTotal = total.reduce((a, b) => {
            return a + b
        })
        // console.log("value", handsValue);
        // console.log("total",handsTotal);
        if (cpuInfo.hands.length === 0) {
            // console.log("test");
            setCpuInfo({
                hands: data,
                total: handsTotal
            })
        }
    }
    const handlerStand = async () => {
        const keepHands = cpuInfo.hands
        const currentTotal = cpuInfo.total
        for (let i = 1; currentTotal < 17; i++) {
            keepHands.push(cpuAllHands[i])
            setdisplayCpuHands(renderHands(keepHands))
            const valueArr = keepHands.map((value) => {
                // console.log(value);
                return value.value
            })
            const total = valueArr.reduce((a, b) => {
                return a + b
            })
            if (total > 16) {
                setCpuInfo({
                    hands: keepHands,
                    total: total
                })
                return comapreTotal(total)
            }
        }
    }

    // common part////
    const renderHands = (cards) => {
        const html = cards.map((value, index) => {
            // console.log("map", value);
            return (
                <div key={index} >
                    <img src={value.image} alt="" className='cardImg' />
                </div>
            )
        })
        return html
    }
    const comapreTotal = (cpuTotal) => {
        setShowResult(!showResult)
        console.log("comparison working");
        if (playerInfo.total === cpuTotal) {
            setResult("Tie")
        } else if (playerInfo.total > cpuTotal || cpuTotal > 21) {
            setResult("Player win")
        } else {
            setResult("Player Lose")
        }
    }
    const updatePlayerHands =(data,handsAceTotal)=>{
        if (playerInfo.hands.length === 0) {
            setplayerInfo({
                hands: data,
                total: handsAceTotal
            })
        } else {
            setplayerInfo({
                hands: [...playerInfo.hands, playerAllHands[playerInfo.hands.length]],
                total: handsAceTotal
            })
        }
    }
    const handsTotalCalculate =(total)=>{
        const handsTotal = total.reduce((a, b) => {
            return a + b
        })
        return handsTotal
    }

    return (
        <div>
            <div className='playerSection'>
                <p className='totalNumber'>Total {cpuInfo.total}</p>
                <div className="cardConatiner">
                    {displayCpuHands}
                </div>
                <p>{notification}</p>
                <p className='totalNumber'>Total {playerInfo.total}</p>
                <div className="cardConatiner">
                    {displayHands}
                </div>
                <div className='btnConatiner'>
                    <div className='playBtn' onClick={handlerShowHnds}>set</div>
                    {!showResult &&<div className='playBtn' onClick={handlerDraw}>draw</div>}
                    {!showResult &&<div className='playBtn' onClick={handlerStand}>stand</div>}
                </div>
            </div>
            {showResult &&
                <div className='resultModal'>
                    <p className='resultModaltxt'>{result}</p>
                </div>}
            {/* <div className='resultModal'>
                <p className='resultModaltxt'>test</p>
            </div> */}
        </div>
    )
}

export default CardHolder



        // const handsTotal =(total)=>{
        //     let testArr
        //     const sum =0
        //     for (const key in total) {
        //         if (total[key] === []) {
        //             testArr =total[key] 
        //         }else{
        //             sum =sum + total[key]
        //         }
        //     }
        //     let aceArr =[]
        //     for(const i  in testArr){
        //         let aceTotal = testArr[i] + sum
        //         aceArr.push(aceTotal)
        //     }
        // }

