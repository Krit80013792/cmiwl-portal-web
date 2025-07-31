/* eslint-disable @next/next/no-img-element */

import React from 'react';
import { Metadata } from 'next';

//export const dynamic = 'force-dynamic';

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: 'ต่อ พ.ร.บ. รถยนต์ออนไลน์ (ประกันภาคบังคับ) กับติดล้อ',
        description: 'พ.ร.บ. รถยนต์ ต่อง่าย สะดวก รวดเร็วกับเว็บติดล้อ ประกันภัยภาคบังคับคุ้มครองทั้งคุณและบุคคลภายนอก ต่อพ.ร.บ. ออนไลน์รับกรมธรรม์อิเล็กทรอนิกส์ทันทีที่นี่'
    };
};

export default function Custom404() {


    return (
        <main>
            <div className="fullPage page-404">
                <div className="content-block-404">
                    <div className="text-center">
                        <img src="/cmisite/media/assets/component-illustrate-error-404.webp" alt="404" width="360" height="171" className="img-fluid mb-3" />
                    </div>
                    <div className="container text-center">
                        <h1 className="fs-18 f-bd mb-12">ขออภัย ไม่พบหน้าที่คุณต้องการ</h1>
                        <p className="fs-16 f-bd text-caption mb-0">ลองตรวจสอบลิงก์ของคุณอีกครั้ง <span className="d-inline-block">หรือกลับหน้าหลัก</span></p>
                    </div>
                </div>
                <div className="btn-wrapper-404">
                    <div className="container">
                        {/* onclick="if (!window.__cfRLUnblockHandlers) return false; return pushGTMHome404();" */}
                        <input type="submit" name="p$lt$ctl00$pageplaceholder$p$lt$ctl00$Error404$btnHome" value="กลับหน้าหลัก" id="p_lt_ctl00_pageplaceholder_p_lt_ctl00_Error404_btnHome" className="btn btn-primary fs-6 d-flex justify-content-center align-items-center mx-auto mb-4" data-cf-modified-d63c782fd6f0c51846a0ccdd-="" />
                        <input type="hidden" name="p$lt$ctl00$pageplaceholder$p$lt$ctl00$Error404$hdHome" id="p_lt_ctl00_pageplaceholder_p_lt_ctl00_Error404_hdHome" />
                    </div>
                </div>
            </div>

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
};
