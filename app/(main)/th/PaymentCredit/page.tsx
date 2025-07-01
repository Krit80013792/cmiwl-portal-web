/* eslint-disable @next/next/no-img-element */

import React from 'react';
import { Metadata } from 'next';
import Image from 'next/image';

export const dynamic = 'force-dynamic';

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: 'ชำระค่าพ.ร.บ.รถยนต์ ผ่านทางบัตรเครดิต | ติดล้อ',
        description: 'ชำระค่าพ.ร.บ.รถยนต์ ผ่านทางบัตรเครดิต | ติดล้อ'
    };
}

export default async function PaymentCredit() {


    return (
        <main>
            <div className="head-bar">
                <div className="container d-flex align-items-center">
                    {/* onclick="if (!window.__cfRLUnblockHandlers) return false; return backOnclick();" */}
                    <input type="image" name="p$lt$ctl00$pageplaceholder$p$lt$ctl00$PaymentCredit$btnBackPage" id="p_lt_ctl00_pageplaceholder_p_lt_ctl00_PaymentCredit_btnBackPage" src="/assets/icon/back.png" alt="กลับ" style={{ height: '36px', width: '36px' }} data-cf-modified-acf568a5163c3569726d8c12-="" />
                    <p id="p_lt_ctl00_pageplaceholder_p_lt_ctl00_PaymentCredit_lbHeaderBar" className="text-center mb-0 w-100 fs-18 f-bd">พ.ร.บ.</p>
                </div>
            </div>

            <div className="content-section fullPage-116 pt-48">
                <div className="container">
                    <div className="bg-lightgrey rounded-4 d-flex justify-content-between align-items-center mt-4 mb-4 px-12 py-12 ">
                        <span className="text-grey f-bd align-center">ยอดที่ต้องชำระ</span>
                        <div>
                            <span id="p_lt_ctl00_pageplaceholder_p_lt_ctl00_PaymentCredit_lbTotal" className="mb-0 text-start f-bd fs-26">967.28 </span>
                            <span className="fs-6 f-bd">บาท</span>
                        </div>
                    </div>
                    <div className="mb-12">
                        <img className="me-2" alt="Visa" width="42" height="32" src="/assets/icon/visa.png" />
                        <img className="me-2" alt="Mastercard" width="42" height="32" src="/assets/icon/mastercard.png" />
                        <img alt="JCB" width="42" height="32" src="/assets/icon/jcb.png" />
                    </div>
                    <div className="formMain">
                        <div className="form-group mb-12 creditno">
                            {/* onkeydown="if (!window.__cfRLUnblockHandlers) return false; return (event.keyCode!=13);" */}
                            <input name="p$lt$ctl00$pageplaceholder$p$lt$ctl00$PaymentCredit$txtCreditNo" type="text" maxLength={19} id="p_lt_ctl00_pageplaceholder_p_lt_ctl00_PaymentCredit_txtCreditNo" className="form-control ditNo" placeholder="0000 0000 0000 0000" data-cf-modified-acf568a5163c3569726d8c12-="" />
                            {/* onclick="if (!window.__cfRLUnblockHandlers) return false; clearValue('txtCreditNo', 'creditno'); checkCreditCard();" */}
                            <a className="d-flex align-items-center justify-content-center clearFeild-btn-wrapper clearfiled-hide z-index-1" data-cf-modified-acf568a5163c3569726d8c12-="">
                                <img className="img-fluid mb-2 mx-auto position-absolute clearFeild-btn hide" alt="test" width="24" height="24" src="/cmisite/media/assets/icon-clear.png" />
                            </a>
                            <label className="form-label">หมายเลขบัตร</label>
                            <div className="feedback">กรุณากรอกให้ถูกต้อง</div>
                        </div>
                        <div className="form-group mb-12 creditname">
                            {/* onkeydown="if (!window.__cfRLUnblockHandlers) return false; return (event.keyCode!=13);" */}
                            <input name="p$lt$ctl00$pageplaceholder$p$lt$ctl00$PaymentCredit$txtCreditName" type="text" maxLength={100} id="p_lt_ctl00_pageplaceholder_p_lt_ctl00_PaymentCredit_txtCreditName" className="form-control engNum" placeholder="กรอกชื่อผู้ถือบัตร (ภาษาอังกฤษ)" data-cf-modified-acf568a5163c3569726d8c12-="" />
                            {/* onclick="if (!window.__cfRLUnblockHandlers) return false; clearValue('txtCreditName', 'creditname'); checkCreditName();" */}
                            <a className="d-flex align-items-center justify-content-center clearFeild-btn-wrapper clearfiled-hide z-index-1" data-cf-modified-acf568a5163c3569726d8c12-="">
                                <img className="img-fluid mb-2 mx-auto position-absolute clearFeild-btn hide" alt="test" width="24" height="24" src="/cmisite/media/assets/icon-clear.png" />
                            </a>
                            <label className="form-label">ชื่อผู้ถือบัตร</label>
                            <div className="feedback">กรุณากรอก</div>
                        </div>
                        <div className="d-flex">
                            <div className="form-group mb-12 me-3 creditexpiry">
                                {/* onkeydown="if (!window.__cfRLUnblockHandlers) return false; return (event.keyCode!=13);" */}
                                <input name="p$lt$ctl00$pageplaceholder$p$lt$ctl00$PaymentCredit$txtCreditExpiry" type="text" maxLength={5} id="p_lt_ctl00_pageplaceholder_p_lt_ctl00_PaymentCredit_txtCreditExpiry" className="form-control ditExp" placeholder="MM/YY" data-cf-modified-acf568a5163c3569726d8c12-="" />
                                {/* onclick="if (!window.__cfRLUnblockHandlers) return false; clearValue('txtCreditExpiry', 'creditexpiry'); checkCreditExpiry();" */}
                                <a className="d-flex align-items-center justify-content-center clearFeild-btn-wrapper clearfiled-hide z-index-1" data-cf-modified-acf568a5163c3569726d8c12-="">
                                    <img className="img-fluid mb-2 mx-auto position-absolute clearFeild-btn hide" alt="test" width="24" height="24" src="/cmisite/media/assets/icon-clear.png" />
                                </a>
                                <label className="form-label">วันหมดอายุ</label>
                                <div className="feedback">
                                    กรุณากรอกวันหมดอายุ<br className="d-block d-sm-none" />
                                    ให้ถูกต้อง
                                </div>
                            </div>
                            <div className="form-group form-cvv creditcvv mb-12">
                                {/* onkeydown="if (!window.__cfRLUnblockHandlers) return false; return (event.keyCode!=13);" */}
                                <input name="p$lt$ctl00$pageplaceholder$p$lt$ctl00$PaymentCredit$txtCreditCVV" type="text" maxLength={3} id="p_lt_ctl00_pageplaceholder_p_lt_ctl00_PaymentCredit_txtCreditCVV" className="form-control onlyNum" placeholder="000" data-cf-modified-acf568a5163c3569726d8c12-="" />
                                <label className="form-label">CVV/CVC</label>
                                {/* onclick="if (!window.__cfRLUnblockHandlers) return false; hintCreditOnclick()" */}
                                <button type="button" className="bg-transparent border-0  z-index-2" data-bs-toggle="modal" data-bs-target="#cvvHelperModal" data-cf-modified-acf568a5163c3569726d8c12-="">
                                    <img alt="ตัวช่วย" width="24" height="24" src="/assets/icon/icon-question.png" />
                                </button>
                                {/* onclick="if (!window.__cfRLUnblockHandlers) return false; clearValue('txtCreditCVV', 'creditcvv', false); checkCreditCVV();" */}
                                <a className="d-flex align-items-center justify-content-center clearFeild-btn-wrapper z-index-1" data-cf-modified-acf568a5163c3569726d8c12-="">
                                    <img className="img-fluid mb-2 mx-auto position-absolute clearFeild-btn" alt="test" width="24" height="24" src="/cmisite/media/assets/icon-clear.png" />
                                </a>
                                <div className="feedback">กรุณากรอก</div>
                            </div>
                        </div>
                        <p className="mb-0 fs-14 text-lighgrey"><strong>หมายเหตุ</strong> : หากคุณชำระเงินหลังวันที่เริ่มความคุ้มครอง ที่เลือกไว้ ประกันจะเริ่มคุ้มครองเป็นวันถัดไป ยกเว้นกรณี ซื้อประกันล่วงหน้า</p>
                    </div>
                    <div className="text-center mt-12">
                        <img alt="Omise" width="150" height="24" src="/assets/object/omise.png" />
                    </div>
                </div>

            </div>
            <div className="btn-footer-wraper py-20 px-20 bg-white text-center">
                {/* onclick="if (!window.__cfRLUnblockHandlers) return false; return checkValidation();" */}
                <input type="submit" name="p$lt$ctl00$pageplaceholder$p$lt$ctl00$PaymentCredit$btnSubmit" value="ชำระเงิน" id="p_lt_ctl00_pageplaceholder_p_lt_ctl00_PaymentCredit_btnSubmit" className="btn btn-primary fs-6 mx-auto d-flex text-center align-items-center justify-content-center" data-cf-modified-acf568a5163c3569726d8c12-="" />

                <input type="hidden" name="p$lt$ctl00$pageplaceholder$p$lt$ctl00$PaymentCredit$hdPaymentTypeText" id="p_lt_ctl00_pageplaceholder_p_lt_ctl00_PaymentCredit_hdPaymentTypeText" value="บัตรเครดิต" />
                <input type="hidden" name="p$lt$ctl00$pageplaceholder$p$lt$ctl00$PaymentCredit$hdOrderNoText" id="p_lt_ctl00_pageplaceholder_p_lt_ctl00_PaymentCredit_hdOrderNoText" value="CMI0000000747" />
            </div>

            <div className="modal hint-modal cvv-modal fade" id="cvvHelperModal" aria-labelledby="cvvModalTitle" style={{ display: 'none' }} aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title f-bd fs-18" id="cvvModalTitle">รหัส CVV/CVC</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <p className="my-3 text-center">
                                กรอก
                                <strong>ตัวเลข 3 หลัก</strong>
                                ที่อยู่บนหลังบัตร<br />
                                ทางด้านขวาของแถบลายเซ็น
                            </p>
                            <div className="mb-4">
                                <img className="img-fluid d-block mx-auto" alt="cvv" width="286" height="226" src="/assets/object/cvv.png" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="modal confirm-modal fade" id="PaymentCreditErrorModal" aria-labelledby="PaymentCreditErrorModal" data-bs-backdrop="static" data-bs-keyboard="false" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered mx-4 mx-sm-auto">
                    <div className="modal-content rounded-4">
                        <div className="modal-body pt-20 px-20 pb-20 text-center">
                            <img className="img-fluid mb-2 mx-auto" alt="ไม่สำเร็จ" width="80" height="80" src="/assets/icon/warning.png" />
                            <h5 className="text-black text-center fs-18 f-bd mb-2 text-payment-credit-error">ชำระเงินไม่สำเร็จ</h5>
                            <p className="text-lightgrey text-center mb-20">
                                ข้อมูลบัตรไม่ถูกต้อง กรุณาตรวจสอบข้อมูล<br />
                                และลองใหม่อีกครั้ง
                            </p>
                            <div>
                                {/* onclick="if (!window.__cfRLUnblockHandlers) return false; PaymentCreditErrorModalOnclickBtn();" */}
                                <a className="btn btn-primary w-100 fs-6 d-flex align-items-center justify-content-center me-2 me-2" data-bs-dismiss="modal" aria-label="Close" data-cf-modified-acf568a5163c3569726d8c12-="">
                                    <strong className="f-bd text-payment-credit-error-btn">ตรวจสอบข้อมูล</strong>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
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
                                <span className="d-inline-block">(เลขที่อ้างอิง: <span className="order-no-gateway">-</span>)</span>
                            </p>

                            <div className="d-flex">
                                {/* onclick="if (!window.__cfRLUnblockHandlers) return false; PaymentGatewayErrorModalOnclickBtn();" */}
                                <a className="btn btn-secondary w-100 fs-6 d-flex justify-content-center align-items-center me-2 closePopup-btn" data-bs-dismiss="modal" aria-label="Close" data-cf-modified-acf568a5163c3569726d8c12-="">
                                    <strong className="f-bd text-payment-error-btn">ตรวจสอบข้อมูล</strong>
                                </a>
                                {/* onclick="if (!window.__cfRLUnblockHandlers) return false; PaymentGatewayErrorModalOnclickCallBtn();" */}
                                <a className="btn btn-primary w-100 fs-6 d-flex justify-content-center align-items-center ms-2 call-btn" href="tel:1501" data-cf-modified-acf568a5163c3569726d8c12-="">
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
                            <input type="submit" name="p$lt$ctl00$pageplaceholder$p$lt$ctl00$PaymentCredit$btnCloseErrorModal" value="ปิด" id="p_lt_ctl00_pageplaceholder_p_lt_ctl00_PaymentCredit_btnCloseErrorModal" className="btn btn-primary w-100 fs-6 d-flex justify-content-center align-items-center me-2 closePopup-btn" data-cf-modified-acf568a5163c3569726d8c12-="" />
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
                                <input type="submit" name="p$lt$ctl00$pageplaceholder$p$lt$ctl00$PaymentCredit$btnBackMain" value="กลับหน้าหลัก" id="p_lt_ctl00_pageplaceholder_p_lt_ctl00_PaymentCredit_btnBackMain" className="btn btn-secondary w-100 fs-6 d-flex justify-content-center align-items-center me-2 backtoMain-btn" data-cf-modified-acf568a5163c3569726d8c12-="" />
                                {/* onclick="if (!window.__cfRLUnblockHandlers) return false; CtpError3TimesModalOnclickCallBtn();" */}
                                <a className="btn btn-primary w-100 fs-6 d-flex justify-content-center align-items-center ms-2 call-btn" href="tel:1501" data-cf-modified-acf568a5163c3569726d8c12-="">
                                    <strong className="f-bd text-payment-3Terror-call">โทร</strong>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="modal fade modalSpinner" id="ModalPaymentLoading" data-bs-backdrop="static" data-bs-keyboard="false" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content bg-transparent border-0 justify-content-center align-items-center mx-auto">
                        <div className="spinner-border text-light" role="status"></div>
                        <p className="text-white text-center mt-3 mb-0">กำลังดำเนินการชำระเงิน</p>
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
                                <a className="btn btn-primary w-100 fs-6 d-flex align-items-center justify-content-center me-2 me-2" href="https://app.tidlor.com/main" data-cf-modified-acf568a5163c3569726d8c12-="">
                                    <strong className="f-bd text-service-error-btn">กลับหน้าหลัก</strong>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* <script type="acf568a5163c3569726d8c12-text/javascript">
    document.addEventListener(("DOMContentLoaded"), () => {
                            let creditNo = document.querySelector('.ditNo');
                        setInputFilterInput(creditNo, function (value) {
            return /^[ 0-9]*$/i.test(value);
        });
                        creditNo.setAttribute("inputmode", "decimal");
                        creditNo.addEventListener('keyup', function (e) {
            var checkbool = formatCreditNo(e.target.value);
                        e.target.value = checkbool;
        });

                        let listEnNum = document.querySelector(".engNum");
                        listEnNum.addEventListener('blur', function (event) {
                            event.target.value = event.target.value.replace(/^\s+|\s+$/g, "").replace(/\s+/g, " ");
        }, true);
                        setInputFilter(listEnNum, function (value) {
            return /^[ a-zA-z0-9]*$/i.test(value);
        });

                        let creditExp = document.querySelector('.ditExp');
                        setInputFilterInput(creditExp, function (value) {
            return /^[/0-9]*$/i.test(value);
        });
                        creditExp.setAttribute("inputmode", "decimal");
                        creditExp.addEventListener('keyup', function (e) {
            var checkbool = formatCreditExp(e.target.value);
                        e.target.value = checkbool;
        });

                        let listNum = document.querySelector(".onlyNum");
                        listNum.setAttribute("inputmode", "decimal");
                        setInputFilter(listNum, function (value) {
            return /^[0-9]*$/i.test(value);
        });

                        document.querySelector('.formMain input[id*=txtCreditNo]').addEventListener('blur', function (event) {
            var valCreditNo = document.querySelector('.formMain input[id*=txtCreditNo]').value;
                        if (valCreditNo == "") {
                            document.querySelector('.formMain .creditno').classList.add('validated-error');
                        document.querySelector('.formMain .creditno .feedback').textContent = "กรุณากรอก";
            } else {
                if (valCreditNo.length == 19 && /^\d{4} \d{4} \d{4} \d{4}$/.test(valCreditNo)) {
                            document.querySelector('.formMain .creditno').classList.remove('validated-error');
                        document.querySelector('.formMain .creditno .feedback').textContent = "";
                } else {
                            document.querySelector('.formMain .creditno').classList.add('validated-error');
                        document.querySelector('.formMain .creditno .feedback').textContent = "กรุณากรอกให้ถูกต้อง";
                }
            }
        }, true);
                        document.querySelector('.formMain input[id*=txtCreditNo]').addEventListener('keyup', function (event) {
                            showButtonRemoveCreditCard();
        }, true);
                        document.querySelector('.formMain input[id*=txtCreditNo]').addEventListener('focus', function (e) {
                            setShowHide(true, 'creditno');
        }, true);
                        document.querySelector('.formMain input[id*=txtCreditNo]').addEventListener('focusout', function (e) {
                            setShowHide(false, 'creditno');
        }, true);
                        showButtonRemoveCreditCard();

                        document.querySelector('.formMain input[id*=txtCreditName]').addEventListener('blur', function (event) {
            var valCreditName = document.querySelector('.formMain input[id*=txtCreditName]').value;
                        if (valCreditName == "") {
                            document.querySelector('.formMain .creditname').classList.add('validated-error');
                
            } else {
                            document.querySelector('.formMain .creditname').classList.remove('validated-error');
            }
        }, true);
                        document.querySelector('.formMain input[id*=txtCreditName]').addEventListener('keyup', function (event) {
                            showButtonRemoveCreditName();
        }, true);
                        document.querySelector('.formMain input[id*=txtCreditName]').addEventListener('focus', function (e) {
                            setShowHide(true, 'creditname');
        }, true);
                        document.querySelector('.formMain input[id*=txtCreditName]').addEventListener('focusout', function (e) {
                            setShowHide(false, 'creditname');
        }, true);
                        showButtonRemoveCreditName();

                        document.querySelector('.formMain input[id*=txtCreditExpiry]').addEventListener('blur', function (event) {
            var valCreditExpiry = document.querySelector('.formMain input[id*=txtCreditExpiry]').value.replace('/', '');
                        if (valCreditExpiry == "") {
                            document.querySelector('.formMain .creditexpiry').classList.add('validated-error');
                        document.querySelector('.formMain .creditexpiry .feedback').textContent = "กรุณากรอก";
            } else if (valCreditExpiry.length >= 4 && valCreditExpiry != "0000" && !valCreditExpiry.includes("00")) {
                if (valCreditExpiry.length == 4) {
                            let checkExp = false;
                        let mon = valCreditExpiry.substring(0, 2);
                        let dat = new Date().toLocaleDateString('en', {year: '2-digit' });
                        if (mon < 13 && valCreditExpiry.substring(2, 4) >= dat) {
                            checkExp = true;
                    }
                        if (checkExp) {
                            document.querySelector('.formMain .creditexpiry').classList.remove('validated-error');
                        document.querySelector('.formMain .creditexpiry .feedback').textContent = "";
                    }
                        else {
                            document.querySelector('.formMain .creditexpiry').classList.add('validated-error');
                        document.querySelector('.formMain .creditexpiry .feedback').textContent = "กรุณากรอกให้ถูกต้อง";
                    }
                }
                // document.querySelector('.formMain .creditexpiry').classList.remove('validated-error');
                // document.querySelector('.formMain .creditexpiry .feedback').textContent = "";
            }
                        else {
                            document.querySelector('.formMain .creditexpiry').classList.add('validated-error');
                        document.querySelector('.formMain .creditexpiry .feedback').textContent = "กรุณากรอกให้ถูกต้อง";
            }
            
        }, true);
                        document.querySelector('.formMain input[id*=txtCreditExpiry]').addEventListener('keyup', function (event) {
                            showButtonRemoveCreditExpire();
        }, true);
                        document.querySelector('.formMain input[id*=txtCreditExpiry]').addEventListener('focus', function (e) {
                            setShowHide(true, 'creditexpiry');
        }, true);
                        document.querySelector('.formMain input[id*=txtCreditExpiry]').addEventListener('focusout', function (e) {
                            setShowHide(false, 'creditexpiry');
        }, true);
                        showButtonRemoveCreditExpire();
        // document.querySelector('.formMain input[id*=txtCreditExpiry]').addEventListener('blur', function (event) {
                            //     var valCreditExpiry = document.querySelector('.formMain input[id*=txtCreditExpiry]').value.replace('/', '');
                            //     if (valCreditExpiry == "") {
                            //         document.querySelector('.formMain .creditexpiry').classList.add('validated-error');
                            //         document.querySelector('.formMain .creditexpiry .feedback').textContent = "กรุณากรอก";
                            //     } 

                            // }, true);

                            document.querySelector('.formMain input[id*=txtCreditCVV]').addEventListener('blur', function (event) {
                                var valCreditCVV = document.querySelector('.formMain input[id*=txtCreditCVV]').value;
                                if (valCreditCVV == "") {
                                    document.querySelector('.formMain .creditcvv').classList.add('validated-error');
                                } else {
                                    if (valCreditCVV.length == 3) {
                                        document.querySelector('.formMain .creditcvv').classList.remove('validated-error');
                                    }
                                    else if (valCreditCVV.length < 3) {
                                        document.querySelector('.formMain .creditcvv').classList.add('validated-error');
                                        document.querySelector('.formMain .creditcvv .feedback').textContent = "กรุณากรอกให้ถูกต้อง";
                                    }
                                    else {
                                        document.querySelector('.formMain .creditcvv').classList.add('validated-error');
                                        document.querySelector('.formMain .creditcvv .feedback').textContent = "กรุณากรอก";
                                    }
                                }

                            }, true);
                        document.querySelector('.formMain input[id*=txtCreditCVV]').addEventListener('keyup', function (event) {
                            // document.querySelector('.form-group.creditcvv button img').classList.add("hide");
                            // showButtonRemoveCreditCCV();
                            let valCreditCVV = document.querySelector('.formMain input[id*=txtCreditCVV]').value;
            if (valCreditCVV.length > 0)
                        {
                            document.querySelector('.form-group.creditcvv a').classList.remove("z-index-1");
                        document.querySelector('.form-group.creditcvv button').classList.remove("z-index-2");
                        document.querySelector('.form-group.creditcvv a').classList.add("z-index-2");
            }
                        else if(valCreditCVV.length == 0)
                        {
                            document.querySelector('.form-group.creditcvv button').classList.add("z-index-2");
                        document.querySelector('.form-group.creditcvv a').classList.remove("z-index-2");
            }
        }, true);
                        document.querySelector('.formMain input[id*=txtCreditCVV]').addEventListener('focus', function (e) {

                            let valCreditCVV = document.querySelector('.formMain input[id*=txtCreditCVV]').value;
            if (valCreditCVV.length > 0)
                        {
                            document.querySelector('.form-group.creditcvv a').classList.remove("z-index-1");
                        document.querySelector('.form-group.creditcvv button').classList.remove("z-index-2");
                        document.querySelector('.form-group.creditcvv a').classList.add("z-index-2");
            }
        }, true);
                        document.querySelector('.formMain input[id*=txtCreditCVV]').addEventListener('focusout', function (e) {
                            setTimeout(() => {
                                document.querySelector('.form-group.creditcvv button').classList.add("z-index-2");
                                document.querySelector('.form-group.creditcvv a').classList.add("z-index-1");
                            }, 200);
        }, true);

    });

                        function showButtonRemoveCreditCard()
                        {
                            let valCreditCard = document.querySelector('.formMain input[id*=txtCreditNo]').value;
        if (valCreditCard.length > 0)
                        {
                            document.querySelector('.form-group.creditno a img').classList.remove("hide");
        }
                        else if(valCreditCard.length == 0)
                        {
                            document.querySelector('.form-group.creditno a img').classList.add("hide");
        }
    }
                        function showButtonRemoveCreditName()
                        {
                            let valCreditCard = document.querySelector('.formMain input[id*=txtCreditName]').value;
        if (valCreditCard.length > 0)
                        {
                            document.querySelector('.form-group.creditname a img').classList.remove("hide");
        }
                        else if(valCreditCard.length == 0)
                        {
                            document.querySelector('.form-group.creditname a img').classList.add("hide");
        }
    }
                        function showButtonRemoveCreditExpire()
                        {
                            let valCreditCard = document.querySelector('.formMain input[id*=txtCreditExpiry]').value;
        if (valCreditCard.length > 0)
                        {
                            document.querySelector('.form-group.creditexpiry a img').classList.remove("hide");
        }
                        else if(valCreditCard.length == 0)
                        {
                            document.querySelector('.form-group.creditexpiry a img').classList.add("hide");
        }
    }
                        function showButtonRemoveCreditCCV()
                        {
                            let valCreditCard = document.querySelector('.formMain input[id*=txtCreditCVV]').value;
        if (valCreditCard.length > 0)
                        {
                            document.querySelector('.form-group.creditcvv a img').classList.remove("hide");
        }
                        else if(valCreditCard.length == 0)
                        {
                            document.querySelector('.form-group.creditcvv a img').classList.add("hide");
        }
    }

                        function modalPaymentCreditErrorModal() {
                            //event39
                            PushGTMDefault('payment_credit', 'error', document.querySelector('.text-payment-credit-error').textContent);
                        new bootstrap.Modal(document.getElementById('PaymentCreditErrorModal')).show();
    }
                        function PaymentCreditErrorModalOnclickBtn()
                        {
                            //event40
                            PushGTMDefault('payment_credit', document.querySelector('.text-payment-credit-error-btn').textContent, document.querySelector('.text-payment-credit-error').textContent);     
    }

                        function modalPaymentGatewayErrorModal() {
                            document.querySelector('span.order-no-gateway').textContent = document.querySelector("[id*=hdOrderNoText]").value;
                        //event39
                        PushGTMDefault('payment_credit', 'error', document.querySelector('.text-payment-error').textContent);
                        new bootstrap.Modal(document.getElementById('PaymentGatewayErrorModal')).show();
    }
                        function PaymentGatewayErrorModalOnclickBtn()
                        {
                            //event40
                            PushGTMDefault('payment_credit', document.querySelector('.text-payment-error-btn').textContent, document.querySelector('.text-payment-error').textContent);     
    }
                        function PaymentGatewayErrorModalOnclickCallBtn()
                        {
                            //event40
                            PushGTMDefault('payment_credit', document.querySelector('.text-payment-error-call').textContent, document.querySelector('.text-payment-error').textContent);     
    }

                        function modalServiceErrorModal() {
                            //event39
                            PushGTMDefault('payment_credit', 'error', document.querySelector('.text-service-error').textContent.replace('\n', ' '));
                        new bootstrap.Modal(document.getElementById('serviceErrorModal')).show();
    }

                        function serviceErrorModalOnclickBtn() {
                            //event40
                            PushGTMDefault('payment_credit', document.querySelector('.text-service-error-btn').textContent, document.querySelector('.text-service-error').textContent.replace('\n', ' '));
                        new bootstrap.Modal(document.getElementById('ModalLoading')).show();
    }

                        function modalCtpPaymentErrorModal() {
                            //event39
                            PushGTMDefault('payment_credit', 'error', document.querySelector('.text-payment-error').textContent.replace('\n', ' '));
                        new bootstrap.Modal(document.getElementById('CtpPaymentErrorModal')).show();
    }
                        function CtpPaymentErrorModalOnclickBtn() {
                            //event40
                            PushGTMDefault('payment_credit', document.querySelector("[id*=btnCloseErrorModal]").value, document.querySelector('.text-payment-error').textContent);
                        new bootstrap.Modal(document.getElementById('ModalLoading')).show();
    }

                        function modalCtpError3TimesModal() {
                            document.querySelector('span.order-no').textContent = document.querySelector("[id*=hdOrderNoText]").value;
                        //event39
                        PushGTMDefault('payment_credit', 'error', document.querySelector('.text-payment-3Terror').textContent.replace('\n\n',' '));
                        new bootstrap.Modal(document.getElementById('CtpError3TimesModal')).show();
    }
                        function CtpError3TimesModalOnclickBtn()
                        {
                            //event40
                            PushGTMDefault('payment_credit', document.querySelector("[id*=btnBackMain]").value, document.querySelector('.text-payment-3Terror').textContent.replace('\n\n', ' '));     
    }
                        function CtpError3TimesModalOnclickCallBtn()
                        {
                            //event40
                            PushGTMDefault('payment_credit', document.querySelector('.text-payment-3Terror-call').textContent.replace('\n\n', ' '), document.querySelector('.text-payment-3Terror').textContent.replace('\n\n', ' '));     
    }


                        function formatCreditNo(input) {
                            input = input.replace(/\D/g, '');
                        var size = input.length;
        if (size > 0 && size < 5) {
                            input = input;
        } else if (size > 4 && size < 9) {
                            input = input.substring(0, 4) + ' ' + input.substring(4, 8);
        } else if (size > 8 && size < 13) {
                            input = input.substring(0, 4) + ' ' + input.substring(4, 8) + ' ' + input.substring(8, 12);
        } else if (size > 12 && size < 17) {
                            input = input.substring(0, 4) + ' ' + input.substring(4, 8) + ' ' + input.substring(8, 12) + ' ' + input.substring(12, 16);
        }
                        return input == "-" ? "" : input;
    }

                        function formatCreditExp(input) {
                            input = input.replace(/\D/g, '');
                        var size = input.length;
        // if (size > 0 && size < 3) {
        //     if (input < 13) {
        //         document.querySelector('.formMain .creditexpiry').classList.remove('validated-error');
        //         document.querySelector('.formMain .creditexpiry .feedback').textContent = "";
        //     } else {
        //         document.querySelector('.formMain .creditexpiry').classList.add('validated-error');
        //         document.querySelector('.formMain .creditexpiry .feedback').textContent = "กรุณากรอกให้ถูกต้อง";
        //     }
        //     input = input;
        // } else 
        if (size > 2 && size < 5) {
                            // if (size == 4) {
                            //     let checkExp = false;
                            //     let mon = input.substring(0, 2);
                            //     let dat = new Date().toLocaleDateString('en', { year: '2-digit' });
                            //     if (mon < 13 && input.substring(2, 4) >= dat) {
                            //         checkExp = true;
                            //     }
                            //     if (checkExp) {
                            //         document.querySelector('.formMain .creditexpiry').classList.remove('validated-error');
                            //         document.querySelector('.formMain .creditexpiry .feedback').textContent = "";
                            //     }
                            //     else {
                            //         document.querySelector('.formMain .creditexpiry').classList.add('validated-error');
                            //         document.querySelector('.formMain .creditexpiry .feedback').textContent = "กรุณากรอกให้ถูกต้อง";
                            //     }
                            // }
                            input = input.substring(0, 2) + '/' + input.substring(2, 4);
        }
                        return input == "-" ? "" : input;
    }

                        function checkCreditCard(){
        var valCreditNo = document.querySelector('.formMain input[id*=txtCreditNo]').value.replace(/ /g, '');
                        if (valCreditNo == "") {
                            document.querySelector('.formMain .creditno').classList.add('validated-error');
                        document.querySelector('.formMain .creditno .feedback').textContent = "กรุณากรอก";
        } else {
            if (valCreditNo.length == 16) {
                            document.querySelector('.formMain .creditno').classList.remove('validated-error');
                        document.querySelector('.formMain .creditno .feedback').textContent = "";
            } else {
                            document.querySelector('.formMain .creditno').classList.add('validated-error');
                        document.querySelector('.formMain .creditno .feedback').textContent = "กรุณากรอกให้ถูกต้อง";
            }
        }
    }

                        function checkCreditName(checkError = ""){
        var valCreditName = document.querySelector('.formMain input[id*=txtCreditName]').value;
                        if (valCreditName == "") {
                            document.querySelector('.formMain .creditname').classList.add('validated-error');
                        checkError += "creditname|";
        } else {
                            document.querySelector('.formMain .creditname').classList.remove('validated-error');
        }
                        return checkError;
    }

                        function checkCreditExpiry()
                        {
        var valCreditExpiry = document.querySelector('.formMain input[id*=txtCreditExpiry]').value.replace('/', '');
                        if (valCreditExpiry == "") {
                            document.querySelector('.formMain .creditexpiry').classList.add('validated-error');
                        document.querySelector('.formMain .creditexpiry .feedback').textContent = "กรุณากรอก";
        } else {
            if (valCreditExpiry.length == 4 && checkExpiry(valCreditExpiry)) {
                            document.querySelector('.formMain .creditexpiry').classList.remove('validated-error');
                        document.querySelector('.formMain .creditexpiry .feedback').textContent = "";
            } else {
                            document.querySelector('.formMain .creditexpiry').classList.add('validated-error');
                        document.querySelector('.formMain .creditexpiry .feedback').textContent = "กรุณากรอกให้ถูกต้อง";

            }
        }
    }

                        function checkCreditCVV()
                        {
        var valCreditCVV = document.querySelector('.formMain input[id*=txtCreditCVV]').value;
                        if (valCreditCVV == "") {
                            document.querySelector('.formMain .creditcvv').classList.add('validated-error');
        } else {
            if (valCreditCVV.length == 3) {
                            document.querySelector('.formMain .creditcvv').classList.remove('validated-error');
            } else {
                            document.querySelector('.formMain .creditcvv').classList.add('validated-error');
            }
        }
    }

                        function checkValidation() {
        var checkError = "";
                        var wrongFormat = false;
                        var valCreditNo = document.querySelector('.formMain input[id*=txtCreditNo]').value.replace(/ /g, '');
                        if (valCreditNo == "") {
                            document.querySelector('.formMain .creditno').classList.add('validated-error');
                        document.querySelector('.formMain .creditno .feedback').textContent = "กรุณากรอก";
                        checkError += "creditno|";
        } else {
            if (valCreditNo.length == 16) {
                            document.querySelector('.formMain .creditno').classList.remove('validated-error');
                        document.querySelector('.formMain .creditno .feedback').textContent = "";
            } else {
                            document.querySelector('.formMain .creditno').classList.add('validated-error');
                        document.querySelector('.formMain .creditno .feedback').textContent = "กรุณากรอกให้ถูกต้อง";
                        checkError += "creditno|";
                        wrongFormat = true;
            }
        }
                        checkError += checkCreditName(checkError);


                        var valCreditExpiry = document.querySelector('.formMain input[id*=txtCreditExpiry]').value.replace('/', '');
                        if (valCreditExpiry == "") {
                            document.querySelector('.formMain .creditexpiry').classList.add('validated-error');
                        document.querySelector('.formMain .creditexpiry .feedback').textContent = "กรุณากรอก";
                        checkError += "creditexpiry|";
        } else {
            if (valCreditExpiry.length == 4 && checkExpiry(valCreditExpiry)) {
                            document.querySelector('.formMain .creditexpiry').classList.remove('validated-error');
                        document.querySelector('.formMain .creditexpiry .feedback').textContent = "";
            } else {
                            document.querySelector('.formMain .creditexpiry').classList.add('validated-error');
                        document.querySelector('.formMain .creditexpiry .feedback').textContent = "กรุณากรอกให้ถูกต้อง";
                        checkError += "creditexpiry|";
                        wrongFormat = true;
            }
        }
                        var valCreditCVV = document.querySelector('.formMain input[id*=txtCreditCVV]').value;
                        if (valCreditCVV == "") {
                            document.querySelector('.formMain .creditcvv').classList.add('validated-error');
                        checkError += "creditcvv|";
        } else {
            if (valCreditCVV.length == 3) {
                            document.querySelector('.formMain .creditcvv').classList.remove('validated-error');
            } else {
                            document.querySelector('.formMain .creditcvv').classList.add('validated-error');
                        checkError += "creditcvv|";
            }
        }

                        if (checkError != "") {
            if (wrongFormat) {
                            //event 30
                            PushGTMDefault('payment_credit', 'submit-creditcard_info', 'submit_incomplete_wrong_format');
            }
                        else {
                            //event 30
                            PushGTMDefault('payment_credit', 'submit-creditcard_info', 'submit_incomplete_blank');
            }

                        scrollToTargetAdjusted('.formMain .' + checkError.split('|')[0]);
                        return false;
        }
                        else {
                            //event 30
                            PushGTMDefault('payment_credit', 'submit-creditcard_info', 'submit_complete');
                        //event 31
                        PushGTMDefault('payment_credit', 'payment_processing', document.querySelector("[id*=hdPaymentTypeText]").value);
                        new bootstrap.Modal(document.getElementById('ModalLoading')).show();
                        return true;
        }
    }

                        function checkExpiry(val) {
                            let result = false;
                        if (val.length == 4) {
                            let mon = val.substring(0, 2)
                        let dat = new Date().toLocaleDateString('en', {year: '2-digit' });
                        if (mon < 13 && val.substring(2, 4) >= dat) {
                            result = true;
            }
        }
                        return result;
    }

                        function setInputFilter(textbox, inputFilter) {
                            ["input", "keydown", "keyup"].forEach(function (event) {
                                textbox.addEventListener(event, function () {
                                    if (inputFilter(this.value)) {
                                        this.oldValue = this.value;
                                        this.oldSelectionStart = this.selectionStart;
                                        this.oldSelectionEnd = this.selectionEnd;
                                    } else if (this.hasOwnProperty("oldValue")) {
                                        this.value = this.oldValue;
                                        this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
                                    } else {
                                        this.value = "";
                                    }
                                });
                            });
    }

                        function setInputFilterInput(textbox, inputFilter) {
                            ["input", "keydown"].forEach(function (event) {
                                textbox.addEventListener(event, function () {
                                    if (inputFilter(this.value)) {
                                        this.oldValue = this.value;
                                        this.oldSelectionStart = this.selectionStart;
                                        this.oldSelectionEnd = this.selectionEnd;
                                    } else if (this.hasOwnProperty("oldValue")) {
                                        this.value = this.oldValue;
                                        this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
                                    } else {
                                        this.value = "";
                                    }
                                });
                            });
    }

                        function hintCreditOnclick() {
                            //event 28
                            PushGTMDefault('payment_credit', 'click_hint', 'cvv_cvc');
                        //event 29
                        PushGTMDefault('payment_credit', 'view', 'popup_cvv_cvc');
    }

                        function backOnclick()
                        {
                            PushGTMEventClickBack();
                        new bootstrap.Modal(document.getElementById('ModalLoading')).show();
    }

                        function clearValue(type, containner, hide = true)
                        {
                            document.querySelector(`.formMain input[id*=${type}]`).value = "";

                        if(hide)
                        {
                            document.querySelector(`.form-group.${containner} a img`).classList.add("hide");
        }
                        else{
                            document.querySelector(`.form-group.${containner} a`).classList.remove("z-index-2");
                        document.querySelector(`.form-group.${containner} button`).classList.remove("z-index-1");
                        document.querySelector(`.form-group.${containner} button`).classList.add("z-index-2");
        }
    }

                        function setShowHide(focus, containner)
                        {
        if(focus)
                        {
                            setTimeout(() => addShow(containner), 400);    
        }
                        else{
                            setTimeout(() => removeShow(containner), 400);         
        }
    }

                        function removeShow(containner)
                        {
        if(document.querySelector(`.form-group.${containner} a`))
                        {
                            document.querySelector(`.form-group.${containner} a`).classList.remove("clearfiled-show");
                        document.querySelector(`.form-group.${containner} a`).classList.add("clearfiled-hide");
        }
    }
                        function addShow(containner)
                        {
        if(document.querySelector(`.form-group.${containner} a`))
                        {
                            document.querySelector(`.form-group.${containner} a`).classList.add("clearfiled-show");
                        document.querySelector(`.form-group.${containner} a`).classList.remove("clearfiled-hide");
        }
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
