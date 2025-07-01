/* eslint-disable @next/next/no-img-element */

import React from 'react';
import { Metadata } from 'next';

export const dynamic = 'force-dynamic';

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: 'เงื่อนไขและรายละเอียดความคุ้มครองพ.ร.บ.รถยนต์ | ติดล้อ',
        description: 'อ่านเงื่อนไขและรายละเอียดความคุ้มครองพ.ร.บ.รถยนต์ จากวิริยะประกันภัย ทั้งฉบับย่อและฉบับเต็มได้ที่นี่ ซื้อออนไลน์กับเว็บติดล้อทั้งง่ายและรวดเร็ว'
    };
};

export default async function CoverageTc() {


    return (
        <main>
            <div className="head-bar">
                <div className="container d-flex align-items-center">
                    {/* onclick="if (!window.__cfRLUnblockHandlers) return false; return backOnclick();" */}
                    <a href="/th/intro-channel" className="back-btn"><img alt="กลับ" width="36" height="36" src="/assets/icon/back.png" /></a>
                    <p id="p_lt_ctl00_pageplaceholder_p_lt_ctl00_CoverageTC_lbHeaderBar" className="text-center mb-0 w-100 fs-18 f-bd">พ.ร.บ.</p>
                </div>
            </div>
            <div className="container pt-48 pb-4">
                <h1 className="fs-18 text-black mb-12 pt-4"><strong className="f-bd">
                    เงื่อนไขและรายละเอียดความคุ้มครอง
                </strong></h1>
                <div className="tc-table">
                    <table className="table table-bordered text-grey mb-12">
                        <thead>
                            <tr>
                                <th scope="col" colSpan={2} className="text-center text-grey bg-lightgrey">
                                    ความคุ้มครองและวงเงินคุ้มครอง
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row" colSpan={2}>
                                    1. คุ้มครองค่าเสียหายเบื้องต้น ได้รับเลยไม่รอ
                                    การพิสูจน์ถูก/ผิด
                                </th>
                            </tr>
                            <tr>
                                <th scope="row" className="f-r">1.1 ค่ารักษาพยาบาล (ตามจริง)</th>
                                <td><strong className="f-bd">30,000 บาท</strong></td>
                            </tr>
                            <tr>
                                <th scope="row" className="f-r">
                                    1.2 การเสียชีวิต สูญเสีย อวัยวะ หรือทุพพลภาพถาวร สิ้นเชิง
                                </th>
                                <td><strong className="f-bd">35,000 บาท</strong></td>
                            </tr>
                            <tr>
                                <th scope="row" colSpan={2}>
                                    2. คุ้มครองค่าเสียหายที่เกินกว่าค่าเสียหาย เบื้องต้น
                                    จะได้รับหลังจากพิสูจน์แล้วว่าไม่ได้
                                    เป็นผู้ที่ต้องรับผิดตามกฎหมาย
                                </th>
                            </tr>
                            <tr>
                                <th scope="row" className="f-r">2.1 ค่ารักษาพยาบาล (ตามจริง)</th>
                                <td><strong className="f-bd">80,000 บาท</strong></td>
                            </tr>
                            <tr>
                                <th scope="row" className="f-r">
                                    2.2 การเสียชีวิต หรือทุพพล ภาพถาวรสิ้นเชิง
                                </th>
                                <td><strong className="f-bd">500,000 บาท</strong></td>
                            </tr>
                            <tr>
                                <th scope="row" className="f-r">2.3 การสูญเสียอวัยวะ</th>
                                <td><strong className="f-bd">200,000- 500,000 บาท</strong></td>
                            </tr>
                            <tr>
                                <th scope="row" className="f-r">
                                    2.4 ค่าชดเชยรายวัน (จ่ายตาม จำนวนวันที่เข้ารักษาตัวในฐานะ
                                    ผู้ป่วยใน)
                                </th>
                                <td><strong className="f-bd">200 บาท/วัน (สูงสุดไม่เกิน 20วัน)</strong></td>
                            </tr>
                        </tbody>
                    </table>
                    <p className="mb-4 text-grey">
                        * จำนวนเงินความคุ้มครองสูงสุดรวมกัน ไม่เกิน 504,000 บาทต่อคน<br />
                        * วงเงินความรับผิด สำหรับรถยนต์นั่ง ไม่เกิน 7 ที่นั่งรวมผู้ขับขี่
                        ไม่เกิน 5,000,000 บาท/ครั้ง<br />
                        * วงเงินความรับผิด สำหรับรถยนต์นั่ง เกิน 7 ที่นั่งรวมผู้ขับขี่
                        ไม่เกิน 10,000,000 บาท/ครั้ง<br />
                    </p>
                    <h2 className="fs-5 text-black mb-12"><strong className="f-bd">เงื่อนไขการรับประกันเบื้องต้น</strong></h2>
                    <ol className="mb-4 text-grey ps-20">
                        <li>กรมธรรม์ประกันภัย พ.ร.บ รับประกันโดย บริษัท วิริยะประกันภัย จำกัด (มหาชน)

                        </li>
                        <li>สรุปเงื่อนไขทั่วไป ผลประโยชน์ตามกรมธรรม์ประกันภัย
                            <ol className="ps-0 list-unstyled">
                                <li className="fsanb">2.1 ผู้ขับขี่ที่กระทำละเมิด (ฝ่ายผิด) จะได้รับความคุ้มครอง ค่าเสียหายเบื้องต้นเท่านั้น</li>
                                <li className="fsanmed">2.2 ผู้ประสบภัย หมายถึง ผู้ขับขี่ที่ถูกละเมิด ผู้โดยสาร และ/หรือบุคคลภายนอก</li>
                                <li className="fsanreg">2.3 จำนวนเงินค่าเสียหายเบื้องต้นนี้ ถือเป็นส่วนหนึ่งของจำนวนเงินที่คุ้มครองผู้ประสบภัย (ตามหน้าตารางกรมธรรม์)</li>
                                <li>2.4 จ่ายค่าเสียหายเบื้องต้น (จ่ายโดยไม่รอผลพิสูจน์ความรับผิด) เมื่อเกิดอุบัติเหตุจากรถ และรถคันที่เกิดอุบัติเหตุมี ประกันภัย พ.ร.บ. บริษัทประกันภัยจะจ่ายค่าสินไหมทดแทน โดยจ่ายเป็นค่าเสียหายเบื้องต้น ภายใน 7 วัน</li>
                            </ol>
                        </li>
                        <li>บริษัท เงินติดล้อ จำกัด (มหาชน) เป็นเพียงนายหน้าประกันวินาศภัยเท่านั้น และผลิตภัณฑ์ประกันภัยคุ้มครองภายใต้เงื่อนไขของบริษัทประกันภัย เลขที่ใบอนุญาตนายหน้า ประกันวินาศภัย ว00015/2556</li>
                        <li>ผู้ซื้อควรทำความเข้าใจในรายละเอียดความคุ้มครองและเงื่อนไขก่อนการตัดสินใจทำประกันภัยทุกครั้ง</li>
                        <li>ติดต่อ Call Center ที่เบอร์ 088-088-0880 เพื่อสอบถามการซื้อพ.ร.บ. รถยนต์ รวมถึงการใช้งานแอปพลิเคชันในการต่อพ.ร.บ.ได้ตลอด 24 ชั่วโมง หรือสามารถติดต่อสาขาเงินติดล้อได้ทุกสาขาใกล้บ้าน และสามารถพูดคุยกับเรา ผ่าน Chat ได้ที่ Facebook เงินติดล้อ</li>
                    </ol>
                </div>
                {/* onclick="if (!window.__cfRLUnblockHandlers) return false; PushGTMDefault('intro', 'click_more-info', 'ctp_coverage');" */}
                <a className="btn btn-primary fs-6 d-flex justify-content-center align-items-center mx-auto position-relative" href="/th/protection-condition" data-cf-modified-2dad33c0b5b5e94e7e7acedf-=""><img className="img-fluid me-6" alt="รายละเอียดฉบับเต็ม" src="/assets/icon/document.png" width="20" height="20" /><strong>รายละเอียดฉบับเต็ม</strong></a>
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
