import { useState } from "react";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { BASE_API_URL } from "../server/serves";

function UpdateSickLeave2() {
    const leaveID = useParams().leaveID;
    const [certified, setCertified] = useState();
    const [chronic, setChronic] = useState();

    const [endDate, setEndDate] = useState("");
    const [startDate, setStartDate] = useState("");
    // const [notesFromHR, setNotesFromHR] = useState("");

    const handleData = async (e) => {
        e.preventDefault();
    
        if (!leaveID || startDate === "" || endDate === "") {
            Swal.fire("خطأ!", "يرجى ملء جميع الحقول المطلوبة", "error");
            return;
        }
    
        // رسالة تأكيد قبل التحديث
        const confirmResult = await Swal.fire({
            title: "هل أنت متأكد؟",
            text: "هل تريد فعلاً تحديث بيانات الاجازة؟",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "نعم، تحديث",
            cancelButtonText: "إلغاء",
            customClass: {
                title: 'text-blue',
                confirmButton: 'blue-button',
                cancelButton: 'red-button'
            },
            didOpen: () => {
                const popup = document.querySelector('.swal2-popup');
                if (popup) popup.setAttribute('dir', 'rtl');
            }
        });
    
        if (!confirmResult.isConfirmed) {
            return; // المستخدم لغى العملية
        }
    
        const leaveData = {
            leaveID: leaveID,
            certified: certified,
            chronic: chronic,
            startDate: startDate.toString(),
            endDate: endDate.toString(),
        };
    
        try {
            const response = await fetch(
                `${BASE_API_URL}/api/SickLeave/UpdateSickLeave/${leaveID}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json",
                    },
                    body: JSON.stringify(leaveData),
                }
            );
    
            if (!response.ok) {
                const errorData = await response.json();
                console.error("API Error:", errorData);
                Swal.fire({
                    title:'فشل إرسال الطلب!',
                    text:`${errorData || "يرجى المحاولة لاحقًا"}`,
                    icon:'error',
                    confirmButtonText:'حسنًا',
                    customClass: {
                        title: 'text-red',
                        confirmButton: 'blue-button',
                        cancelButton: 'red-button'
                    },
                    didOpen: () => {
                        const popup = document.querySelector('.swal2-popup');
                        if (popup) popup.setAttribute('dir', 'rtl');
                    }
                })
                return;
            } else {
                const responseData = await response.json();
                Swal.fire({
                    title:'تم إرسال الطلب!',
                    text:`${responseData.message || "يرجى انتظار الموافقة"}`,
                    icon:'success',
                    confirmButtonText:'حسنًا',
                    customClass: {
                        title: 'text-blue',
                        confirmButton: 'blue-button',
                        cancelButton: 'red-button'
                    },
                    didOpen: () => {
                        const popup = document.querySelector('.swal2-popup');
                        if (popup) popup.setAttribute('dir', 'rtl');
                    }
                })
                
                .then(() => {
                    window.location.reload(); // تحديث الصفحة بعد نجاح الطلب
                });
            }
        } catch (error) {
            Swal.fire({
                title:'خطأ!',
                text: "حدث خطأ أثناء إرسال الطلب",
                icon:'error',
                confirmButtonText:'حسنًا',
                customClass: {
                    title: 'text-red',
                    confirmButton: 'blue-button',
                    cancelButton: 'red-button'
                },
                didOpen: () => {
                    const popup = document.querySelector('.swal2-popup');
                    if (popup) popup.setAttribute('dir', 'rtl');
                }
            })


            console.error("Error:", error);
        }
    };
    
    

    return (
        <div>
            <div className="zzz d-inline-block p-3 ps-5">
                <h2 className="m-0">تحديث اجازة رقم #{leaveID}</h2>
            </div>

            <form onSubmit={handleData}>
                <div className="row">
                    <div className="col-sm-12 col-md-6 mt-3">
                        <label htmlFor="exampleInputDeputy1" className="form-label">حالة الاجازة</label>
                        <select
                            className="form-select"
                            id="exampleInputDeputy1"
                            aria-label="Default select example"
                            onChange={(e) => setCertified(JSON.parse(e.target.value))}
                            required
                        >
                            <option value="">اختر الحالة</option>
                            <option value="true">مستحقة</option>
                            <option value="false">غير مستحقة</option>
                        </select>
                    </div>

                    {certified === true &&
                    <div className="col-sm-12 col-md-6 mt-3">
                        <label htmlFor="exampleInputDeputy1" className="form-label">نوع المرض</label>
                        <select
                            className="form-select"
                            id="exampleInputDeputy1"
                            aria-label="Default select example"
                            onChange={(e) => setChronic(JSON.parse(e.target.value))}
                            required
                        >
                            <option value="">اختر</option>
                            <option value="true">مزمن</option>
                            <option value="false">غير مزمن</option>
                        </select>
                    </div>
                    }


                    <div className="col-sm-12 col-md-6 mt-3">
                        <label htmlFor="endDate" className="form-label">
                            تاريخ بداية الاجازة
                        </label>
                        <input
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            className="form-control"
                            id="endDate"
                            required
                        />
                    </div>

                    <div className="col-sm-12 col-md-6 mt-3">
                        <label htmlFor="endDate" className="form-label">
                            تاريخ نهاية الاجازة
                        </label>
                        <input
                            type="date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            className="form-control"
                            id="endDate"
                            disabled={!startDate}
                            min={startDate || ""}
                            required
                        />
                    </div>

                    {/* <div className="col-sm-12 col-md-6 mt-3">
                        <label htmlFor="notes" className="form-label">
                            ملاحظات
                        </label>
                        <textarea
                            className="form-control"
                            value={notesFromHR}
                            onChange={(e) => setNotesFromHR(e.target.value)}
                            id="notes"
                            rows="1"
                            placeholder="اكتب ملاحظاتك"
                        ></textarea>
                    </div> */}
                </div>

                <div className="d-flex justify-content-center mt-3">
                    <button type="submit" className="btn btn-primary w-50">
                        تحديث الاخطار
                    </button>
                </div>
            </form>
        </div>
    );
}

export default UpdateSickLeave2;