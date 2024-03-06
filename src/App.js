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
import Hardware from "./Routes/Dashboard/Hardware";
import Accessories from "./Routes/Dashboard/Accessories"
import Software from "./Routes/Dashboard/Software";
import YearlySoftware from "./Routes/Dashboard/YearlySoftware";
import Amortized from "./Routes/Dashboard/Amortized"
import User from "./Routes/Dashboard/User";
//Read
import ReadHardware from "./Components/Read/ReadHardware"
import ReadAccessories from "./Components/Read/ReadAccessories"
import ReadSoftware from "./Components/Read/ReadSoftware"
import ReadYearlySoftware from "./Components/Read/ReadYearlySoftware"
import ReadAmortized from "./Components/Read/ReadAmortized"
//Add
import AddHardware from "./Components/Add/AddHardware";
import AddAccessories from "./Components/Add/AddAccessories"
import AddSoftware from "./Components/Add/AddSoftware"
import AddYearlySoftware from "./Components/Add/AddYearlysoftware"
import AddAmortized from "./Components/Add/AddAmortized"
import AddUser from "./Components/Add/AddUser";
//Update
import UpdateHardware from "./Components/Updates/UpdateHardware"
import UpdateAccessories from "./Components/Updates/UpdateAccessories"
import UpdateSoftware from "./Components/Updates/UpdateSoftware"
import UpdateYearlySoftware from "./Components/Updates/UpdateYearlySoftware";
import UpdateAmortized from "./Components/Updates/UpdateAmortized"
import UpdateUser from "./Components/Updates/UpdateUser";
//blank
import Blank from "./Routes/Bar/Blank";

function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<Login />}></Route>
      <Route path="/register" element={<Register />}></Route>
      <Route path="/forgopassword" element={<ForgotPassword />}></Route>
      <Route path="/resetpassword/:id" element={<ResetPassword />}></Route>
      <Route path="/blank" element={<Blank/>}></Route>
      <Route path="/dashboard" element={<PageLayout />}>
      <Route path="" element={<Dashboard />}></Route>
         {/* Page */}
         <Route path="/dashboard/hwasset" element={<Hardware />}></Route>
          <Route path="/dashboard/acessories" element={<Accessories />}></Route>
          <Route path="/dashboard/swasset" element={<Software />}></Route>
          <Route path="/dashboard/swyearly" element={<YearlySoftware />}></Route>
          <Route path="/dashboard/amortized" element={<Amortized />}></Route>
          <Route path="/dashboard/user" element={<User />}></Route>
          {/* Add */}
          <Route path="/dashboard/addhwasset" element={<AddHardware />}></Route>
          <Route path="/dashboard/addacessories" element={<AddAccessories />}></Route>
          <Route path="/dashboard/addswasset" element={<AddSoftware />}></Route>
          <Route path="/dashboard/addswyearly" element={<AddYearlySoftware />}></Route>
          <Route path="/dashboard/addamortized" element={<AddAmortized  />}></Route>
          <Route path="/dashboard/adduser" element={<AddUser  />}></Route>
          {/* Read */}
          <Route path="/dashboard/readhwasset/:id" element={<ReadHardware />}></Route>
          <Route path="/dashboard/readacessories/:id" element={<ReadAccessories />}></Route>
          <Route path="/dashboard/readswasset/:id" element={<ReadSoftware />}></Route>
          <Route path="/dashboard/readswyearly/:id" element={<ReadYearlySoftware />}></Route>
          <Route path="/dashboard/readamortized/:id" element={<ReadAmortized />}></Route>
          {/* Update */}
          <Route path="/dashboard/updatehwasset/:id" element={<UpdateHardware />}></Route>
          <Route path="/dashboard/updateacessories/:id" element={<UpdateAccessories />}></Route>
          <Route path="/dashboard/updateswasset/:id" element={<UpdateSoftware />}></Route>
          <Route path="/dashboard/updateswyearly/:id" element={<UpdateYearlySoftware />}></Route>
          <Route path="/dashboard/updateamortized/:id" element={<UpdateAmortized />}></Route>
          <Route path="/dashboard/updateuser/:id" element={<UpdateUser />}></Route>
      </Route>
      </Routes>
    </BrowserRouter>
  )
}
export default App;
