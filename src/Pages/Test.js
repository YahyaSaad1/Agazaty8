import React, { useState } from 'react';
import axios from 'axios';
import BtnLink from '../components/BtnLink';
import Import from '../Images/import.png';
import Export from '../Images/export.png';
import Equal from '../Images/equal.png';
import Btn from '../components/Btn';
import vide from '../Images/vide.xlsx';
import { BASE_API_URL, downloadActiveUsersExcel } from '../server/serves';

const UploadUsersExcel = () => {
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState('');
    const [selectedOption, setSelectedOption] = useState('new');

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = async () => {
        if (!file) {
        setMessage("من فضلك اختر ملف Excel أولاً.");
        return;
        }

    const formData = new FormData();
    formData.append("file", file);

    try {
        const response = await axios.post(`${BASE_API_URL}/api/Account/upload-users-excel`, formData, {
            headers: {
            "Content-Type": "multipart/form-data"
            }
        });
        setMessage("تم رفع الملف بنجاح ✅");
        console.log(response.data);
        } catch (error) {
            setMessage("حدث خطأ أثناء رفع الملف ❌");
            console.error(error);
            }
    };


    return (
        <div>
            <div className="d-flex mb-3 justify-content-between">
                <div className="zzz d-inline-block p-3 ps-5">
                    <h2 className="m-0">رفع موظف</h2>
                </div>
                <div className="d-flex">
                    <BtnLink name='إضافة موظف يدويا' link='/add-employee' class="m-3 btn btn-primary m-0"/>
                </div>
            </div>

            <div className='p-3'>
                <div className='box'>
                    <div className='row d-flex p-3 parent gap-3'>
                        <section className='col-sm-12 col-lg p-5 box'>
                            <div className='d-flex'>
                                <div>
                                    <h2>الخطوة 1</h2>
                                    <p>تنزيل ملف Excel</p>
                                </div>
                                <img src={Import} className="img-responsive" alt="profilePicture" />
                            </div>
                            <h4>تعليمات</h4>
                            <ul>
                                <li>قم بتنزيل ملف التنسيق واملأه بالبيانات الصحيحة.</li>
                                <li>يمكنك تنزيل ملف المثال لفهم كيفية تعبئة البيانات.</li>
                                <li>يجب رفع ملف Excel.</li>
                            </ul>
                        </section>

                        <section className='col-sm-12 col-lg p-5 box'>
                            <div className='d-flex'>
                                <div>
                                    <h2>الخطوة 2</h2>
                                    <p>مطابقة بيانات جدول البيانات وفقًا للتعليمات</p>
                                </div>
                                <img src={Equal} className="img-responsive" alt="profilePicture" />
                            </div>
                            <h4>تعليمات</h4>
                            <ul>
                                <li>املأ البيانات وفقًا للتنسيق والتحقق.</li>
                                <li>يمكنك الحصول على الرقم القومي واسم المستخدم من قائمتهم، يرجى إدخال البيانات الصحيحة.</li>
                            </ul>
                        </section>

                        <section className='col-sm-12 col-lg p-5 box'>
                            <div className='d-flex'>
                                <div>
                                    <h2>الخطوة 3</h2>
                                    <p>تحقق من البيانات وأكمل الاستيراد</p>
                                </div>
                                <img src={Export} className="img-responsive" alt="profilePicture" />
                            </div>
                            <h4>تعليمات</h4>
                            <ul>
                                <li>في قسم تحميل ملف Excel، اختر أولاً خيار التحميل.</li>
                                <li>قم بتحميل ملفك بتنسيق .xls أو .xlsx.</li>
                                <li>أخيرًا اضغط على زر التحميل.</li>
                                <li>يمكنك تحميل ورفع بيانات الموظفين بكل سهولة.</li>
                            </ul>
                        </section>
                    </div>

                    <div className='text-center mt-3'>
                        <h4>تحميل نموذج جدول البيانات</h4>
                        <div className='mt-3'>
                            <Btn onClick={downloadActiveUsersExcel} name='مع البيانات الحالية' class='btn-outline-dark w-25 ms-3' />
                            <a href={vide} download className="btn btn-dark w-25 ms-3">
                                بدون البيانات الحالية
                            </a>
                        </div>
                    </div>
                </div>










                <div className='row d-flex p-3 parent box mt-4'>
                    <div className='d-flex gap-4'>
                        <section className='col-sm-12 col-md'>
                            <h5 className='title'>اختر نوع تحميل البيانات</h5>
                            <div className="row box-radio h-75">
                                <label className="label1 col-12 flex items-center gap-2 cursor-pointer bg-blue-50">
                                    <span className="text-gray-800 font-medium">تحميل بيانات جديدة</span>
                                    <input type="radio" name="dataOption" value="new" className="accent-black w-4 h-4" defaultChecked />
                                </label>

                                <label style={{backgroundColor:'#e2e2e2'}} className="label2 col-12 flex items-center gap-2 cursor-not-allowed bg-gray-100 opacity-60">
                                    <span className="text-gray-800">تحديث البيانات الحالية</span>
                                    <input type="radio" name="dataOption" value="update" className="accent-black w-4 h-4" disabled />
                                </label>
                            </div>

                        </section>

                        <section className='col-sm-12 col-md'>
                            <h5 className='title'>استيراد ملف المتاجر</h5>
                            <label htmlFor="file-upload" className='p-1 h-75 cursor-pointer w-100 box-input text-center custom-file-upload'>
                                <input 
                                    id="file-upload" 
                                    onChange={handleFileChange} 
                                    accept=".xlsx, .xls" 
                                    type="file" 
                                    style={{ display: 'none' }}
                                />
                                <img src={Export} className="img-responsive" alt="profilePicture" />
                                <p>يجب أن تكون ملفات Excel باستخدام قالب Excel الخاص بنا أعلاه</p>
                            </label>
                        </section>



                    </div>
                    
                    <div className='d-flex gap-3 justify-content-end mt-3'>
                    <Btn onClick={() => { setFile(null); setMessage(''); }} name='إعادة تعيين' class='btn-outline-dark' />
                    <Btn onClick={handleUpload} name='تحميل' class='btn-dark' />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UploadUsersExcel;