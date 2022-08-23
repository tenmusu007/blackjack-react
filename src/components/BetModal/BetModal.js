import React, { useRef, useState } from "react";
import { BtnPlay } from "../BtnPlay";
import { useBetContext } from "../../useContext/betContext";
import { useBalanceContext } from "../../useContext/balanceContext";

export const BetModal = (props) => {
	const { balance, setBalance } = useBalanceContext();
	const { betMoney, setBetMoney } = useBetContext();
	const [preMoney, setPreMoney] = useState([]);
	const [preBalance, setPreBalance] = useState(balance);
	const betAmount = useRef();
	const handlerBetMoney = (event) => {
		setBetMoney(Number(event.target.value));
    const balanceTotal = balance - Number(event.target.value);
		if (event.target.value === "0") {
			setBalance(balance);
			setPreBalance(balance);
		} else {
			props.setPinfo({
				hands: [],
				total: 0,
			});
			props.setCinfo({
				hands: [],
				total: 0,
			});
			setPreBalance(balanceTotal);
			// props.set(balanceTotal)
      setBetMoney(Number(event.target.value));
		}
	};
	return (
		<div className={props.modal ? "BtnModal" : "BtnModal move"}>
			<p className='modaltext'>Bet Your Money</p>
			<p>Blance : {preBalance}</p>
			<p>Bet : {betMoney}</p>
			<div className='betMoneyConatiner'>
				<form className='betBar' onChange={handlerBetMoney}>
					<input
						type='range'
						min='0'
						max={balance}
						step='100'
						ref={betAmount}
					/>
				</form>
			</div>
			<div className='btnModalConatiner'>
				<BtnPlay
					className={"btnModal"}
					onClick={() => props.onClick()}
					text={props.text}
				/>
			</div>
		</div>
	);
};
