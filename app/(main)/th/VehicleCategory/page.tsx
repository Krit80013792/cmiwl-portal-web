/* eslint-disable @next/next/no-img-element */

import React from 'react';
import { Metadata } from 'next';
import Image from 'next/image';
import VehicleCategoryComponent from '@/cmi-layout/components/VehicleCategoryComponent';

export const dynamic = 'force-dynamic';

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: 'เลือกประเภทการใช้งานรถยนต์สำหรับซื้อพ.ร.บ. รถยนต์ | ติดล้อ',
        description: 'เลือกประเภทการใช้งานรถยนต์สำหรับซื้อพ.ร.บ. รถยนต์ | ติดล้อ'
    };
}

export default async function VehicleCategory() {


    return (
        <main>
            <div className="head-bar">
                <div className="container d-flex align-items-center">
                    {/* onclick="if (!window.__cfRLUnblockHandlers) return false; return backOnclick();" */}
                    <a href="/th/VehicleCTP" className="back-btn"><img alt="กลับ" width="36" height="36" src="/assets/icon/back.png" /></a>
                    <p id="p_lt_ctl00_pageplaceholder_p_lt_ctl00_VehicleCategory_lbHeaderBar" className="text-center mb-0 w-100 fs-18 f-bd">พ.ร.บ.</p>
                </div>
            </div>

            <div className="container pt-48">
                <div className="pt-4">
                    <h1 className="mb-12 fs-18 text-black">
                        <strong id="p_lt_ctl00_pageplaceholder_p_lt_ctl00_VehicleCategory_lbTextH1" className="f-bd">เลือกประเภทการใช้งาน</strong>
                    </h1>
                    <VehicleCategoryComponent />

                    <input type="hidden" name="p$lt$ctl00$pageplaceholder$p$lt$ctl00$VehicleCategory$hdfSelRateVal" id="p_lt_ctl00_pageplaceholder_p_lt_ctl00_VehicleCategory_hdfSelRateVal" value="0" />
                    <input type="hidden" name="p$lt$ctl00$pageplaceholder$p$lt$ctl00$VehicleCategory$hdfSelCarTypeVal" id="p_lt_ctl00_pageplaceholder_p_lt_ctl00_VehicleCategory_hdfSelCarTypeVal" value="0" />
                    <input type="hidden" name="p$lt$ctl00$pageplaceholder$p$lt$ctl00$VehicleCategory$hdfSelRateText" id="p_lt_ctl00_pageplaceholder_p_lt_ctl00_VehicleCategory_hdfSelRateText" value="0" />
                    <input type="hidden" name="p$lt$ctl00$pageplaceholder$p$lt$ctl00$VehicleCategory$hdChannelText" id="p_lt_ctl00_pageplaceholder_p_lt_ctl00_VehicleCategory_hdChannelText" value="CXM" />
                    <input type="hidden" name="p$lt$ctl00$pageplaceholder$p$lt$ctl00$VehicleCategory$hdVehicleNameText" id="p_lt_ctl00_pageplaceholder_p_lt_ctl00_VehicleCategory_hdVehicleNameText" value="รถเก๋ง" />
                    <input type="hidden" name="p$lt$ctl00$pageplaceholder$p$lt$ctl00$VehicleCategory$hdVehiclePriceText" id="p_lt_ctl00_pageplaceholder_p_lt_ctl00_VehicleCategory_hdVehiclePriceText" />

                    <input type="submit" name="p$lt$ctl00$pageplaceholder$p$lt$ctl00$VehicleCategory$btnSelVehicleCate" value="" id="p_lt_ctl00_pageplaceholder_p_lt_ctl00_VehicleCategory_btnSelVehicleCate" className="d-none" />
                    <div id="p_lt_ctl00_pageplaceholder_p_lt_ctl00_VehicleCategory_imgPath" className="d-flex justify-content-center"><img alt='เลือกประเภทการใช้งาน' src='/cmisite/media/assets/regist-book-type-group.png' width='320' height='235' /></div>
                </div >
            </div >

            {/* <script type="0bc20f64cca0a699d1c58b11-text/javascript">
    const selVehicleCate = (element) => {
        let index = element.getAttribute('data-index');
        let cartype = element.getAttribute('data-cartype');
        let cartypetext = element.getAttribute('data-text');
        let carPrice = element.getAttribute('data-price');
        if (document.querySelector("[id*=showVehicleCategory] .choice-card.active")) { document.querySelector("[id*=showVehicleCategory] .choice-card.active").classList.remove("active"); }
        element.classList.add('active');
        document.querySelector("[id*=hdfSelRateVal]").value = index;
        document.querySelector("[id*=hdfSelCarTypeVal]").value = cartype;
        document.querySelector("[id*=hdfSelRateText]").value = cartypetext;
        document.querySelector("[id*=hdVehiclePriceText]").value = carPrice;

        new bootstrap.Modal(document.getElementById('ModalLoading')).show();
        dataLayer.push({
                'event': 'track_event',
                'event_category': 'vehicle_category',
                'event_action': 'click_purpose',
                'event_label': cartypetext
        });
        pushGTMSelectItemEcommerce(index, cartypetext, carPrice);
        document.querySelector("[id*=btnSelVehicleCate]").click();
    }

    function activeVehicle(val) {
        if (document.querySelector("[id*=showVehicleCategory] .choice-card[data-index='" + val + "']")) {
            document.querySelector("[id*=showVehicleCategory] .choice-card[data-index='" + val + "']").classList.add('active');
        }
    }

    function pushGTMSelectItemEcommerce(itemId, itemBrand, itemPrice) {
        let itemName = document.querySelector("[id*=hdVehicleNameText]").value.replace('<span className="d-inline-block">', '');
        itemName = itemName.replace('</span>', '');
        dataLayer.push({
            "event": "select_item",
            "ecommerce": {
                "channel": document.querySelector("[id*=hdChannelText]").value,// ***Required / eg. ntl_app, ntl_web, heygoody
                "items": [
                    {
                        "item_id": itemId, //***Required / eg. 0001
                        "item_name": itemName + "/" + itemBrand, //***Required / eg. รถเก๋ง / ส่วนบุคคล, รถบรรทุก / ไม่เกิน 3 ตัน {{car_type / ประเภทการใช้งาน}}
                        "item_brand": itemBrand, //eg. ส่วนบุคคล, ไม่เกิน 3 ตัน {vehicle_category}
                        "item_category": '', //{car_brand}
                        "item_category2": '', //{car_model}
                        "item_category3": '', //{car_color}
                        "item_category4": '', //{car_year}
                        "item_category5": '', //{car_registered_province} 
                        "item_variant": '', //eg. ป้ายแดง, ป้ายขาว
                        "start_coverage_date": '',
                        "end_coverage_date": '',
                        "price": itemPrice,// ***Required / eg. 645.21
                        "quantity": 1
                    },
                ],
            }
        });
    }

    function backOnclick() {
        PushGTMEventClickBack();
        new bootstrap.Modal(document.getElementById('ModalLoading')).show();
    }

</script> */}

            < div className="modal fade modalSpinner" id="ModalLoading" data-bs-backdrop="static" data-bs-keyboard="false" aria-hidden="true" >
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content bg-transparent border-0 justify-content-center align-items-center mx-auto">
                        <div className="spinner-border text-light" ></div>
                        <p className="text-white text-center mt-3 mb-0">กำลังดำเนินการ<br />
                            กรุณารอซักครู่</p>
                    </div>
                </div>
            </div >

        </main >
    );
}
