import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { BetModal } from "../BetModal/BetModal";
import { BtnPlay } from "../BtnPlay";
import { useBetContext } from "../../useContext/betContext";
import { useBalanceContext } from "../../useContext/balanceContext";
import { MiniBetModal } from "../MiniBetModal/MiniBetModal";

const CardHolder = () => {
	const [items, setItems] = useState([]);
	const [showModal, setShowModal] = useState(true);
	const [isVisible, setIsVisible] = useState(false);
	const [deckId, setdeckID] = useState();
	const [playerAllHands, setPlayerAllHands] = useState(" ");
	const [displayHands, setdisplayHands] = useState();
	const [playerInfo, setplayerInfo] = useState({
		hands: [],
		total: 0,
	});
	const [cpuAllHands, setcpuAllHands] = useState();
	const [displayCpuHands, setdisplayCpuHands] = useState([]);
	const [cpuInfo, setCpuInfo] = useState({
		hands: [],
		total: 0,
	});
	// result/////////
	const [result, setResult] = useState();
	const [showResult, setShowResult] = useState(false);
	// console.log("cpu", cpuInfo);
	// console.log("hands",);
	// console.log("Info", playerInfo);
	// console.log("Cpu", cpuAllHands);
	// console.log("player",playerAllHands);

	// balance/////
	const { balance, setBalance } = useBalanceContext();
	// console.log("balance", balance);

	// modal////
	const [modal, setModal] = useState(true);
	const { betMoney, setBetMoney } = useBetContext();
	// console.log("bet", betMoney);

	useEffect(() => {
		axios
			.get(`https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1`)
			.then((res) => {
				setdeckID(res.data.deck_id);
			});
	}, []);

	const handlerShowHnds = () => {
		setPlayerAllHands("");
		setplayerInfo({
			hands: [],
			total: 0,
		});
		setCpuInfo({
			hands: [],
			total: 0,
		});
		if (balance === 0 || betMoney === 0) {
			alert("You are Loser");
			return;
		}
		setItems(items.length ? [] : [{ y: -40, delay: 100 }]);
		setShowResult(false);
		setIsVisible(true);
		axios
			.get(`https://www.deckofcardsapi.com/api/deck/${deckId}/draw/?count=6`)
			.then((data) => {
				player(data.data.cards);
				axios
					.get(
						`https://www.deckofcardsapi.com/api/deck/${deckId}/draw/?count=6`
					)
					.then((cpuData) => cpu(cpuData.data.cards));
			});
	};

	// set all cards for player
	const addValueToPlayerHands = (obj) => {
		const handsValue = obj.map((card) => {
			if (
				card.value === "JACK" ||
				card.value === "QUEEN" ||
				card.value === "KING"
			) {
				return { ...card, value: 10 };
			} else if (card.value === "ACE") {
				return { ...card, value: 11 };
			} else {
				return { ...card, value: Number(card.value) };
			}
		});
		setPlayerAllHands(handsValue);
		return handsValue;
	};
	// set all cards for cpu
	const addValueToCpuHands = (obj) => {
		const handsValue = obj.map((card) => {
			if (
				card.value === "JACK" ||
				card.value === "QUEEN" ||
				card.value === "KING"
			) {
				return { ...card, value: 10 };
			} else if (card.value === "ACE") {
				return { ...card, value: 1 };
			} else {
				return { ...card, value: Number(card.value) };
			}
		});
		setcpuAllHands(handsValue);
		return handsValue;
	};
	// showing firts player cards
	const player = (obj) => {
		let keepCards = [];
		const playerArr = addValueToPlayerHands(obj);
		const selectFirstHands = () => {
			for (let i = 0; i < 2; i++) {
				// console.log(playerAllHands[i]);
				keepCards.push(playerArr[i]);
			}
			// console.log("player",keepCards);
			addCardToHands(keepCards);
		};
		const addCardToHands = (cards) => {
			setdisplayHands([renderHands(cards)]);
			caculateTotal(keepCards);
		};
		selectFirstHands();
	};
	// showing first cpu cards
	const cpu = (obj) => {
		const cpuArr = addValueToCpuHands(obj);
		setShowModal(!showModal);
		setModal(!modal);
		let keepCpuCards = [cpuArr[0]];
		// console.log("first cpu", keepCpuCards);
		const addCardToHands = (cards) => {
			// setdisplayCpuHands(renderHands(cards));
			setdisplayCpuHands(cards);
			caculateCpuTotal(keepCpuCards);
		};
		addCardToHands(keepCpuCards);
	};
	// when plauer clicked darw Btn
	const handlerDraw = () => {
		const hands = [
			...playerInfo.hands,
			playerAllHands[playerInfo.hands.length],
		];
		caculateTotal(hands);
		// renderHands(hands);
		setdisplayHands(renderHands(hands));
	};
	// caculateTing total for player
	const caculateTotal = (data) => {
		const total = data.map((element) => {
			return element.value;
		});
		if (total.includes(11)) {
			const handsTotal = handsTotalCalculate(total);
			updatePlayerHands(data, handsTotal);
			if (handsTotal > 21) {
				const aceTotal = handsTotal - 10;
				if (aceTotal > 21) {
					setplayerInfo({
						hands: data,
						total: aceTotal,
					});

					return [
						setResult("You are busted"),
						setBalance(balance - betMoney),
						setShowResult(!showResult),
						delayState(),
						setItems(items.length ? [] : [{ y: -50, delay: 2000 }]),
					];
				} else {
					updatePlayerHands(data, aceTotal);
				}
			}
		} else {
			const handsTotal = handsTotalCalculate(total);
			updatePlayerHands(data, handsTotal);
			if (handsTotal > 21) {
				return [
					setResult("You are busted"),
					setBalance(balance - betMoney),
					setShowResult(!showResult),
					delayState(),
					setItems(items.length ? [] : [{ y: -50, delay: 2000 }]),
				];
			}
		}
	};
	// caculateTing total for player
	const caculateCpuTotal = (data) => {
		const total = data.map((element) => {
			return element.value;
		});
		const handsTotal = total.reduce((a, b) => {
			return a + b;
		});
		setCpuInfo({
			hands: data,
			total: handsTotal,
		});
	};
	// when player clicked stand Btn
	const handlerStand = () => {
		let cardImg = [];
		const keepHands = cpuInfo.hands;
		const currentTotal = cpuInfo.total;
		let total =0
		for (let i = 1; total< 17; i++) {
			keepHands.push(cpuAllHands[i]);
			// keepHands.forEach((value, index) => {
			// 	new Promise((resolve) =>
			// 		setTimeout(() => {
			// 			const cardHtml = (
			// 				<div key={index}>
			// 					<img src={value.image} alt='' className='cardImg' />
			// 				</div>
			// 			);
			// 			cardImg.push(cardHtml);
			// 			console.log(cardImg);
			// 			setdisplayCpuHands(cardImg);
			// 			resolve("out");
			// 			// console.log(cardImg);
			// 		}, 500 * index)
			// 	);
			// });
			// console.log("keep", keepHands);
			// setdisplayCpuHands(keepHands);
			const newArr =[]
			keepHands.forEach((value, index) => {
				// const html =  (
				// 	<div key={index}>
				// 		<img src={value.image} alt='' className='cardImg' />
				// 	</div>
				// );
				// console.log("now",html);
				newArr.push(value);
				// setTimeout(() => {
				// 	// console.log("arr",newArr);
				// },300 * index)
			})
				setTimeout(() => {
					setdisplayCpuHands(newArr)
				}, 500 * newArr.length);
			// setdisplayCpuHands(renderHands(keepHands));
			const valueArr = keepHands.map((value) => {
				return value.value;
			});
			total = valueArr.reduce((a, b) => {
				return a + b;
			});
		}
		if (total > 16) {
			setCpuInfo({
				hands: keepHands,
				total: total,
			});
			return comapreTotal(total);
		}
			// cpu total over 17
	};

	// common part////
	const renderHands =  (cards) => {
		// console.log(cards.image);
		const imgArr = cards.map((img) => {
			return img.image;
    });
    // console.log(imgArr);
		//   setTimeout(() => {
		//     const test = cards.map((data, i) => {
		//       return (
		//         <div key={i}>
		// 			<img src={data.image} alt='' className='cardImg' />
		// 		</div>
		//       )
		//     });
		//     console.log(test);
		//   return test
		// }, 1000);

		// const test = await Promise.all(
		// 	imgArr.map((value, index) => {
		// 		return new Promise((resolve, reject) => {
    //       setTimeout(() => {
    //         resolve(
    //           <div key={index}>
		// 						<img src={value} alt='' className='cardImg' />
    //         </div>
    //             )
		// 			}, 2000);
		// 		});
		// 	})
    // );
    // console.log(typeof test);
    // console.log(test);
    // setdisplayHands(test)
		const html = cards.map((value, index) => {
			return (
				<div key={index}>
					<img src={value.image} alt='' className='cardImg' />
				</div>
			);
		});
		// console.log(html);
		return html;
	};
	const comapreTotal = (cpuTotal) => {
		setShowResult(!showResult);
		if (playerInfo.total === cpuTotal) {
			setBalance(balance * 1);
			setResult("Tie");
			setItems(items.length ? [] : [{ y: -50, delay: 2000 }]);
			delayState();
		} else if (playerInfo.total > cpuTotal || cpuTotal > 21) {
			setBalance(balance - betMoney + betMoney * 2);
			setResult("Player win");
			setItems(items.length ? [] : [{ y: -50, delay: 2000 }]);
			delayState();
		} else {
			setBalance(balance - betMoney);
			setResult("Player Lose");
			setItems(items.length ? [] : [{ y: -50, delay: 2000 }]);
			delayState();
		}
	};
	const updatePlayerHands = (data, handsAceTotal) => {
		if (playerInfo.hands.length === 0) {
			setplayerInfo({
				hands: data,
				total: handsAceTotal,
			});
		} else {
			setplayerInfo({
				hands: [...playerInfo.hands, playerAllHands[playerInfo.hands.length]],
				total: handsAceTotal,
			});
		}
	};
	const handsTotalCalculate = (total) => {
		const handsTotal = total.reduce((a, b) => {
			return a + b;
		});
		return handsTotal;
	};
	const delayState = () => {
		setTimeout(() => {
			setModal(!modal);
		}, 10000);
	};
	console.log("html side",displayCpuHands);
	return (
		<div className='CardHolder'>
			<MiniBetModal
				onClick={handlerShowHnds}
				text={"set"}
				className={"playBtn"}
				set={setBalance}
				balance={balance}
				modal={modal}
				items={items}
				setItems={setItems}
			/>
			<BetModal
				onClick={handlerShowHnds}
				text={"set"}
				className={"playBtn"}
				balance={balance}
				modal={modal}
				pInfo={playerInfo}
				setPinfo={setplayerInfo}
				cInfo={cpuInfo}
				setCinfo={setCpuInfo}
			/>
			{showResult && (
				<div className='resultModal'>
					<p className='resultModaltxt'>{result}</p>
				</div>
			)}
			{isVisible && (
				<div className='playerSection'>
					<p className='totalNumber'>Total {cpuInfo.total}</p>
					<div className='cardConatiner'>
						{/* {renderHands(cpuInfo.hands)} */}
						{displayCpuHands.map((value, index) => {
							return (
								<div key={index}>
									<img src={value.image} alt='' className='cardImg' />
								</div>
							);
						})}
					</div>
					<p className='totalNumber'>Total {playerInfo.total}</p>
					<div className='cardConatiner'>{displayHands}</div>
					<div className='btnConatiner'>
						{!showResult && (
							<BtnPlay
								className={"playBtn"}
								onClick={handlerDraw}
								text={"draw"}
							/>
						)}
						{!showResult && (
							<BtnPlay
								className={"playBtn"}
								onClick={handlerStand}
								text={"stand"}
							/>
						)}
					</div>
				</div>
			)}
		</div>
	);
};

export default CardHolder;
