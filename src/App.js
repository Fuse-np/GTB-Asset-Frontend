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
import AmortizedSoftware from "./Routes/Dashboard/AmortizedSoftware"
//Read
import ReadHardware from "./Components/Read/ReadHardware"
import ReadAccessories from "./Components/Read/ReadAccessories"
import ReadSoftware from "./Components/Read/ReadSoftware"
import ReadYearlySoftware from "./Components/Read/ReadYearlySoftware"
import ReadAmortized from "./Components/Read/ReadAmortized"
import ReadAmortizedSoftware from "./Components/Read/ReadAmorizedSoftware";
//Add
import AddHardware from "./Components/Add/AddHardware";
import AddAccessories from "./Components/Add/AddAccessories"
import AddSoftware from "./Components/Add/AddSoftware"
import AddYearlySoftware from "./Components/Add/AddYearlysoftware"
import AddAmortized from "./Components/Add/AddAmortized"
import AddUser from "./Components/Add/AddUser";
import AddAmortizedSoftware from "./Components/Add/AddAmortizedSoftware";
//Update
import UpdateHardware from "./Components/Updates/UpdateHardware"
import UpdateAccessories from "./Components/Updates/UpdateAccessories"
import UpdateSoftware from "./Components/Updates/UpdateSoftware"
import UpdateYearlySoftware from "./Components/Updates/UpdateYearlySoftware";
import UpdateAmortized from "./Components/Updates/UpdateAmortized"
import UpdateUser from "./Components/Updates/UpdateUser";
import UpdateAmortizedSoftware from "./Components/Updates/UpdateAmortizedSoftware";
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
         <Route path="/dashboard/hardware" element={<Hardware />}></Route>
          <Route path="/dashboard/acessories" element={<Accessories />}></Route>
          <Route path="/dashboard/software" element={<Software />}></Route>
          <Route path="/dashboard/yearlysoftware" element={<YearlySoftware />}></Route>
          <Route path="/dashboard/amortized" element={<Amortized />}></Route>
          <Route path="/dashboard/amortizedsoftware" element={<AmortizedSoftware />}></Route>
          <Route path="/dashboard/user" element={<User />}></Route>
          {/* Add */}
          <Route path="/dashboard/addhardware" element={<AddHardware />}></Route>
          <Route path="/dashboard/addacessories" element={<AddAccessories />}></Route>
          <Route path="/dashboard/addsoftware" element={<AddSoftware />}></Route>
          <Route path="/dashboard/addyearlysoftware" element={<AddYearlySoftware />}></Route>
          <Route path="/dashboard/addamortized" element={<AddAmortized  />}></Route>
          <Route path="/dashboard/addamortizedsoftware" element={<AddAmortizedSoftware  />}></Route>
          <Route path="/dashboard/adduser" element={<AddUser  />}></Route>
          {/* Read */}
          <Route path="/dashboard/readhardware/:id" element={<ReadHardware />}></Route>
          <Route path="/dashboard/readacessories/:id" element={<ReadAccessories />}></Route>
          <Route path="/dashboard/readsoftware/:id" element={<ReadSoftware />}></Route>
          <Route path="/dashboard/readyearlysoftware/:id" element={<ReadYearlySoftware />}></Route>
          <Route path="/dashboard/readamortized/:id" element={<ReadAmortized />}></Route>
          <Route path="/dashboard/readamortizedsoftware/:id" element={<ReadAmortizedSoftware />}></Route>
          {/* Update */}
          <Route path="/dashboard/updatehardware/:id" element={<UpdateHardware />}></Route>
          <Route path="/dashboard/updateacessories/:id" element={<UpdateAccessories />}></Route>
          <Route path="/dashboard/updatesoftware/:id" element={<UpdateSoftware />}></Route>
          <Route path="/dashboard/updateyearlysoftware/:id" element={<UpdateYearlySoftware />}></Route>
          <Route path="/dashboard/updateamortized/:id" element={<UpdateAmortized />}></Route>
          <Route path="/dashboard/updateamortizedsoftware/:id" element={<UpdateAmortizedSoftware />}></Route>
          <Route path="/dashboard/updateuser/:id" element={<UpdateUser />}></Route>
      </Route>
      </Routes>
    </BrowserRouter>
  )
}
export default App;
