import { createContext, useState, useContext } from 'react';
const balanceContext = createContext()
export function useBalanceContext() {
    return useContext(balanceContext);
}

export function BalanceProvider({ children }) {
    // const [defaultdata, setData] = useState()
    const [balance, setBalance] = useState(1000)
    const bal = {
        balance, setBalance
    };
    return (
        <balanceContext.Provider value={bal}>
            {children}
        </balanceContext.Provider>
    );
}
