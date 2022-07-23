import React from 'react'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { BetModal } from '../BetModal/BetModal';
import { BtnPlay } from '../BtnPlay';
import { useBetContext } from '../../useContext/betContext';
import { useBalanceContext } from '../../useContext/balanceContext';
import { MiniBetModal } from '../MiniBetModal/MiniBetModal';


const CardHolder = () => {
    const [items, setItems]=useState([])
    const [showModal, setShowModal] = useState(true)
    const [deckId, setdeckID] = useState()
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
    // console.log("cpu", cpuInfo);
    // console.log("Info", playerInfo);
    // console.log("Cpu", cpuAllHands);
    // console.log("player",playerAllHands);

    // balance/////
    const {balance, setBalance} = useBalanceContext()
    // console.log("balance", balance);

    // modal////
    const [modal, setModal] = useState(true)
    const { betMoney, setBetMoney } = useBetContext()
    // console.log("bet", betMoney);

    useEffect(() => {
        axios.get(`https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1`)
            .then(res => { setdeckID(res.data.deck_id) })
    }, [])

    const handlerShowHnds = () => {
        setItems(items.length ? []:[
            {y:-40,delay:100},
        ])
        if (balance === 0 || betMoney === 0) {
            return alert("You are Loser")
        }
        setShowResult(false)
        axios.get(`https://www.deckofcardsapi.com/api/deck/${deckId}/draw/?count=6`)
            .then(data => {
                player(data.data.cards)
                axios.get(`https://www.deckofcardsapi.com/api/deck/${deckId}/draw/?count=6`)
                    .then(cpuData => cpu(cpuData.data.cards))
            })

    }

    // set all cards for player
    const addValueToPlayerHands = (obj) => {
        const handsValue = obj.map((card) => {
            if (card.value === "JACK" || card.value === "QUEEN" || card.value === "KING") {
                return { ...card, value: 10 }
            } else if (card.value === "ACE") {
                return { ...card, value: 11 }
            } else {
                return { ...card, value: Number(card.value) }
            }
        })
        setPlayerAllHands(handsValue)
        return handsValue
    }
    // set all cards for cpu
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
        return handsValue
    }
    // showing firts player cards
    const player = (obj) => {
        let keepCards = []
        const playerArr = addValueToPlayerHands(obj)
        const selectFirstHands = () => {
            for (let i = 0; i < 2; i++) {
                // console.log(playerAllHands[i]);
                keepCards.push(playerArr[i])
            }
            // console.log("player",keepCards);
            addCardToHands(keepCards)
        }
        const addCardToHands = (cards) => {
            setdisplayHands(renderHands(cards))
            caculateTotal(keepCards)
        }
        selectFirstHands()
    }
    // showing first cpu cards
    const cpu = (obj) => {
        const cpuArr = addValueToCpuHands(obj)
        setShowModal(!showModal)
        setModal(!modal)
        let keepCpuCards = [cpuArr[0]]
        // console.log("first cpu", keepCpuCards);
        const addCardToHands = (cards) => {
            setdisplayCpuHands(renderHands(cards))
            caculateCpuTotal(keepCpuCards)
        }
        addCardToHands(keepCpuCards)
    }
    // when plauer clicked darw Btn
    const handlerDraw = () => {
        console.log(playerInfo.hands);
        const hands = [...playerInfo.hands, playerAllHands[playerInfo.hands.length]]
        caculateTotal(hands)
        setdisplayHands(renderHands(hands))
    }
    // caculateTing total for player
    const caculateTotal = (data) => {
        const total = data.map((element) => {
            return element.value
        })
        if (total.includes(11)) {
            const handsTotal = handsTotalCalculate(total)
            updatePlayerHands(data, handsTotal)
            if (handsTotal > 21) {
                const aceTotal = handsTotal - 10
                if (aceTotal > 21) {
                    setplayerInfo({
                        hands: data,
                        total: aceTotal
                    })
                    return [setResult("You are busted"), setBalance(balance - betMoney), setShowResult(!showResult), setModal(!modal)]
                } else {
                    updatePlayerHands(data, aceTotal)
                }
            }
        } else {
            const handsTotal = handsTotalCalculate(total)
            updatePlayerHands(data, handsTotal)
            if (handsTotal > 21) {
                return [setResult("You are busted"), setBalance(balance - betMoney), setShowResult(!showResult), setModal(!modal)]
            }
            console.log(handsTotal);
        }
    }
    // caculateTing total for player
    const caculateCpuTotal = (data) => {
        // console.log(data);
        const total = data.map((element) => {
            return element.value
        })
        const handsTotal = total.reduce((a, b) => {
            return a + b
        })
        // if (cpuInfo.hands.length === 0) {
        // console.log("test");
        setCpuInfo({
            hands: data,
            total: handsTotal
        })
        // }
    }
    // when player clicked stand Btn
    const handlerStand = () => {
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
            setBalance(balance * 1)
            setModal(!modal)
            setResult("Tie")
            setItems(items.length ? []:[
                {y:-50,delay:100},
            ])

        } else if (playerInfo.total > cpuTotal || cpuTotal > 21) {
            console.log("result balance ", balance + betMoney * 2);
            setBalance(balance + betMoney * 2)
            setModal(!modal)
            setResult("Player win")
            setItems(items.length ? []:[
                {y:-50,delay:100},
            ])

        } else {
            // setBalance(balance)
            console.log("result balance ", balance - betMoney);
            setBalance(balance - betMoney)
            setModal(!modal)
            setResult("Player Lose")
            setItems(items.length ? []:[
                {y:-50,delay:100},
            ])

        }
    }
    const updatePlayerHands = (data, handsAceTotal) => {
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
    const handsTotalCalculate = (total) => {
        const handsTotal = total.reduce((a, b) => {
            return a + b
        })
        return handsTotal
    }

    return (
        <div className='CardHolder'>
            <MiniBetModal onClick={handlerShowHnds} text={"set"} className={"playBtn"} set={setBalance} balance={balance} modal={modal} items={items} setItems={setItems}/>
            <BetModal onClick={handlerShowHnds} text={"set"} className={"playBtn"} set={setBalance} balance={balance} modal={modal} />
            <div className='playerSection'>
                <p className='totalNumber'>Total {cpuInfo.total}</p>
                <div className="cardConatiner">
                    {displayCpuHands}
                </div>
                <p className='totalNumber'>Total {playerInfo.total}</p>
                <div className="cardConatiner">
                    {displayHands}
                </div>
                <div className='btnConatiner'>
                    {/* <div className='playBtn' onClick={handlerShowHnds}>set</div> */}
                    {/* <BtnPlay className={"playBtn"} onClick={handlerShowHnds} text={"set"}/> */}
                    {!showResult && <BtnPlay className={"playBtn"} onClick={handlerDraw} text={"draw"} />}
                    {!showResult && <BtnPlay className={"playBtn"} onClick={handlerStand} text={"stand"} />}
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


