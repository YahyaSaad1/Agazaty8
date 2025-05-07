import React, { useEffect, useState } from "react";
import BtnLink from "../components/BtnLink";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPrint } from "@fortawesome/free-solid-svg-icons";
import { BASE_API_URL } from "../server/serves";

function AgazatySick() {
  const userID = localStorage.getItem("userID");
  const [sickLeaves, setSickLeaves] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 20;
  
  useEffect(() => {
    fetch(`${BASE_API_URL}/api/SickLeave/GetAllSickLeavesByUserID/${userID}`)
      .then((res) => res.json())
      .then((data) => setSickLeaves(Array.isArray(data) ? data : []))
      .catch((error) => console.error("Error fetching sick leaves:", error));
  }, [userID]);

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = sickLeaves.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(sickLeaves.length / rowsPerPage);

  return (
    <div>
      <div className="d-flex mb-4 justify-content-between">
        <div className="zzz d-inline-block p-3 ps-5">
          <h2 className="m-0">سجل الاجازات المرضية</h2>
        </div>
      </div>

      <div className="row">
        <div>
          <table className="m-0 table table-striped">
            <thead>
              <tr>
                <th scope="col" style={{ backgroundColor: "#F5F9FF" }}>
                  نوع الاجازة
                </th>
                <th scope="col" style={{ backgroundColor: "#F5F9FF" }}>
                  تاريخ البدء
                </th>
                <th scope="col" style={{ backgroundColor: "#F5F9FF" }}>
                  تاريخ الانتهاء
                </th>
                <th scope="col" style={{ backgroundColor: "#F5F9FF" }}>
                  عدد الأيام
                </th>
                <th scope="col" style={{ backgroundColor: "#F5F9FF" }}>
                  حالة الطلب
                </th>
                <th scope="col" style={{ backgroundColor: "#F5F9FF" }}>
                  طباعة
                </th>
                <th scope="col" style={{ backgroundColor: "#F5F9FF" }}>
                  الأرشيف
                </th>
              </tr>
            </thead>

            <tbody>
              {currentRows.length > 0 ? (
                currentRows.map((leave, index) => (
                  <tr key={index}>
                    <td>مرضية</td>
                    <td>{new Date(leave.startDate).toLocaleDateString()}</td>
                    <td>{new Date(leave.endDate).toLocaleDateString()}</td>
                    <td>{leave.days} أيام</td>
                    <td>
                      {leave.responseDone === true ? (
                        "مقبولة"
                      ) : leave.responseDone === false ? (
                        "مرفوضة"
                      ) : (
                        <span className="text-danger">معلقة</span>
                      )}
                    </td>
                    <td>
                      <FontAwesomeIcon
                        icon={faPrint}
                        fontSize={"26px"}
                        color="blue"
                        className="printer"
                      />
                    </td>
                    <td>
                      <BtnLink
                        id={leave.id}
                        name="عرض الاجازة"
                        link="/user/sick-leave-request"
                        class="btn btn-outline-primary"
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center text-danger p-3">
                    لا يوجد اجازات حتى الآن
                  </td>
                </tr>
              )}
            </tbody>
          </table>



          {sickLeaves.length > rowsPerPage && (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "20px",
              }}
            >
              <nav>
                <ul className="pagination">
                  <li
                    className={`page-item ${
                      currentPage === 1 ? "disabled" : ""
                    }`}
                  >
                    <button
                      className="page-link"
                      onClick={() =>
                        currentPage > 1 && setCurrentPage(currentPage - 1)
                      }
                    >
                      السابق
                    </button>
                  </li>

                  {Array.from({ length: totalPages }, (_, i) => (
                    <li
                      key={i}
                      className={`page-item ${
                        currentPage === i + 1 ? "active" : ""
                      }`}
                    >
                      <button
                        className="page-link"
                        onClick={() => setCurrentPage(i + 1)}
                      >
                        {i + 1}
                      </button>
                    </li>
                  ))}

                  <li
                    className={`page-item ${
                      currentPage === totalPages ? "disabled" : ""
                    }`}
                  >
                    <button
                      className="page-link"
                      onClick={() =>
                        currentPage < totalPages &&
                        setCurrentPage(currentPage + 1)
                      }
                    >
                      التالي
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AgazatySick;
