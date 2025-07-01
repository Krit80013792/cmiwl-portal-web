/* eslint-disable @next/next/no-img-element */

import React from 'react';
import { Metadata } from 'next';
import Image from 'next/image';

export const dynamic = 'force-dynamic';

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: 'ชำระค่าพ.ร.บ.รถยนต์ ผ่านทาง QR Code | ติดล้อ',
        description: 'ชำระค่าพ.ร.บ.รถยนต์ ผ่านทาง QR Code | ติดล้อ'
    };
}

export default async function PaymentQR() {


    return (
        <main>
            <div className="head-bar">
                <div className="container d-flex align-items-center">
                    {/* onclick="if (!window.__cfRLUnblockHandlers) return false; return backOnclick();" */}
                    <input type="image" name="p$lt$ctl00$pageplaceholder$p$lt$ctl00$PaymentQR$btnBackPage" id="p_lt_ctl00_pageplaceholder_p_lt_ctl00_PaymentQR_btnBackPage" src="/assets/icon/back.png" alt="กลับ"  style={{ height: '36px', width: '36px' }} data-cf-modified-c7c0513ed0fab5c97316671e-="" />
                    <p id="p_lt_ctl00_pageplaceholder_p_lt_ctl00_PaymentQR_lbHeaderBar" className="text-center mb-0 w-100 fs-18 f-bd">พ.ร.บ.</p>
                </div>
            </div>

            <div className="content-section fullPage-92 pt-48">
                <div className="container">
                    <h1 className="typ-of-vehicle fs-6 text-grey mb-0 mt-3 f-bd">พ.ร.บ.
                        <span id="p_lt_ctl00_pageplaceholder_p_lt_ctl00_PaymentQR_lbCompulsoryRateText"> ไม่เกิน 3 ตัน</span></h1>
                    <p className="registered-id text-lightgrey mb-0">
                        เลขทะเบียน
                        <span id="p_lt_ctl00_pageplaceholder_p_lt_ctl00_PaymentQR_lbLicenseRegis"> กพ 7333</span>
                    </p>
                    <div className="d-flex justify-content-between align-items-center my-2">
                        <span className="text-grey f-bd align-center">ยอดที่ต้องชำระ</span>
                        <div>
                            <span id="p_lt_ctl00_pageplaceholder_p_lt_ctl00_PaymentQR_lbTotal" className="mb-0 text-start f-bd fs-26">967.28 </span>
                            <span className="fs-6 f-bd">บาท/ปี</span>
                        </div>
                    </div>
                    <div className="bg-lightgrey rounded-4 py-3 mb-12">
                        <div className="text-center mb-2">
                            <img id="p_lt_ctl00_pageplaceholder_p_lt_ctl00_PaymentQR_imgQr" src="https://api.omise.co/charges/chrg_test_63t46swdr6agm7swe4a/documents/docu_test_63t46sy8jx9sd6wp1ym/downloads/4C41D34F9DDB9366" alt="QR Code" style={{ height: '213px', width: '152px' }} />
                        </div>
                        <div className="text-center mb-2">
                            <img className="d-inline me-1" alt="Clock" width="16" height="17" src="/assets/icon/clock.png" />
                            <p className="text-red mb-0 fs-14 text-center f-bd d-inline">
                                คิวอาร์โค้ดนี้มีอายุถึง 
                                <span id="p_lt_ctl00_pageplaceholder_p_lt_ctl00_PaymentQR_lbExpiryDate"> 23 พ.ค. 2568 - 15:00 น.</span>
                            </p>
                        </div>
                        <p className="text-center text-lightgrey mb-0 fs-14">
                            หากคุณชำระเงินหลังวันที่เริ่มความคุ้มครองที่เลือกไว้<br />
                            ประกันจะเริ่มคุ้มครองเป็นวันถัดไป<br />
                            ยกเว้นกรณีซื้อประกันล่วงหน้า
                        </p>
                    </div>
                    <h2 className="f-bd mb-0 fs-6">หลังจากชำระเงิน</h2>
                    <p className="fs-14">
                        <span id="p_lt_ctl00_pageplaceholder_p_lt_ctl00_PaymentQR_lbPolicy">กรมธรรม์อิเล็กทรอนิกส์จะถูกจัดส่งภายใน 15 นาที</span>
                    </p>
                </div>

                <div className="text-center mt-12">
                    <img alt="Omise" width="150" height="24" src="/assets/object/omise.png" />
                </div>
            </div>
            <div className="btn-footer-wraper qrPayment-backHomeBTN py-20 px-20 bg-white text-center">
                {/* onclick="if (!window.__cfRLUnblockHandlers) return false; modalLoading(true);" */}
                <input type="submit" name="p$lt$ctl00$pageplaceholder$p$lt$ctl00$PaymentQR$btnBackToHome" value="กลับหน้าหลัก" id="p_lt_ctl00_pageplaceholder_p_lt_ctl00_PaymentQR_btnBackToHome" className="btn btn-primary fs-6 mx-auto d-flex text-center align-items-center justify-content-center" data-cf-modified-c7c0513ed0fab5c97316671e-="" />

                <input type="hidden" name="p$lt$ctl00$pageplaceholder$p$lt$ctl00$PaymentQR$hdPaymentTypeText" id="p_lt_ctl00_pageplaceholder_p_lt_ctl00_PaymentQR_hdPaymentTypeText" value="คิวอาร์โค้ด" />
                <input type="hidden" name="p$lt$ctl00$pageplaceholder$p$lt$ctl00$PaymentQR$hdOrderNoText" id="p_lt_ctl00_pageplaceholder_p_lt_ctl00_PaymentQR_hdOrderNoText" value="CMI0000000747" />
            </div>
            <div id="p_lt_ctl00_pageplaceholder_p_lt_ctl00_PaymentQR_panelSelect">

                <input type="submit" name="p$lt$ctl00$pageplaceholder$p$lt$ctl00$PaymentQR$btnCheckHook" value="checkHook" id="p_lt_ctl00_pageplaceholder_p_lt_ctl00_PaymentQR_btnCheckHook" className="d-none" />

            </div>

            <div className="modal confirm-modal fade" id="PaymentGatewayErrorModal" aria-labelledby="PaymentGatewayErrorModal" data-bs-backdrop="static" data-bs-keyboard="false" aria-hidden="true">

                <div className="modal-dialog modal-dialog-centered mx-4 mx-sm-auto">
                    <div className="modal-content rounded-4">
                        <div className="modal-body pt-20 px-20 pb-20 text-center">
                            <img className="img-fluid mb-2 mx-auto" alt="ไม่สามารถทำรายการได้ในขณะนี้" width="80" height="80" src="/assets/icon/icon-error.png" />

                            <h5 className="text-black text-center fs-18 f-bd mb-2 text-payment-error">ชำระเงินไม่สำเร็จ</h5>
                            <p className="text-lightgrey mb-20">
                                กรุณาตรวจสอบข้อมูลหรือพบปัญหา<br />
                                การชำระเงิน กรุณาติดต่อเจ้าหน้าที่ <br />
                                <span className="d-inline-block">(เลขที่อ้างอิง: <span className="order-no">-</span>)</span>
                            </p>

                            <div className="d-flex">
                                {/* onclick="if (!window.__cfRLUnblockHandlers) return false; PaymentGatewayErrorModalOnclickBtn();" */}
                                <a className="btn btn-secondary w-100 fs-6 d-flex justify-content-center align-items-center me-2 closePopup-btn" data-bs-dismiss="modal" aria-label="Close" data-cf-modified-c7c0513ed0fab5c97316671e-="">
                                    <strong className="f-bd text-payment-error-btn">ตรวจสอบข้อมูล</strong>
                                </a>
                                {/* onclick="if (!window.__cfRLUnblockHandlers) return false; PaymentGatewayErrorModalOnclickCallBtn();" */}
                                <a className="btn btn-primary w-100 fs-6 d-flex justify-content-center align-items-center ms-2 call-btn" href="tel:1501" data-cf-modified-c7c0513ed0fab5c97316671e-="">
                                    <strong className="f-bd text-payment-error-call">โทร</strong>
                                </a>
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
                            <input type="submit" name="p$lt$ctl00$pageplaceholder$p$lt$ctl00$PaymentQR$btnCloseErrorModal" value="ปิด" id="p_lt_ctl00_pageplaceholder_p_lt_ctl00_PaymentQR_btnCloseErrorModal" className="btn btn-primary w-100 fs-6 d-flex justify-content-center align-items-center me-2 closePopup-btn" data-cf-modified-c7c0513ed0fab5c97316671e-="" />
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
                                หรือติดต่อเจ้าหน้าที่หากพบปัญหาการใช้งาน  <br />
                                <span className="d-inline-block">(เลขที่อ้างอิง: <span className="order-no">-</span>)</span>

                            </p>

                            <div className="d-flex">
                                {/* onclick="if (!window.__cfRLUnblockHandlers) return false; CtpError3TimesModalOnclickBtn();" */}
                                <input type="submit" name="p$lt$ctl00$pageplaceholder$p$lt$ctl00$PaymentQR$btnBackMain" value="กลับหน้าหลัก" id="p_lt_ctl00_pageplaceholder_p_lt_ctl00_PaymentQR_btnBackMain" className="btn btn-secondary w-100 fs-6 d-flex justify-content-center align-items-center me-2 backtoMain-btn" data-cf-modified-c7c0513ed0fab5c97316671e-="" />
                                {/* onclick="if (!window.__cfRLUnblockHandlers) return false; CtpError3TimesModalOnclickCallBtn();" */}
                                <a className="btn btn-primary w-100 fs-6 d-flex justify-content-center align-items-center ms-2 call-btn" href="tel:1501" data-cf-modified-c7c0513ed0fab5c97316671e-="">
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
                                <a className="btn btn-primary w-100 fs-6 d-flex align-items-center justify-content-center me-2 me-2" href="https://app.tidlor.com/main" data-cf-modified-c7c0513ed0fab5c97316671e-="">
                                    <strong className="f-bd text-service-error-btn">กลับหน้าหลัก</strong>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* <script type="c7c0513ed0fab5c97316671e-text/javascript">
    document.addEventListener(("DOMContentLoaded"), () => {
        //event 31
        PushGTMDefault('payment_qr', 'payment_processing', document.querySelector("[id*=hdPaymentTypeText]").value);

        const intervalHook = setInterval(clickCheckkHook, 2000);
        function clickCheckkHook() {
            document.querySelector("[id*='btnCheckHook']").click();
        }
    });

    var prm = Sys.WebForms.PageRequestManager.getInstance();
    if (prm != null) {
        prm.add_initializeRequest((sender, args) => {
        });
        prm.add_endRequest((sender, e) => {
            if (e.get_error() != undefined) {
                e.set_errorHandled(true);
            }
        });
    }

    function modalLoading(backMainPage = false) {
        new bootstrap.Modal(document.getElementById('ModalLoading')).show();
        if (backMainPage) {
            //event 32
            PushGTMDefault('payment_qr', 'click_button', 'to_intro');
        }
        else {
            //event40
            PushGTMDefault('payment_qr', document.querySelector('.text-payment-error-btn').textContent.replace('\n',' '), document.querySelector('.text-payment-error').textContent.replace('\n',' '));
        }
    }
    function modalPaymentErrorModal() {
        //event39
        PushGTMDefault('payment_qr', 'error', document.querySelector('.text-payment-error').textContent);
        new bootstrap.Modal(document.getElementById('paymentErrorModal')).show();
    }


    function modalServiceErrorModal() {
        //event39
        PushGTMDefault('payment_qr', 'error', document.querySelector('.text-service-error').textContent.replace('\n',' '));
        new bootstrap.Modal(document.getElementById('serviceErrorModal')).show();
    }
    function serviceErrorModalOnclickBtn() {
        //event40
        PushGTMDefault('payment_qr', document.querySelector('.text-service-error-btn').textContent, document.querySelector('.text-service-error').textContent.replace('\n',' '));
        new bootstrap.Modal(document.getElementById('ModalLoading')).show();
    }

    function backOnclick() {
        PushGTMEventClickBack();
        new bootstrap.Modal(document.getElementById('ModalLoading')).show();
    }

    function modalCtpPaymentErrorModal() {
        //event39
        PushGTMDefault('payment_qr', 'error', document.querySelector('.text-payment-error').textContent.replace('\n',' '));
        new bootstrap.Modal(document.getElementById('CtpPaymentErrorModal')).show();
    }
    function CtpPaymentErrorModalOnclickBtn() {
         //event40
        PushGTMDefault('payment_qr', document.querySelector("[id*=btnCloseErrorModal]").value, document.querySelector('.text-payment-error').textContent);
        new bootstrap.Modal(document.getElementById('ModalLoading')).show();
    }

    function modalCtpError3TimesModal() {
        document.querySelector('span.order-no').textContent = document.querySelector("[id*=hdOrderNoText]").value;
        //event39
        PushGTMDefault('payment_qr', 'error', document.querySelector('.text-payment-3Terror').textContent.replace('\n\n',' '));
        new bootstrap.Modal(document.getElementById('CtpError3TimesModal')).show();
    }
    function CtpError3TimesModalOnclickBtn()
    {
        //event40
        PushGTMDefault('payment_qr', document.querySelector("[id*=btnBackMain]").value, document.querySelector('.text-payment-3Terror').textContent.replace('\n\n',' '));     
    }
    function CtpError3TimesModalOnclickCallBtn()
    {
        //event40
        PushGTMDefault('payment_qr', document.querySelector('.text-payment-3Terror-call').textContent.replace('\n\n',' '), document.querySelector('.text-payment-3Terror').textContent.replace('\n\n',' '));     
    }
</script> */}

            <div className="modal fade modalSpinner" id="ModalLoading" data-bs-backdrop="static" data-bs-keyboard="false" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content bg-transparent border-0 justify-content-center align-items-center mx-auto">
                        <div className="spinner-border text-light" role="status"></div>
                        <p className="text-white text-center mt-3 mb-0">กำลังดำเนินการ<br />
                            กรุณารอซักครู่</p>
                    </div>
                </div>
            </div>
        </main>
    );
}
