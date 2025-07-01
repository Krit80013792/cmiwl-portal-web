/* eslint-disable @next/next/no-img-element */

import React from 'react';
import { Metadata } from 'next';

export const dynamic = 'force-dynamic';

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: 'เงื่อนไขและรายละเอียดความคุ้มครองพ.ร.บ.รถยนต์ ฉบับเต็ม | ติดล้อ',
        description: 'ศึกษาเงื่อนไขและรายละเอียดความคุ้มครองพ.ร.บ.รถยนต์ จากวิริยะประกันภัย ฉบับเต็มได้ที่นี่ เงินติดล้อช่วยให้การต่อพ.ร.บ.ออนไลน์เป็นเรื่องง่าย'
    };
};

export default async function ProtectionCondition() {


    return (
        <main>
            <div className="head-bar">
                <div className="container px-0 d-flex align-items-center">
                    <a href="/th/coverage-tc" className="back-btn"><img alt="กลับ" width="36" height="36" src="/assets/icon/back.png" /></a>
                    <p id="" className="text-center mb-0 w-100 fs-18 f-bd">พ.ร.บ.</p>
                </div>
            </div><div className="container px-0 pt-48">
                <img src="/cmisite/media/assets/pdf/compulsory-motor-insurance-aug-1.jpg" title="เงื่อนไขและความคุ้มครองกรมธรรม์ประกันภัยคุ้มครองผู้ประสบภัยจากรถ" alt="เงื่อนไขและความคุ้มครองกรมธรรม์ประกันภัยคุ้มครองผู้ประสบภัยจากรถ" className="img-fluid" />
                <img src="/cmisite/media/assets/pdf/compulsory-motor-insurance-aug-2.jpg" title="เงื่อนไขและความคุ้มครองกรมธรรม์ประกันภัยคุ้มครองผู้ประสบภัยจากรถ" alt="เงื่อนไขและความคุ้มครองกรมธรรม์ประกันภัยคุ้มครองผู้ประสบภัยจากรถ" className="img-fluid" />
                <img src="/cmisite/media/assets/pdf/compulsory-motor-insurance-aug-3.jpg" title="เงื่อนไขและความคุ้มครองกรมธรรม์ประกันภัยคุ้มครองผู้ประสบภัยจากรถ" alt="เงื่อนไขและความคุ้มครองกรมธรรม์ประกันภัยคุ้มครองผู้ประสบภัยจากรถ" className="img-fluid" />
                <img src="/cmisite/media/assets/pdf/compulsory-motor-insurance-aug-4.jpg" title="เงื่อนไขและความคุ้มครองกรมธรรม์ประกันภัยคุ้มครองผู้ประสบภัยจากรถ" alt="เงื่อนไขและความคุ้มครองกรมธรรม์ประกันภัยคุ้มครองผู้ประสบภัยจากรถ" className="img-fluid" />
                <img src="/cmisite/media/assets/pdf/compulsory-motor-insurance-aug-5.jpg" title="เงื่อนไขและความคุ้มครองกรมธรรม์ประกันภัยคุ้มครองผู้ประสบภัยจากรถ" alt="เงื่อนไขและความคุ้มครองกรมธรรม์ประกันภัยคุ้มครองผู้ประสบภัยจากรถ" className="img-fluid" />
                <img src="/cmisite/media/assets/pdf/compulsory-motor-insurance-aug-6.jpg" title="เงื่อนไขและความคุ้มครองกรมธรรม์ประกันภัยคุ้มครองผู้ประสบภัยจากรถ" alt="เงื่อนไขและความคุ้มครองกรมธรรม์ประกันภัยคุ้มครองผู้ประสบภัยจากรถ" className="img-fluid" />
                <img src="/cmisite/media/assets/pdf/compulsory-motor-insurance-aug-7.jpg" title="เงื่อนไขและความคุ้มครองกรมธรรม์ประกันภัยคุ้มครองผู้ประสบภัยจากรถ" alt="เงื่อนไขและความคุ้มครองกรมธรรม์ประกันภัยคุ้มครองผู้ประสบภัยจากรถ" className="img-fluid" />
                <img src="/cmisite/media/assets/pdf/compulsory-motor-insurance-aug-8.jpg" title="เงื่อนไขและความคุ้มครองกรมธรรม์ประกันภัยคุ้มครองผู้ประสบภัยจากรถ" alt="เงื่อนไขและความคุ้มครองกรมธรรม์ประกันภัยคุ้มครองผู้ประสบภัยจากรถ" className="img-fluid" />
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
