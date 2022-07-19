import { createContext, useState, useContext } from 'react';
const betContext = createContext()
export function useBetContext() {
    return useContext(betContext);
}

export function BetProvider({ children }) {
    // const [defaultdata, setData] = useState()
    const [betMoney, setBetMoney] = useState()
    const bet = {
        betMoney, 
        setBetMoney
    };
    return (
        <betContext.Provider value={bet}>
            {children}
        </betContext.Provider>
    );
}
