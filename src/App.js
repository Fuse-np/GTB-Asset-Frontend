import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
//Login-regis
import Register from "./Components/LoginRegis/Register"
import Login from "./Components/LoginRegis/Login"
import ForgotPassword from "./Components/LoginRegis/ForgotPassword"
import ResetPassword from "./Components/LoginRegis/ResetPassword"
//Dashboard - Sidebar(Layout)
import PageLayout from "./Routes/Bar/PageLayout"
import Dashboard from "./Routes/Dashboard/DashBoard"
import Hwasset from "./Routes/Dashboard/HwAsset"
import Accessories from "./Routes/Dashboard/HwAccessories"
import Swasset from "./Routes/Dashboard/SwAsset"
import Swyearly from "./Routes/Dashboard/SwYearly"
import Amortized from "./Routes/Dashboard/HwAmortized"
import User from "./Routes/Dashboard/User";
//Read
import ReadHwasset from "./Components/Read/ReadHwasset"
import ReadAccessories from "./Components/Read/ReadAccessories"
import ReadSwasset from "./Components/Read/ReadSwasset"
import ReadSwyearly from "./Components/Read/ReadSwyearly"
import ReadAmortized from "./Components/Read/ReadAmortized"
//Add
import AddHwasset from "./Components/Add/AddHwasset"
import AddAccessories from "./Components/Add/AddAccessories"
import AddSwasset from "./Components/Add/AddSwasset"
import AddSwyearly from "./Components/Add/AddSwyearly"
import AddAmortized from "./Components/Add/AddAmortized"
import AddUser from "./Components/Add/AddUser";
//Update
import UpdateHwasset from "./Components/Updates/UpdateHwasset"
import UpdateAccessories from "./Components/Updates/UpdateAccessories"
import UpdateSwasset from "./Components/Updates/UpdateSwasset"
import UpdateSwyearly from "./Components/Updates/UpdateSwyearly"
import UpdateAmortized from "./Components/Updates/UpdateAmortized"
import UpdateUser from "./Components/Updates/UpdateUser";
//Route
import PrivateRoute from "./Routes/Bar/PrivateRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<Login />}></Route>
      <Route path="/register" element={<Register />}></Route>
      <Route path="/forgopassword" element={<ForgotPassword />}></Route>
      <Route path="/resetpassword/:id" element={<ResetPassword />}></Route>
      <Route element={<PrivateRoute/>}>
      <Route path="/dashboard" element={<PageLayout />}>
      <Route path="" element={<Dashboard />}></Route>
         {/* Page */}
         <Route path="/dashboard/hwasset" element={<Hwasset />}></Route>
          <Route path="/dashboard/acessories" element={<Accessories />}></Route>
          <Route path="/dashboard/swasset" element={<Swasset />}></Route>
          <Route path="/dashboard/swyearly" element={<Swyearly />}></Route>
          <Route path="/dashboard/amortized" element={<Amortized />}></Route>
          <Route path="/dashboard/user" element={<User />}></Route>
          {/* Add */}
          <Route path="/dashboard/addhwasset" element={<AddHwasset />}></Route>
          <Route path="/dashboard/addacessories" element={<AddAccessories />}></Route>
          <Route path="/dashboard/addswasset" element={<AddSwasset />}></Route>
          <Route path="/dashboard/addswyearly" element={<AddSwyearly />}></Route>
          <Route path="/dashboard/addamortized" element={<AddAmortized  />}></Route>
          <Route path="/dashboard/adduser" element={<AddUser  />}></Route>
          {/* Read */}
          <Route path="/dashboard/readhwasset/:id" element={<ReadHwasset />}></Route>
          <Route path="/dashboard/readacessories/:id" element={<ReadAccessories />}></Route>
          <Route path="/dashboard/readswasset/:id" element={<ReadSwasset />}></Route>
          <Route path="/dashboard/readswyearly/:id" element={<ReadSwyearly />}></Route>
          <Route path="/dashboard/readamortized/:id" element={<ReadAmortized />}></Route>
          {/* Update */}
          <Route path="/dashboard/updatehwasset/:id" element={<UpdateHwasset />}></Route>
          <Route path="/dashboard/updateacessories/:id" element={<UpdateAccessories />}></Route>
          <Route path="/dashboard/updateswasset/:id" element={<UpdateSwasset />}></Route>
          <Route path="/dashboard/updateswyearly/:id" element={<UpdateSwyearly />}></Route>
          <Route path="/dashboard/updateamortized/:id" element={<UpdateAmortized />}></Route>
          <Route path="/dashboard/updateuser/:id" element={<UpdateUser />}></Route>
      </Route>
      </Route>
      </Routes>
    </BrowserRouter>
  )
}
export default App;
