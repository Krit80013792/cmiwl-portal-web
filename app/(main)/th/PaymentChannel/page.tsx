/* eslint-disable @next/next/no-img-element */

import React from 'react';
import { Metadata } from 'next';
import Image from 'next/image';

export const dynamic = 'force-dynamic';

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: 'เลือกช่องทางการชำระเงินค่าพ.ร.บ.รถยนต์ | ติดล้อ',
        description: 'เลือกช่องทางการชำระเงินค่าพ.ร.บ.รถยนต์ | ติดล้อ'
    };
}

export default async function PaymentChannel() {


    return (
        <main>
            <div className="head-bar">
                <div className="container d-flex align-items-center">
                    {/* onclick="if (!window.__cfRLUnblockHandlers) return false; return backOnclick();" */}
                    <input type="image" name="p$lt$ctl00$pageplaceholder$p$lt$ctl00$PaymentChannel$btnBackPage" id="btnBackPage" src="/assets/icon/back.png" alt="กลับ" style={{ height: '36px', width: '36px' }} data-cf-modified-3f933a82cef2384856879d4f-="" />
                    <p id="p_lt_ctl00_pageplaceholder_p_lt_ctl00_PaymentChannel_lbHeaderBar" className="text-center mb-0 w-100 fs-18 f-bd">พ.ร.บ.</p>
                </div>
            </div>

            <div className="head-section bg-lightgrey pt-48">
                <div className="container">
                    <div className="d-flex py-12 align-items-center">
                        <div className="percent-90">
                            <div className="progress-2 blue">
                                <span className="progress-2-left">
                                    <span className="progress-2-bar"></span>
                                </span>
                                <span className="progress-2-right">
                                    <span className="progress-2-bar"></span>
                                </span>
                                <div className="progress-2-value">90<span>%</span></div>
                            </div>
                        </div>
                        <div className="step-title-wrapper ms-12">
                            <p className="mb-0 text-grey fs-14">ขั้นตอนที่ 3/3</p>
                            <h1 className="mb-0 text-grey fs-6 f-bd">ชำระเงิน</h1>
                        </div>
                    </div>
                </div>
            </div>

            <div className="content-section fullPage-182">
                <div className="container">
                    <div className="bg-lightgrey rounded-4 d-flex justify-content-between align-items-center mt-3 mb-4 px-12 py-12 ">
                        <span className="text-grey f-bd align-center">ยอดที่ต้องชำระ</span>
                        <div>
                            <span id="p_lt_ctl00_pageplaceholder_p_lt_ctl00_PaymentChannel_lbTotal" className="mb-0 text-start f-bd fs-26">967.28 </span>
                            <span className="fs-6 f-bd">บาท</span>
                        </div>
                    </div>
                    <h1 className="fs-18 text-black f-bd mb-12">เลือกช่องทางการชำระเงิน</h1>
                    <div className="payment-options">
                        <div id="p_lt_ctl00_pageplaceholder_p_lt_ctl00_PaymentChannel_showPaymentChannel">
                            {/* onclick="if (!window.__cfRLUnblockHandlers) return false; selPayment(this);" */}
                            <div className='p-3 border-grey d-flex justify-content-between align-items-center rounded-4  mb-3 ' data-value='CCOL' data-index='1' data-text='บัตรเครดิต' data-cf-modified-3f933a82cef2384856879d4f-="">
                                <span className='f-bd'>บัตรเครดิต</span>
                                <div>
                                    <img className='me-2' alt='Visa' width='42' height='32' src='/assets/icon/visa.png' />
                                    <img className='me-2' alt='Mastercard' width='42' height='32' src='/assets/icon/mastercard.png' />
                                    <img alt='JCB' width='42' height='32' src='/assets/icon/jcb.png' />
                                </div>
                            </div>
                            {/* onclick="if (!window.__cfRLUnblockHandlers) return false; selPayment(this);" */}
                            <div className='p-3 border-grey d-flex justify-content-between align-items-center rounded-4 ' data-value='QRCS' data-index='2' data-text='คิวอาร์โค้ด' data-cf-modified-3f933a82cef2384856879d4f-="">
                                <span className='f-bd'>คิวอาร์โค้ด</span>
                                <div>
                                    <img alt='QR Code' width='42' height='32' src='/assets/icon/qr.png' />
                                </div>
                            </div>
                        </div>
                    </div>
                    <input type="hidden" name="p$lt$ctl00$pageplaceholder$p$lt$ctl00$PaymentChannel$hdfSelPaymentID" id="p_lt_ctl00_pageplaceholder_p_lt_ctl00_PaymentChannel_hdfSelPaymentID" />
                    <input type="hidden" name="p$lt$ctl00$pageplaceholder$p$lt$ctl00$PaymentChannel$hdfSelPaymentVal" id="p_lt_ctl00_pageplaceholder_p_lt_ctl00_PaymentChannel_hdfSelPaymentVal" />
                    <input type="hidden" name="p$lt$ctl00$pageplaceholder$p$lt$ctl00$PaymentChannel$hdfSelPaymentTypeText" id="p_lt_ctl00_pageplaceholder_p_lt_ctl00_PaymentChannel_hdfSelPaymentTypeText" />

                    <input type="hidden" name="p$lt$ctl00$pageplaceholder$p$lt$ctl00$PaymentChannel$hdChannelText" id="p_lt_ctl00_pageplaceholder_p_lt_ctl00_PaymentChannel_hdChannelText" value="CXM" />
                    <input type="hidden" name="p$lt$ctl00$pageplaceholder$p$lt$ctl00$PaymentChannel$hdPriceText" id="p_lt_ctl00_pageplaceholder_p_lt_ctl00_PaymentChannel_hdPriceText" value="967.28" />
                    <input type="hidden" name="p$lt$ctl00$pageplaceholder$p$lt$ctl00$PaymentChannel$hdVehicleCategoryId" id="p_lt_ctl00_pageplaceholder_p_lt_ctl00_PaymentChannel_hdVehicleCategoryId" value="6" />
                    <input type="hidden" name="p$lt$ctl00$pageplaceholder$p$lt$ctl00$PaymentChannel$hdVehicleCategoryText" id="p_lt_ctl00_pageplaceholder_p_lt_ctl00_PaymentChannel_hdVehicleCategoryText" value="ไม่เกิน 3 ตัน" />
                    <input type="hidden" name="p$lt$ctl00$pageplaceholder$p$lt$ctl00$PaymentChannel$hdVehicleNameText" id="p_lt_ctl00_pageplaceholder_p_lt_ctl00_PaymentChannel_hdVehicleNameText" value="รถกระบะ 2 ประตู" />

                    <input type="hidden" name="p$lt$ctl00$pageplaceholder$p$lt$ctl00$PaymentChannel$hdCarBrandText" id="p_lt_ctl00_pageplaceholder_p_lt_ctl00_PaymentChannel_hdCarBrandText" value="TOYOTA" />
                    <input type="hidden" name="p$lt$ctl00$pageplaceholder$p$lt$ctl00$PaymentChannel$hdCarModelText" id="p_lt_ctl00_pageplaceholder_p_lt_ctl00_PaymentChannel_hdCarModelText" value="HILUX TIGER" />
                    <input type="hidden" name="p$lt$ctl00$pageplaceholder$p$lt$ctl00$PaymentChannel$hdCarColorText" id="p_lt_ctl00_pageplaceholder_p_lt_ctl00_PaymentChannel_hdCarColorText" value="ขาว" />
                    <input type="hidden" name="p$lt$ctl00$pageplaceholder$p$lt$ctl00$PaymentChannel$hdCarIsRedText" id="p_lt_ctl00_pageplaceholder_p_lt_ctl00_PaymentChannel_hdCarIsRedText" value="NOTRED" />
                    <input type="hidden" name="p$lt$ctl00$pageplaceholder$p$lt$ctl00$PaymentChannel$hdCarRegisterProvinceText" id="p_lt_ctl00_pageplaceholder_p_lt_ctl00_PaymentChannel_hdCarRegisterProvinceText" value="กรุงเทพมหานคร" />
                    <input type="hidden" name="p$lt$ctl00$pageplaceholder$p$lt$ctl00$PaymentChannel$hdCarRegisterYearText" id="p_lt_ctl00_pageplaceholder_p_lt_ctl00_PaymentChannel_hdCarRegisterYearText" value="2024" />
                    <input type="hidden" name="p$lt$ctl00$pageplaceholder$p$lt$ctl00$PaymentChannel$hdCoverageDateStartText" id="p_lt_ctl00_pageplaceholder_p_lt_ctl00_PaymentChannel_hdCoverageDateStartText" value="2568-05-23" />
                    <input type="hidden" name="p$lt$ctl00$pageplaceholder$p$lt$ctl00$PaymentChannel$hdCoverageDateEndText" id="p_lt_ctl00_pageplaceholder_p_lt_ctl00_PaymentChannel_hdCoverageDateEndText" value="2569-05-23" />
                    <div className="text-center mt-12">
                        <img alt="Omise" width="150" height="24" src="/assets/object/omise.png" />
                    </div>
                </div>

            </div>
            <div className="btn-footer-wraper py-20 px-20 bg-white text-center">
                {/* onclick="if (!window.__cfRLUnblockHandlers) return false; pushGTMAddPaymentInfoEcommerce();" */}
                <input type="submit" name="p$lt$ctl00$pageplaceholder$p$lt$ctl00$PaymentChannel$btnSubmit" value="ดำเนินการชำระเงิน"  id="p_lt_ctl00_pageplaceholder_p_lt_ctl00_PaymentChannel_btnSubmit" className="btn btn-primary fs-6 mx-auto d-flex text-center align-items-center justify-content-center disabled" disabled data-cf-modified-3f933a82cef2384856879d4f-="" />
            </div>

            {/* <script type="3f933a82cef2384856879d4f-text/javascript">
    const selPayment = (element) => {
                            let payId = element.getAttribute('data-index');
                        let payVal = element.getAttribute('data-value');
                        let payTypeText = element.getAttribute('data-text');
                        if (document.querySelector("[id*=showPaymentChannel] .active")) {document.querySelector("[id*=showPaymentChannel] .active").classList.remove("active"); }
                        element.classList.add('active');
                        document.querySelector("[id*=hdfSelPaymentID]").value = payId;
                        document.querySelector("[id*=hdfSelPaymentVal]").value = payVal;
                        document.querySelector("[id*=hdfSelPaymentTypeText]").value = payTypeText;
                        document.querySelector('[id*=btnSubmit]').removeAttribute('disabled');
                        if (document.querySelector("[id*=btnSubmit].disabled")) {document.querySelector("[id*=btnSubmit].disabled").classList.remove("disabled"); }
    }

                        function pushGTMAddPaymentInfoEcommerce()
                        {
                            new bootstrap.Modal(document.getElementById('ModalLoading')).show();
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
                            "event": "add_payment_info",
                        "ecommerce": {
                            "currency": "THB",
                        "value": document.querySelector("[id*=hdPriceText]").value,
                        "payment_type": document.querySelector("[id*=hdfSelPaymentTypeText]").value,  // ***Required / eg. บัตรเครดิต, คิวอาร์โค้ด
                        "channel": document.querySelector("[id*=hdChannelText]").value,// ***Required / eg. ntl_app, ntl_web, heygoody
                        "items": [
                        {
                            "item_id": document.querySelector("[id*=hdVehicleCategoryId]").value, //***Required / eg. 0001
                        "item_name":  document.querySelector("[id*=hdVehicleNameText]").value+"/"+document.querySelector("[id*=hdVehicleCategoryText]").value, //***Required / eg. รถเก๋ง / ส่วนบุคคล, รถบรรทุก / ไม่เกิน 3 ตัน {{ car_type / ประเภทการใช้งาน}}
                        "item_brand": document.querySelector("[id*=hdVehicleCategoryText]").value, //eg. ส่วนบุคคล, ไม่เกิน 3 ตัน {vehicle_category}
                        "item_category": document.querySelector("[id*=hdCarBrandText]").value, //{car_brand}
                        "item_category2": document.querySelector("[id*=hdCarModelText]").value, //{car_model}
                        "item_category3": document.querySelector("[id*=hdCarColorText]").value, //{car_color}
                        "item_category4": document.querySelector("[id*=hdCarRegisterYearText]").value, //{car_year}
                        "item_category5": document.querySelector("[id*=hdCarRegisterProvinceText]").value, //{car_registered_province}
                        "item_variant": variantText, //eg. ป้ายแดง, ป้ายขาว
                        "start_coverage_date":  document.querySelector("[id*=hdCoverageDateStartText]").value,
                        "end_coverage_date":  document.querySelector("[id*=hdCoverageDateEndText]").value,
                        "price":  document.querySelector("[id*=hdPriceText]").value,// ***Required / eg. 645.21
                        "quantity": 1
                },
                        ],
        }});
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
                        <div className="spinner-border text-light" role="status"></div>
                        <p className="text-white text-center mt-3 mb-0">กำลังดำเนินการ<br />
                            กรุณารอซักครู่</p>
                    </div>
                </div>
            </div>
        </main>
    );
}
