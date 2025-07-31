/* eslint-disable @next/next/no-img-element */

import React from 'react';
import Image from 'next/image';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: 'ต่อ พ.ร.บ. รถยนต์ออนไลน์ (ประกันภาคบังคับ) กับติดล้อ',
        description: 'พ.ร.บ. รถยนต์ ต่อง่าย สะดวก รวดเร็วกับเว็บติดล้อ ประกันภัยภาคบังคับคุ้มครองทั้งคุณและบุคคลภายนอก ต่อพ.ร.บ. ออนไลน์รับกรมธรรม์อิเล็กทรอนิกส์ทันทีที่นี่'
    };
}

export default async function VIBError() {

    return (
        <main>
            <div className="modal confirm-modal fade" id="seviceErrorModal" aria-labelledby="seviceErrorModal" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered mx-4 mx-sm-auto">
                    <div className="modal-content rounded-4">
                        <div className="modal-body pt-20 px-20 pb-20 text-center">
                            <img className="img-fluid mb-2 mx-auto" alt="ไม่สำเร็จ" width="80" height="80" src="/cmisite/media/assets/icon-error.svg" />
                            <h5 className="text-black fs-18 f-bd mb-2">ขออภัย<br />
                                ไม่สามารถทำรายการได้ในขณะนี้</h5>
                            <p className="text-lightgrey text-center mb-20">กรุณาทำรายการใหม่ภายหลัง</p>
                            <div>
                                <a className="btn btn-primary w-100 fs-6 d-flex align-items-center justify-content-center me-2 me-2" type="button" data-bs-dismiss="modal" aria-label="Close">
                                    <strong className="f-bd">กลับสู่หน้าหลัก</strong>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container fullPage-72 pt-48 text-center position-relative d-flex justify-content-center flex-column">
                <div className="">
                    <img className="img-fluid mb-12" alt="Failed" width="80" height="80" src="/assets/icon/error-page.png" />
                    <p className="text-center f-bd fs-18 mb-12">ขออภัย<br />
                        ไม่สามารถทำรายการได้ในขณะนี้</p>
                    <p className="text-center mb-0">กรุณาทำรายการใหม่ภายหลัง</p>
                </div>
            </div>

            <div className="container pb-20">
                <input type="submit" name="p$lt$ctl00$pageplaceholder$p$lt$ctl00$VIBError$btnHomePage" value="กลับหน้าหลัก" id="p_lt_ctl00_pageplaceholder_p_lt_ctl00_VIBError_btnHomePage" className="btn btn-primary fs-6 d-flex justify-content-center align-items-center mx-auto mb-0" />
            </div>

            <input type="hidden" name="p$lt$ctl00$pageplaceholder$p$lt$ctl00$VIBError$hdUrlHomePage" id="p_lt_ctl00_pageplaceholder_p_lt_ctl00_VIBError_hdUrlHomePage" />

        </main>
    );
}
