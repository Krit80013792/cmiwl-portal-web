/* eslint-disable @next/next/no-img-element */

import React from 'react';
import { Metadata } from 'next';
import Image from 'next/image';
import ButtonEditReviewSummaryComponent from '@/cmi-layout/components/ButtonEditReviewSummaryComponent';
import { Button } from 'primereact/button';

export const dynamic = 'force-dynamic';

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: 'สรุปรายละเอียดคำสั่งซื้อพ.ร.บ.รถยนต์ออนไลน์ | ติดล้อ',
        description: 'สรุปรายละเอียดคำสั่งซื้อพ.ร.บ.รถยนต์ออนไลน์ | ติดล้อ'
    };
}

export default async function ReviewSummary() {


    return (
        <main>
            <meta name="format-detection" content="telephone=no" />

            <div className="head-bar">
                <div className="container d-flex align-items-center">
                    {/* onclick="if (!window.__cfRLUnblockHandlers) return false; return backOnclick();" */}
                    <input type="image" name="p$lt$ctl00$pageplaceholder$p$lt$ctl00$ReviewSummary$btnBackPage" id="p_lt_ctl00_pageplaceholder_p_lt_ctl00_ReviewSummary_btnBackPage" src="/assets/icon/back.png" alt="กลับ" style={{ height: '36px', width: '36px' }} data-cf-modified-0e017922931d765566c39c08-="" />
                    <p id="p_lt_ctl00_pageplaceholder_p_lt_ctl00_ReviewSummary_lbHeaderBar" className="text-center mb-0 w-100 fs-18 f-bd">พ.ร.บ.</p>
                </div>
            </div>

            <div className="head-section bg-lightgrey pt-48">
                <div className="container">
                    <div className="d-flex py-12 align-items-center">
                        <div className="percent-80">
                            <div className="progress-2 blue">
                                <span className="progress-2-left">
                                    <span className="progress-2-bar"></span>
                                </span>
                                <span className="progress-2-right">
                                    <span className="progress-2-bar"></span>
                                </span>
                                <div className="progress-2-value">80<span>%</span></div>
                            </div>
                        </div>
                        <div className="step-title-wrapper ms-12">
                            <p className="mb-0 text-grey fs-14">ขั้นตอนที่ 2/3</p>
                            <h1 className="mb-0 text-grey fs-6 f-bd">สรุปรายการ</h1>
                        </div>
                    </div>
                </div>
            </div>

            <div className="content-section fullPage-100">
                <div className="container">
                    <div className="bg-beige rounded-4 my-3 px-12 py-12">
                        <img className="img-fluid me-2" alt="กรุณาตรวจสอบข้อมูล" width="24" height="24" src="/assets/icon/warning.png" />
                        <span className="text-orangePeel f-bd">กรุณาตรวจสอบข้อมูลก่อนชำระเงิน</span>
                    </div>
                    <input type="hidden" name="p$lt$ctl00$pageplaceholder$p$lt$ctl00$ReviewSummary$hdValModal" id="p_lt_ctl00_pageplaceholder_p_lt_ctl00_ReviewSummary_hdValModal" />

                    <input type="hidden" name="p$lt$ctl00$pageplaceholder$p$lt$ctl00$ReviewSummary$hdChannelText" id="p_lt_ctl00_pageplaceholder_p_lt_ctl00_ReviewSummary_hdChannelText" value="CXM" />
                    <input type="hidden" name="p$lt$ctl00$pageplaceholder$p$lt$ctl00$ReviewSummary$hdVehicleCategoryId" id="p_lt_ctl00_pageplaceholder_p_lt_ctl00_ReviewSummary_hdVehicleCategoryId" value="6" />
                    <input type="hidden" name="p$lt$ctl00$pageplaceholder$p$lt$ctl00$ReviewSummary$hdVehicleCategoryText" id="p_lt_ctl00_pageplaceholder_p_lt_ctl00_ReviewSummary_hdVehicleCategoryText" value="ไม่เกิน 3 ตัน" />
                    <input type="hidden" name="p$lt$ctl00$pageplaceholder$p$lt$ctl00$ReviewSummary$hdVehicleNameText" id="p_lt_ctl00_pageplaceholder_p_lt_ctl00_ReviewSummary_hdVehicleNameText" value="รถกระบะ 2 ประตู" />

                    <input type="hidden" name="p$lt$ctl00$pageplaceholder$p$lt$ctl00$ReviewSummary$hdOrderNoText" id="p_lt_ctl00_pageplaceholder_p_lt_ctl00_ReviewSummary_hdOrderNoText" />

                    <div className="type-of-ctp">
                        <div className="d-flex justify-content-between mb-12">
                            <h2 className="mb-0 text-black fs-18"><strong>ประเภท พ.ร.บ.</strong></h2>
                            {/* onclick="if (!window.__cfRLUnblockHandlers) return false; setValueModal('vehicle_category');" */}
                            <ButtonEditReviewSummaryComponent psAction="vehicle_category" />
                        </div>

                        <div className="info-box bg-lightgrey rounded-4 pt-12 px-3 pb-12 mb-4">
                            <div className="d-flex justify-content-between mb-12">
                                <span className="f-md text-grey">ประเภทรถ</span>
                                <span id="p_lt_ctl00_pageplaceholder_p_lt_ctl00_ReviewSummary_lbCarType" className="f-bd text-grey">รถกระบะ 2 ประตู</span>
                            </div>
                            <div className="d-flex justify-content-between mb-0">
                                <span className="f-md text-grey">ประเภทการใช้รถ</span>
                                <span id="p_lt_ctl00_pageplaceholder_p_lt_ctl00_ReviewSummary_lbCarTypeUsed" className="f-bd text-grey">ไม่เกิน 3 ตัน</span>
                            </div>
                        </div>
                    </div>

                    <div className="car-info">
                        <div className="d-flex justify-content-between mb-12">
                            <h2 className="mb-0 text-black fs-18"><strong>รถยนต์เอาประกัน</strong></h2>
                            {/* onclick="if (!window.__cfRLUnblockHandlers) return false; setValueModal('car_info');" */}
                            <ButtonEditReviewSummaryComponent psAction="car_info" />
                        </div>
                        <div className="info-box bg-lightgrey rounded-4 pt-12 px-3 pb-12 mb-4">
                            <div className="d-flex justify-content-between mb-12">
                                <span className="f-md text-grey">ยี่ห้อรถ</span>
                                <span id="p_lt_ctl00_pageplaceholder_p_lt_ctl00_ReviewSummary_lbCarBrand" className="f-bd text-grey">TOYOTA</span>
                            </div>
                            <div className="d-flex justify-content-between mb-12">
                                <span className="f-md text-grey">รุ่นรถ</span>
                                <span id="p_lt_ctl00_pageplaceholder_p_lt_ctl00_ReviewSummary_lbCarModel" className="f-bd text-grey">HILUX TIGER</span>
                            </div>
                            <div className="d-flex justify-content-between mb-12">
                                <span className="f-md text-grey">สีรถ</span>
                                <span id="p_lt_ctl00_pageplaceholder_p_lt_ctl00_ReviewSummary_lbCarColor" className="f-bd text-grey">ขาว</span>
                            </div>
                            <div className="d-flex justify-content-between mb-12">
                                <span className="f-md text-grey">เลขตัวถัง</span>
                                <span id="p_lt_ctl00_pageplaceholder_p_lt_ctl00_ReviewSummary_lbChassisNumber" className="f-bd text-grey">abc12345</span>
                            </div>
                            <div className="d-flex justify-content-between mb-12">
                                <span className="f-md text-grey">ทะเบียนรถ</span>
                                <span id="p_lt_ctl00_pageplaceholder_p_lt_ctl00_ReviewSummary_lbLicenseRegis" className="f-bd text-grey">กพ 7333</span>
                            </div>
                            <div className="d-flex justify-content-between mb-12">
                                <span className="f-md text-grey">ปีที่จดทะเบียน</span>
                                <span id="p_lt_ctl00_pageplaceholder_p_lt_ctl00_ReviewSummary_lbYearRegis" className="f-bd text-grey">2024</span>
                            </div>
                            <div className="d-flex justify-content-between mb-0">
                                <span className="f-md text-grey">จังหวัดที่จดทะเบียน</span>
                                <span id="p_lt_ctl00_pageplaceholder_p_lt_ctl00_ReviewSummary_lbProvinceRegis" className="f-bd text-grey">กรุงเทพมหานคร</span>
                                <input type="hidden" name="p$lt$ctl00$pageplaceholder$p$lt$ctl00$ReviewSummary$hdCarIsRedText" id="p_lt_ctl00_pageplaceholder_p_lt_ctl00_ReviewSummary_hdCarIsRedText" value="NOTRED" />
                            </div>
                        </div>
                    </div>

                    <div className="coverage-date">
                        <div className="d-flex justify-content-between mb-12">
                            <h2 className="mb-0 text-black fs-18"><strong>ระยะเวลาความคุ้มครอง</strong></h2>
                            {/* onclick="if (!window.__cfRLUnblockHandlers) return false; setValueModal('coverage_date');" */}
                            <ButtonEditReviewSummaryComponent psAction="coverage_date" />
                        </div>
                        <div className="info-box bg-lightgrey rounded-4 pt-12 px-3 pb-12 mb-4">
                            <div className="d-flex justify-content-between mb-12">
                                <span className="f-md text-grey">วันที่เริ่มความคุ้มครอง</span>
                                <span id="p_lt_ctl00_pageplaceholder_p_lt_ctl00_ReviewSummary_lbCoverageDateStart" className="f-bd text-grey">23 พ.ค. 2568</span>
                                <input type="hidden" name="p$lt$ctl00$pageplaceholder$p$lt$ctl00$ReviewSummary$hdCoverageDateStart" id="p_lt_ctl00_pageplaceholder_p_lt_ctl00_ReviewSummary_hdCoverageDateStart" value="2568-05-23" />
                            </div>
                            <div className="d-flex justify-content-between mb-0">
                                <span className="f-md text-grey">วันที่สิ้นสุดความคุ้มครอง</span>
                                <span id="p_lt_ctl00_pageplaceholder_p_lt_ctl00_ReviewSummary_lbCoverageDateEnd" className="f-bd text-grey">23 พ.ค. 2569</span>
                                <input type="hidden" name="p$lt$ctl00$pageplaceholder$p$lt$ctl00$ReviewSummary$hdCoverageDateEnd" id="p_lt_ctl00_pageplaceholder_p_lt_ctl00_ReviewSummary_hdCoverageDateEnd" value="2569-05-23" />
                            </div>
                        </div>
                    </div>

                    <div className="customer-info">
                        <div className="d-flex justify-content-between mb-12">
                            <h2 className="mb-0 text-black fs-18"><strong>ผู้เอาประกันภัย<br className="d-block d-sm-none" />
                                และการจัดส่งกรมธรรม์</strong></h2>
                            {/* onclick="if (!window.__cfRLUnblockHandlers) return false; setValueModal('customer_info');" */}
                            <ButtonEditReviewSummaryComponent psAction="customer_info" />
                        </div>
                        <div className="info-box bg-lightgrey rounded-4 pt-12 px-3 pb-12 mb-4">
                            <div className="d-flex justify-content-between mb-12">
                                <span className="f-md text-grey">ชื่อ-นามสกุล</span>
                                <span id="p_lt_ctl00_pageplaceholder_p_lt_ctl00_ReviewSummary_lbName" className="f-bd text-grey">นาย แสน ราชสีห์</span>
                            </div>
                            <div className="d-flex justify-content-between mb-12">
                                <span className="f-md text-grey">เลขบัตรประชาชน</span>
                                <span id="p_lt_ctl00_pageplaceholder_p_lt_ctl00_ReviewSummary_lbCitizen" className="f-bd text-grey">6-0355-67560-73-6</span>
                            </div>
                            <div className="d-flex justify-content-between mb-12">
                                <span className="f-md text-grey">วันเกิด</span>
                                <span id="p_lt_ctl00_pageplaceholder_p_lt_ctl00_ReviewSummary_lbBirthDate" className="f-bd text-grey">05 มกราคม 2535</span>
                            </div>
                            <div className="d-flex justify-content-between mb-12">
                                <span className="f-md text-grey">เบอร์โทรศัพท์</span>
                                <span id="p_lt_ctl00_pageplaceholder_p_lt_ctl00_ReviewSummary_lbPhone" className="f-bd text-grey">080-000-0000</span>
                            </div>
                            <div className="d-flex justify-content-between mb-12">
                                <span className="f-md text-grey w-100">ที่อยู่ปัจจุบัน</span>
                                <span id="p_lt_ctl00_pageplaceholder_p_lt_ctl00_ReviewSummary_lbAddress" className="f-bd text-grey text-end">1 1 1 ซ.1 ถ.1 อำเภอพระนครศรีอยุธยา ตำบลประตูชัย จังหวัดพระนครศรีอยุธยา 13000</span>
                            </div>
                            <div className="d-flex justify-content-between mb-0">
                                <span className="f-md text-grey">ช่องทางการจัดส่งเอกสาร</span>
                                <span id="p_lt_ctl00_pageplaceholder_p_lt_ctl00_ReviewSummary_lbPolicy" className="f-bd text-grey">อีเมล</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            

            <div className="modal confirm-modal fade" id="CtpPaymentErrorModal" aria-labelledby="CtpPaymentErrorModal" data-bs-backdrop="static" data-bs-keyboard="false" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered mx-4 mx-sm-auto">
                    <div className="modal-content rounded-4">
                        <div className="modal-body pt-20 px-20 pb-20 text-center">
                            <img className="img-fluid mb-2 mx-auto" alt="ไม่สามารถทำรายการได้ในขณะนี้" width="80" height="80" src="/assets/icon/icon-error.png" />
                            <h5 className="text-black text-center fs-18 f-bd mb-2 text-payment-error">ไม่สามารถทำรายการได้ในขณะนี้</h5>
                            <p className="text-black mb-20">กรุณาลองใหม่อีกครั้ง</p>
                            {/* onclick="if (!window.__cfRLUnblockHandlers) return false; CtpPaymentErrorModalOnclickBtn();" */}
                            <a className="btn btn-primary w-100 fs-6 d-flex justify-content-center align-items-center me-2 closePopup-btn" data-bs-dismiss="modal" aria-label="Close" data-cf-modified-0e017922931d765566c39c08-="">
                                <strong className="f-bd text-payment-error-btn">ปิด</strong>
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <div className="modal confirm-modal fade" id="CtpError3TimesModal" aria-labelledby="CtpError3TimesModal" data-bs-backdrop="static" data-bs-keyboard="false" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered mx-4 mx-sm-auto">
                    <div className="modal-content rounded-4">
                        <div className="modal-body pt-20 px-20 pb-20 text-center">
                            <img className="img-fluid mb-2 mx-auto" alt="ไม่สามารถทำรายการได้ในขณะนี้" width="80" height="80" src="/assets/icon/icon-error.png" />
                            <h5 className="text-black text-center fs-18 f-bd mb-2 text-payment-3Terror">ขออภัย
                                <br className="d-block d-sm-none" />
                                ไม่สามารถทำรายการได้ในขณะนี้</h5>
                            <p className="text-black mb-20">
                                กรุณาทำรายการใหม่ภายหลัง
                                <br className="d-block d-sm-none" />
                                หรือติดต่อเจ้าหน้าที่หากพบปัญหาการใช้งาน <br />
                                <span className="d-inline-block">(เลขที่อ้างอิง: <span className="order-no">-</span>)</span>
                            </p>

                            <div className="d-flex">
                                {/* onclick="if (!window.__cfRLUnblockHandlers) return false; CtpError3TimesModalOnclickBtn();" */}
                                <input type="submit" name="p$lt$ctl00$pageplaceholder$p$lt$ctl00$ReviewSummary$btnBackMain" value="กลับหน้าหลัก" id="p_lt_ctl00_pageplaceholder_p_lt_ctl00_ReviewSummary_btnBackMain" className="btn btn-secondary w-100 fs-6 d-flex justify-content-center align-items-center me-2 backtoMain-btn" data-cf-modified-0e017922931d765566c39c08-="" />
                                {/* onclick="if (!window.__cfRLUnblockHandlers) return false; CtpError3TimesModalOnclickCallBtn();" */}
                                <a className="btn btn-primary w-100 fs-6 d-flex justify-content-center align-items-center ms-2 call-btn" href="tel:1501" data-cf-modified-0e017922931d765566c39c08-="">
                                    <strong className="f-bd text-payment-3Terror-call">โทร</strong>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="modal confirm-modal fade" id="serviceErrorModal" aria-labelledby="serviceErrorModal" data-bs-backdrop="static" data-bs-keyboard="false" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered mx-4 mx-sm-auto">
                    <div className="modal-content rounded-4">
                        <div className="modal-body pt-20 px-20 pb-20 text-center">
                            <img className="img-fluid mb-2 mx-auto" alt="ไม่สำเร็จ" width="80" height="80" src="/assets/icon/icon-error.svg" />
                            <h5 className="text-black fs-18 f-bd mb-2 text-service-error">ขออภัย<br />
                                ไม่สามารถทำรายการได้ในขณะนี้</h5>
                            <p className="text-lightgrey text-center mb-20">กรุณาทำรายการใหม่ภายหลัง</p>
                            <div>
                                {/* onclick="if (!window.__cfRLUnblockHandlers) return false; serviceErrorModalOnclickBtn();" */}
                                <a className="btn btn-primary w-100 fs-6 d-flex align-items-center justify-content-center me-2 me-2" href="https://app.tidlor.com/main" data-cf-modified-0e017922931d765566c39c08-="">
                                    <strong className="f-bd text-service-error-btn">กลับหน้าหลัก</strong>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="btn-footer-wraper bg-white text-center d-flex justify-content-between">
                <div className="container d-flex justify-content-between">
                    <div className="total-price text-grey">
                        <p className="mb-0 text-start f-md">ยอดชำระ</p>
                        <span id="p_lt_ctl00_pageplaceholder_p_lt_ctl00_ReviewSummary_lbTotal" className="mb-0 text-start f-bd fs-26">967.28</span><span className="fs-6 f-bd"> บาท</span>
                    </div>
                    {/* onclick="if (!window.__cfRLUnblockHandlers) return false; return submitOnclick();" */}
                    <a href="/th/PaymentChannel" id="p_lt_ctl00_pageplaceholder_p_lt_ctl00_ReviewSummary_btnSubmit" className="btn btn-primary submit-summary fs-6 d-flex justify-content-center align-items-center me-0" data-cf-modified-0e017922931d765566c39c08-=""><strong>ยืนยัน</strong></a>
                </div>
            </div>

            {/* <script type="0e017922931d765566c39c08-text/javascript">
    document.addEventListener(("DOMContentLoaded"), () => {

                    let variantText = '';
                let isRed = document.querySelector("[id*=hdCarIsRedText]").value;
                if(isRed == 'NOTRED' || isRed == 'NotRed')
                {
                    variantText = 'ป้ายขาว';
        }
                else{
                    variantText = 'ป้ายแดง';
        }

                dataLayer.push({
                    "event": "begin_checkout",
                "ecommerce": {
                    "currency": "THB", // ***Required
                "value": document.querySelector("[id*=lbTotal]").innerHTML, // ***Required / eg. 645.21
                "channel": document.querySelector("[id*=hdChannelText]").value,// ***Required / eg. ntl_app, ntl_web, heygoody
                "items": [
                {
                    "item_id": document.querySelector("[id*=hdVehicleCategoryId]").value, //***Required / eg. 0001
                "item_name": document.querySelector("[id*=hdVehicleNameText]").value+"/"+document.querySelector("[id*=hdVehicleCategoryText]").value, //***Required / eg. รถเก๋ง / ส่วนบุคคล, รถบรรทุก / ไม่เกิน 3 ตัน
                "item_brand": document.querySelector("[id*=hdVehicleCategoryText]").value, //eg. ส่วนบุคคล, ไม่เกิน 3 ตัน
                "item_category": document.querySelector("[id*=lbCarBrand]").innerHTML,
                "item_category2": document.querySelector("[id*=lbCarModel]").innerHTML,
                "item_category3": document.querySelector("[id*=lbCarColor]").innerHTML,
                "item_category4": document.querySelector("[id*=lbYearRegis]").innerHTML,
                "item_category5": document.querySelector("[id*=lbProvinceRegis]").innerHTML,
                "item_variant": variantText, //eg. ป้ายแดง, ป้ายขาว
                "start_coverage_date": document.querySelector("[id*=hdCoverageDateStart]").value,
                "end_coverage_date": document.querySelector("[id*=hdCoverageDateEnd]").value,
                "price": document.querySelector("[id*=lbTotal]").innerHTML,// ***Required / eg. 645.21
                "quantity": 1
                },
                ],
        }
        });
    });

                function submitOnclick()
                {
                    PushGTMDefault('review_summary', 'click_button', 'summary_submission');
                new bootstrap.Modal(document.getElementById('ModalLoading')).show();
    }
                function setValueModal(val) {
                    document.querySelector("[id*=hdValModal]").value = val;
    }

                function modalCtpPaymentErrorModal() {
                    //event39
                    PushGTMDefault('review_summary', 'error', document.querySelector('.text-payment-error').textContent.replace('\n', ' '));
                new bootstrap.Modal(document.getElementById('CtpPaymentErrorModal')).show();
    }
                function CtpPaymentErrorModalOnclickBtn() {
                    //event40
                    PushGTMDefault('review_summary', document.querySelector('.text-payment-error-btn').textContent.replace('\n', ' '), document.querySelector('.text-payment-error').textContent.replace('\n', ' '));
    }

                function modalCtpError3TimesModal() {
                    document.querySelector('span.order-no').textContent = document.querySelector("[id*=hdOrderNoText]").value;
                //event39
                PushGTMDefault('review_summary', 'error', document.querySelector('.text-payment-3Terror').textContent.replace('\n\n',' '));
                new bootstrap.Modal(document.getElementById('CtpError3TimesModal')).show();
    }
                function CtpError3TimesModalOnclickBtn()
                {
                    //event40
                    PushGTMDefault('review_summary', document.querySelector("[id*=btnBackMain]").value, document.querySelector('.text-payment-3Terror').textContent.replace('\n\n', ' '));     
    }
                function CtpError3TimesModalOnclickCallBtn()
                {
                    //event40
                    PushGTMDefault('review_summary', document.querySelector('.text-payment-3Terror-call').textContent.replace('\n\n', ' '), document.querySelector('.text-payment-3Terror').textContent.replace('\n\n', ' '));     
    }

                function modalServiceErrorModal() {
                    //event39
                    PushGTMDefault('review_summary', 'error', document.querySelector('.text-service-error').textContent.replace('\n', ' '));
                new bootstrap.Modal(document.getElementById('serviceErrorModal')).show();
    }
                function serviceErrorModalOnclickBtn() {
                    //event40
                    PushGTMDefault('review_summary', document.querySelector('.text-service-error-btn').textContent.replace('\n', ' '), document.querySelector('.text-service-error').textContent.replace('\n', ' '));
                new bootstrap.Modal(document.getElementById('ModalLoading')).show();
    }

                function editOnclick()
                {
                    new bootstrap.Modal(document.getElementById('ModalLoading')).show();
                PushGTMDefault('review_summary', 'edit', document.querySelector("[id*=hdValModal]").value);
    }
                function cancelEditOnclick()
                {
                    PushGTMDefault('review_summary', 'cancel_edit', document.querySelector("[id*=hdValModal]").value);
    }

                function backOnclick()
                {
                    PushGTMEventClickBack();
                new bootstrap.Modal(document.getElementById('ModalLoading')).show();
    }
            </script> */}

            <div className="modal fade modalSpinner" id="ModalLoading" data-bs-backdrop="static" data-bs-keyboard="false" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content bg-transparent border-0 justify-content-center align-items-center mx-auto">
                        <div className="spinner-border text-light"></div>
                        <p className="text-white text-center mt-3 mb-0">กำลังดำเนินการ<br />
                            กรุณารอซักครู่</p>
                    </div>
                </div>
            </div>
        </main>
    );
}
