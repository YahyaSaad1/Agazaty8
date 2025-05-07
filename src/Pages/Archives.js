import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from "react";
import BtnLink from "../components/BtnLink";
import {
  faIdCard,
  faPenToSquare,
  faTable,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { BASE_API_URL } from "../server/serves";

function Archives(props) {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 20;

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = () => {
    fetch(`${BASE_API_URL}/api/Account/GetAllNonActiveUsers`)
      .then((res) => res.json())
      .then((data) => {
        setUsers(Array.isArray(data) ? data : []);
      })
      .catch((error) => {
        console.error("Error fetching employees:", error);
        setUsers([]);
      });
  };

  const ReActiveUser = (userId) => {
    Swal.fire({
      title: "هل أنت متأكد؟",
      text: `سيتم إلغاء أرشفة الموظف وسيكون مرئيًا في القائمة!`, //
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "نعم، إلغاء الأرشفة!",
      cancelButtonText: "إلغاء",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`${BASE_API_URL}/api/Account/ReActiveUser/${userId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
        })
          .then((response) => {
            if (!response.ok) {
              return response.text().then((text) => {
                throw new Error(
                  `خطأ في إلغاء الأرشفة: ${text || response.status}`
                );
              });
            }
            return response.json();
          })
          .then(() => {
            Swal.fire(
              "تم إلغاء الأرشفة!",
              "تم إلغاء أرشفة الموظف بنجاح.",
              "success"
            );
            fetchEmployees();
          })
          .catch((error) => {
            console.error("Error reactivating user:", error);
            Swal.fire(
              "خطأ!",
              `حدث خطأ أثناء إلغاء أرشفة الموظف: ${error.message}`,
              "error"
            );
          });
      }
    });
  };

  const handleDownload = async () => {
    try {
      const response = await fetch(
        `${BASE_API_URL}/api/Account/export-nonactive-users-excel`,
        {
          method: "GET",
        }
      );

      if (!response.ok) {
        throw new Error("Download failed");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "nonactive-users.xlsx"; // اسم الملف
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading the Excel file:", error);
    }
  };
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = users.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(users.length / rowsPerPage);

  return (
    <div>
      <div className="d-flex mb-4 justify-content-between">
        <div className="zzz d-inline-block p-3 ps-5">
          <h2 className="m-0">الموظفين الغير نشطين</h2>
        </div>
        <div className="d-flex">
          <button
            onClick={handleDownload}
            className="m-3 btn btn-success d-flex justify-content-center align-items-center"
          >
            <FontAwesomeIcon
              icon={faTable}
              style={{ fontSize: "1.4rem" }}
              color="#fff"
              className="ms-2"
            />
            <span>تنزيل بيانات الموظفين الغير نشطين</span>
          </button>
          <BtnLink
            name="الموظفين النشطين"
            link="/employees/active"
            class="m-3 btn btn-primary m-0"
          />
        </div>
      </div>
      <div className="row">
        <div>
          <table className="m-0 table table-striped">
            <thead>
              <tr>
                <th scope="col" style={{ backgroundColor: "#F5F9FF" }}>
                  الاسم
                </th>
                <th scope="col" style={{ backgroundColor: "#F5F9FF" }}>
                  القسم
                </th>
                <th scope="col" style={{ backgroundColor: "#F5F9FF" }}>
                  تاريخ التعيين
                </th>
                <th scope="col" style={{ backgroundColor: "#F5F9FF" }}>
                  رقم الهاتف
                </th>
                <th scope="col" style={{ backgroundColor: "#F5F9FF" }}>
                  المزيد
                </th>
              </tr>
            </thead>
            <tbody>
              {currentRows.length > 0 ? (
                currentRows.map((user) => (
                  <tr key={user.id}>
                    <td style={{ height: "50px" }}>{user.fullName}</td>
                    <td style={{ height: "50px" }}>{user.departmentName}</td>
                    <td style={{ height: "50px" }}>{user.hireDate}</td>
                    <td style={{ height: "50px" }}>{user.phoneNumber}</td>
                    <td style={{ height: "50px" }}>
                      <Link to={`/profile/user/${user.id}`} className="ms-1">
                        <FontAwesomeIcon
                          icon={faIdCard}
                          color="green"
                          className="fontt"
                        />
                      </Link>
                      <Link to={`/employee/${user.id}/edit`}>
                        <FontAwesomeIcon
                          icon={faPenToSquare}
                          color="blue"
                          className="fontt"
                        />
                      </Link>
                      <FontAwesomeIcon
                        icon={faUserPlus}
                        color="green"
                        onClick={() => ReActiveUser(user.id)}
                        className="fontt"
                        style={{ cursor: "pointer", marginLeft: "10px" }}
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center text-danger p-3">
                    لا يوجد موظفون غير نشطين
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          {users.length > rowsPerPage && (
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

export default Archives;
