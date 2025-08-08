/* eslint-disable @next/next/no-img-element */

import React from 'react';
import { Metadata } from 'next';
import { cookies } from 'next/headers';
import { getIronSession } from 'iron-session';
import { sessionOptions } from '@/src/shared/utils/session';

import { UserGroupRepository } from '@/src/infrastructure/database/mongodb/repositories/UserGroupRepository';
import { UserGroupService } from '@/src/application/services/UserGroupService';
import { UserGroupDTO } from '@/src/application/dtos/UserGroupDTO';

export const dynamic = 'force-dynamic';

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: 'ต่อ พ.ร.บ. รถยนต์ออนไลน์ (ประกันภาคบังคับ) กับติดล้อ',
        description: 'พ.ร.บ. รถยนต์ ต่อง่าย สะดวก รวดเร็วกับเว็บติดล้อ ประกันภัยภาคบังคับคุ้มครองทั้งคุณและบุคคลภายนอก ต่อพ.ร.บ. ออนไลน์รับกรมธรรม์อิเล็กทรอนิกส์ทันทีที่นี่'
    };
};

async function getData() {

    // const userGroupService = new UserGroupService(new UserGroupRepository());

    // const data = await userGroupService.getUserGroups();
    // return data;
}

export default async function IntroChannel() {

    const session = await getIronSession(cookies(), sessionOptions);
    const sessionData = (session as any)?.usrData?.data;
    const channel = sessionData?.prefill?.channel;

    let chn = 'btn btn-tidlor fs-6 d-flex justify-content-center align-items-center mx-auto continue-btn';
    if (channel) {
        const channelName = channel?.channelName as string;
        if (channelName.toLowerCase() === 'heygoody') {
            chn = 'btn btn-hey fs-6 d-flex justify-content-center align-items-center mx-auto continue-btn';
        }
    }




    return (
        <main>
            <div className="bg-white">
                <div className="bg-building pt-4">
                    <div className="container-md ">
                        <div className="text-center pt-0 sign-red">
                            <h1 className="mb-0 fs-24 text-black"><strong className="f-bd">“เตรียมเลขตัวถัง”</strong></h1>
                            <p className="f-r mb-2 fs-5">ให้พร้อมก่อน ซื้อ <strong className="f-bd">พ.ร.บ.</strong> ได้จาก</p>
                            <img src="/cmisite/media/assets/check-list-frame.png" className="text-center" alt="into-content" width="292" height="37" />
                            <img alt="ป้ายภาษี" width="320" height="229" src="/cmisite/media/assets/intro-ctp-group-circle-1.png" className="mt-4 position-relative" />
                        </div>
                    </div>
                    <div className="bg-white rounded-top-5 intro-content-zone">
                        <div className="container">
                            <div className="into-content-wrapper position-relative">
                                <div className="text-center text-intro-wrapper">
                                    <p className="text-grey f-md fs-14 mb-0">รับประกันโดย บริษัท วิริยะประกันภัย จำกัด (มหาชน)</p>
                                    {/* onclick="if (!window.__cfRLUnblockHandlers) return false; if (!window.__cfRLUnblockHandlers) return false; PushGTMDefault('intro', 'click_text', 'เงื่อนไขและรายละเอียดความคุ้มครอง')" */}
                                    <a title="เงื่อนไขและรายละเอียดความคุ้มครอง" className="fs-14 text-grey d-block" href="/th/coverage-tc" data-cf-modified-e9c163d6727633da1d0a186d-="">เงื่อนไขและรายละเอียดความคุ้มครอง</a>
                                    <div className="pb-4 pt-3">
                                        {/* onclick="if (!window.__cfRLUnblockHandlers) return false; PushGTMDefault('intro', 'click_button', 'to_select-vehicle')" */}
                                        <a className={chn} href="/th/VehicleCTP" data-cf-modified-e9c163d6727633da1d0a186d-=""><strong className="f-bd">ดำเนินการต่อ</strong><img className="img-fluid ms-6" alt="ดำเนินการต่อ" src="/assets/icon/next-white.png" width="20" height="20" /></a>
                                    </div>
                                </div>
                            </div>
                            <div className="text-sm-center license-linkBoxWrapper d-flex justify-content-sm-center">
                                <div className="license-linkBox pb-4">
                                    {/* onclick="if (!window.__cfRLUnblockHandlers) return false; if (!window.__cfRLUnblockHandlers) return false; if (!window.__cfRLUnblockHandlers) return false; PushGTMDefault('intro', 'click_text', 'เลขที่ใบอนุญาตประกันวินาศภัย')" */}
                                    <a title="เลขที่ใบอนุญาตประกันวินาศภัย" className="fs-12 text-placeholder d-block text-decoration-none" href="/th/oic-certificate" data-cf-modified-e9c163d6727633da1d0a186d-="">เลขที่ใบอนุญาตประกันวินาศภัย ว00015/2556</a>
                                    {/* onclick="if (!window.__cfRLUnblockHandlers) return false; if (!window.__cfRLUnblockHandlers) return false; if (!window.__cfRLUnblockHandlers) return false; PushGTMDefault('intro', 'click_text', 'เลขที่ใบอนุญาตเสนอขายประกันภัยผ่านช่องทางอิเล็กทรอนิกส์ อลว 015521000/2563')" */}
                                    <a title="เลขที่ใบอนุญาตเสนอขายประกันภัยผ่านช่องทาง" className="fs-12 text-placeholder d-block text-decoration-none" href="/th/oic-certificate-electronic" data-cf-modified-e9c163d6727633da1d0a186d-="">เลขที่ใบอนุญาตเสนอขายประกันภัยผ่านช่องทางอิเล็กทรอนิกส์ <span className="d-inline-block">อลว 015521000/2563</span></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};
