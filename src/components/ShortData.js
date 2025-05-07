import { useEffect, useState } from "react";
import "../CSS/LeaveBalance.css";
import { BASE_API_URL, token } from "../server/serves";

function ShortData() {
  const [department, setDepartments] = useState([]);
  const [acceptedLeaves, setAcceptedLeaves] = useState([]);
  const [rejectedLeaves, setRejectedLeaves] = useState([]);
  const [waitingLeaves, setWaitingLeaves] = useState([]);
  const [users, setUsers] = useState([]);
  const [leaves, setLeaves] = useState({});

  useEffect(() => {
    fetch(`${BASE_API_URL}/api/Department/GetAllDepartments`)
      .then((res) => res.json())
      .then((data) => setDepartments(data));
  }, []);

  useEffect(() => {
    fetch(`${BASE_API_URL}/api/NormalLeave/GetAllAcceptedNormalLeaves`)
      .then((res) => res.json())
      .then((data) => setAcceptedLeaves(data));
  }, []);

  useEffect(() => {
    fetch(`${BASE_API_URL}/api/NormalLeave/GetAllRejectedNormalLeaves`)
      .then((res) => res.json())
      .then((data) => setRejectedLeaves(data));
  }, []);

  useEffect(() => {
    fetch(`${BASE_API_URL}/api/NormalLeave/GetAllWaitingNormalLeaves`)
      .then((res) => res.json())
      .then((data) => setWaitingLeaves(data));
  }, []);

  useEffect(() => {
    fetch(`${BASE_API_URL}/api/Account/GetAllActiveUsers`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

  useEffect(() => {
    setLeaves({
      numberLeave: {
        type: "عدد الاجازات",
        num:
          (acceptedLeaves?.length || 0) +
          (rejectedLeaves?.length || 0) +
          (waitingLeaves?.length || 0),
      },
      departments: {
        type: "الاقسام",
        num: department?.length || 0,
      },
      employees: {
        type: "الموظفين",
        num: users?.length || 0,
      },
      acceptableLeave: {
        type: "الاجازات المقبولة",
        num: acceptedLeaves?.length || 0,
      },
      rejectedLeaves: {
        type: "الاجازات المرفوضة",
        num: rejectedLeaves?.length || 0,
      },
      pendingLeave: {
        type: "الاجازات المعلقة",
        num: waitingLeaves?.length || 0,
      },
    });
  }, [department, acceptedLeaves, rejectedLeaves, waitingLeaves, users]);

  return (
    <div>

      <div className="d-flex mb-2" style={{marginTop:'-15px'}}>
        <h4>معلومات عامة</h4>
      </div>

      <div className="d-flex flex-wrap gap-3 mb-4">
        {Object.values(leaves).map((leave, index) => {
          return (
            <div className="d-flex flex-column align-items-center justify-content-center box LeaveBalance rounded-3 p-3" style={{ minWidth: "200px", flex: "1 1 30%" }} key={index}>
              <h5>{leave.type}</h5>
              <h4>{leave.num}</h4>
            </div>

            // <divclassName="box LeaveBalance col-sm-12 col-md rounded-3 p-3" style={{ minWidth: "200px", flex: "1 1 30%" }} key={index}>
            //   <h5>{leave.type}</h5>
            //   <h4>{leave.num}</h4>
            // </div>
          );
        })}
      </div>
    </div>
  );
}

export default ShortData;
