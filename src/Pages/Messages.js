import React, { useEffect, useState } from "react";
import swal from "sweetalert";
import API from "../Data";
import { BASE_API_URL } from "../server/serves";

function Message() {
    const userID = localStorage.getItem("userID");
    const [leaveWating, setLeaveWating] = useState([]);

    useEffect(() => {
        fetch(`${BASE_API_URL}/api/NormalLeave/WaitingByCoWorkerID/${userID}`)
            .then((res) => res.json())
            .then((data) => {
                setLeaveWating(data);
            });
    }, [userID]);

    const updateDecision = (leaveID, CoworkerDecision) => {
        const actionText = CoworkerDecision ? "الموافقة" : "الرفض";

        swal({
            title: `هل أنت متأكد من ${actionText}؟`,
            text: "لن تتمكن من التراجع بعد ذلك",
            icon: "warning",

            confirmButtonText: 'نعم، إرسال',
            cancelButtonText: 'إلغاء',
            buttons: {
                cancel: {
                    text: "إلغاء",
                    visible: true,
                    className: "red-button",
                    closeModal: true,
                },
                confirm: {
                    text: "نعم",
                    className: "blue-button",
                    closeModal: false,
                },
            },
            dangerMode: true,
        }).then((willProceed) => {
            if (willProceed) {
                fetch(`${BASE_API_URL}/api/NormalLeave/UpdateCoworkerDecision/${leaveID}?CoworkerDecision=${CoworkerDecision}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                })
                    .then((res) => {
                        if (!res.ok) {
                            throw new Error("فشل في تحديث القرار");
                        }
                        return res.json();
                    })
                    .then(() => {
                        swal("تم التحديث بنجاح!", {
                            icon: "success",
                        }).then(() => {
                            window.location.reload();
                        });
                    })
                    .catch((err) => {
                        console.error("Error updating decision:", err);
                        swal("حدث خطأ ما", "يرجى المحاولة لاحقًا", "error");
                    });
            }
        });
    };

    return (
        <div className="row">
            <div className="p-0">
                <div className="zzz d-inline-block p-3 ps-5">
                    <h2 className="m-0">طلبات القيام بالعمل</h2>
                </div>
            </div>
            {Array.isArray(leaveWating) && leaveWating.length > 0 ? (
                leaveWating.map((leave, index) => (
                    <div className="mt-3" key={index}>
                        <div className="box mt-3 col-sm-12 col-md-10 col-lg-8">
                            <h5>
                                طلب اجازة جديد من{" "}
                                <span className="text-primary">{leave.userName}</span> في انتظار موافقتك
                            </h5>
                            <p>
                                من يوم {new Date(leave.startDate).toLocaleDateString('ar-EG', { day: '2-digit', month: '2-digit', year: 'numeric' })} إلى يوم{" "}
                                {new Date(leave.endDate).toLocaleDateString('ar-EG', { day: '2-digit', month: '2-digit', year: 'numeric' })}
                            </p>
                            <p>ملحوظات الزميل : {leave.notesFromEmployee}</p>

                            <button className="btn btn-primary m-2 w-25" onClick={() => updateDecision(leave.id, true)}>
                                موافقة
                            </button>
                            <button className="btn btn-danger" onClick={() => updateDecision(leave.id, false)}>
                                رفض
                            </button>
                        </div>
                    </div>
                ))
            ) : (
                <p className="text-center text-danger mt-4">لا توجد طلبات قيام بالعمل في الوقت الحالي.</p>
            )}
        </div>
    );
}

export default Message;
