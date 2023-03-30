import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import Register from "./pages/register/Register";
import {
  BrowserRouter as Router,
  Route,
  Navigate,
  Routes,
} from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import Messenger from "./pages/messenger/Messenger";
import Phone from "./components/phone/phone";
import VerifyOTP from "./components/otp/otp";
import Sucess from "./components/Sucess";
import Forgot from "./components/forgotpassword/Forgot";

function App() {
  const { user } = useContext(AuthContext);
  return (
    <Router>
      <Routes>
        <Route exact path='/sucess' element={ <Sucess />} />
        <Route exact path='/' element={user ? <Home /> : <Login />} />
        <Route  path='/login' element={user ? <Navigate to="/" /> : <Login />} />
        <Route exact path="/OTP_login" element={user ? <Navigate to="/" /> : <Phone />} />
        <Route exact path="/OTP_verify" element={user ? <Navigate to="/" /> : <VerifyOTP />} />
        <Route exact path="/forgotpassword" element={user ? <Navigate to="/" /> : <Forgot/>} />
        <Route  path='/register' element={user ? <Navigate to="/" /> : <Register />} />
        <Route  path='/messenger' element={!user ? <Navigate to="/" /> : <Messenger />} />
        <Route  path='/profile/:username' element={user ? <Profile /> : <Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;