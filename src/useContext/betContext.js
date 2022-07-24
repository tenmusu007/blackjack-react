import { createContext, useState, useContext } from 'react';
const betContext = createContext()
export function useBetContext() {
    return useContext(betContext);
}

export function BetProvider({ children }) {
    // const [defaultdata, setData] = useState()
    const [betMoney, setBetMoney] = useState(0)
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
