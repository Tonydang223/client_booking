import { useContext, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "./App.css";
import Header from "./layout/Header/Header";
import apiHandler from "./services/api/auth";
import { authAction } from "./redux/actions/auth";
import { Outlet } from "react-router-dom";
import { AppContext } from "./redux/context";
import {useNavigate} from 'react-router-dom'
import apiUser from "./services/api/user";
import { getAllLocalStorage, getLocalStorage, setLocalStorage } from "./utils/func";
import { tokenAction } from './redux/actions/token';
import { useSelector,useDispatch } from 'react-redux';
function App(props) {
  const { dispatch, state } = useContext(AppContext);
  const navigate = useNavigate()
  const dispatchReducer = useDispatch()
  console.log("🚀 ~ file: App.js ~ line 13 ~ App ~ state", state);
  const {token} = useSelector(state=>state)
  console.log("🚀 ~ file: App.js ~ line 19 ~ App ~ token", token)
  const valueLocal = getAllLocalStorage()
  const refreshToken = async () => {
    if (valueLocal?.refToken) {
      try {
        const res = await apiHandler.refreshToken({
          refreshToken: valueLocal?.refToken,
        });
        const token = res?.accessToken;
        dispatchReducer(tokenAction(token))
      } catch (error) {
        console.log(error.message);
        if(error.response.status === 403){
          navigate('/signIn')
        }
      }
    }
  };
  const getInfoUser = async () => {
      try {
        const res = await apiUser.getInfo();
        if(!valueLocal?.isRole){
          setLocalStorage('isRole',res?.user?.role)
        }
        console.log(res)
        dispatch(authAction(res?.user));
      } catch (error) {
        console.log(error.message);
      }
  }
  useEffect(() => {
    refreshToken();
  }, [dispatch]);
  useEffect(() => {
    if(token){
      getInfoUser();
    }
  }, [token]);
  return (
    <>
      <ToastContainer />
      <Header />
      {props.children}
    </>
  );
}

export default App;
