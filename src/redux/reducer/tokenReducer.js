
import { TYPES } from './../types/index';


const tokenReducer = (state={},action) => {
    switch (action.type) {
        case TYPES.TOKEN:
            return {...state,token:action.payload}
        default:
            return state
    }
 }
 
 export default tokenReducer