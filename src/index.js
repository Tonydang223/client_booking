import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Homepage from "./Homepage";
import ForgotPass from "./forgotpassword/ForgotPass";
import ResetPass from "./forgotpassword/ResetPass";
import VerifyEmail from "./verify/VerifyEmail";
import ResetLinkEmail from "./verify/ResetLinkEmail";
import Page404 from "./Page404";
import Login from "./member/Login/Login";
import Register from "./member/Register/Register";
import ReduxProvider from "./redux/store";
import Unauthorized from "./pages/401/Unauthorized";
import MainPage from "./pages/Admin/MainPage";
import { ROLES } from "./config/constants";
import ProtectedRoute from "./hooks/ProtectedRoute";
import MyPage from "./pages/Profile/MyPage";
import { StateProvider } from "./redux/context";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <StateProvider>
        <ReduxProvider>
          <App>
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/forgotPass" element={<ForgotPass />} />
              <Route path="/signIn" element={<Login />} />
              <Route path="/signUp" element={<Register />} />
              <Route path="/unauthorized" element={<Unauthorized />} />
  
              <Route  element={<ProtectedRoute allRoute={[ROLES.User]}/>}>
                     <Route path='/user/info' element={<MyPage/>}/>
              </Route>
              <Route  element={<ProtectedRoute allRoute={[ROLES.Admin]}/>}>
                     <Route path='/admin' element={<MainPage/>}/>
              </Route>
              <Route path="/auth/resetPass/:token" element={<ResetPass />} />
              <Route
                path="/auth/verify-email/:token"
                element={<VerifyEmail />}
              />
              <Route path="/auth/resetLink" element={<ResetLinkEmail />} />
              <Route path="*" element={<Page404 />} />
            </Routes>
          </App>
        </ReduxProvider>
      </StateProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
