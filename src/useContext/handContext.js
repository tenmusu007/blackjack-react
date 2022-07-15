import { createContext, useState, useContext } from 'react';
const handContext = createContext()
export function useHandsContext() {
    return useContext(handContext);
}

export function HandsProvider({ children }) {
    // const [defaultdata, setData] = useState()
    const [playerInfo, setplayerInfo] = useState(
        {
            hands:[],
            total:0,
        }
        )
    const hands = {
        playerInfo, 
        setplayerInfo
    };

    return (
        <HandsProvider.Provider value={hands}>
            {children}
        </HandsProvider.Provider>
    );
}
