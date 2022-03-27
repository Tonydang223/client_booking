import { TYPES } from './../types/index';
export const tokenAction = (data) => {
    return {
        type:TYPES.TOKEN,
        payload:data
    }
}