
import { TYPES } from './../types/index';



const authReducer = (state={},action) => {
   switch (action.type) {
       case TYPES.USER_LOGGED:
           return {...state,...action.payload}
       default:
           return state
   }
}

export default authReducer