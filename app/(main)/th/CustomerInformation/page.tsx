/* eslint-disable @next/next/no-img-element */

import React from 'react';
import { Metadata } from 'next';
import Image from 'next/image';

export const dynamic = 'force-dynamic';

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: 'ข้อมูลผู้เอาประกันพ.ร.บ.รถยนต์ | ติดล้อ',
        description: 'ข้อมูลผู้เอาประกันพ.ร.บ.รถยนต์ | ติดล้อ'
    };
}

export default async function CustomerInformation() {


    return (
        <main>


            {/* <!--------- dropdown select2 --------->
            <!-- <link href="/CMSPages/GetResource.ashx?stylesheetname=custom-select2&=v1.3" type="text/css" rel="stylesheet" /> -->
            <link href="/custom/plugin/select2/css/select2.min.css" rel="stylesheet">
                <script src="/custom/plugin/jquery/jquery-3.4.1.min.js" type="591f8b295234a2d03ed50c79-text/javascript"></script>
                <script src="/custom/plugin/select2/js/select2.min.js" type="591f8b295234a2d03ed50c79-text/javascript"></script>
                <!--------- dropdown select2 ---------> */}

            <div className="head-bar">
                <div className="container d-flex align-items-center">
                    {/* onclick="if (!window.__cfRLUnblockHandlers) return false; return backOnclick();" */}
                    <a href="/th/CarInformation" className="back-btn"><img alt="กลับ" width="36" height="36" src="/assets/icon/back.png" /></a>
                    <p id="p_lt_ctl00_pageplaceholder_p_lt_ctl00_CustomerInformation_lbHeaderBar" className="text-center mb-0 w-100 fs-18 f-bd">พ.ร.บ.</p>
                </div>
            </div>

            <div className="head-section bg-lightgrey pt-48">
                <div className="container">
                    <div className="d-flex py-12 align-items-center">
                        <div className="percent-50">
                            <div className="progress-2 yellow">
                                <span className="progress-2-left">
                                    <span className="progress-2-bar"></span>
                                </span>
                                <span className="progress-2-right">
                                    <span className="progress-2-bar"></span>
                                </span>
                                <div className="progress-2-value">50<span>%</span></div>
                            </div>
                        </div>
                        <div className="step-title-wrapper ms-12">
                            <p className="mb-0 text-grey fs-14">ขั้นตอนที่ 1/3</p>
                            <h1 className="mb-0 text-grey fs-6 f-bd">กรอกข้อมูล</h1>
                        </div>
                    </div>
                </div>
            </div>

            <div className="content-section fullPage-150">
                <div className="container">
                    <div className="d-flex justify-content-between pt-3 pb-12">
                        <h2 className="mb-0 text-black fs-18">
                            <strong>ข้อมูลผู้เอาประกัน (เจ้าของรถ)</strong>
                        </h2>
                    </div>

                    <div className="formMain">
                        <div className="form-group mb-12 prefix">
                            <select name="p$lt$ctl00$pageplaceholder$p$lt$ctl00$CustomerInformation$ddlPrefix" id="p_lt_ctl00_pageplaceholder_p_lt_ctl00_CustomerInformation_ddlPrefix" className="form-control">
                                <option  value="">เลือกคำนำหน้า</option>
                                <option value="1">นาย</option>
                                <option value="2">นาง</option>
                                <option value="3">นางสาว</option>

                            </select>
                            <label className="form-label">คำนำหน้า</label>
                            <div className="feedback">กรุณาเลือก</div>
                        </div>

                        <div className="form-group mb-12 name">
                            {/* onkeydown="if (!window.__cfRLUnblockHandlers) return false; return (event.keyCode!=13);" */}
                            <input name="p$lt$ctl00$pageplaceholder$p$lt$ctl00$CustomerInformation$txtName" type="text" maxLength={50} id="p_lt_ctl00_pageplaceholder_p_lt_ctl00_CustomerInformation_txtName" className="form-control onlyThai" placeholder="กรอกชื่อตามบัตรประชาชน" data-cf-modified-591f8b295234a2d03ed50c79-="" />
                            {/* onclick="if (!window.__cfRLUnblockHandlers) return false; clearValue('txtName', 'name'); checkTxtName();" */}
                            <a className="d-flex align-items-center justify-content-center clearFeild-btn-wrapper clearfiled-hide" data-cf-modified-591f8b295234a2d03ed50c79-="">
                                <img className="img-fluid mb-2 mx-auto position-absolute clearFeild-btn hide" alt="test" width="24" height="24" src="/cmisite/media/assets/icon-clear.png" />
                            </a>
                            <label className="form-label">ชื่อ</label>
                            <div className="feedback">กรุณากรอก</div>

                        </div>

                        <div className="form-group mb-12 surname">
                            {/* onkeydown="if (!window.__cfRLUnblockHandlers) return false; return (event.keyCode!=13);" */}
                            <input name="p$lt$ctl00$pageplaceholder$p$lt$ctl00$CustomerInformation$txtSurName" type="text" maxLength={50} id="p_lt_ctl00_pageplaceholder_p_lt_ctl00_CustomerInformation_txtSurName" className="form-control onlyThai" placeholder="กรอกนามสกุลตามบัตรประชาชน" data-cf-modified-591f8b295234a2d03ed50c79-="" />
                            {/* onclick="if (!window.__cfRLUnblockHandlers) return false; clearValue('txtSurName', 'surname'); checkTxtSurName();" */}
                            <a className="d-flex align-items-center justify-content-center clearFeild-btn-wrapper clearfiled-hide" data-cf-modified-591f8b295234a2d03ed50c79-="">
                                <img className="img-fluid mb-2 mx-auto position-absolute clearFeild-btn hide" alt="test" width="24" height="24" src="/cmisite/media/assets/icon-clear.png" />
                            </a>
                            <label className="form-label">นามสกุล</label>
                            <div className="feedback">กรุณากรอก</div>
                        </div>

                        <div className="form-group mb-12 citizen">
                            {/* onkeydown="if (!window.__cfRLUnblockHandlers) return false; return (event.keyCode!=13);" */}
                            <input name="p$lt$ctl00$pageplaceholder$p$lt$ctl00$CustomerInformation$txtCitizen" type="text" maxLength={17} id="p_lt_ctl00_pageplaceholder_p_lt_ctl00_CustomerInformation_txtCitizen" className="form-control chkCiti" placeholder="กรอกรหัสบัตรประชาชน 13 หลัก" data-cf-modified-591f8b295234a2d03ed50c79-="" />
                            {/* onclick="if (!window.__cfRLUnblockHandlers) return false; clearValue('txtCitizen', 'citizen'); checkTxtCitizen();" */}
                            <a className="d-flex align-items-center justify-content-center clearFeild-btn-wrapper clearfiled-hide" data-cf-modified-591f8b295234a2d03ed50c79-="">
                                <img className="img-fluid mb-2 mx-auto position-absolute clearFeild-btn hide" alt="test" width="24" height="24" src="/cmisite/media/assets/icon-clear.png" />
                            </a>
                            <label className="form-label">เลขบัตรประชาชน</label>
                            <div className="feedback">กรุณากรอก</div>
                        </div>

                        <span className="fs-14 f-bd d-block mb-2 birtday-textFeild">วันเกิด</span>
                        <div className="form-group mb-12 form-birthday">
                            <div>
                                <div className="d-flex">
                                    <div className="w-100 position-relative year">
                                        <select name="p$lt$ctl00$pageplaceholder$p$lt$ctl00$CustomerInformation$ddlYearBirth" id="p_lt_ctl00_pageplaceholder_p_lt_ctl00_CustomerInformation_ddlYearBirth" className="form-control">
                                            <option value="">เลือกปี</option>

                                        </select>
                                        <label className="form-label">ปี</label>
                                        <input type="hidden" name="p$lt$ctl00$pageplaceholder$p$lt$ctl00$CustomerInformation$birthDateVal" id="p_lt_ctl00_pageplaceholder_p_lt_ctl00_CustomerInformation_birthDateVal" />
                                    </div>
                                    <div className="ms-2 me-2 w-100 position-relative month">
                                        <select name="p$lt$ctl00$pageplaceholder$p$lt$ctl00$CustomerInformation$ddlMonthBirth" id="p_lt_ctl00_pageplaceholder_p_lt_ctl00_CustomerInformation_ddlMonthBirth" className="form-control">

                                        </select>
                                        <label className="form-label">เดือน</label>
                                    </div>
                                    <div className="ms-0 w-100 position-relative day">
                                        <select name="p$lt$ctl00$pageplaceholder$p$lt$ctl00$CustomerInformation$ddlDayBirth" id="p_lt_ctl00_pageplaceholder_p_lt_ctl00_CustomerInformation_ddlDayBirth" className="form-control">

                                        </select>
                                        <label className="form-label">วัน</label>
                                    </div>

                                </div>
                                <div className="feedback">กรุณาเลือก</div>
                            </div>
                        </div>

                        <div className="form-group mb-12 phone">
                            {/* onkeydown="if (!window.__cfRLUnblockHandlers) return false; return (event.keyCode!=13);" */}
                            <input name="p$lt$ctl00$pageplaceholder$p$lt$ctl00$CustomerInformation$txtPhone" type="text" maxLength={12} id="p_lt_ctl00_pageplaceholder_p_lt_ctl00_CustomerInformation_txtPhone" className="form-control chkMobile" placeholder="กรอกเบอร์โทรศัพท์" data-cf-modified-591f8b295234a2d03ed50c79-="" />
                            {/* onclick="if (!window.__cfRLUnblockHandlers) return false; clearValue('txtPhone', 'phone'); checkTxtPhone();" */}
                            <a className="d-flex align-items-center justify-content-center clearFeild-btn-wrapper clearfiled-hide" data-cf-modified-591f8b295234a2d03ed50c79-="">
                                <img className="img-fluid mb-2 mx-auto position-absolute clearFeild-btn hide" alt="test" width="24" height="24" src="/cmisite/media/assets/icon-clear.png" />
                            </a>
                            <label className="form-label">เบอร์โทรศัพท์ </label>
                            <div className="feedback">กรุณากรอก</div>
                        </div>

                        <div className="form-group mb-12 email">
                            {/* onkeydown="if (!window.__cfRLUnblockHandlers) return false; return (event.keyCode!=13);" */}
                            <input name="p$lt$ctl00$pageplaceholder$p$lt$ctl00$CustomerInformation$txtEmail" type="text" maxLength={50} id="p_lt_ctl00_pageplaceholder_p_lt_ctl00_CustomerInformation_txtEmail" className="form-control chkEmail" placeholder="กรอกอีเมล" data-cf-modified-591f8b295234a2d03ed50c79-="" />
                            {/* onclick="if (!window.__cfRLUnblockHandlers) return false; clearValue('txtEmail', 'email'); checkTxtEmail();" */}
                            <a className="d-flex align-items-center justify-content-center clearFeild-btn-wrapper clearfiled-hide" data-cf-modified-591f8b295234a2d03ed50c79-="">
                                <img className="img-fluid mb-2 mx-auto position-absolute clearFeild-btn hide" alt="test" width="24" height="24" src="/cmisite/media/assets/icon-clear.png" />
                            </a>
                            <label className="form-label">อีเมล <span id="p_lt_ctl00_pageplaceholder_p_lt_ctl00_CustomerInformation_lbPolicyEmail">(ใช้สำหรับรับกรมธรรม์อิเล็กทรอนิกส์)</span></label>
                            <div className="feedback">กรุณากรอก</div>
                        </div>
                        <h2 className="mb-12 mt-4 text-black fs-18">
                            <strong>ที่อยู่ปัจจุบัน</strong>
                        </h2>
                        <div className="d-flex">
                            <div className="form-group mb-12 me-2 w-100 addno">
                                {/* onkeydown="if (!window.__cfRLUnblockHandlers) return false; return (event.keyCode!=13);" */}
                                <input name="p$lt$ctl00$pageplaceholder$p$lt$ctl00$CustomerInformation$txtAddNo" type="text" maxLength={15} id="p_lt_ctl00_pageplaceholder_p_lt_ctl00_CustomerInformation_txtAddNo" className="form-control " placeholder="กรอกบ้านเลขที่" data-cf-modified-591f8b295234a2d03ed50c79-="" />
                                {/* onclick="if (!window.__cfRLUnblockHandlers) return false; clearValue('txtAddNo', 'addno'); checkTxtAddNo();" */}
                                <a className="d-flex align-items-center justify-content-center clearFeild-btn-wrapper clearfiled-hide" data-cf-modified-591f8b295234a2d03ed50c79-="">
                                    <img className="img-fluid mb-2 mx-auto position-absolute clearFeild-btn hide" alt="test" width="24" height="24" src="/cmisite/media/assets/icon-clear.png" />
                                </a>
                                <label className="form-label">บ้านเลขที่</label>
                                <div className="feedback">กรุณากรอก</div>
                            </div>
                            <div className="form-group mb-12 ms-2 w-100 addmoo">
                                {/* onkeydown="if (!window.__cfRLUnblockHandlers) return false; return (event.keyCode!=13);" */}
                                <input name="p$lt$ctl00$pageplaceholder$p$lt$ctl00$CustomerInformation$txtAddMoo" type="text" maxLength={5} id="p_lt_ctl00_pageplaceholder_p_lt_ctl00_CustomerInformation_txtAddMoo" className="form-control " placeholder="กรอกหมู่ที่" data-cf-modified-591f8b295234a2d03ed50c79-="" />
                                {/* onclick="if (!window.__cfRLUnblockHandlers) return false; clearValue('txtAddMoo', 'addmoo');" */}
                                <a className="d-flex align-items-center justify-content-center clearFeild-btn-wrapper clearfiled-hide" data-cf-modified-591f8b295234a2d03ed50c79-="">
                                    <img className="img-fluid mb-2 mx-auto position-absolute clearFeild-btn hide" alt="test" width="24" height="24" src="/cmisite/media/assets/icon-clear.png" />
                                </a>
                                <label className="form-label">หมู่ที่</label>
                            </div>
                        </div>
                        <div className="form-group mb-12 addBuild">
                            {/* onkeydown="if (!window.__cfRLUnblockHandlers) return false; return (event.keyCode!=13);" */}
                            <input name="p$lt$ctl00$pageplaceholder$p$lt$ctl00$CustomerInformation$txtAddBuild" type="text" maxLength={50} id="p_lt_ctl00_pageplaceholder_p_lt_ctl00_CustomerInformation_txtAddBuild" className="form-control " placeholder="กรอกหมู่บ้าน/อาคาร" data-cf-modified-591f8b295234a2d03ed50c79-="" />
                            {/* onclick="if (!window.__cfRLUnblockHandlers) return false; clearValue('txtAddBuild', 'addBuild');" */}
                            <a className="d-flex align-items-center justify-content-center clearFeild-btn-wrapper clearfiled-hide" data-cf-modified-591f8b295234a2d03ed50c79-="">
                                <img className="img-fluid mb-2 mx-auto position-absolute clearFeild-btn hide" alt="test" width="24" height="24" src="/cmisite/media/assets/icon-clear.png" />
                            </a>
                            <label className="form-label">ชื่อหมู่บ้าน/อาคาร</label>
                        </div>
                        <div className="d-flex">
                            <div className="form-group mb-12 me-2 w-100 addSoi">
                                {/* onkeydown="if (!window.__cfRLUnblockHandlers) return false; return (event.keyCode!=13);" */}
                                <input name="p$lt$ctl00$pageplaceholder$p$lt$ctl00$CustomerInformation$txtAddSoi" type="text" maxLength={25} id="p_lt_ctl00_pageplaceholder_p_lt_ctl00_CustomerInformation_txtAddSoi" className="form-control " placeholder="กรอกซอย/ตรอก" data-cf-modified-591f8b295234a2d03ed50c79-="" />
                                {/* onclick="if (!window.__cfRLUnblockHandlers) return false; clearValue('txtAddSoi', 'addSoi');" */}
                                <a className="d-flex align-items-center justify-content-center clearFeild-btn-wrapper clearfiled-hide" data-cf-modified-591f8b295234a2d03ed50c79-="">
                                    <img className="img-fluid mb-2 mx-auto position-absolute clearFeild-btn hide" alt="test" width="24" height="24" src="/cmisite/media/assets/icon-clear.png" />
                                </a>
                                <label className="form-label">ซอย/ตรอก</label>
                            </div>
                            <div className="form-group mb-12 ms-2 w-100 addRoad">
                                {/* onkeydown="if (!window.__cfRLUnblockHandlers) return false; return (event.keyCode!=13);" */}
                                <input name="p$lt$ctl00$pageplaceholder$p$lt$ctl00$CustomerInformation$txtAddRoad" type="text" maxLength={25} id="p_lt_ctl00_pageplaceholder_p_lt_ctl00_CustomerInformation_txtAddRoad" className="form-control " placeholder="กรอกถนน" data-cf-modified-591f8b295234a2d03ed50c79-="" />
                                {/* onclick="if (!window.__cfRLUnblockHandlers) return false; clearValue('txtAddRoad', 'addRoad');" */}
                                <a className="d-flex align-items-center justify-content-center clearFeild-btn-wrapper clearfiled-hide" data-cf-modified-591f8b295234a2d03ed50c79-="">
                                    <img className="img-fluid mb-2 mx-auto position-absolute clearFeild-btn hide" alt="test" width="24" height="24" src="/cmisite/media/assets/icon-clear.png" />
                                </a>
                                <label className="form-label">ถนน</label>
                            </div>
                        </div>

                        <div id="p_lt_ctl00_pageplaceholder_p_lt_ctl00_CustomerInformation_panelSelect">

                            <div className="d-flex">
                                <div className="form-group mb-12 me-2 w-100 zipcode">
                                    {/* onkeydown="if (!window.__cfRLUnblockHandlers) return false; return (event.keyCode!=13);" onpaste="if (!window.__cfRLUnblockHandlers) return false; return false;" ondrop="if (!window.__cfRLUnblockHandlers) return false; return false;" */}
                                    <input name="p$lt$ctl00$pageplaceholder$p$lt$ctl00$CustomerInformation$txtZipCode" type="text" maxLength={5} id="p_lt_ctl00_pageplaceholder_p_lt_ctl00_CustomerInformation_txtZipCode" className="form-control onlyNum chkZipCode" placeholder="กรอกรหัสไปรษณีย์" data-cf-modified-591f8b295234a2d03ed50c79-="" />
                                    {/* onclick="if (!window.__cfRLUnblockHandlers) return false; clearValue('txtZipCode', 'zipcode'); checkTxtZipCode();" */}
                                    <a className="d-flex align-items-center justify-content-center clearFeild-btn-wrapper clearfiled-hide" data-cf-modified-591f8b295234a2d03ed50c79-="">
                                        <img className="img-fluid mb-2 mx-auto position-absolute clearFeild-btn hide" alt="test" width="24" height="24" src="/cmisite/media/assets/icon-clear.png" />
                                    </a>
                                    <label className="form-label">รหัสไปรษณีย์</label>
                                    <div className="feedback">กรุณากรอก</div>
                                </div>
                                <input type="submit" name="p$lt$ctl00$pageplaceholder$p$lt$ctl00$CustomerInformation$btnZipCodeHid" value="" id="p_lt_ctl00_pageplaceholder_p_lt_ctl00_CustomerInformation_btnZipCodeHid" className="d-none" />
                                <div className="form-group mb-12 ms-2 w-100 province">
                                    {/* onchange="javascript:setTimeout('__doPostBack(\'p$lt$ctl00$pageplaceholder$p$lt$ctl00$CustomerInformation$ddlProvince\',\'\')', 0)" */}
                                    <select name="p$lt$ctl00$pageplaceholder$p$lt$ctl00$CustomerInformation$ddlProvince" id="p_lt_ctl00_pageplaceholder_p_lt_ctl00_CustomerInformation_ddlProvince" disabled data-select2-id="select2-data-p_lt_ctl00_pageplaceholder_p_lt_ctl00_CustomerInformation_ddlProvince" className="select2-hidden-accessible" aria-hidden="true">
                                        <option  value="" data-select2-id="select2-data-136-c8te">เลือกจังหวัด</option>

                                    </select>
                                    <span className="select2 select2-container select2-container--default select2-container--disabled" dir="ltr" data-select2-id="select2-data-135-19ca" style={{ width: '99px' }}>
                                        <span className="selection">
                                            <span className="select2-selection select2-selection--single" role="combobox" aria-haspopup="true" aria-expanded="false" aria-disabled="true" aria-labelledby="select2-p_lt_ctl00_pageplaceholder_p_lt_ctl00_CustomerInformation_ddlProvince-container" aria-controls="select2-p_lt_ctl00_pageplaceholder_p_lt_ctl00_CustomerInformation_ddlProvince-container">
                                                <span className="select2-selection__rendered" id="select2-p_lt_ctl00_pageplaceholder_p_lt_ctl00_CustomerInformation_ddlProvince-container" role="textbox" aria-readonly="true" title="เลือกจังหวัด">เลือกจังหวัด</span>
                                                <span className="select2-selection__arrow" role="presentation"><b role="presentation"></b>
                                                </span>
                                            </span>
                                        </span>
                                        <span className="dropdown-wrapper" aria-hidden="true"></span>
                                    </span>
                                    <label className="form-label">จังหวัด</label>
                                    <div className="feedback">กรุณาเลือก</div>
                                </div>
                            </div>
                            <div className="d-flex">
                                <div className="form-group mb-12 me-2 w-100 district">
                                    {/* onchange="if (!window.__cfRLUnblockHandlers) return false; javascript:setTimeout(&#39;__doPostBack(\&#39;p$lt$ctl00$pageplaceholder$p$lt$ctl00$CustomerInformation$ddlDistrict\&#39;,\&#39;\&#39;)&#39;, 0)" */}
                                    <select name="p$lt$ctl00$pageplaceholder$p$lt$ctl00$CustomerInformation$ddlDistrict" id="p_lt_ctl00_pageplaceholder_p_lt_ctl00_CustomerInformation_ddlDistrict" disabled data-cf-modified-591f8b295234a2d03ed50c79-="">
                                        <option  value="">เลือกเขต/อำเภอ</option>

                                    </select>
                                    <label className="form-label">เขต/อำเภอ</label>
                                    <div className="feedback">กรุณาเลือก</div>
                                </div>
                                <div className="form-group mb-12 ms-2 w-100 subdistrict">
                                    <select name="p$lt$ctl00$pageplaceholder$p$lt$ctl00$CustomerInformation$ddlSubDistrict" id="p_lt_ctl00_pageplaceholder_p_lt_ctl00_CustomerInformation_ddlSubDistrict" disabled>
                                        <option value="">เลือกแขวง/ตำบล</option>

                                    </select>
                                    <label className="form-label">แขวง/ตำบล</label>
                                    <div className="feedback">กรุณาเลือก</div>
                                </div>
                            </div>

                        </div>



                        <input type="hidden" name="p$lt$ctl00$pageplaceholder$p$lt$ctl00$CustomerInformation$hdChannelText" id="p_lt_ctl00_pageplaceholder_p_lt_ctl00_CustomerInformation_hdChannelText" value="CXM" />
                        <input type="hidden" name="p$lt$ctl00$pageplaceholder$p$lt$ctl00$CustomerInformation$hdPriceText" id="p_lt_ctl00_pageplaceholder_p_lt_ctl00_CustomerInformation_hdPriceText" value="967.28" />
                        <input type="hidden" name="p$lt$ctl00$pageplaceholder$p$lt$ctl00$CustomerInformation$hdVehicleCategoryId" id="p_lt_ctl00_pageplaceholder_p_lt_ctl00_CustomerInformation_hdVehicleCategoryId" value="6" />
                        <input type="hidden" name="p$lt$ctl00$pageplaceholder$p$lt$ctl00$CustomerInformation$hdVehicleCategoryText" id="p_lt_ctl00_pageplaceholder_p_lt_ctl00_CustomerInformation_hdVehicleCategoryText" value="ไม่เกิน 3 ตัน" />
                        <input type="hidden" name="p$lt$ctl00$pageplaceholder$p$lt$ctl00$CustomerInformation$hdVehicleNameText" id="p_lt_ctl00_pageplaceholder_p_lt_ctl00_CustomerInformation_hdVehicleNameText" value="รถกระบะ 2 ประตู" />

                        <input type="hidden" name="p$lt$ctl00$pageplaceholder$p$lt$ctl00$CustomerInformation$hdCarBrandText" id="p_lt_ctl00_pageplaceholder_p_lt_ctl00_CustomerInformation_hdCarBrandText" value="TOYOTA" />
                        <input type="hidden" name="p$lt$ctl00$pageplaceholder$p$lt$ctl00$CustomerInformation$hdCarModelText" id="p_lt_ctl00_pageplaceholder_p_lt_ctl00_CustomerInformation_hdCarModelText" value="HILUX TIGER" />
                        <input type="hidden" name="p$lt$ctl00$pageplaceholder$p$lt$ctl00$CustomerInformation$hdCarColorText" id="p_lt_ctl00_pageplaceholder_p_lt_ctl00_CustomerInformation_hdCarColorText" value="ขาว" />
                        <input type="hidden" name="p$lt$ctl00$pageplaceholder$p$lt$ctl00$CustomerInformation$hdCarIsRedText" id="p_lt_ctl00_pageplaceholder_p_lt_ctl00_CustomerInformation_hdCarIsRedText" value="NOTRED" />
                        <input type="hidden" name="p$lt$ctl00$pageplaceholder$p$lt$ctl00$CustomerInformation$hdCarRegisterProvinceText" id="p_lt_ctl00_pageplaceholder_p_lt_ctl00_CustomerInformation_hdCarRegisterProvinceText" value="กรุงเทพมหานคร" />
                        <input type="hidden" name="p$lt$ctl00$pageplaceholder$p$lt$ctl00$CustomerInformation$hdCarRegisterYearText" id="p_lt_ctl00_pageplaceholder_p_lt_ctl00_CustomerInformation_hdCarRegisterYearText" value="2024" />
                        <input type="hidden" name="p$lt$ctl00$pageplaceholder$p$lt$ctl00$CustomerInformation$hdCoverageDateStartText" id="p_lt_ctl00_pageplaceholder_p_lt_ctl00_CustomerInformation_hdCoverageDateStartText" value="2568-05-21" />
                        <input type="hidden" name="p$lt$ctl00$pageplaceholder$p$lt$ctl00$CustomerInformation$hdCoverageDateEndText" id="p_lt_ctl00_pageplaceholder_p_lt_ctl00_CustomerInformation_hdCoverageDateEndText" value="2569-05-21" />

                        <input type="hidden" name="p$lt$ctl00$pageplaceholder$p$lt$ctl00$CustomerInformation$hdChannelDeliveryText" id="p_lt_ctl00_pageplaceholder_p_lt_ctl00_CustomerInformation_hdChannelDeliveryText" value="อีเมล" />
                    </div>
                </div>
            </div>
            <div className="container">
                {/* onclick="if (!window.__cfRLUnblockHandlers) return false; return checkValidation();" */}
                <a href="/th/ReviewSummary" id="p_lt_ctl00_pageplaceholder_p_lt_ctl00_CustomerInformation_btnSubmit" className="btn btn-primary fs-6 d-flex justify-content-center align-items-center mx-auto mb-4 mt-12" data-cf-modified-591f8b295234a2d03ed50c79-="">ดำเนินการต่อ</a>
            </div>
            {/* <script type="591f8b295234a2d03ed50c79-text/javascript">
    document.addEventListener(("DOMContentLoaded"), () => {
        $('select[id*="ddlPrefix"]').select2({ "language": { "noResults": function () { return "ไม่พบผลการค้นหา"; } }, escapeMarkup: function (markup) { return markup; }, dropdownPosition: 'below' })
            .on('select2:select', function (e) {
                let valDdlPrefix = document.querySelector('.formMain select[id*=ddlPrefix]').value;
                if (valDdlPrefix != "") {
                    pushGTMCustomerInfo('fill_customer_detail', 'prefix');
                }
                checkPrefix();
            })
            .on("select2:close", function (e) {
                checkPrefix();
            });

        $('select[id*="ddlProvince"]').select2({ "language": { "noResults": function () { return "ไม่พบผลการค้นหา"; } }, escapeMarkup: function (markup) { return markup; }, dropdownPosition: 'below' })
            .on('select2:select', function (e) {
                let valDdlProvince = document.querySelector('.formMain select[id*=ddlProvince]').value;
                if (valDdlProvince != "") {
                    pushGTMCustomerInfo('fill_address_detail', 'province');
                }
                checkDdlProvince();
            })
            .on("select2:close", function (e) {
                checkDdlProvince();
            });

        $('select[id*="ddlDistrict"]').select2({ "language": { "noResults": function () { return "ไม่พบผลการค้นหา"; } }, escapeMarkup: function (markup) { return markup; }, dropdownPosition: 'below' })
            .on('select2:select', function (e) {
                let valDdlDistrict = document.querySelector('.formMain select[id*=ddlDistrict]').value;
                if (valDdlDistrict != "") {
                    pushGTMCustomerInfo('fill_address_detail', 'district');
                }
                checkDdlDistrict();
            })
            .on("select2:close", function (e) {
                checkDdlDistrict();
            });

        $('select[id*="ddlSubDistrict"]').select2({ "language": { "noResults": function () { return "ไม่พบผลการค้นหา"; } }, escapeMarkup: function (markup) { return markup; }, dropdownPosition: 'below' })
            .on('select2:select', function (e) {
                let valDdlSubDistrict = document.querySelector('.formMain select[id*=ddlSubDistrict]').value;
                if (valDdlSubDistrict != "") {
                    pushGTMCustomerInfo('fill_address_detail', 'sub_district');
                }
                checkDdlSubDistrict();
            })
            .on("select2:close", function (e) {
                checkDdlSubDistrict();
            });

        $('select[id*="ddlYearBirth"]').select2({
            "language": { "noResults": function () { return "ไม่พบผลการค้นหา"; } },
            escapeMarkup: function (markup) { return markup; },
            dropdownPosition: 'below',
            placeholder: 'เลือกปี'
        })
            .on("change", function (e) { monthYearChange(); })
            .on('select2:select', function (e) {
                document.querySelector('.form-group.mb-12.form-birthday').classList.remove('validated-error');
                if (document.querySelector('select[id*="ddlYearBirth"]').value == '') {
                    document.querySelector('.form-group.mb-12.form-birthday .year').classList.add('validated-error');
                    document.querySelector('.form-group.mb-12.form-birthday .feedback').textContent = "กรุณาเลือก";
                    document.querySelector('.form-group.mb-12.form-birthday .feedback').classList.remove('d-none');
                    document.querySelector('.form-group.mb-12.form-birthday .feedback').classList.add('d-block');
                }
                else {
                    document.querySelector('.form-group.mb-12.form-birthday .year').classList.remove('validated-error');
                    pushGTMCustomerInfo('fill_customer_detail', 'year_of_birth');
                }

                removeErrorBirthDate();
            })
            .on("select2:close", function (e) {
                document.querySelector('.form-group.mb-12.form-birthday').classList.remove('validated-error');
                if (document.querySelector('select[id*="ddlYearBirth"]').value == '') {
                    document.querySelector('.form-group.mb-12.form-birthday .year').classList.add('validated-error');
                    document.querySelector('.form-group.mb-12.form-birthday .feedback').textContent = "กรุณาเลือก";
                    document.querySelector('.form-group.mb-12.form-birthday .feedback').classList.remove('d-none');
                    document.querySelector('.form-group.mb-12.form-birthday .feedback').classList.add('d-block');
                }
                else {
                    document.querySelector('.form-group.mb-12.form-birthday .year').classList.remove('validated-error');
                    //pushGTMCustomerInfo('fill_customer_detail', 'year_of_birth');
                }
            });

        $('select[id*="ddlMonthBirth"]').select2({
            "language": { "noResults": function () { return "ไม่พบผลการค้นหา"; } },
            escapeMarkup: function (markup) { return markup; },
            dropdownPosition: 'below',
            placeholder: 'เลือกเดือน'
        }).on("change", function (e) { monthYearChange(); })
            .on('select2:select', function (e) {
                document.querySelector('.form-group.mb-12.form-birthday').classList.remove('validated-error');
                if (document.querySelector('select[id*="ddlMonthBirth"]').value == '') {
                    document.querySelector('.form-group.mb-12.form-birthday .month').classList.add('validated-error');
                    document.querySelector('.form-group.mb-12.form-birthday .feedback').textContent = "กรุณาเลือก";
                    document.querySelector('.form-group.mb-12.form-birthday .feedback').classList.remove('d-none');
                    document.querySelector('.form-group.mb-12.form-birthday .feedback').classList.add('d-block');
                }
                else {
                    document.querySelector('.form-group.mb-12.form-birthday .month').classList.remove('validated-error');
                    pushGTMCustomerInfo('fill_customer_detail', 'month_of_birth');
                }

                removeErrorBirthDate();
            })
            .on("select2:close", function (e) {
                document.querySelector('.form-group.mb-12.form-birthday').classList.remove('validated-error');
                if (document.querySelector('select[id*="ddlMonthBirth"]').value == '') {
                    document.querySelector('.form-group.mb-12.form-birthday .month').classList.add('validated-error');
                    document.querySelector('.form-group.mb-12.form-birthday .feedback').textContent = "กรุณาเลือก";
                    document.querySelector('.form-group.mb-12.form-birthday .feedback').classList.remove('d-none');
                    document.querySelector('.form-group.mb-12.form-birthday .feedback').classList.add('d-block');
                }
                else {
                    document.querySelector('.form-group.mb-12.form-birthday .month').classList.remove('validated-error');
                    //pushGTMCustomerInfo('fill_customer_detail', 'month_of_birth');
                }
            });

        $('select[id*="ddlDayBirth"]').select2({
            "language": { "noResults": function () { return "ไม่พบผลการค้นหา"; } },
            escapeMarkup: function (markup) { return markup; },
            dropdownPosition: 'below',
            placeholder: 'เลือกวัน'
        })
            .on('select2:select', function (e) {
                document.querySelector('.form-group.mb-12.form-birthday').classList.remove('validated-error');
                if (document.querySelector('select[id*="ddlDayBirth"]').value == '') {
                    document.querySelector('.form-group.mb-12.form-birthday .day').classList.add('validated-error');
                    document.querySelector('.form-group.mb-12.form-birthday .feedback').textContent = "กรุณาเลือก";
                    document.querySelector('.form-group.mb-12.form-birthday .feedback').classList.remove('d-none');
                    document.querySelector('.form-group.mb-12.form-birthday .feedback').classList.add('d-block');
                }
                else {
                    document.querySelector('.form-group.mb-12.form-birthday .day').classList.remove('validated-error');
                    pushGTMCustomerInfo('fill_customer_detail', 'day_of_birth');
                }

                removeErrorBirthDate();
            })
            .on("select2:close", function (e) {
                document.querySelector('.form-group.mb-12.form-birthday').classList.remove('validated-error');
                if (document.querySelector('select[id*="ddlDayBirth"]').value == '') {
                    document.querySelector('.form-group.mb-12.form-birthday .day').classList.add('validated-error');
                    document.querySelector('.form-group.mb-12.form-birthday .feedback').textContent = "กรุณาเลือก";
                    document.querySelector('.form-group.mb-12.form-birthday .feedback').classList.remove('d-none');
                    document.querySelector('.form-group.mb-12.form-birthday .feedback').classList.add('d-block');
                }
                else {
                    document.querySelector('.form-group.mb-12.form-birthday .day').classList.remove('validated-error');
                    //pushGTMCustomerInfo('fill_customer_detail', 'day_of_birth');
                }
            });

        let listTh = document.querySelectorAll(".onlyThai");
        for (let s = 0; s < listTh.length; s++) {
            listTh[s].addEventListener('blur', function (event) {
                event.target.value = event.target.value.replace(/^\s+|\s+$/g, "").replace(/\s+/g, " ");
            }, true);
            setInputFilter(listTh[s], function (value) {
                return /^[ๅภถุคตู่จ้ข็ชๆไพีะรนึยืบฺลฃฟหกดเาสวงผปแอิทมใฝฎฑธํ๊ณฯญำฐฤฆฏโฌ็๋ษศซฉฮฺ์ฒฬฦั]*$/i.test(value);
            });
        }
        let listNum = document.querySelectorAll(".onlyNum");
        for (let s = 0; s < listNum.length; s++) {
            listNum[s].setAttribute("inputmode", "decimal");
            listNum[s].addEventListener('blur', function (event) {
                event.target.value = event.target.value.replace(/^\s+|\s+$/g, "");
            }, true);
            setInputFilter(listNum[s], function (value) {
                return /^[0-9]*$/i.test(value);
            });
        }

        let listZip = document.querySelectorAll('.chkZipCode');
        for (let m = 0; m < listZip.length; m++) {
            listZip[m].setAttribute("inputmode", "decimal");
            listZip[m].addEventListener('keyup', function (e) {
                var keyCode = e.which ? e.which : e.keyCode;
                if ((keyCode >= 48 && keyCode <= 57) || (keyCode >= 96 && keyCode <= 105)) {
                    if (e.target.value != '' && e.target.value.length == 5) {
                        if (document.querySelector('.formMain input[id*=txtZipCode][disabled]')) {

                        } else {
                            document.querySelector('.formMain input[id*=txtZipCode]').setAttribute('disabled', 'disabled');
                            document.querySelector('.formMain [id*=btnZipCodeHid]').click();
                        }
                    }
                }
            }, true);
            listZip[m].addEventListener('keydown', function (e) {
                if (e.keyCode == 13) {
                    e.preventDefault();
                }
            }, true);
        }

        let listEmail = document.querySelectorAll(".chkEmail");
        for (let s = 0; s < listEmail.length; s++) {
            listEmail[s].addEventListener('blur', function (event) {
                event.target.value = event.target.value.replace(/^\s+|\s+$/g, "").replace(/\s+/g, " ");
            }, true);
            setInputFilter(listEmail[s], function (value) {
                return /^[a-zA-Z0-9@._-]*$/i.test(value);
            });
        }

        let listCiti = document.querySelectorAll('.chkCiti');
        for (let c = 0; c < listCiti.length; c++) {
            listCiti[c].setAttribute("inputmode", "decimal");
            listCiti[c].addEventListener('keypress', function (e) {
                var theEvent = e || window.event;
                var key = theEvent.keyCode || theEvent.which;
                if (key == ".") {
                    theEvent.returnValue = false;
                    if (theEvent.preventDefault) { theEvent.preventDefault(); }
                }
                if (key != 13 && key != 9) {
                    key = String.fromCharCode(key);
                    var regex = /[0-9]/;
                    if (!regex.test(key)) {
                        theEvent.returnValue = false;
                        if (theEvent.preventDefault) { theEvent.preventDefault(); }
                    } else {
                        theEvent.returnValue = chkCiti(e.target.value, e.target.value.length, key, e);
                    }
                }
            }, true);
            listCiti[c].addEventListener('keyup', function (e) {
                var checkbool = citiFormat(e.target.value);
                e.target.value = checkbool;
            }, true);
        }

        let listMob = document.querySelectorAll('.chkMobile');
        for (let m = 0; m < listMob.length; m++) {
            listMob[m].setAttribute("inputmode", "decimal");
            listMob[m].addEventListener("paste", function (e) {
                e.returnValue = false;
                if (e.preventDefault) { e.preventDefault(); }
            }, true);
            listMob[m].addEventListener('keypress', function (e) {
                var theEvent = e || window.event;
                var key = theEvent.keyCode || theEvent.which;
                if (key == ".") {
                    theEvent.returnValue = false;
                    if (theEvent.preventDefault) { theEvent.preventDefault(); }
                }
                if (key != 13 && key != 9) {
                    key = String.fromCharCode(key);
                    var regex = /[0-9]/;
                    if (!regex.test(key)) {
                        theEvent.returnValue = false;
                        if (theEvent.preventDefault) { theEvent.preventDefault(); }
                    } else {
                        theEvent.returnValue = chkTel(e.target.value, e.target.value.length, key, e);
                    }
                }
            }, true);
            listMob[m].addEventListener('keyup', function (e) {
                var checkbool = phoneFormat(e.target.value);
                e.target.value = checkbool;
            }, true);
        }

        // remove style error when change
        if (document.querySelector("[id*=zonePolicyDelivery]")) {
            document.querySelector('.formMain input[id*=chbEmail]').addEventListener('change', function (e) {
                document.querySelector('.form-group.mb-4.policy').classList.remove('validated-error');
                document.querySelector('.form-group .chbEmail_').classList.remove('validated-error');

                if (document.querySelector('.formMain [id*=chbEmail]:checked') != null) {
                    document.querySelector('.formMain input[id*=txtPolicyEmail]').value = document.querySelector('.formMain input[id*=txtEmail]').value;
                    let valPolicyEmail = document.querySelector('.formMain input[id*=txtPolicyEmail]').value;
                    let valPolicyPhone = document.querySelector('.formMain input[id*=txtPolicyPhone]').value.replace(/-/g, '');
                    if (document.querySelector('.formMain [id*=chbPhone]:checked') != null) {
                        PushGTMDefault('customer_info', 'select_delivery_address', 'อีเมล, SMS');
                    }
                    else {
                        PushGTMDefault('customer_info', 'select_delivery_address', 'อีเมล');
                    }
                    document.querySelector('.form-group.mb-4.policy .mb-12 .feedback').classList.remove('d-block');
                    document.querySelector('.form-group.mb-4.policy .mb-12 .feedback').classList.add('d-none');
                    //show button X
                    if (valPolicyEmail.length > 0) {
                        document.querySelector('.form-group.policyemail a img').classList.remove("hide");
                    }
                    else if (valPolicyEmail.length == 0) {
                        document.querySelector('.form-group.policyemail a img').classList.add("hide");
                    }
                }
                else {
                    document.querySelector('.formMain input[id*=txtPolicyEmail]').value = "";
                    document.querySelector('.form-group.mb-4.policy .mb-12 .feedback').classList.remove('d-block');
                    document.querySelector('.form-group.mb-4.policy .mb-12 .feedback').classList.add('d-none');

                    document.querySelector('.form-group.policyemail a img').classList.add("hide");
                }


            }, true);

            document.querySelector('.formMain input[id*=chbPhone]').addEventListener('change', function (e) {
                document.querySelector('.form-group.mb-4.policy').classList.remove('validated-error');
                document.querySelector('.form-group .chbPhone_').classList.remove('validated-error');

                if (document.querySelector('.formMain [id*=chbPhone]:checked') != null) {
                    document.querySelector('.formMain input[id*=txtPolicyPhone]').value = document.querySelector('.formMain input[id*=txtPhone]').value;
                    let valPolicyEmail = document.querySelector('.formMain input[id*=txtPolicyEmail]').value;
                    let valPolicyPhone = document.querySelector('.formMain input[id*=txtPolicyPhone]').value.replace(/-/g, '');
                    if (document.querySelector('.formMain [id*=chbEmail]:checked') != null) {
                        PushGTMDefault('customer_info', 'select_delivery_address', 'อีเมล, SMS');
                    }
                    else {
                        PushGTMDefault('customer_info', 'select_delivery_address', 'SMS');
                    }
                    document.querySelector('.form-group.mb-4.policy .mb-12 .feedback').classList.remove('d-block');
                    document.querySelector('.form-group.mb-4.policy .mb-12 .feedback').classList.add('d-none');

                    //show button X
                    if (valPolicyPhone.length > 0) {
                        document.querySelector('.form-group.policyphone a img').classList.remove("hide");
                    }
                    else if (valPolicyPhone.length == 0) {
                        document.querySelector('.form-group.policyphone a img').classList.add("hide");
                    }
                }
                else {
                    document.querySelector('.formMain input[id*=txtPolicyPhone]').value = "";
                    document.querySelector('.form-group.mb-4.policy .mb-12 .feedback').classList.remove('d-block');
                    document.querySelector('.form-group.mb-4.policy .mb-12 .feedback').classList.add('d-none');
                    document.querySelector('.form-group.policyphone a img').classList.add("hide");
                }

            }, true);

            document.querySelector('.formMain input[id*=txtPhone]').addEventListener('keyup', function (e) {
                if (document.querySelector("[id*=zonePolicyDelivery]")) {
                    if (document.querySelector('.formMain [id*=chbPhone]:checked') != null) {
                        document.querySelector('.formMain input[id*=txtPolicyPhone]').value = e.target.value;
                    }
                }
            }, true);
            document.querySelector('.formMain input[id*=txtEmail]').addEventListener('keyup', function (e) {
                if (document.querySelector("[id*=zonePolicyDelivery]")) {
                    if (document.querySelector('.formMain [id*=chbEmail]:checked') != null) {
                        document.querySelector('.formMain input[id*=txtPolicyEmail]').value = e.target.value;
                    }
                }
            }, true);

            if (document.querySelector('.formMain [id*=chbEmail]:checked') == null) {
                if (document.querySelector("[id*=zonePolicyDelivery]")) {
                    document.querySelector('.formMain input[id*=txtPolicyEmail]').value = "";
                }
            }
            if (document.querySelector('.formMain [id*=chbPhone]:checked') == null) {
                if (document.querySelector("[id*=zonePolicyDelivery]")) {
                    document.querySelector('.formMain input[id*=txtPolicyPhone]').value = "";
                }
            }
        }

        //event onBlur
        document.querySelector('.formMain input[id*=txtName]').addEventListener('change', function (e) {
            checkTxtName();
            pushGTMCustomerInfo('fill_customer_detail', 'firstname');
        }, true);
        document.querySelector('.formMain input[id*=txtName]').addEventListener('blur', function (e) {
            checkTxtName();
        }, true);
        document.querySelector('.formMain input[id*=txtName]').addEventListener('keyup', function (e) {
            showRemoveButtonRemoveName();
        }, true);
        document.querySelector('.formMain input[id*=txtName]').addEventListener('focus', function (e) {
            setShowHide(true, 'name');
        }, true);
        document.querySelector('.formMain input[id*=txtName]').addEventListener('focusout', function (e) {
            setShowHide(false, 'name');
        }, true);
        //start
        showRemoveButtonRemoveName();

        document.querySelector('.formMain input[id*=txtSurName]').addEventListener('change', function (e) {
            checkTxtSurName();
            pushGTMCustomerInfo('fill_customer_detail', 'lastName');
        }, true);
        document.querySelector('.formMain input[id*=txtSurName]').addEventListener('blur', function (e) {
            checkTxtSurName();
        }, true);
        document.querySelector('.formMain input[id*=txtSurName]').addEventListener('keyup', function (e) {
            showRemoveButtonRemoveSureName();
        }, true);
        document.querySelector('.formMain input[id*=txtSurName]').addEventListener('focus', function (e) {
            setShowHide(true, 'surname');
        }, true);
        document.querySelector('.formMain input[id*=txtSurName]').addEventListener('focusout', function (e) {
            setShowHide(false, 'surname');
        }, true);
        showRemoveButtonRemoveSureName();


        document.querySelector('.formMain input[id*=txtCitizen]').addEventListener('change', function (e) {
            checkTxtCitizen();
            pushGTMCustomerInfo('fill_customer_detail', 'idcard');
        }, true);
        document.querySelector('.formMain input[id*=txtCitizen]').addEventListener('blur', function (e) {
            checkTxtCitizen();
        }, true);
        document.querySelector('.formMain input[id*=txtCitizen]').addEventListener('keyup', function (e) {
            showRemoveButtonRemoveCitizen();
        }, true);
        document.querySelector('.formMain input[id*=txtCitizen]').addEventListener('focus', function (e) {
            setShowHide(true, 'citizen');
        }, true);
        document.querySelector('.formMain input[id*=txtCitizen]').addEventListener('focusout', function (e) {
            setShowHide(false, 'citizen');
        }, true);
        showRemoveButtonRemoveCitizen();

        document.querySelector('.formMain input[id*=txtPhone]').addEventListener('change', function (e) {
            checkTxtPhone();
            pushGTMCustomerInfo('fill_customer_detail', 'tel_no');
            if (document.querySelector("[id*=zonePolicyDelivery]")) {
                document.querySelector('.formMain .policyphone').classList.remove('validated-error');
                document.querySelector('.formMain .policyphone .feedback').textContent = "";
                checkSmsValueFormat();
            }
        }, true);
        document.querySelector('.formMain input[id*=txtPhone]').addEventListener('blur', function (e) {
            checkTxtPhone();
        }, true);
        document.querySelector('.formMain input[id*=txtPhone]').addEventListener('keyup', function (e) {
            showRemoveButtonRemovePhone();
        }, true);
        document.querySelector('.formMain input[id*=txtPhone]').addEventListener('focus', function (e) {
            setShowHide(true, 'phone');
        }, true);
        document.querySelector('.formMain input[id*=txtPhone]').addEventListener('focusout', function (e) {
            setShowHide(false, 'phone');
        }, true);
        showRemoveButtonRemovePhone();

        document.querySelector('.formMain input[id*=txtEmail]').addEventListener('change', function (e) {
            checkTxtEmail();
            pushGTMCustomerInfo('fill_customer_detail', 'email');
            if (document.querySelector("[id*=zonePolicyDelivery]")) {
                document.querySelector('.formMain .policyemail').classList.remove('validated-error');
                document.querySelector('.formMain .policyemail .feedback').textContent = "";
                checkEmailFormat();
            }

        }, true);
        document.querySelector('.formMain input[id*=txtEmail]').addEventListener('blur', function (e) {
            checkTxtEmail();
        }, true);
        document.querySelector('.formMain input[id*=txtEmail]').addEventListener('keyup', function (e) {
            showRemoveButtonRemoveEmail();
        }, true);
        document.querySelector('.formMain input[id*=txtEmail]').addEventListener('focus', function (e) {
            setShowHide(true, 'email');
        }, true);
        document.querySelector('.formMain input[id*=txtEmail]').addEventListener('focusout', function (e) {
            setShowHide(false, 'email');
        }, true);
        showRemoveButtonRemoveEmail();

        document.querySelector('.formMain input[id*=txtAddNo]').addEventListener('change', function (e) {
            checkTxtAddNo();
            pushGTMCustomerInfo('fill_address_detail', 'house_no');
        }, true);
        document.querySelector('.formMain input[id*=txtAddNo]').addEventListener('blur', function (e) {
            checkTxtAddNo();
        }, true);
        document.querySelector('.formMain input[id*=txtAddNo]').addEventListener('keyup', function (e) {
            showRemoveButtonRemoveAddNo();
        }, true);
        document.querySelector('.formMain input[id*=txtAddNo]').addEventListener('focus', function (e) {
            setShowHide(true, 'addno');
        }, true);
        document.querySelector('.formMain input[id*=txtAddNo]').addEventListener('focusout', function (e) {
            setShowHide(false, 'addno');
        }, true);
        showRemoveButtonRemoveAddNo();

        document.querySelector('.formMain input[id*=txtAddMoo]').addEventListener('change', function (e) {

            pushGTMCustomerInfo('fill_address_detail', 'moo');
        }, true);
        document.querySelector('.formMain input[id*=txtAddMoo]').addEventListener('keyup', function (e) {
            showRemoveButtonRemoveAddMoo();
        }, true);
        document.querySelector('.formMain input[id*=txtAddMoo]').addEventListener('focus', function (e) {
            setShowHide(true, 'addmoo');
        }, true);
        document.querySelector('.formMain input[id*=txtAddMoo]').addEventListener('focusout', function (e) {
            setShowHide(false, 'addmoo');
        }, true);
        showRemoveButtonRemoveAddMoo();

        document.querySelector('.formMain input[id*=txtAddBuild]').addEventListener('change', function (e) {

            pushGTMCustomerInfo('fill_address_detail', 'village_buiding');
        }, true);
        document.querySelector('.formMain input[id*=txtAddBuild]').addEventListener('keyup', function (e) {
            showRemoveButtonRemoveAddBuild();
        }, true);
        document.querySelector('.formMain input[id*=txtAddBuild]').addEventListener('focus', function (e) {
            setShowHide(true, 'addBuild');
        }, true);
        document.querySelector('.formMain input[id*=txtAddBuild]').addEventListener('focusout', function (e) {
            setShowHide(false, 'addBuild');
        }, true);
        showRemoveButtonRemoveAddBuild();

        document.querySelector('.formMain input[id*=txtAddSoi]').addEventListener('change', function (e) {

            pushGTMCustomerInfo('fill_address_detail', 'soi');
        }, true);
        document.querySelector('.formMain input[id*=txtAddSoi]').addEventListener('keyup', function (e) {
            showRemoveButtonRemoveAddSoi();
        }, true);
        document.querySelector('.formMain input[id*=txtAddSoi]').addEventListener('focus', function (e) {
            setShowHide(true, 'addSoi');
        }, true);
        document.querySelector('.formMain input[id*=txtAddSoi]').addEventListener('focusout', function (e) {
            setShowHide(false, 'addSoi');
        }, true);
        showRemoveButtonRemoveAddSoi();

        document.querySelector('.formMain input[id*=txtAddRoad]').addEventListener('change', function (e) {

            pushGTMCustomerInfo('fill_address_detail', 'road');
        }, true);
        document.querySelector('.formMain input[id*=txtAddRoad]').addEventListener('keyup', function (e) {
            showRemoveButtonRemoveAddRoad();
        }, true);
        document.querySelector('.formMain input[id*=txtAddRoad]').addEventListener('focus', function (e) {
            setShowHide(true, 'addRoad');
        }, true);
        document.querySelector('.formMain input[id*=txtAddRoad]').addEventListener('focusout', function (e) {
            setShowHide(false, 'addRoad');
        }, true);
        showRemoveButtonRemoveAddRoad();

        document.querySelector('.formMain input[id*=txtZipCode]').addEventListener('change', function (e) {
            checkTxtZipCode();
            pushGTMCustomerInfo('fill_address_detail', 'postal_code');
        }, true);
        document.querySelector('.formMain input[id*=txtZipCode]').addEventListener('blur', function (e) {
            checkTxtZipCode();
            showRemoveButtonRemoveZipCode();
            document.querySelector('.formMain [id*=btnZipCodeHid]').click();
        }, true);
        document.querySelector('.formMain input[id*=txtZipCode]').addEventListener('keyup', function (e) {
            showRemoveButtonRemoveZipCode();
        }, true);
        document.querySelector('.formMain input[id*=txtZipCode]').addEventListener('focus', function (e) {
            setShowHide(true, 'zipcode');
        }, true);
        document.querySelector('.formMain input[id*=txtZipCode]').addEventListener('focusout', function (e) {
            setShowHide(false, 'zipcode');
        }, true);
        showRemoveButtonRemoveZipCode();

        if (document.querySelector("[id*=zonePolicyDelivery]")) {
            document.querySelector('.formMain input[id*=txtPolicyEmail]').addEventListener('blur', function (e) {
                checkEmailFormat();
                PushGTMDefault('customer_info', 'edit_delivery_address', document.querySelector('.formMain input[id*=txtPolicyEmail]').value);
            }, true);

            document.querySelector('.formMain input[id*=txtPolicyPhone]').addEventListener('blur', function (e) {
                checkSmsValueFormat();
                PushGTMDefault('customer_info', 'edit_delivery_address', document.querySelector('.formMain input[id*=txtPolicyPhone]').value);
            }, true);

            document.querySelector('.formMain input[id*=txtPolicyEmail]').addEventListener('keyup', function (e) {
                showRemoveButtonRemovePolicyEmail();
            }, true);
            document.querySelector('.formMain input[id*=txtPolicyEmail]').addEventListener('focus', function (e) {
                setShowHide(true, 'policyemail');
            }, true);
            document.querySelector('.formMain input[id*=txtPolicyEmail]').addEventListener('focusout', function (e) {
                setShowHide(false, 'policyemail');
            }, true);
            showRemoveButtonRemovePolicyEmail();

            document.querySelector('.formMain input[id*=txtPolicyPhone]').addEventListener('keyup', function (e) {
                showRemoveButtonRemovePolicyPhone();
            }, true);
            document.querySelector('.formMain input[id*=txtPolicyPhone]').addEventListener('focus', function (e) {
                setShowHide(true, 'policyphone');
            }, true);
            document.querySelector('.formMain input[id*=txtPolicyPhone]').addEventListener('focusout', function (e) {
                setShowHide(false, 'policyphone');
            }, true);
            showRemoveButtonRemovePolicyPhone();
        }

        generateYearList();
    });

    // function setBirthDate(datetime) {
    //     const dateNow = new Date();
    //     const dateN = new Date(datetime);
    //     const picker = new easepick.create({
    //         element: document.querySelector('[id*=birthDateSel]'),
    //         lang: 'th-TH',
    //         format: 'DD MMMM YYYY',
    //         css: [
    //             '/custom/plugin/easepick/css/core.css',
    //             '/custom/plugin/easepick/css/lock-plugin.css',
    //         ],
    //         plugins: ['LockPlugin'],
    //         LockPlugin: {
    //             maxDate: new Date(),
    //         },
    //         setup(picker) {
    //             picker.on('select', (e) => {
    //                 const { view, date, target } = e.detail;
    //                 document.querySelector('[id*=birthDateVal]').value = date.toLocaleDateString('en-GB');
    //             });
    //         },

    //     });
    //     picker.setDate(dateN);
    //     document.querySelector('[id*=birthDateVal]').value = dateN.toLocaleDateString('en-GB');
    // }

    function showRemoveButtonRemoveName() {
        var valName = document.querySelector('.formMain input[id*=txtName]').value;
        if (valName.length > 0) {
            document.querySelector('.form-group.name a img').classList.remove("hide");
        }
        else if (valName.length == 0) {
            document.querySelector('.form-group.name a img').classList.add("hide");
        }
    }

    function showRemoveButtonRemoveSureName() {
        var valSurName = document.querySelector('.formMain input[id*=txtSurName]').value;
        if (valSurName.length > 0) {
            document.querySelector('.form-group.surname a img').classList.remove("hide");
        }
        else if (valSurName.length == 0) {
            document.querySelector('.form-group.surname a img').classList.add("hide");
        }
    }

    function showRemoveButtonRemoveCitizen() {
        var valCitizen = document.querySelector('.formMain input[id*=txtCitizen]').value;
        if (valCitizen.length > 0) {
            document.querySelector('.form-group.citizen a img').classList.remove("hide");
        }
        else if (valCitizen.length == 0) {
            document.querySelector('.form-group.citizen a img').classList.add("hide");
        }
    }

    function showRemoveButtonRemovePhone() {
        var valPhone = document.querySelector('.formMain input[id*=txtPhone]').value;
        if (valPhone.length > 0) {
            document.querySelector('.form-group.phone a img').classList.remove("hide");
        }
        else if (valPhone.length == 0) {
            document.querySelector('.form-group.phone a img').classList.add("hide");
        }
    }

    function showRemoveButtonRemoveEmail() {
        var valEmail = document.querySelector('.formMain input[id*=txtEmail]').value;
        if (valEmail.length > 0) {
            document.querySelector('.form-group.email a img').classList.remove("hide");
        }
        else if (valEmail.length == 0) {
            document.querySelector('.form-group.email a img').classList.add("hide");
        }
    }

    function showRemoveButtonRemoveAddNo() {
        var valAddNo = document.querySelector('.formMain input[id*=txtAddNo]').value;
        if (valAddNo.length > 0) {
            document.querySelector('.form-group.addno a img').classList.remove("hide");
        }
        else if (valAddNo.length == 0) {
            document.querySelector('.form-group.addno a img').classList.add("hide");
        }
    }

    function showRemoveButtonRemoveAddMoo() {
        var valAddMoo = document.querySelector('.formMain input[id*=txtAddMoo]').value;
        if (valAddMoo.length > 0) {
            document.querySelector('.form-group.addmoo a img').classList.remove("hide");
        }
        else if (valAddMoo.length == 0) {
            document.querySelector('.form-group.addmoo a img').classList.add("hide");
        }
    }

    function showRemoveButtonRemoveAddBuild() {
        var valAddBuild = document.querySelector('.formMain input[id*=txtAddBuild]').value;
        if (valAddBuild.length > 0) {
            document.querySelector('.form-group.addBuild a img').classList.remove("hide");
        }
        else if (valAddBuild.length == 0) {
            document.querySelector('.form-group.addBuild a img').classList.add("hide");
        }
    }

    function showRemoveButtonRemoveAddSoi() {
        var valAddSoi = document.querySelector('.formMain input[id*=txtAddSoi]').value;
        if (valAddSoi.length > 0) {
            document.querySelector('.form-group.addSoi a img').classList.remove("hide");
        }
        else if (valAddSoi.length == 0) {
            document.querySelector('.form-group.addSoi a img').classList.add("hide");
        }
    }

    function showRemoveButtonRemoveAddRoad() {
        var valAddRoad = document.querySelector('.formMain input[id*=txtAddRoad]').value;
        if (valAddRoad.length > 0) {
            document.querySelector('.form-group.addRoad a img').classList.remove("hide");
        }
        else if (valAddRoad.length == 0) {
            document.querySelector('.form-group.addRoad a img').classList.add("hide");
        }
    }

    function showRemoveButtonRemoveZipCode() {
        var valZipcode = document.querySelector('.formMain input[id*=txtZipCode]').value;
        if (valZipcode.length > 0) {
            document.querySelector('.form-group.zipcode a img').classList.remove("hide");
        }
        else if (valZipcode.length == 0) {
            document.querySelector('.form-group.zipcode a img').classList.add("hide");
        }
    }

    function showRemoveButtonRemovePolicyEmail() {
        var valPolicyEmail = document.querySelector('.formMain input[id*=txtPolicyEmail]').value;
        if (valPolicyEmail.length > 0) {
            document.querySelector('.form-group.policyemail a img').classList.remove("hide");
        }
        else if (valPolicyEmail.length == 0) {
            document.querySelector('.form-group.policyemail a img').classList.add("hide");
        }
    }

    function showRemoveButtonRemovePolicyPhone() {
        var valPolicyPhone = document.querySelector('.formMain input[id*=txtPolicyPhone]').value;
        if (valPolicyPhone.length > 0) {
            document.querySelector('.form-group.policyphone a img').classList.remove("hide");
        }
        else if (valPolicyPhone.length == 0) {
            document.querySelector('.form-group.policyphone a img').classList.add("hide");
        }
    }

    function removeErrorBirthDate() {
        if (document.querySelector('select[id*="ddlYearBirth"]').value != '' &&
            document.querySelector('select[id*="ddlMonthBirth"]').value != '' &&
            document.querySelector('select[id*="ddlDayBirth"]').value != '') {
            document.querySelector('.form-group.mb-12.form-birthday .feedback').textContent = "";
            document.querySelector('.form-group.mb-12.form-birthday .feedback').classList.remove('d-block');
            document.querySelector('.form-group.mb-12.form-birthday .feedback').classList.add('d-none');
        }
    }

    function setBirthDate(datetime, submit = false) {
        document.querySelector('[id*=birthDateVal]').value = '';
        if (datetime) {
            const dateN = new Date(datetime);
            const yearNow = new Date().getFullYear();

            const yearBirth = dateN.getFullYear();
            if (yearNow - parseInt(yearBirth) >= 20) {

                document.querySelector('[id*=birthDateVal]').value = dateN;
                if (submit) {
                    document.querySelector('[id*=birthDateVal]').value = dateN.toLocaleDateString('en-GB');
                }
            }
            else {
                document.querySelector('[id*=birthDateVal]').value = '';
            }
        }
    }


    var prm = Sys.WebForms.PageRequestManager.getInstance();
    if (prm != null) {
        prm.add_initializeRequest((sender, args) => {
        });

        prm.add_endRequest((sender, e) => {
            if (e.get_error() != undefined) {
                e.set_errorHandled(true);
            }

            let listZip = document.querySelectorAll('.chkZipCode');
            for (let m = 0; m < listZip.length; m++) {
                listZip[m].setAttribute("inputmode", "decimal");
                listZip[m].addEventListener('keyup', function (e) {
                    var keyCode = e.which ? e.which : e.keyCode;
                    if ((keyCode >= 48 && keyCode <= 57) || (keyCode >= 96 && keyCode <= 105)) {
                        if (e.target.value != '' && e.target.value.length == 5) {
                            if (document.querySelector('.formMain input[id*=txtZipCode][disabled]')) {

                            } else {
                                document.querySelector('.formMain input[id*=txtZipCode]').setAttribute('disabled', 'disabled');
                                document.querySelector('.formMain [id*=btnZipCodeHid]').click();
                            }
                        }
                    }
                }, true);
                listZip[m].addEventListener('keydown', function (e) {
                    if (e.keyCode == 13) {
                        e.preventDefault();
                    }
                }, true);
            }

            document.querySelector('.formMain input[id*=txtZipCode]').addEventListener('change', function (e) {
                checkTxtZipCode();
                pushGTMCustomerInfo('fill_address_detail', 'postal_code');
            }, true);
            document.querySelector('.formMain input[id*=txtZipCode]').addEventListener('blur', function (e) {
                checkTxtZipCode();
                document.querySelector('.formMain [id*=btnZipCodeHid]').click();
            }, true);
            document.querySelector('.formMain input[id*=txtZipCode]').addEventListener('keyup', function (e) {
                showRemoveButtonRemoveZipCode();
            }, true);
            document.querySelector('.formMain input[id*=txtZipCode]').addEventListener('focus', function (e) {
                showRemoveButtonRemoveZipCode();
            }, true);
            document.querySelector('.formMain input[id*=txtZipCode]').addEventListener('focus', function (e) {
                setShowHide(true, 'zipcode');
            }, true);
            document.querySelector('.formMain input[id*=txtZipCode]').addEventListener('focusout', function (e) {
                setShowHide(false, 'zipcode');
            }, true);

            $('select[id*="ddlProvince"]').select2({ "language": { "noResults": function () { return "ไม่พบผลการค้นหา"; } }, escapeMarkup: function (markup) { return markup; }, dropdownPosition: 'below' })
                .on('select2:select', function (e) {
                    let valDdlProvince = document.querySelector('.formMain select[id*=ddlProvince]').value;
                    if (valDdlProvince != "") {
                        pushGTMCustomerInfo('fill_address_detail', 'province');
                    }
                    checkDdlProvince();
                })
                .on("select2:close", function (e) {
                    checkDdlProvince();
                });

            $('select[id*="ddlDistrict"]').select2({ "language": { "noResults": function () { return "ไม่พบผลการค้นหา"; } }, escapeMarkup: function (markup) { return markup; }, dropdownPosition: 'below' })
                .on('select2:select', function (e) {
                    let valDdlDistrict = document.querySelector('.formMain select[id*=ddlDistrict]').value;
                    if (valDdlDistrict != "") {
                        pushGTMCustomerInfo('fill_address_detail', 'district');
                    }
                    checkDdlDistrict();
                })
                .on("select2:close", function (e) {
                    checkDdlDistrict();
                });

            $('select[id*="ddlSubDistrict"]').select2({ "language": { "noResults": function () { return "ไม่พบผลการค้นหา"; } }, escapeMarkup: function (markup) { return markup; }, dropdownPosition: 'below' })
                .on('select2:select', function (e) {
                    let valDdlSubDistrict = document.querySelector('.formMain select[id*=ddlSubDistrict]').value;
                    if (valDdlSubDistrict != "") {
                        pushGTMCustomerInfo('fill_address_detail', 'sub_district');
                    }
                    checkDdlSubDistrict();
                })
                .on("select2:close", function (e) {
                    checkDdlSubDistrict();
                });
        });
    };

    function chkCiti(v, vl, k, ee) {
        let res = false;
        if (vl == 1) {
            ee.target.value = v.substring(0, 1) + "-";
        } else if (vl == 6) {
            ee.target.value = v.substring(0, 6) + "-";
        } else if (vl == 12) {
            ee.target.value = v.substring(0, 12) + "-";
        } else if (vl == 15) {
            ee.target.value = v.substring(0, 15) + "-";
        }
        res = true;

        return res;
    }
    function citiFormat(input) {
        input = input.replace(/\D/g, '');
        input = input.substring(0, 13);
        var size = input.length;
        if (size > 0 && size < 2) {
            input = input;
        } else if (size > 1 && size < 6) {
            input = input.substring(0, 1) + '-' + input.substring(1, 5);
        } else if (size > 5 && size < 11) {
            input = input.substring(0, 1) + '-' + input.substring(1, 5) + '-' + input.substring(5, 10);
        } else if (size > 10 && size < 13) {
            input = input.substring(0, 1) + '-' + input.substring(1, 5) + '-' + input.substring(5, 10) + '-' + input.substring(10, 12);
        } else if (size > 12 && size < 14) {
            input = input.substring(0, 1) + '-' + input.substring(1, 5) + '-' + input.substring(5, 10) + '-' + input.substring(10, 12) + '-' + input.substring(12, 13);
        }
        return input == "-" ? "" : input;
    }
    function chkTel(v, vl, k, ee) {
        let res = false;
        if (vl == 0) {
            if (v == "" && k == "0") {
                res = true;
            } else {
                res = false;
            }
        } else if (vl == 1) {
            if (v == "0" && (k == "6" || k == "8" || k == "9")) {
                res = true;
            } else {
                res = false;
            }
        } else if (vl == 2) {
            res = true;
        } else if (vl >= 3) {
            if (vl == 3) {
                ee.target.value = v.substring(0, 3) + "-";
            } else if (vl == 7) {
                ee.target.value = v.substring(0, 7) + "-";
            }
            res = true;
        } else {
            res = false;
        }
        return res;
    }

    function phoneFormat(input) {
        input = input.replace(/\D/g, '');
        input = input.substring(0, 10);
        var size = input.length;
        var type = input.substring(0, 2);
        var ty = "";
        if (size == 1) {
            if (input != "0") {
                input = "";
            } else {
                input = input;
            }
        } else if (size == 2) {
            if (input != "06" && input != "08" && input != "09") {
                input = "0";
            } else {
                input = input;
            }
        } else {
            if (size > 0 && size < 4) {
                input = input;
            } else if (size < 7) {
                input = input.substring(0, 3) + '-' + input.substring(3, 6);
            } else {
                input = input.substring(0, 3) + '-' + input.substring(3, 6) + '-' + input.substring(6, 10);
            }
        }
        return input == "-" ? "" : input;
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

    function checkPrefix(checkError) {
        var valCarBrand = document.querySelector('.formMain select[id*=ddlPrefix]').value;
        if (valCarBrand == "") {
            document.querySelector('.formMain .prefix').classList.add('validated-error');
            checkError += "prefix|";
        } else {
            document.querySelector('.formMain .prefix').classList.remove('validated-error');
        }

        return checkError;
    }

    function checkTxtName(checkError = '') {
        var valName = document.querySelector('.formMain input[id*=txtName]').value;
        if (valName == "") {
            document.querySelector('.formMain .name').classList.add('validated-error');
            checkError += "name|";
        } else {
            document.querySelector('.formMain .name').classList.remove('validated-error');
        }
        return checkError;
    }

    function checkTxtSurName(checkError = "") {
        var valSurName = document.querySelector('.formMain input[id*=txtSurName]').value;
        if (valSurName == "") {
            document.querySelector('.formMain .surname').classList.add('validated-error');
            checkError += "surname|";

        } else {
            document.querySelector('.formMain .surname').classList.remove('validated-error');
        }

        return checkError;
    }

    function checkTxtCitizen(checkError = "") {
        var valCitizen = document.querySelector('.formMain input[id*=txtCitizen]').value;
        if (valCitizen == "") {
            document.querySelector('.formMain .citizen').classList.add('validated-error');
            document.querySelector('.formMain .citizen .feedback').textContent = "กรุณากรอก";
            checkError += "citizen|";
        } else {
            valCitizen = valCitizen.replace(/-/g, '');
            if (Script_checkID(valCitizen)) {
                document.querySelector('.formMain .citizen').classList.remove('validated-error');
                document.querySelector('.formMain .citizen .feedback').textContent = "";
            }
            else {
                document.querySelector('.formMain .citizen').classList.add('validated-error');
                document.querySelector('.formMain .citizen .feedback').textContent = "กรุณากรอกให้ถูกต้อง";
                checkError += "citizen|";
            }
        }
        return checkError;
    }

    function checkTxtPhone(checkError) {
        var valPhone = document.querySelector('.formMain input[id*=txtPhone]').value.replace(/-/g, '');
        if (valPhone == "") {
            document.querySelector('.formMain .phone').classList.add('validated-error');
            document.querySelector('.formMain .phone .feedback').textContent = "กรุณากรอก";
            checkError += "phone|";
        } else {
            var valPhoneSub = valPhone.substring(0, 2);
            if ((valPhoneSub == "06" || valPhoneSub == "08" || valPhoneSub == "09") && valPhone.length == 10) {
                document.querySelector('.formMain .phone').classList.remove('validated-error');
                document.querySelector('.formMain .phone .feedback').textContent = "";
            } else {
                document.querySelector('.formMain .phone').classList.add('validated-error');
                document.querySelector('.formMain .phone .feedback').textContent = "กรุณากรอกให้ถูกต้อง";
                checkError += "phone|";
            }
        }
        return checkError;
    }

    function checkTxtEmail(checkError) {
        var valEmail = document.querySelector('.formMain input[id*=txtEmail]').value;
        if (valEmail == "") {
            document.querySelector('.formMain .email').classList.add('validated-error');
            document.querySelector('.formMain .email .feedback').textContent = "กรุณากรอก";
            checkError += "email|";
        } else {
            if (isEmail(valEmail)) {
                document.querySelector('.formMain .email').classList.remove('validated-error');
                document.querySelector('.formMain .email .feedback').textContent = "";
            } else {
                document.querySelector('.formMain .email').classList.add('validated-error');
                document.querySelector('.formMain .email .feedback').textContent = "กรุณากรอกให้ถูกต้อง";
                checkError += "email|";
            }
        }
        return checkError;
    }

    function checkTxtAddNo(checkError) {
        var valAddNo = document.querySelector('.formMain input[id*=txtAddNo]').value;
        if (valAddNo == "") {
            document.querySelector('.formMain .addno').classList.add('validated-error');
            checkError += "addno|";
        } else {
            document.querySelector('.formMain .addno').classList.remove('validated-error');
        }
        return checkError;
    }

    function checkTxtZipCode(checkError) {
        var valZipCode = document.querySelector('.formMain input[id*=txtZipCode]').value;


        if (valZipCode == "" || valZipCode.length < 5) {

            document.querySelector('.formMain .zipcode').classList.add('validated-error');
            checkError += "zipcode|";

        }
        else {
            document.querySelector('.formMain .zipcode').classList.remove('validated-error');
        }
        if (valZipCode == "") {
            document.querySelector('.formMain [id*=btnZipCodeHid]').click();
            document.querySelector('.formMain .zipcode .feedback').textContent = "กรุณากรอก";
            // $('select[id*="ddlProvince"]').val("").trigger('change');
            // document.querySelector('.formMain select[id*=ddlProvince]').setAttribute('disabled', 'disabled');

            // $('select[id*="ddlDistric"]').val("").trigger('change');
            // document.querySelector('.formMain select[id*=ddlDistric]').setAttribute('disabled', 'disabled');

            // $('select[id*="ddlSubDistrict"]').val("").trigger('change');
            // document.querySelector('.formMain select[id*=ddlSubDistrict]').setAttribute('disabled', 'disabled');
        }
        else if (valZipCode != "" && (valZipCode.length > 0 && valZipCode.length < 5)) {
            document.querySelector('.formMain .zipcode .feedback').textContent = "กรุณากรอกให้ถูกต้อง";
        }

        return checkError;
    }

    function checkDdlProvince(checkError) {
        var valProvince = document.querySelector('.formMain select[id*=ddlProvince]').value;
        if (valProvince == "") {
            if (document.querySelector('.formMain select[id*=ddlProvince][disabled]') == null) {
                document.querySelector('.formMain .province').classList.add('validated-error');
                checkError += "province|";
            }
        } else {
            document.querySelector('.formMain .province').classList.remove('validated-error');
        }
        return checkError;
    }

    function checkDdlDistrict(checkError) {
        var valDistrict = document.querySelector('.formMain select[id*=ddlDistrict]').value;
        if (valDistrict == "") {
            if (document.querySelector('.formMain select[id*=ddlDistrict][disabled]') == null) {
                document.querySelector('.formMain .district').classList.add('validated-error');
                checkError += "district|";
            }
        } else {
            document.querySelector('.formMain .district').classList.remove('validated-error');
        }
        return checkError;
    }

    function checkDdlSubDistrict(checkError) {
        var valSubDistrict = document.querySelector('.formMain select[id*=ddlSubDistrict]').value;
        if (valSubDistrict == "") {
            if (document.querySelector('.formMain select[id*=ddlSubDistrict][disabled]') == null) {
                document.querySelector('.formMain .subdistrict').classList.add('validated-error');
                checkError += "subdistrict|";
            }
        } else {
            document.querySelector('.formMain .subdistrict').classList.remove('validated-error');
        }
        return checkError;
    }

    function checkValidation() {
        const monthSelect = document.querySelector('select[id*="ddlMonthBirth"]').value;
        const yearSelect = document.querySelector('select[id*="ddlYearBirth"]').value;
        const daySelect = document.querySelector('select[id*="ddlDayBirth"]').value;
        // y-m-d
        const date = yearSelect + '-' + monthSelect + '-' + daySelect;

        var checkError = "";
        checkError += checkPrefix(checkError);

        checkError += checkTxtName(checkError);

        checkError += checkTxtSurName(checkError);

        checkError += checkTxtCitizen(checkError);

        checkError += checkTxtPhone(checkError);

        checkError += checkTxtEmail(checkError);

        checkError += checkTxtAddNo(checkError);

        checkError += checkTxtZipCode(checkError);

        checkError += checkDdlProvince(checkError);

        checkError += checkDdlDistrict(checkError);

        checkError += checkDdlSubDistrict(checkError);

        if (document.querySelector('.formMain [id*=zonePolicyDelivery]')) {
            checkError += checkDeliveryChannel(checkError);
        }
        checkError += validatedDateBirth(checkError);

        if (checkError != "") {
            pushGTMSubmitOnclick(false, checkError);
            scrollToTargetAdjusted('.formMain .' + checkError.split('|')[0]);
            return false;
        }
        else {
            pushGTMSubmitOnclick(true);
            new bootstrap.Modal(document.getElementById('ModalLoading')).show();
            return true;
        }

    }
    function validatedDateBirth(checkError = "") {
        const monthSelect = document.querySelector('select[id*="ddlMonthBirth"]').value;
        const yearSelect = document.querySelector('select[id*="ddlYearBirth"]').value;
        const daySelect = document.querySelector('select[id*="ddlDayBirth"]').value;
        if (yearSelect == '' && monthSelect == '' && daySelect == '') {
            document.querySelector('.form-group.mb-12.form-birthday').classList.add('validated-error');
            checkError += "year|";
            return checkError;
        }
        else if (yearSelect == '' || monthSelect == '' || daySelect == '') {
            document.querySelector('.form-group.mb-12.form-birthday').classList.remove('validated-error');
            document.querySelector('.form-group.mb-12.form-birthday .feedback').textContent = "กรุณาเลือก";
            document.querySelector('.form-group.mb-12.form-birthday .feedback').classList.remove('d-none');
            document.querySelector('.form-group.mb-12.form-birthday .feedback').classList.add('d-block');
            if (yearSelect == '') {
                document.querySelector('.form-group.mb-12.form-birthday .year').classList.add('validated-error');
                checkError += "year|";
            }
            else {
                document.querySelector('.form-group.mb-12.form-birthday .year').classList.remove('validated-error');
            }
            if (monthSelect == '') {
                document.querySelector('.form-group.mb-12.form-birthday .month').classList.add('validated-error');
                checkError += "year|month|";
            }
            else {
                document.querySelector('.form-group.mb-12.form-birthday .month').classList.remove('validated-error');
            }
            if (daySelect == '') {
                document.querySelector('.form-group.mb-12.form-birthday .day').classList.add('validated-error');
                checkError += "year|day|";
            }
            else {
                document.querySelector('.form-group.mb-12.form-birthday .day').classList.remove('validated-error');
            }
            return checkError;
        }
        else if (yearSelect != '' && monthSelect != '' && daySelect != '') {
            document.querySelector('.form-group.mb-12.form-birthday').classList.remove('validated-error');
            document.querySelector('.form-group.mb-12.form-birthday .year').classList.remove('validated-error');
            document.querySelector('.form-group.mb-12.form-birthday .month').classList.remove('validated-error');
            document.querySelector('.form-group.mb-12.form-birthday .day').classList.remove('validated-error');
            document.querySelector('.form-group.mb-12.form-birthday .feedback').textContent = "";
            document.querySelector('.form-group.mb-12.form-birthday .feedback').classList.remove('d-block');
            document.querySelector('.form-group.mb-12.form-birthday .feedback').classList.add('d-none');
            // y-m-d
            //setZero becuase fix bug on ios
            const date = yearSelect + '-' + setZero(monthSelect) + '-' + setZero(daySelect);
            setBirthDate(date, true);
            return checkError;
        }
    }
    function checkEmailDeliveryChannel() {
        if (document.querySelector('.formMain [id*=chbEmail]:checked') != null) {
            document.querySelector('.formMain .policyemail').classList.add('validated-error');
            document.querySelector('.formMain .policyemail .feedback').textContent = "กรุณากรอก";
        }
    }
    function checkSmsDeliveryChannel() {
        if (document.querySelector('.formMain [id*=chbPhone]:checked') != null) {
            document.querySelector('.formMain .policyphone').classList.add('validated-error');
            document.querySelector('.formMain .policyphone .feedback').textContent = "กรุณากรอก";
        }
    }


    function checkDeliveryChannel(checkError) {
        var valPolicyEmail = document.querySelector('.formMain input[id*=txtPolicyEmail]').value;
        var valPolicyPhone = document.querySelector('.formMain input[id*=txtPolicyPhone]').value.replace(/-/g, '');
        // case 1 : ไม่ติ๊ก และ ไม่ใส่อะไรเลย
        if (document.querySelector('.formMain [id*=chbEmail]:checked') == null &&
            document.querySelector('.formMain [id*=chbPhone]:checked') == null &&
            valPolicyEmail == "" && valPolicyPhone == ""
        ) {
            document.querySelector('.form-group.mb-4.policy').classList.add('validated-error');
            document.querySelector('.formMain .policyemail .feedback').textContent = "";
            document.querySelector('.formMain .policyphone .feedback').textContent = "";

            document.querySelector('.form-group.mb-4.policy .mb-12 .feedback').classList.remove('d-none');
            document.querySelector('.form-group.mb-4.policy .mb-12 .feedback').classList.add('d-block');

            checkError += "policyemail|";
        }
        //case 2 : กรณีไม่ได้ติ๊กอะไรเลย
        else if (document.querySelector('.formMain [id*=chbEmail]:checked') == null &&
            document.querySelector('.formMain [id*=chbPhone]:checked') == null) {
            document.querySelector('.form-group.mb-4.policy').classList.remove('validated-error');
            checkError += "policyemail|";
            if (valPolicyEmail != "") {
                document.querySelector('.form-group .chbEmail_').classList.add('validated-error');
                document.querySelector('.formMain .policyemail').classList.remove('validated-error');
                document.querySelector('.form-group.mb-4.policy .mb-12 .feedback').classList.remove('d-none');
                document.querySelector('.form-group.mb-4.policy .mb-12 .feedback').classList.add('d-block');
                checkError += checkEmailFormat(checkError);
                checkError += "policyemail|";
            }
            else {

                document.querySelector('.form-group .chbEmail_').classList.remove('validated-error');
                document.querySelector('.formMain .policyemail').classList.remove('validated-error');
            }

            if (valPolicyPhone != "") {
                document.querySelector('.form-group .chbPhone_').classList.add('validated-error');
                document.querySelector('.formMain .policyphone').classList.remove('validated-error');
                document.querySelector('.form-group.mb-4.policy .mb-12 .feedback').classList.remove('d-none');
                document.querySelector('.form-group.mb-4.policy .mb-12 .feedback').classList.add('d-block');
                checkError += checkSmsValueFormat(checkError);
                checkError += "policyphone|";
            }
            else {
                document.querySelector('.form-group .chbPhone_').classList.remove('validated-error');

                document.querySelector('.formMain .policyphone').classList.remove('validated-error');
            }

            if (valPolicyEmail != "" || valPolicyPhone != "") {
                document.querySelector('.form-group.mb-4.policy .mb-12 .feedback').classList.remove('d-none');
                document.querySelector('.form-group.mb-4.policy .mb-12 .feedback').classList.add('d-block');
            }

        }
        //case 3 : กรณีติ๊กหมด
        else if (document.querySelector('.formMain [id*=chbEmail]:checked') != null &&
            document.querySelector('.formMain [id*=chbPhone]:checked') != null) {
            document.querySelector('.form-group.mb-4.policy').classList.remove('validated-error');
            document.querySelector('.form-group .chbEmail_').classList.remove('validated-error');
            document.querySelector('.form-group .chbPhone_').classList.remove('validated-error');
            if (valPolicyEmail == "") {
                document.querySelector('.formMain .policyemail').classList.add('validated-error');
                document.querySelector('.formMain .policyemail .feedback').textContent = "กรุณากรอก";
                checkError += "policyemail|";
            }
            else {

                document.querySelector('.formMain .policyemail').classList.remove('validated-error');
                document.querySelector('.formMain .policyemail .feedback').textContent = "";
                checkError += checkEmailFormat(checkError);
            }

            if (valPolicyPhone == "") {
                document.querySelector('.formMain .policyphone').classList.add('validated-error');
                document.querySelector('.formMain .policyphone .feedback').textContent = "กรุณากรอก";
                checkError += "policyphone|";
            }
            else {
                document.querySelector('.formMain .policyphone').classList.remove('validated-error');
                document.querySelector('.formMain .policyphone .feedback').textContent = "";
                checkError += checkSmsValueFormat(checkError);
            }
        }
        //case 4 : กรณีติ๊กอย่างใดอย่างนึง
        else if ((document.querySelector('.formMain [id*=chbEmail]:checked') != null
            && document.querySelector('.formMain [id*=chbPhone]:checked') == null) ||
            (document.querySelector('.formMain [id*=chbEmail]:checked') == null
                && document.querySelector('.formMain [id*=chbPhone]:checked') != null)) {
            document.querySelector('.form-group.mb-4.policy').classList.remove('validated-error');
            if (document.querySelector('.formMain [id*=chbEmail]:checked') != null &&
                document.querySelector('.formMain [id*=chbPhone]:checked') == null) {
                document.querySelector('.formMain .policyphone').classList.remove('validated-error');
                document.querySelector('.formMain .policyphone .feedback').textContent = "";
                if (valPolicyEmail == "") {
                    document.querySelector('.formMain .policyemail').classList.add('validated-error');
                    document.querySelector('.formMain .policyemail .feedback').textContent = "กรุณากรอก";
                    checkError += "policyemail|";
                }
                else {

                    document.querySelector('.formMain .policyemail').classList.remove('validated-error');
                    document.querySelector('.formMain .policyemail .feedback').textContent = "";
                    checkError += checkEmailFormat(checkError);
                }
                if (valPolicyPhone != "") {
                    document.querySelector('.form-group .chbPhone_').classList.add('validated-error');
                    document.querySelector('.formMain .policyphone .feedback').textContent = "";
                    document.querySelector('.form-group.mb-4.policy .mb-12 .feedback').classList.remove('d-none');
                    document.querySelector('.form-group.mb-4.policy .mb-12 .feedback').classList.add('d-block');
                    checkSmsValueFormat();
                    checkError += "policyphone|";
                }
                else {
                    document.querySelector('.form-group .chbPhone_').classList.remove('validated-error');
                    document.querySelector('.formMain .policyphone .feedback').textContent = "";
                }
            }
            else if (document.querySelector('.formMain [id*=chbEmail]:checked') == null &&
                document.querySelector('.formMain [id*=chbPhone]:checked') != null) {
                document.querySelector('.formMain .policyemail').classList.remove('validated-error');
                document.querySelector('.formMain .policyemail .feedback').textContent = "";
                if (valPolicyPhone == "") {
                    document.querySelector('.formMain .policyphone').classList.add('validated-error');
                    document.querySelector('.formMain .policyphone .feedback').textContent = "กรุณากรอก";
                    checkError += "policyphone|";
                }
                else {

                    document.querySelector('.formMain .policyphone').classList.remove('validated-error');
                    document.querySelector('.formMain .policyphone .feedback').textContent = "";
                    checkError += checkSmsValueFormat(checkError);
                }
                if (valPolicyEmail != "") {
                    document.querySelector('.form-group .chbEmail_').classList.add('validated-error');
                    document.querySelector('.formMain .policyemail .feedback').textContent = "";
                    document.querySelector('.form-group.mb-4.policy .mb-12 .feedback').classList.remove('d-none');
                    document.querySelector('.form-group.mb-4.policy .mb-12 .feedback').classList.add('d-block');
                    checkError += checkEmailFormat(checkError);
                    checkError += "policyemail|";
                }
                else {

                    document.querySelector('.form-group .chbEmail_').classList.remove('validated-error');
                    document.querySelector('.formMain .policyemail .feedback').textContent = "";
                }
            }
        }


        return checkError;
    }

    function checkEmailFormat(checkError = "") {
        var valPolicyEmail = document.querySelector('.formMain input[id*=txtPolicyEmail]').value;
        if (valPolicyEmail != "") {
            if (isEmail(valPolicyEmail)) {
                document.querySelector('.formMain .policyemail').classList.remove('validated-error');
                document.querySelector('.formMain .policyemail .feedback').textContent = "";
            } else {
                document.querySelector('.formMain .policyemail').classList.add('validated-error');
                document.querySelector('.formMain .policyemail .feedback').textContent = "กรุณากรอกให้ถูกต้อง";
                checkError += "policyemail|";
            }
        }

        return checkError;
    }

    function checkSmsValueFormat(checkError = "") {
        var valPolicyPhone = document.querySelector('.formMain input[id*=txtPolicyPhone]').value.replace(/-/g, '');
        if (valPolicyPhone != "") {
            var valPolicyPhoneSub = valPolicyPhone.substring(0, 2);
            if ((valPolicyPhoneSub == "06" || valPolicyPhoneSub == "08" || valPolicyPhoneSub == "09") && valPolicyPhone.length == 10) {
                document.querySelector('.formMain .policyphone').classList.remove('validated-error');
                document.querySelector('.formMain .policyphone .feedback').textContent = "";
            } else {
                document.querySelector('.formMain .policyphone').classList.add('validated-error');
                document.querySelector('.formMain .policyphone .feedback').textContent = "กรุณากรอกให้ถูกต้อง";
                checkError += "policyphone|";
            }
        }

        return checkError;
    }

    function Script_checkID(id) {
        if (id.substring(0, 1) == 0) return false;
        if (id.length != 13) return false;
        for (i = 0, sum = 0; i < 12; i++)
            sum += parseFloat(id.charAt(i)) * (13 - i);
        if ((11 - sum % 11) % 10 != parseFloat(id.charAt(12))) return false;
        return true;
    }

    function isEmail(email) {
        var regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return regex.test(email);
    }

    // Function of Birthday  
    function generateYearList() {
        const month = ["มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน", "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"];
        const startYear = 1900; // Specify the start year
        let endYear = new Date().getFullYear(); // Get the current year

        let maxYear = endYear - 85; //Age max is 85
        let minYear = endYear - 20;//Age min is 20
        const yearList = [];

        for (let year = endYear; year >= startYear; year--) {
            if (year >= maxYear && year <= minYear) {
                yearList.push(year);
            }
        }

        var selectYearElement = $('select[id*="ddlYearBirth"]');

        var yearData = [];
        for (var i = 0; i < yearList.length; i++) {
            if (i == 0) {
                yearData.push({ id: '', text: 'เลือกปี' });
            }
            yearData.push({ id: yearList[i], text: yearList[i] + 543 });
        }
        selectYearElement.select2({ data: yearData });

        var selectMonthElement = $('select[id*="ddlMonthBirth"]');
        var monthData = [];
        for (var i = 0; i < month.length; i++) {
            if (i == 0) {
                monthData.push({ id: '', text: 'เลือกเดือน' });
            }
            monthData.push({ id: i + 1, text: month[i] });
        }
        selectMonthElement.select2({ data: monthData });


        const daysIn_ = getAllDaysInMonth(minYear, 1);
        setDay(daysIn_);

        if (document.querySelector('[id*=birthDateVal]').value != '') {
            let birthDay = document.querySelector('[id*=birthDateVal]').value;
            document.querySelector('select[id*="ddlDayBirth"]').value = new Date(birthDay).getDate();
            $('select[id*="ddlDayBirth"]').val(new Date(birthDay).getDate()).trigger('change');
            document.querySelector('select[id*="ddlMonthBirth"]').value = new Date(birthDay).getMonth() + 1;
            $('select[id*="ddlMonthBirth"]').val(new Date(birthDay).getMonth() + 1).trigger('change');
            document.querySelector('select[id*="ddlYearBirth"]').value = new Date(birthDay).getFullYear();
            $('select[id*="ddlYearBirth"]').val(new Date(birthDay).getFullYear()).trigger('change');
        }
    }

    function getAllDaysInMonth(year, month) {
        const startDate = new Date(year, month - 1, 1);

        const endDate = new Date(year, month, 0);

        const daysInMonth = [];

        for (let currentDate = startDate; currentDate <= endDate; currentDate.setDate(currentDate.getDate() + 1)) {
            daysInMonth.push(new Date(currentDate));
        }

        return daysInMonth.length;
    }

    function setDay(days) {
        var selectDayElement = $('select[id*="ddlDayBirth"]');
        var dayData = [];
        for (var i = 0; i < days; i++) {
            if (i == 0) {
                dayData.push({ id: '', text: 'เลือกวัน' });
            }
            dayData.push({ id: i + 1, text: i + 1 });
        }

        selectDayElement.select2({ data: dayData });
    }

    function monthYearChange() {
        const monthSelect = document.querySelector('select[id*="ddlMonthBirth"]').value;
        const yearSelect = document.querySelector('select[id*="ddlYearBirth"]').value;
        const daysIn_ = getAllDaysInMonth(yearSelect, monthSelect);

        checkIsDayBetween(daysIn_);
        const daySelect = document.querySelector('select[id*="ddlDayBirth"]').value;
        // y-m-d
        if (yearSelect != '' && monthSelect != '' && daySelect != '') {
            //setZero becuase fix bug on ios
            const date = yearSelect + '-' + setZero(monthSelect) + '-' + setZero(daySelect);
            setBirthDate(date, false)
        }
    }

    function setZero(text) {
        if (text.length == 1) {
            return '0' + text;
        }

        return text;
    }

    function resetYear(days) {
        document.querySelector('select[id*="ddlDayBirth"]').innerHTML = "";
        setDay(days);
        document.querySelector('select[id*="ddlDayBirth"]').value = "";
    }

    function addDay(currentDay, allDay) {
        var selectDayElement = $('select[id*="ddlDayBirth"]');

        var selectedOption = $('select[id*="ddlDayBirth"]').select2('data')[0];

        let startIndex = parseInt(selectedOption.id) + 1;

        for (var i = startIndex; i <= 31; i++) {
            $('select[id*="ddlDayBirth"]').find('option[value="' + i + '"]').remove();
            $('select[id*="ddlDayBirth"]').trigger('change');
        }

        // var index = 1;
        var dayData = [];
        for (var i = startIndex; i <= allDay; i++) {
            var dayData = [];
            $('select[id*="ddlDayBirth"]').append(new Option(parseInt(i), parseInt(i), false, false)).trigger('change');
        }

    }

    function checkIsDayBetween(days) {
        const selectElementDay = document.querySelector('select[id*="ddlDayBirth"]').value;

        if (parseInt(selectElementDay) > parseInt(days) || selectElementDay == "") {
            document.querySelector('select[id*="ddlDayBirth"]').value = "";
            resetYear(days);
        }
        else {
            addDay(parseInt(selectElementDay), parseInt(days));
        }
    }

    function pushGTMCustomerInfo(action, label) {
        PushGTMDefault('customer_info', action, label);
    }

    function findDuplicates(array1, array2) {
        return array1.filter(item => array2.includes(item));
    }

    function pushGTMSubmitOnclick(validate, error = null) {
        if (validate) {
            dataLayer.push({
                'event': 'track_event',
                'event_category': 'customer_info',
                'event_action': 'submit-customer_info',
                'event_label': 'submit_complete',
                'field': ''
            });

            pushGTMAddShippingInfoEcommerce();

            if (document.querySelector("[id*=zonePolicyDelivery]") == null) {
                PushGTMDefault('customer_info', 'select_delivery_address', document.querySelector("[id*=hdChannelDeliveryText]").value);
            }
        }
        else {
            let fieldError = error.split('|').join(', ');
            let fieldErrorMaster = [
                'prefix',
                'name',
                'surname',
                'citizen',
                'phone',
                'email',
                'addno',
                'province',
                'zipcode',
                'district',
                'subdistrict',
                'year',
                'month',
                'day'
            ];
            if (document.querySelector('.formMain [id*=zonePolicyDelivery]')) {
                fieldErrorMaster.push('policyemail');
                fieldErrorMaster.push('policyphone');
            }

            let fieldError_ = error.split('|');
            let fieldErrorLength = findDuplicates(fieldErrorMaster, fieldError_);

            if (fieldErrorLength.length == fieldErrorMaster.length) {
                fieldError = "error_all_field";
            }
            else {
                fieldError = fieldErrorLength.join(', ');
            }

            dataLayer.push({
                'event': 'track_event',
                'event_category': 'customer_info',
                'event_action': 'submit-customer_info',
                'event_label': 'submit_incomplete',
                'field': fieldError
            });
        }

    }

    function pushGTMAddShippingInfoEcommerce() {
        let variantText = '';
        let isRed = document.querySelector("[id*=hdCarIsRedText]").value;
        if (isRed == 'NOTRED' || isRed == 'NotRed') {
            variantText = 'ป้ายขาว';
        }
        else {
            variantText = 'ป้ายแดง';
        }
        dataLayer.push({
            "event": "add_shipping_info",
            "ecommerce": {
                "currency": "THB",
                "value": document.querySelector("[id*=hdPriceText]").value,
                "channel": document.querySelector("[id*=hdChannelText]").value,// ***Required / eg. ntl_app, ntl_web, heygoody
                "items": [
                    {
                        "item_id": document.querySelector("[id*=hdVehicleCategoryId]").value, //***Required / eg. 0001
                        "item_name": document.querySelector("[id*=hdVehicleNameText]").value + "/" + document.querySelector("[id*=hdVehicleCategoryText]").value, //***Required / eg. รถเก๋ง / ส่วนบุคคล, รถบรรทุก / ไม่เกิน 3 ตัน {{car_type / ประเภทการใช้งาน}}
                        "item_brand": document.querySelector("[id*=hdVehicleCategoryText]").value, //eg. ส่วนบุคคล, ไม่เกิน 3 ตัน {vehicle_category}
                        "item_category": document.querySelector("[id*=hdCarBrandText]").value, //{car_brand}
                        "item_category2": document.querySelector("[id*=hdCarModelText]").value, //{car_model}
                        "item_category3": document.querySelector("[id*=hdCarColorText]").value, //{car_color}
                        "item_category4": document.querySelector("[id*=hdCarRegisterYearText]").value, //{car_year}
                        "item_category5": document.querySelector("[id*=hdCarRegisterProvinceText]").value, //{car_registered_province} 
                        "item_variant": variantText, //eg. ป้ายแดง, ป้ายขาว
                        "start_coverage_date": document.querySelector("[id*=hdCoverageDateStartText]").value,
                        "end_coverage_date": document.querySelector("[id*=hdCoverageDateEndText]").value,
                        "price": document.querySelector("[id*=hdPriceText]").value,// ***Required / eg. 645.21 
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

    function clearValue(type, containner) {
        document.querySelector(`.formMain input[id*=${type}]`).value = "";

        document.querySelector(`.form-group.${containner} a img`).classList.add("hide");
    }

    function setShowHide(focus, containner) {
        if (focus) {
            setTimeout(() => addShow(containner), 400);
        }
        else {
            setTimeout(() => removeShow(containner), 400);
        }
    }

    function removeShow(containner) {
        if (document.querySelector(`.form-group.${containner} a`)) {
            document.querySelector(`.form-group.${containner} a`).classList.remove("clearfiled-show");
            document.querySelector(`.form-group.${containner} a`).classList.add("clearfiled-hide");
        }
    }
    function addShow(containner) {
        if (document.querySelector(`.form-group.${containner} a`)) {
            document.querySelector(`.form-group.${containner} a`).classList.add("clearfiled-show");
            document.querySelector(`.form-group.${containner} a`).classList.remove("clearfiled-hide");
        }
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
}
