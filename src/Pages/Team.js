import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import YahyaSaad from "../Images/YahyaSaad.jpg";
import Abdohamdy from "../Images/Abdohamdy.jpg";
import ElHawary from "../Images/ElHawary.jpg";
import { faPrint } from "@fortawesome/free-solid-svg-icons";

function Team(){
    return(
        <div className="p-3" style={{backgroundColor:'#F0F0F0'}}>
            <div className="mt-5">
                <h2 className="bbb text-center">نبذة عن فريق عمل مشروع اجازاتي</h2>
            </div>

            <div className="mt-5 bbbb box-team p-2">
                <ul>
                    <li>نحن فريق عمل المشروع ، نتكون من ثمانية اشخاص .</li>
                    <li>التحقنا بكلية الحاسبات والمعلومات جامعة جنوب الوادي بقنا عام 2021 .</li>
                    <li>من القسمين علوم الحاسب وتكنولوجيا المعلومات .</li>
                    <li>وكان لكل منّا دوره فى المشروع ونجاحه .</li>
                </ul>
            </div>

            <div className="mt-5 p-4" style={{backgroundColor:'#D6D6D6'}}>
                <div>
                    <h2 className="bbb text-center">فريق عمل المشروع</h2>
                </div>

                <div className="mt-3 bg-light p-3">
                    <div className="row">
                        <div className="col-sm-12 col-md-6 col-lg-4 col-xl-3 mt-3">
                            <div className="pic"><img src={YahyaSaad} alt="teamImg" /></div>
                            <div className="desc text-center">
                                <div className="mb-3 box-team p-2 d-flex flex-column align-items-center justify-content-center">
                                    <div>
                                        <h4>يحيى سعد عبدالموجود</h4>
                                        <p>Front End Developer</p>
                                    </div>
                                    <div className="d-flex social">
                                    <i class="fa-brands fa-whatsapp">d</i>
                                        <FontAwesomeIcon icon={faPrint} fontSize={'26px'} color="blue" className="printer" />
                                        <FontAwesomeIcon icon={faPrint} fontSize={'26px'} color="blue" className="printer" />
                                        <FontAwesomeIcon icon={faPrint} fontSize={'26px'} color="blue" className="printer" />
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div className="col-sm-12 col-md-6 col-lg-4 col-xl-3 mt-3">
                            <div className="pic"><img src={Abdohamdy} alt="teamImg" /></div>
                        </div>
                        <div className="col-sm-12 col-md-6 col-lg-4 col-xl-3 mt-3">
                            <div className="pic"><img src={ElHawary} alt="teamImg" /></div>
                        </div>
                        <div className="col-sm-12 col-md-6 col-lg-4 col-xl-3 mt-3">
                            <div className="pic"><img src={YahyaSaad} alt="teamImg" /></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Team