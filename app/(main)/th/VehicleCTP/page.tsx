/* eslint-disable @next/next/no-img-element */

import React from 'react';
import { Metadata } from 'next';

import { UserGroupRepository } from '@/src/infrastructure/database/mongodb/repositories/UserGroupRepository';
import { UserGroupService } from '@/src/application/services/UserGroupService';
import { UserGroupDTO } from '@/src/application/dtos/UserGroupDTO';

import VehicleListComponent from '@/cmi-layout/components/VehicleListComponent';

export const dynamic = 'force-dynamic';

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: 'เลือกประเภทรถยนต์สำหรับซื้อพ.ร.บ. รถยนต์ | ติดล้อ',
        description: 'เลือกประเภทรถยนต์สำหรับซื้อพ.ร.บ. รถยนต์ | ติดล้อ'
    };
};

async function getData() {

    // const userGroupService = new UserGroupService(new UserGroupRepository());
    
    // const data = await userGroupService.getUserGroups();
    // return data;
}

export default async function VehicleCTP() {

    return (
        <main>
            <div className="head-bar">
                <div className="container d-flex align-items-center">
                    {/* onclick="if (!window.__cfRLUnblockHandlers) return false; return backOnclick();" */}
                    <a href="/th/intro-channel" className="back-btn"><img alt="กลับ" width="36" height="36" src="/assets/icon/back.png" /></a>
                    <p id="p_lt_ctl00_pageplaceholder_p_lt_ctl00_VehicleCTP_lbHeaderBar" className="text-center mb-0 w-100 fs-18 f-bd">พ.ร.บ.</p>
                </div>
            </div>
            <div className="container pt-48">
                <div id="p_lt_ctl00_pageplaceholder_p_lt_ctl00_VehicleCTP_zoneCusNew">
                    <div className="pt-4">
                        <h1 className="mb-12 fs-18 text-black"><strong className="f-bd">เลือกประเภทรถ</strong></h1>
                    </div>
                </div>
                <VehicleListComponent />

                <input type="hidden" name="p$lt$ctl00$pageplaceholder$p$lt$ctl00$VehicleCTP$hdfSelCarGroupID" id="p_lt_ctl00_pageplaceholder_p_lt_ctl00_VehicleCTP_hdfSelCarGroupID" />
                <input type="hidden" name="p$lt$ctl00$pageplaceholder$p$lt$ctl00$VehicleCTP$hdfSelCarGroupVal" id="p_lt_ctl00_pageplaceholder_p_lt_ctl00_VehicleCTP_hdfSelCarGroupVal" />
                <input type="hidden" name="p$lt$ctl00$pageplaceholder$p$lt$ctl00$VehicleCTP$hdfSelCarType" id="p_lt_ctl00_pageplaceholder_p_lt_ctl00_VehicleCTP_hdfSelCarType" value="0" />
                <input type="hidden" name="p$lt$ctl00$pageplaceholder$p$lt$ctl00$VehicleCTP$hdfSelCarName" id="p_lt_ctl00_pageplaceholder_p_lt_ctl00_VehicleCTP_hdfSelCarName" value="0" />
                <input type="hidden" name="p$lt$ctl00$pageplaceholder$p$lt$ctl00$VehicleCTP$hdfSelCarTypeRenew" id="p_lt_ctl00_pageplaceholder_p_lt_ctl00_VehicleCTP_hdfSelCarTypeRenew" value="0" />
                <input type="hidden" name="p$lt$ctl00$pageplaceholder$p$lt$ctl00$VehicleCTP$hdChannelText" id="p_lt_ctl00_pageplaceholder_p_lt_ctl00_VehicleCTP_hdChannelText" value="CXM" />
                {/* <input type="submit" name="p$lt$ctl00$pageplaceholder$p$lt$ctl00$VehicleCTP$btnSelVehicle" value="" id="p_lt_ctl00_pageplaceholder_p_lt_ctl00_VehicleCTP_btnSelVehicle" className="d-none" /> */}
                {/* <input type="submit" name="p$lt$ctl00$pageplaceholder$p$lt$ctl00$VehicleCTP$btnSelRenew" value="" id="p_lt_ctl00_pageplaceholder_p_lt_ctl00_VehicleCTP_btnSelRenew" className="d-none" /> */}
            </div>

            {/* <script type="2d7b21b358a016e2ff53c284-text/javascript">
    const selVehicle = (element) => {
                    let carGroup = element.getAttribute('data-cargroup');
                let carGroupVal = element.getAttribute('data-cargroupval');
                let carType = element.getAttribute('data-cartype');
                let carDisplayName = element.getAttribute('data-carDisplayName');
                if (document.querySelector("[id*=showVehicle] .choice-card.active")) {document.querySelector("[id*=showVehicle] .choice-card.active").classList.remove("active"); }
                element.classList.add('active');
                document.querySelector("[id*=hdfSelCarGroupID]").value = carGroup;
                document.querySelector("[id*=hdfSelCarGroupVal]").value = carGroupVal;
                document.querySelector("[id*=hdfSelCarType]").value = carType;
                document.querySelector("[id*=hdfSelCarName]").value = carDisplayName;
                new bootstrap.Modal(document.getElementById('ModalLoading')).show();
                document.querySelector("[id*=btnSelVehicle]").click();
                PushGTMDefault('vehicle_category', 'click_vehicle', carDisplayName);
    }

                function activeVehicle(val) {
        if (document.querySelector("[id*=showVehicle] .choice-card[data-cargroup='" + val + "']")) {
                    document.querySelector("[id*=showVehicle] .choice-card[data-cargroup='" + val + "']").classList.add('active');
        }
    }
    const selRenew = (element) => {
                    // document.querySelector("[id*=hdfSelCarGroupID]").value = carGroup;
                    // document.querySelector("[id*=hdfSelCarGroupVal]").value = carGroupVal;
                    // document.querySelector("[id*=hdfSelCarType]").value = carType;
                    // document.querySelector("[id*=hdfSelCarName]").value = carDisplayName;

                    let carGroup = element.getAttribute('data-cargroup');
                let carType = element.getAttribute('data-cartype');
                let carDisplayName = element.getAttribute('data-carDisplayName');
                document.querySelector("[id*=hdfSelCarGroupID]").value = carGroup;
                document.querySelector("[id*=hdfSelCarTypeRenew]").value = carType;
                document.querySelector("[id*=hdfSelCarName]").value = carDisplayName;

                document.querySelector("[id*=hdfSelCarName]").value = 'รถยนต์';
                document.querySelector("[id*=btnSelRenew]").click();
                PushGTMDefault('vehicle_category', 'click_vehicle', 'รถยนต์');
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
                        <div className="spinner-border text-light"></div>
                        <p className="text-white text-center mt-3 mb-0">กำลังดำเนินการ<br />
                            กรุณารอซักครู่</p>
                    </div>
                </div>
            </div>
        </main>
    );
};
