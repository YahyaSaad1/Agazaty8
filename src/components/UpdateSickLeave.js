import { useState } from "react";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { BASE_API_URL } from "../server/serves";

function UpdateSickLeave() {
    const leaveID = useParams().leaveID;
    const [address, setAddress] = useState('');

    const handleData = async (e) => {
        e.preventDefault();

        if (!leaveID || address === "") {
            Swal.fire({
                title: "خطأ!",
                text: "يرجى ملء جميع الحقول المطلوبة",
                icon: "error",
                confirmButtonText: "حسنًا",
                customClass: {
                    title: 'text-red',
                    confirmButton: 'blue-button',
                    cancelButton: 'red-button'
                },
                didOpen: () => {
                    const popup = document.querySelector('.swal2-popup');
                    if (popup) popup.setAttribute('dir', 'rtl');
                }
            });
            return;
        }
        
    
        // رسالة تأكيد
        const confirmResult = await Swal.fire({
            title: "هل أنت متأكد؟",
            text: "هل تريد فعلاً تحديث الإخطار؟",
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
            return; // لو المستخدم لغى، نوقف التنفيذ
        }
    
        const leaveData = {
            leaveID: leaveID,
            address: address.toString(),
        };
    
        try {
            const response = await fetch(
                `${BASE_API_URL}/api/SickLeave/UpdateMedicalCommiteAddressResponse/${leaveID}/${address}`,
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
                    title: "خطأ!",
                    text: `فشل إرسال الطلب: ${errorData.message || "يرجى المحاولة لاحقًا"}`,
                    icon: "error",
                    confirmButtonText: "حسنًا",
                    customClass: {
                        title: 'text-red',
                        confirmButton: 'blue-button',
                        cancelButton: 'red-button'
                    },
                    didOpen: () => {
                        const popup = document.querySelector('.swal2-popup');
                        if (popup) popup.setAttribute('dir', 'rtl');
                    }
                });
                return;
            } else {
                const responseData = await response.json();
                Swal.fire({
                    title: "تم إرسال الطلب بنجاح!",
                    text: `${responseData.message || "يرجى انتظار الموافقة"}`,
                    icon: "success",
                    confirmButtonText: "حسنًا",
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
                title: "خطأ!",
                text: "حدث خطأ أثناء إرسال الطلب",
                icon: "error",
                confirmButtonText: "حسنًا",
                customClass: {
                    title: 'text-red',
                    confirmButton: 'blue-button',
                    cancelButton: 'red-button'
                },
                didOpen: () => {
                    const popup = document.querySelector('.swal2-popup');
                    if (popup) popup.setAttribute('dir', 'rtl');
                }
            });
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
                        <label htmlFor="address" className="form-label">
                        عنوان القومسيون الطبي
                        </label>
                        <textarea
                            className="form-control"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            id="address"
                            rows="1"
                            placeholder="اكتب عنوان القومسيون الطبي"
                        ></textarea>
                    </div>
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

export default UpdateSickLeave;