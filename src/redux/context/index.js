import { createContext, useReducer } from "react";
import { TYPES } from './../types/index';

const initialState = {
    user:null,
    isRole:0,
}
const AppContext = createContext(initialState)
const {Provider} = AppContext


const StateProvider = ({children}) => {
    const [state,dispatch] = useReducer((state,action)=>{
        switch (action.type) {
            case TYPES.USER_LOGGED:
                return {...state,user:action.payload.user,isRole:action.payload.isRole}
            default:
                return state
        }
    },initialState)

    console.log(state)
  return <Provider  value={{state,dispatch}}>{children}</Provider>
}



export {AppContext,StateProvider}


