import React, { useEffect, useState } from "react";
import BtnLink from "../components/BtnLink";
import API from "../Data";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPrint } from "@fortawesome/free-solid-svg-icons";
import { BASE_API_URL } from "../server/serves";

function DesPermits() {
  const [permitLeaves, setPermitLeaves] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 20;

  useEffect(() => {
    fetch(`${BASE_API_URL}/api/PermitLeave/GetAllPermitLeaves`)
      .then((res) => res.json())
      .then((data) => setPermitLeaves(data));
  }, []);
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = permitLeaves.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(permitLeaves.length / rowsPerPage);
  return (
    <div>
      <div className="d-flex mb-4 justify-content-between">
        <div className="zzz d-inline-block p-3 ps-5">
          <h2 className="m-0">سجل التصاريح</h2>
        </div>
      </div>
      <div className="row">
        <div>
          <table className="m-0 table table-striped">
            <thead>
              <tr>
                <th scope="col" style={{ backgroundColor: "#F5F9FF" }}>
                  المرجع
                </th>
                <th scope="col" style={{ backgroundColor: "#F5F9FF" }}>
                  الاسم
                </th>
                <th scope="col" style={{ backgroundColor: "#F5F9FF" }}>
                  التاريخ
                </th>
                <th scope="col" style={{ backgroundColor: "#F5F9FF" }}>
                  عدد الساعات
                </th>
                <th scope="col" style={{ backgroundColor: "#F5F9FF" }}>
                  الأرشيف
                </th>
              </tr>
            </thead>
            <tbody>
              {currentRows.length > 0 ? (
                currentRows.map((permit, index) => (
                  <tr key={index}>
                    <th>#{permit.id}</th>
                    <th>{permit.userName}</th>
                    <th>{new Date(permit.date).toLocaleDateString()}</th>
                    <th> {permit.hours} ساعة</th>
                    <th>
                      <BtnLink
                        id={permit.id}
                        name="عرض التصريح"
                        link="/permit-leave"
                        class="btn btn-outline-primary"
                      />
                    </th>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center text-danger p-3">
                    لا يوجد تصاريح حتى الآن
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          {permitLeaves.length > rowsPerPage && (
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

export default DesPermits;
