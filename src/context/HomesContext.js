import { fetchAllHomes } from "common/homesApi";
import { createContext, useEffect, useReducer } from "react";
import { hostUrl } from "utils/urls";

const initialHomesContext = {
    homes: [],
    loading: true,
    updated: new Date()
}

export const HomesContext = createContext(null);
export const HomesDispatchContext = createContext(null);

export const HomesContextProvider = ({ children }) => {
    const [homesContext, dispatch] = useReducer(homeReducer, initialHomesContext);

    const dispatchHomes = () => {
        fetchAllHomes()
            .then((json) => {
                dispatch({
                    type: "set",
                    setHomes: json
                })
            })
    }

    useEffect(() => {
        dispatchHomes()
    }, [])

    return (
      <HomesContext.Provider value={homesContext}>
        <HomesDispatchContext.Provider value={dispatch}>
          {children}
        </HomesDispatchContext.Provider>
      </HomesContext.Provider>
    );
}

const homeReducer = (homesContext, action) => {
    switch (action.type) {
        case 'add': {
            return [...homesContext, { ...action.newHome }]
        }
        case 'set': {
            return {
                homes: action.setHomes,
                updated: new Date,
                loading: false
            }
        }
    }
}