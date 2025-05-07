import { useState } from "react";
import Btn from "../components/Btn";
import Swal from "sweetalert2";
import { BASE_API_URL } from "../server/serves";

function AddHoliday() {
    const [name, setName] = useState('');
    const [date, setDate] = useState('');

    const handleData = () => {
    const newHoliday = { name, date };

    fetch(`${BASE_API_URL}/api/Holiday/CreateHoliday`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newHoliday),
    })
    .then((res) => res.json())
    .then((data) => {
        // إذا كانت هناك رسالة خطأ من السيرفر
        if (data.message) {
            Swal.fire({
                title: `<span style='color:red;'>${data.message}</span>`,
                text: "يرجى المحاولة مرة أخرى.",
                icon: "error",
                confirmButtonColor: "#d33",
            });
        } else {
            // إذا كانت الاستجابة ناجحة
            Swal.fire({
                title: `<span style='color:#0d6efd;'>تمت إضافة الاجازة بنجاح.</span>`,
                icon: "success",
                confirmButtonText: "مشاهدة الاجازات",
                confirmButtonColor: "#0d6efd",
            }).then((result) => {
                if (result.isConfirmed) {
                    window.location.reload();
                    window.location.href = "http://localhost:3000/holidays";
                }
            });
        }
    })
    .catch((error) => {
        console.error("خطأ أثناء الإضافة:", error);
        Swal.fire({
            title: `<span style='color:red;'>خطأ في الإضافة</span>`,
            text: "حدث خطأ أثناء حفظ البيانات. حاول مرة أخرى.",
            icon: "error",
            confirmButtonColor: "#d33",
        });
    });
};

    

    const handleSubmit = (e) => {
        e.preventDefault();

        Swal.fire({
            title: `<span style='color:#0d6efd; font-size:28px;'>هل أنت متأكد من إنشاء اجازة رسمية ؟</span>`,
            html: `
                <p dir='rtl'><span style='font-weight: bold;'>اسم الاجازة:</span> <span style='color:#0d6efd;'>${name}</span></p>
                <p dir='rtl'><span style='font-weight: bold;'>تاريخ الاجازة:</span> <span style='color:#0d6efd;'>${date}</span></p>
            `,
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "نعم",
            cancelButtonText: "لا",
            confirmButtonColor: "#0d6efd",
            cancelButtonColor: "#d33",
        }).then((result) => {
            if (result.isConfirmed) {
                handleData();
            }
        });
    };

    return (
        <div>
            <div className="zzz d-inline-block p-3 ps-5">
                <h2 className="m-0">إضافة اجازة رسمية</h2>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="row">
                    <div className="col-sm-12 col-md-6 mt-3">
                        <label htmlFor="holidayName" className="form-label">اسم الاجازة</label>
                        <input
                            required
                            className="form-control"
                            type="text"
                            id="holidayName"
                            placeholder="مثال: ثورة يناير"
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    <div className="col-sm-12 col-md-6 mt-3">
                        <label htmlFor="holidayDate" className="form-label">تاريخ الاجازة</label>
                        <input
                            required
                            type="date"
                            className="form-control"
                            id="holidayDate"
                            onChange={(e) => setDate(e.target.value)}
                        />
                    </div>
                </div>

                <div className="d-flex justify-content-center mt-3">
                    <button type="submit" className="btn btn-primary w-50">إنشاء</button>
                    {/* أو استخدم Btn إذا كان يدعم onClick و type="submit" */}
                    {/* <Btn name="إنشاء" class="btn-primary w-50" type="submit" /> */}
                </div>
            </form>
        </div>
    );
}

export default AddHoliday;
