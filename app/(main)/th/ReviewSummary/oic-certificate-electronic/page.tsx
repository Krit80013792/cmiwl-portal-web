
import React from 'react';
import { Metadata } from 'next';

export const dynamic = 'force-dynamic';

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: 'เลขที่ใบอนุญาตเสนอขายประกันภัยผ่านช่องทางอิเล็กทรอนิกส์ | ติดล้อ',
        description: 'เลขที่ใบอนุญาตเสนอขายประกันภัยผ่านช่องทางอิเล็กทรอนิกส์ | ติดล้อ'
    };
};

export default async function OicCertificate() {


    return (
        <main>
            <div className="head-bar">
                <div className="container d-flex align-items-center">
                    {/* onclick="if (!window.__cfRLUnblockHandlers) return false; return backOnclick();" */}
                    <a href="/th/review-summary" className="back-btn"><img alt="กลับ" width="36" height="36" src="/assets/icon/back.png" /></a>
                    <p id="p_lt_ctl00_pageplaceholder_p_lt_ctl00_OicCertificate_lbHeaderBar" className="text-center mb-0 w-100 fs-18 f-bd">พ.ร.บ.</p>
                </div>
            </div>

            <div className="container pt-48">
                <div className="pt-4">
                    <h1 className="mb-0 fs-18 text-black" style={{ textAlign: 'center' }}><strong className="f-bd">เลขที่ใบอนุญาตเสนอขายประกันภัยผ่านช่องทางอิเล็กทรอนิกส์</strong></h1>
                </div>
            </div>
            <div className="container px-0">
                <div className="mt-12">
                    <img className="img-fluid certificate-img" alt="เลขที่ใบอนุญาตเสนอขายประกันภัยผ่านช่องทางอิเล็กทรอนิกส์" src="/cmisite/media/assets/broker-license-online.jpg" />
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
