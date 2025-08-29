/* eslint-disable @next/next/no-img-element */

import React from 'react'
import { Metadata } from 'next'
import Image from 'next/image'
import MainWithDynamicStyle from '@/cmi-layout/components/MainWithDynamicStyle'
import { getDataFromSession } from '@/helpers/functions/getDataFromSession'

export const dynamic = 'force-dynamic'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'ข้อมูลผู้เอาประกันพ.ร.บ.รถยนต์ | ติดล้อ',
    description: 'ข้อมูลผู้เอาประกันพ.ร.บ.รถยนต์ | ติดล้อ',
  }
}

const Page = async () => {
  const { channelData } = await getDataFromSession()
  const configValue: Record<string, any> = JSON.parse(channelData?.channelConfig?.configValue ?? '{}')

  return (
    <MainWithDynamicStyle primaryColor={configValue?.primaryColor} secondaryColor={configValue?.secondaryColor}>
      <div className="head-bar">
        <div className="container d-flex align-items-center">
          <a href="/th/CarInformation" className="back-btn">
            <img alt="กลับ" width="36" height="36" src="/assets/icon/back.png" />
          </a>
          <p
            id="p_lt_ctl00_pageplaceholder_p_lt_ctl00_CustomerInformation_lbHeaderBar"
            className="text-center mb-0 w-100 fs-18 f-bd"
          >
            พ.ร.บ.
          </p>
        </div>
      </div>

      {/* Head Section */}
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
                <div className="progress-2-value">
                  50<span>%</span>
                </div>
              </div>
            </div>
            <div className="step-title-wrapper ms-12">
              <p className="mb-0 text-grey fs-14">ขั้นตอนที่ 1/3</p>
              <h1 className="mb-0 text-grey fs-6 f-bd">กรอกข้อมูล</h1>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="content-section fullPage-150">
        <div className="container">
          <div className="d-flex justify-content-between pt-3 pb-12">
            <h2 className="mb-0 text-black fs-18">
              <strong>ข้อมูลผู้เอาประกัน (เจ้าของรถ)</strong>
            </h2>
          </div>

          <div className="formMain">
            <div className="form-group mb-12 prefix">
              <select
                name="p$lt$ctl00$pageplaceholder$p$lt$ctl00$CustomerInformation$ddlPrefix"
                id="p_lt_ctl00_pageplaceholder_p_lt_ctl00_CustomerInformation_ddlPrefix"
                className="form-control"
              >
                <option value="">เลือกคำนำหน้า</option>
                <option value="1">นาย</option>
                <option value="2">นาง</option>
                <option value="3">นางสาว</option>
              </select>
              <label className="form-label">คำนำหน้า</label>
              <div className="feedback">กรุณาเลือก</div>
            </div>

            <div className="form-group mb-12 name">
              <input
                name="p$lt$ctl00$pageplaceholder$p$lt$ctl00$CustomerInformation$txtName"
                type="text"
                maxLength={50}
                id="p_lt_ctl00_pageplaceholder_p_lt_ctl00_CustomerInformation_txtName"
                className="form-control onlyThai"
                placeholder="กรอกชื่อตามบัตรประชาชน"
              />
              <a className="d-flex align-items-center justify-content-center clearFeild-btn-wrapper clearfiled-hide">
                <img
                  className="img-fluid mb-2 mx-auto position-absolute clearFeild-btn hide"
                  alt="test"
                  width="24"
                  height="24"
                  src="/cmisite/media/assets/icon-clear.png"
                />
              </a>
              <label className="form-label">ชื่อ</label>
              <div className="feedback">กรุณากรอก</div>
            </div>

            <div className="form-group mb-12 surname">
              {/* onkeydown="if (!window.__cfRLUnblockHandlers) return false; return (event.keyCode!=13);" */}
              <input
                name="p$lt$ctl00$pageplaceholder$p$lt$ctl00$CustomerInformation$txtSurName"
                type="text"
                maxLength={50}
                id="p_lt_ctl00_pageplaceholder_p_lt_ctl00_CustomerInformation_txtSurName"
                className="form-control onlyThai"
                placeholder="กรอกนามสกุลตามบัตรประชาชน"
              />
              {/* onclick="if (!window.__cfRLUnblockHandlers) return false; clearValue('txtSurName', 'surname'); checkTxtSurName();" */}
              <a className="d-flex align-items-center justify-content-center clearFeild-btn-wrapper clearfiled-hide">
                <img
                  className="img-fluid mb-2 mx-auto position-absolute clearFeild-btn hide"
                  alt="test"
                  width="24"
                  height="24"
                  src="/cmisite/media/assets/icon-clear.png"
                />
              </a>
              <label className="form-label">นามสกุล</label>
              <div className="feedback">กรุณากรอก</div>
            </div>

            <div className="form-group mb-12 citizen">
              {/* onkeydown="if (!window.__cfRLUnblockHandlers) return false; return (event.keyCode!=13);" */}
              <input
                name="p$lt$ctl00$pageplaceholder$p$lt$ctl00$CustomerInformation$txtCitizen"
                type="text"
                maxLength={17}
                id="p_lt_ctl00_pageplaceholder_p_lt_ctl00_CustomerInformation_txtCitizen"
                className="form-control chkCiti"
                placeholder="กรอกรหัสบัตรประชาชน 13 หลัก"
              />
              {/* onclick="if (!window.__cfRLUnblockHandlers) return false; clearValue('txtCitizen', 'citizen'); checkTxtCitizen();" */}
              <a className="d-flex align-items-center justify-content-center clearFeild-btn-wrapper clearfiled-hide">
                <img
                  className="img-fluid mb-2 mx-auto position-absolute clearFeild-btn hide"
                  alt="test"
                  width="24"
                  height="24"
                  src="/cmisite/media/assets/icon-clear.png"
                />
              </a>
              <label className="form-label">เลขบัตรประชาชน</label>
              <div className="feedback">กรุณากรอก</div>
            </div>

            <span className="fs-14 f-bd d-block mb-2 birtday-textFeild">วันเกิด</span>
            <div className="form-group mb-12 form-birthday">
              <div>
                <div className="d-flex">
                  <div className="w-100 position-relative year">
                    <select
                      name="p$lt$ctl00$pageplaceholder$p$lt$ctl00$CustomerInformation$ddlYearBirth"
                      id="p_lt_ctl00_pageplaceholder_p_lt_ctl00_CustomerInformation_ddlYearBirth"
                      className="form-control"
                    >
                      <option value="">เลือกปี</option>
                    </select>
                    <label className="form-label">ปี</label>
                    <input
                      type="hidden"
                      name="p$lt$ctl00$pageplaceholder$p$lt$ctl00$CustomerInformation$birthDateVal"
                      id="p_lt_ctl00_pageplaceholder_p_lt_ctl00_CustomerInformation_birthDateVal"
                    />
                  </div>
                  <div className="ms-2 me-2 w-100 position-relative month">
                    <select
                      name="p$lt$ctl00$pageplaceholder$p$lt$ctl00$CustomerInformation$ddlMonthBirth"
                      id="p_lt_ctl00_pageplaceholder_p_lt_ctl00_CustomerInformation_ddlMonthBirth"
                      className="form-control"
                    ></select>
                    <label className="form-label">เดือน</label>
                  </div>
                  <div className="ms-0 w-100 position-relative day">
                    <select
                      name="p$lt$ctl00$pageplaceholder$p$lt$ctl00$CustomerInformation$ddlDayBirth"
                      id="p_lt_ctl00_pageplaceholder_p_lt_ctl00_CustomerInformation_ddlDayBirth"
                      className="form-control"
                    ></select>
                    <label className="form-label">วัน</label>
                  </div>
                </div>
                <div className="feedback">กรุณาเลือก</div>
              </div>
            </div>

            <div className="form-group mb-12 phone">
              {/* onkeydown="if (!window.__cfRLUnblockHandlers) return false; return (event.keyCode!=13);" */}
              <input
                name="p$lt$ctl00$pageplaceholder$p$lt$ctl00$CustomerInformation$txtPhone"
                type="text"
                maxLength={12}
                id="p_lt_ctl00_pageplaceholder_p_lt_ctl00_CustomerInformation_txtPhone"
                className="form-control chkMobile"
                placeholder="กรอกเบอร์โทรศัพท์"
              />
              {/* onclick="if (!window.__cfRLUnblockHandlers) return false; clearValue('txtPhone', 'phone'); checkTxtPhone();" */}
              <a className="d-flex align-items-center justify-content-center clearFeild-btn-wrapper clearfiled-hide">
                <img
                  className="img-fluid mb-2 mx-auto position-absolute clearFeild-btn hide"
                  alt="test"
                  width="24"
                  height="24"
                  src="/cmisite/media/assets/icon-clear.png"
                />
              </a>
              <label className="form-label">เบอร์โทรศัพท์ </label>
              <div className="feedback">กรุณากรอก</div>
            </div>

            <div className="form-group mb-12 email">
              {/* onkeydown="if (!window.__cfRLUnblockHandlers) return false; return (event.keyCode!=13);" */}
              <input
                name="p$lt$ctl00$pageplaceholder$p$lt$ctl00$CustomerInformation$txtEmail"
                type="text"
                maxLength={50}
                id="p_lt_ctl00_pageplaceholder_p_lt_ctl00_CustomerInformation_txtEmail"
                className="form-control chkEmail"
                placeholder="กรอกอีเมล"
              />
              {/* onclick="if (!window.__cfRLUnblockHandlers) return false; clearValue('txtEmail', 'email'); checkTxtEmail();" */}
              <a className="d-flex align-items-center justify-content-center clearFeild-btn-wrapper clearfiled-hide">
                <img
                  className="img-fluid mb-2 mx-auto position-absolute clearFeild-btn hide"
                  alt="test"
                  width="24"
                  height="24"
                  src="/cmisite/media/assets/icon-clear.png"
                />
              </a>
              <label className="form-label">
                อีเมล{' '}
                <span id="p_lt_ctl00_pageplaceholder_p_lt_ctl00_CustomerInformation_lbPolicyEmail">
                  (ใช้สำหรับรับกรมธรรม์อิเล็กทรอนิกส์)
                </span>
              </label>
              <div className="feedback">กรุณากรอก</div>
            </div>
            <h2 className="mb-12 mt-4 text-black fs-18">
              <strong>ที่อยู่ปัจจุบัน</strong>
            </h2>
            <div className="d-flex">
              <div className="form-group mb-12 me-2 w-100 addno">
                {/* onkeydown="if (!window.__cfRLUnblockHandlers) return false; return (event.keyCode!=13);" */}
                <input
                  name="p$lt$ctl00$pageplaceholder$p$lt$ctl00$CustomerInformation$txtAddNo"
                  type="text"
                  maxLength={15}
                  id="p_lt_ctl00_pageplaceholder_p_lt_ctl00_CustomerInformation_txtAddNo"
                  className="form-control "
                  placeholder="กรอกบ้านเลขที่"
                />
                {/* onclick="if (!window.__cfRLUnblockHandlers) return false; clearValue('txtAddNo', 'addno'); checkTxtAddNo();" */}
                <a className="d-flex align-items-center justify-content-center clearFeild-btn-wrapper clearfiled-hide">
                  <img
                    className="img-fluid mb-2 mx-auto position-absolute clearFeild-btn hide"
                    alt="test"
                    width="24"
                    height="24"
                    src="/cmisite/media/assets/icon-clear.png"
                  />
                </a>
                <label className="form-label">บ้านเลขที่</label>
                <div className="feedback">กรุณากรอก</div>
              </div>
              <div className="form-group mb-12 ms-2 w-100 addmoo">
                {/* onkeydown="if (!window.__cfRLUnblockHandlers) return false; return (event.keyCode!=13);" */}
                <input
                  name="p$lt$ctl00$pageplaceholder$p$lt$ctl00$CustomerInformation$txtAddMoo"
                  type="text"
                  maxLength={5}
                  id="p_lt_ctl00_pageplaceholder_p_lt_ctl00_CustomerInformation_txtAddMoo"
                  className="form-control "
                  placeholder="กรอกหมู่ที่"
                />
                {/* onclick="if (!window.__cfRLUnblockHandlers) return false; clearValue('txtAddMoo', 'addmoo');" */}
                <a className="d-flex align-items-center justify-content-center clearFeild-btn-wrapper clearfiled-hide">
                  <img
                    className="img-fluid mb-2 mx-auto position-absolute clearFeild-btn hide"
                    alt="test"
                    width="24"
                    height="24"
                    src="/cmisite/media/assets/icon-clear.png"
                  />
                </a>
                <label className="form-label">หมู่ที่</label>
              </div>
            </div>
            <div className="form-group mb-12 addBuild">
              {/* onkeydown="if (!window.__cfRLUnblockHandlers) return false; return (event.keyCode!=13);" */}
              <input
                name="p$lt$ctl00$pageplaceholder$p$lt$ctl00$CustomerInformation$txtAddBuild"
                type="text"
                maxLength={50}
                id="p_lt_ctl00_pageplaceholder_p_lt_ctl00_CustomerInformation_txtAddBuild"
                className="form-control "
                placeholder="กรอกหมู่บ้าน/อาคาร"
              />
              {/* onclick="if (!window.__cfRLUnblockHandlers) return false; clearValue('txtAddBuild', 'addBuild');" */}
              <a className="d-flex align-items-center justify-content-center clearFeild-btn-wrapper clearfiled-hide">
                <img
                  className="img-fluid mb-2 mx-auto position-absolute clearFeild-btn hide"
                  alt="test"
                  width="24"
                  height="24"
                  src="/cmisite/media/assets/icon-clear.png"
                />
              </a>
              <label className="form-label">ชื่อหมู่บ้าน/อาคาร</label>
            </div>
            <div className="d-flex">
              <div className="form-group mb-12 me-2 w-100 addSoi">
                {/* onkeydown="if (!window.__cfRLUnblockHandlers) return false; return (event.keyCode!=13);" */}
                <input
                  name="p$lt$ctl00$pageplaceholder$p$lt$ctl00$CustomerInformation$txtAddSoi"
                  type="text"
                  maxLength={25}
                  id="p_lt_ctl00_pageplaceholder_p_lt_ctl00_CustomerInformation_txtAddSoi"
                  className="form-control "
                  placeholder="กรอกซอย/ตรอก"
                />
                {/* onclick="if (!window.__cfRLUnblockHandlers) return false; clearValue('txtAddSoi', 'addSoi');" */}
                <a className="d-flex align-items-center justify-content-center clearFeild-btn-wrapper clearfiled-hide">
                  <img
                    className="img-fluid mb-2 mx-auto position-absolute clearFeild-btn hide"
                    alt="test"
                    width="24"
                    height="24"
                    src="/cmisite/media/assets/icon-clear.png"
                  />
                </a>
                <label className="form-label">ซอย/ตรอก</label>
              </div>
              <div className="form-group mb-12 ms-2 w-100 addRoad">
                {/* onkeydown="if (!window.__cfRLUnblockHandlers) return false; return (event.keyCode!=13);" */}
                <input
                  name="p$lt$ctl00$pageplaceholder$p$lt$ctl00$CustomerInformation$txtAddRoad"
                  type="text"
                  maxLength={25}
                  id="p_lt_ctl00_pageplaceholder_p_lt_ctl00_CustomerInformation_txtAddRoad"
                  className="form-control "
                  placeholder="กรอกถนน"
                />
                {/* onclick="if (!window.__cfRLUnblockHandlers) return false; clearValue('txtAddRoad', 'addRoad');" */}
                <a className="d-flex align-items-center justify-content-center clearFeild-btn-wrapper clearfiled-hide">
                  <img
                    className="img-fluid mb-2 mx-auto position-absolute clearFeild-btn hide"
                    alt="test"
                    width="24"
                    height="24"
                    src="/cmisite/media/assets/icon-clear.png"
                  />
                </a>
                <label className="form-label">ถนน</label>
              </div>
            </div>

            <div id="p_lt_ctl00_pageplaceholder_p_lt_ctl00_CustomerInformation_panelSelect">
              <div className="d-flex">
                <div className="form-group mb-12 me-2 w-100 zipcode">
                  {/* onkeydown="if (!window.__cfRLUnblockHandlers) return false; return (event.keyCode!=13);" onpaste="if (!window.__cfRLUnblockHandlers) return false; return false;" ondrop="if (!window.__cfRLUnblockHandlers) return false; return false;" */}
                  <input
                    name="p$lt$ctl00$pageplaceholder$p$lt$ctl00$CustomerInformation$txtZipCode"
                    type="text"
                    maxLength={5}
                    id="p_lt_ctl00_pageplaceholder_p_lt_ctl00_CustomerInformation_txtZipCode"
                    className="form-control onlyNum chkZipCode"
                    placeholder="กรอกรหัสไปรษณีย์"
                  />
                  {/* onclick="if (!window.__cfRLUnblockHandlers) return false; clearValue('txtZipCode', 'zipcode'); checkTxtZipCode();" */}
                  <a className="d-flex align-items-center justify-content-center clearFeild-btn-wrapper clearfiled-hide">
                    <img
                      className="img-fluid mb-2 mx-auto position-absolute clearFeild-btn hide"
                      alt="test"
                      width="24"
                      height="24"
                      src="/cmisite/media/assets/icon-clear.png"
                    />
                  </a>
                  <label className="form-label">รหัสไปรษณีย์</label>
                  <div className="feedback">กรุณากรอก</div>
                </div>
                <input
                  type="submit"
                  name="p$lt$ctl00$pageplaceholder$p$lt$ctl00$CustomerInformation$btnZipCodeHid"
                  value=""
                  id="p_lt_ctl00_pageplaceholder_p_lt_ctl00_CustomerInformation_btnZipCodeHid"
                  className="d-none"
                />
                <div className="form-group mb-12 ms-2 w-100 province">
                  {/* onchange="javascript:setTimeout('__doPostBack(\'p$lt$ctl00$pageplaceholder$p$lt$ctl00$CustomerInformation$ddlProvince\',\'\')', 0)" */}
                  <select
                    name="p$lt$ctl00$pageplaceholder$p$lt$ctl00$CustomerInformation$ddlProvince"
                    id="p_lt_ctl00_pageplaceholder_p_lt_ctl00_CustomerInformation_ddlProvince"
                    disabled
                    data-select2-id="select2-data-p_lt_ctl00_pageplaceholder_p_lt_ctl00_CustomerInformation_ddlProvince"
                    className="select2-hidden-accessible"
                    aria-hidden="true"
                  >
                    <option value="" data-select2-id="select2-data-136-c8te">
                      เลือกจังหวัด
                    </option>
                  </select>
                  <span
                    className="select2 select2-container select2-container--default select2-container--disabled"
                    dir="ltr"
                    data-select2-id="select2-data-135-19ca"
                    style={{ width: '99px' }}
                  >
                    <span className="selection">
                      <span
                        className="select2-selection select2-selection--single"
                        role="combobox"
                        aria-haspopup="true"
                        aria-expanded="false"
                        aria-disabled="true"
                        aria-labelledby="select2-p_lt_ctl00_pageplaceholder_p_lt_ctl00_CustomerInformation_ddlProvince-container"
                        aria-controls="select2-p_lt_ctl00_pageplaceholder_p_lt_ctl00_CustomerInformation_ddlProvince-container"
                      >
                        <span
                          className="select2-selection__rendered"
                          id="select2-p_lt_ctl00_pageplaceholder_p_lt_ctl00_CustomerInformation_ddlProvince-container"
                          role="textbox"
                          aria-readonly="true"
                          title="เลือกจังหวัด"
                        >
                          เลือกจังหวัด
                        </span>
                        <span className="select2-selection__arrow" role="presentation">
                          <b role="presentation"></b>
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
                  <select
                    name="p$lt$ctl00$pageplaceholder$p$lt$ctl00$CustomerInformation$ddlDistrict"
                    id="p_lt_ctl00_pageplaceholder_p_lt_ctl00_CustomerInformation_ddlDistrict"
                    disabled
                  >
                    <option value="">เลือกเขต/อำเภอ</option>
                  </select>
                  <label className="form-label">เขต/อำเภอ</label>
                  <div className="feedback">กรุณาเลือก</div>
                </div>
                <div className="form-group mb-12 ms-2 w-100 subdistrict">
                  <select
                    name="p$lt$ctl00$pageplaceholder$p$lt$ctl00$CustomerInformation$ddlSubDistrict"
                    id="p_lt_ctl00_pageplaceholder_p_lt_ctl00_CustomerInformation_ddlSubDistrict"
                    disabled
                  >
                    <option value="">เลือกแขวง/ตำบล</option>
                  </select>
                  <label className="form-label">แขวง/ตำบล</label>
                  <div className="feedback">กรุณาเลือก</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <a
          href="/th/ReviewSummary"
          id="p_lt_ctl00_pageplaceholder_p_lt_ctl00_CustomerInformation_btnSubmit"
          className="btn btn-primary fs-6 d-flex justify-content-center align-items-center mx-auto mb-4 mt-12"
          data-cf-modified-591f8b295234a2d03ed50c79-=""
        >
          ดำเนินการต่อ
        </a>
      </div>
      <div
        className="modal fade modalSpinner"
        id="ModalLoading"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content bg-transparent border-0 justify-content-center align-items-center mx-auto">
            <div className="spinner-border text-light"></div>
            <p className="text-white text-center mt-3 mb-0">
              กำลังดำเนินการ
              <br />
              กรุณารอซักครู่
            </p>
          </div>
        </div>
      </div>
    </MainWithDynamicStyle>
  )
}

export default Page
