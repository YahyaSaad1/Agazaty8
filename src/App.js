import { Outlet, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './Pages/Login';
import LoginCom from './components/LoginCom';
import ForgetPassword from './components/ForgetPassword';
import OTPCode from './components/OTPCode';
import ResetPassword from './components/ResetPassword';
import About from './Pages/About';
import Messages from './Pages/Messages';
import NavBar from './components/NavBar';
import SideBar from './components/SideBar';
import Home from './Pages/Home';
import Profile from './Pages/Profile';
import EditProfile from './Pages/EditProfile';
import Sitting from './Pages/Sitting';
import Agazaty from './Pages/Agazaty';
import AddDepartment from './Pages/AddDepartment';
import Departments from './Pages/Departments';
import Employees from './Pages/Employees';
import AddEmployee from './Pages/AddEmployee';
import LeaveRecord from './Pages/LeaveRecord';
import EditDepartment from './Pages/EditDepartment';
import Inquiries from './Pages/Inquiries';
import NormalLeave from './components/NormalLeave';
import SickLeave from './components/SickLeave';
import CasualLeave from './components/CasualLeave';
import NormalLeaveRequest from './Pages/NormalLeaveRequest';
import SickLeaveRequest from './components/SickLeaveRequest';
import EditPassword from './components/EditPassword';
import Archives from './Pages/Archives';
import CasualLeaveRequestManger from './Pages/NormalLeaveRequestManager';
import NormalLeaveRequestManager from './Pages/NormalLeaveRequestManager';
import NormalRequestManager from './Pages/NormalLeaveRequestGeneralManager';
import GeneralManagerLeave from './Pages/GeneralManagerLeave';
import UpdateNormalLeave from './Pages/UpdateNormalLeave';
import TrackLeave from './Pages/Leaves';
import EditEmployeeForHR from './Pages/EditEmployee';
import ExceptionalLeave from './Pages/ExceptionalLeave';
import SickLeavesRecord from './Pages/SickLeavesRecord';
import SickLeavesRecord2 from './Pages/SickLeavesRecord2';
import UpdateSickLeave from './components/UpdateSickLeave';
import UpdateSickLeave2 from './components/UpdateSickLeave2';
import DesNormal from './Pages/DesNormal';
import DesCasual from './Pages/DesCasual';
import DesSick from './Pages/DesSick';
import DesPermit from './Pages/DesParameter';
import Permit from './Pages/Permit';
import PermitLeave from './Pages/PermitLeave';
import ProfileForHR from './Pages/ProfileForHR';
import AgazatyNormal from './Pages/AgazatyNormal';
import AgazatySick from './Pages/AgazatySick';
import AgazatyCasual from './Pages/AgazatyCasual';
import UserNormalLeaveRequest from './Pages/UserNormalLeaveRequest';
import UserCasualLeaveRequest from './Pages/UserCasualLeaveRequest';
import UserSickLeaveRequest from './Pages/SickLeaveRequest-User';
import Error404 from './Pages/Error404';
import Holidays from './Pages/Holiday';
import AddHoliday from './Pages/AddHoliday';
import EditHoliday from './Pages/EditHoliday';
import UploadUsersExcel from './Pages/Test';
import RequireAuth from './RequireAuth';
import AddEmployee2 from './Pages/Testt';
import Error403 from './Pages/Error403';
import Team from './Pages/Team';
import ChatBot from './Pages/ChatBot';

function App() {

  // const userID = "23651146325632" // ساره
  // const userID = "30202356545696" // همام
  // const userID = "30236542365236" // عماد
  // const userID = "23653256325637"; // أمين
  // const userID = "30309092701066"; // مجدي
  // const userID = "12345678991111" // نجوى
  // const userID = "20233362565777" // عبدالله
  


  return (
    <div className="App" dir="rtl">
      <Routes>
        <Route path="/login" element={<Login />}>
          <Route index element={<LoginCom />} />
          {/* <Route path='login' element={<LoginCom />} /> */}
          <Route path="forgetpassword" element={<ForgetPassword />} />
          <Route path="otpcode" element={<OTPCode />} />
          <Route path="resetpassword" element={<ResetPassword />} />
        </Route>
        <Route path="team" element={<Team />} />
        <Route path="ChatBot" element={<ChatBot />} />

        <Route element={<RequireAuth/>}>
          <Route
            path="/"
            element={
              <div className="row d-flex" style={{ height: "100vh" }}>
                <div className="col-2 col-xl-1 col-xxl-2 sidebar p-0" style={{ height: "100%", overflowY: "auto" }}>
                  <SideBar />
                </div>

                <div className="col p-0" style={{ height: "100%", overflowY: "auto" }}>
                  <NavBar />
                  <Outlet />
                </div>
              </div>
            }

            
          >
            {/* خلصان */}
            <Route index element={<Home />} />
            <Route path="normal-leave" element={<NormalLeave />} />
            <Route path="casual-leave" element={<CasualLeave />} />
            <Route path="sick-leave" element={<SickLeave />} />
            <Route path="Permit" element={<Permit />} />
            <Route path="holidays" element={<Holidays />} />
            <Route path="add-holiday" element={<AddHoliday />} />
            <Route path="holiday/edit/:holidayID" element={<EditHoliday />} />
            <Route path="messages" element={<Messages />} />
            <Route path="profile" element={<Profile />} />
            <Route path="agazaty" element={<Agazaty />} />
            <Route path="agazaty/normal" element={<AgazatyNormal />} />
            <Route path="agazaty/casual" element={<AgazatyCasual />} />
            <Route path="agazaty/sick" element={<AgazatySick />} />
            <Route path="sitting" element={<Sitting />} />
            <Route path="normal-leave-request/:id" element={<NormalLeaveRequest />} />
            <Route path="casual-leave-request/:id" element={<CasualLeaveRequestManger />} />
            <Route path="sick-leave-request/:leaveID" element={<SickLeaveRequest />} />
            <Route path="update-sick-leave/:leaveID" element={<UpdateSickLeave />} />
            <Route path="update-sick-leave2/:leaveID" element={<UpdateSickLeave2 />} />
            <Route path="permit-leave/:permitID" element={<PermitLeave />} />
            <Route path="inquiries" element={<Inquiries />} />
            <Route path="editprofile" element={<EditProfile />} />
            {/* <Route path="hr/editprofile" element={<EditProfileForHR />} /> */}
            <Route path="departments" element={<Departments />} />
            <Route path="add-Employee" element={<AddEmployee />} />
            <Route path="add-Employee2" element={<AddEmployee2 />} />
            <Route path="error404" element={<Error404 />} />
            <Route path="error403" element={<Error403 />} />
            <Route path="add-department" element={<AddDepartment />} />
            <Route path="department/:id/edit" element={<EditDepartment />} />
            <Route path="employees/active" element={<Employees />} />
            <Route path="employees/inactive" element={<Archives />} />
            <Route path="UploadUsersExcel" element={<UploadUsersExcel />} />
            <Route path="about" element={<About />} />
            {/* <Route path="archives" element={<Archives />} /> */}
            <Route path="update-normal-leave/:leaveID" element={<UpdateNormalLeave />} />

            {/* عرض الاجازة بشكل منفصل */}
            <Route path="direct-manager/normal-leave-request/:id" element={<NormalLeaveRequestManager />} />
            <Route path="general-manager/normal-leave-request/:id" element={<NormalRequestManager />} />

            {/* سجل الاجازات الشامل */}
            <Route path="employee/:userId" element={<EditEmployeeForHR />} />
            <Route path="des-requests/normal" element={<DesNormal />} />
            <Route path="des-requests/casual" element={<DesCasual />} />
            <Route path="des-requests/sick" element={<DesSick />} />
            <Route path="des-requests/permit" element={<DesPermit />} />

            {/* محمود الهواري */}
            <Route path="edit-password" element={<EditPassword />} />

            {/* طلبات الاجازات عن المديرين */}
            <Route path="leave-record" element={<LeaveRecord />} />
            <Route path="general/leave-record" element={<GeneralManagerLeave />} />

            <Route path="exceptional-leave" element={<ExceptionalLeave />} />
            <Route path="sick-leaves-record" element={<SickLeavesRecord />} />
            <Route path="sick-leaves-record2" element={<SickLeavesRecord2 />} />

            {/* تتبع امازون */}
            <Route path="track-leave/:id" element={<TrackLeave />} />





            <Route path="profile/user/:userID" element={<ProfileForHR />} />





            <Route path="user/normal-leave-request/:leaveID" element={<UserNormalLeaveRequest />} />
            <Route path="user/casual-leave-request/:leaveID" element={<UserCasualLeaveRequest />} />
            <Route path="user/sick-leave-request/:leaveID" element={<UserSickLeaveRequest />} />


          </Route>
        </Route>
            <Route path="*" element={<Error404 />} />
      </Routes>
    </div>
  );
}

export default App;
