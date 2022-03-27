import {composeWithDevTools} from 'redux-devtools-extension'
import {applyMiddleware,createStore} from 'redux'
import thunk from 'redux-thunk'

import {Provider} from 'react-redux'
import allReducers from './reducer';
const store =createStore(allReducers,
    composeWithDevTools(applyMiddleware(thunk))
)
const ReduxProvider = ({children})=>{
   return(
       <Provider store={store}>
            {children}
       </Provider>
   )
}
export default ReduxProvider