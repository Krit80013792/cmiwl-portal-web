/* eslint-disable @next/next/no-img-element */

import React from 'react'
import { Metadata } from 'next'
import { cookies } from 'next/headers'
import { getIronSession } from 'iron-session'
import { sessionOptions } from '@/src/shared/utils/session'
import Image from 'next/image'

export const dynamic = 'force-dynamic'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'ข้อมูลรถยนต์สำหรับซื้อพ.ร.บ. รถยนต์ | ติดล้อ',
    description: 'ข้อมูลรถยนต์สำหรับซื้อพ.ร.บ. รถยนต์ | ติดล้อ',
  }
}

async function getCarColor(token: string) {
  try {
    const res = await fetch(`${process.env.TIDLOR_TECH_URI}/api/master-data/v1/car-color`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
    if (res?.status === 401) {
      // redirect
    }
    const carColorData = await res.json()
    return carColorData?.data ?? []
  } catch {}
}

export default async function CarInformation() {
  const session = await getIronSession(await cookies(), sessionOptions)
  const sessionData = (session as any)?.usrData?.data
  const token = sessionData?.jwt

  const carColor = await getCarColor(token)

  return (
    <main
      style={{
        ['--primary' as any]: '#f2b41c',
        ['--bg-active' as any]: '#fff8e6',
      }}
    >
      {/* <!--------- dropdown select2 --------->
<!-- <link href="/CMSPages/GetResource.ashx?stylesheetname=custom-select2&=v1.3" type="text/css" rel="stylesheet" /> -->
<link href="/custom/plugin/select2/css/select2.min.css" rel="stylesheet">
<script src="/custom/plugin/jquery/jquery-3.4.1.min.js" type="903f39338c6b3be20c53ec4e-text/javascript"></script>
<script src="/custom/plugin/select2/js/select2.min.js" type="903f39338c6b3be20c53ec4e-text/javascript"></script>
<!--------- dropdown select2 ---------> */}

      <div className="head-bar">
        <div className="container d-flex align-items-center">
          {/* onclick="if (!window.__cfRLUnblockHandlers) return false; return backOnclick();" */}
          <a href="/th/VehicleCTP" className="back-btn">
            <img alt="กลับ" width="36" height="36" src="/assets/icon/back.png" />
          </a>
          <p
            id="p_lt_ctl00_pageplaceholder_p_lt_ctl00_CarInformation_lbHeaderBar"
            className="text-center mb-0 w-100 fs-18 f-bd"
          >
            พ.ร.บ.
          </p>
        </div>
      </div>

      <div className="head-section bg-lightgrey pt-48">
        <div className="container">
          <div className="d-flex py-12 align-items-center">
            <div className="percent-30">
              <div className="progress-2 yellow">
                <span className="progress-2-left">
                  <span className="progress-2-bar"></span>
                </span>
                <span className="progress-2-right">
                  <span className="progress-2-bar"></span>
                </span>
                <div className="progress-2-value">
                  30<span>%</span>
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

      <div className="content-section fullPage-150">
        <div className="container">
          <div className="d-flex justify-content-between pt-3 pb-12">
            <h2 className="mb-0 text-black fs-18">
              <strong>บอกข้อมูลรถของคุณกับเราหน่อย</strong>
            </h2>
          </div>
          <div className="formMain">
            <div id="p_lt_ctl00_pageplaceholder_p_lt_ctl00_CarInformation_panelSelect">
              <div className="row car-brand">
                <div className="col-4 pe-6 mb-12">
                  {/* onclick="if (!window.__cfRLUnblockHandlers) return false; selCarBrand(this);" */}
                  <div
                    className="border-grey rounded-4 text-center js-listdata"
                    data-index="MQCB0000007"
                    data-text="TOYOTA"
                    data-cf-modified-903f39338c6b3be20c53ec4e-=""
                  >
                    <img alt="TOYOTA" width="48" height="48" src="/assets/logo-car/toyota.png" />
                  </div>
                </div>
                <div className="col-4 px-6 mb-12">
                  {/* onclick="if (!window.__cfRLUnblockHandlers) return false; selCarBrand(this);" */}
                  <div
                    className="border-grey rounded-4 text-center js-listdata"
                    data-index="MQCB0000001"
                    data-text="ISUZU"
                    data-cf-modified-903f39338c6b3be20c53ec4e-=""
                  >
                    <img alt="ISUZU" width="48" height="48" src="/assets/logo-car/isuzu.png" />
                  </div>
                </div>
                <div className="col-4 ps-6 mb-12">
                  {/* onclick="if (!window.__cfRLUnblockHandlers) return false; selCarBrand(this);" */}
                  <div
                    className="border-grey rounded-4 text-center js-listdata"
                    data-index="MQCB0000026"
                    data-text="HONDA"
                    data-cf-modified-903f39338c6b3be20c53ec4e-=""
                  >
                    <img alt="HONDA" width="48" height="48" src="/assets/logo-car/honda.png" />
                  </div>
                </div>
                <div className="col-4 pe-6 mb-12">
                  {/* onclick="if (!window.__cfRLUnblockHandlers) return false; selCarBrand(this);" */}
                  <div
                    className="border-grey rounded-4 text-center js-listdata"
                    data-index="MQCB0000046"
                    data-text="NISSAN"
                    data-cf-modified-903f39338c6b3be20c53ec4e-=""
                  >
                    <img alt="NISSAN" width="48" height="48" src="/assets/logo-car/nissan.png" />
                  </div>
                </div>
                <div className="col-4 px-6 mb-12">
                  {/* onclick="if (!window.__cfRLUnblockHandlers) return false; selCarBrand(this);" */}
                  <div
                    className="border-grey rounded-4 text-center js-listdata"
                    data-index="MQCB0000030"
                    data-text="MITSUBISHI"
                    data-cf-modified-903f39338c6b3be20c53ec4e-=""
                  >
                    <img alt="MITSUBISHI" width="48" height="48" src="/assets/logo-car/mitsubishi.png" />
                  </div>
                </div>
                <div className="col-4 ps-6 mb-12">
                  {/* onclick="if (!window.__cfRLUnblockHandlers) return false; selCarBrand(this);" */}
                  <div
                    className="border-grey rounded-4 text-center js-listdata"
                    data-index="MQCB0000024"
                    data-text="MAZDA"
                    data-cf-modified-903f39338c6b3be20c53ec4e-=""
                  >
                    <img alt="MAZDA" width="48" height="48" src="/assets/logo-car/mazda.png" />
                  </div>
                </div>
                <div className="col-4 pe-6 mb-12">
                  {/* onclick="if (!window.__cfRLUnblockHandlers) return false; selCarBrand(this);" */}
                  <div
                    className="border-grey rounded-4 text-center js-listdata"
                    data-index="MQCB0000032"
                    data-text="FORD"
                    data-cf-modified-903f39338c6b3be20c53ec4e-=""
                  >
                    <img alt="FORD" width="48" height="48" src="/assets/logo-car/ford.png" />
                  </div>
                </div>
                <div className="col-4 px-6 mb-12">
                  {/* onclick="if (!window.__cfRLUnblockHandlers) return false; selCarBrand(this);" */}
                  <div
                    className="border-grey rounded-4 text-center js-listdata"
                    data-index="MQCB0000059"
                    data-text="CHEVROLET"
                    data-cf-modified-903f39338c6b3be20c53ec4e-=""
                  >
                    <img alt="CHEVROLET" width="48" height="48" src="/assets/logo-car/chevrolet.png" />
                  </div>
                </div>
                <div className="col-4 ps-6 mb-12">
                  {/* onclick="if (!window.__cfRLUnblockHandlers) return false; selCarBrand(this);" */}
                  <div
                    className="border-grey rounded-4 text-center js-listdata"
                    data-index="MQCB0000014"
                    data-text="SUZUKI"
                    data-cf-modified-903f39338c6b3be20c53ec4e-=""
                  >
                    <img alt="SUZUKI" width="48" height="48" src="/assets/logo-car/suzuki.png" />
                  </div>
                </div>
              </div>
              <div className="form-group mb-12 carbrand">
                {/* onchange="if (!window.__cfRLUnblockHandlers) return false; javascript:setTimeout(&#39;__doPostBack(\&#39;p$lt$ctl00$pageplaceholder$p$lt$ctl00$CarInformation$ddlCarBrand\&#39;,\&#39;\&#39;)&#39;, 0)" */}
                <select
                  name="p$lt$ctl00$pageplaceholder$p$lt$ctl00$CarInformation$ddlCarBrand"
                  id="p_lt_ctl00_pageplaceholder_p_lt_ctl00_CarInformation_ddlCarBrand"
                  className="js-ddlSelectBrand form-control"
                  data-cf-modified-903f39338c6b3be20c53ec4e-=""
                >
                  <option value="">เลือกยี่ห้อรถ</option>
                  <option value="MQCB0000232">AION</option>
                  <option value="MQCB0000052">ALFA</option>
                  <option value="MQCB0000054">ASTON</option>
                  <option value="MQCB0000040">AUDI</option>
                  <option value="MQCB0000084">AUSTIN MINI</option>
                  <option value="MQCB0000016">BENTLEY</option>
                  <option value="MQCB0000022">BMW</option>
                  <option value="MQCB0000107">BYD</option>
                  <option value="MQCB0000058">CHERY</option>
                  <option value="MQCB0000059">CHEVROLET</option>
                  <option value="MQCB0000038">CHRYSLER</option>
                  <option value="MQCB0000012">CITROEN</option>
                  <option value="MQCB0000057">DAEWOO</option>
                  <option value="MQCB0000027">DAIHATSU</option>
                  <option value="MQCB0000093">DAIMLER</option>
                  <option value="MQCB0000233">DEEP</option>
                  <option value="MQCB0000037">DFM</option>
                  <option value="MQCB0000070">DFSK</option>
                  <option value="MQCB0000020">FERRARI</option>
                  <option value="MQCB0000043">FIAT</option>
                  <option value="MQCB0000214">FOMM</option>
                  <option value="MQCB0000032">FORD</option>
                  <option value="MQCB0000051">FOTON</option>
                  <option value="MQCB0000231">GWMT</option>
                  <option value="MQCB0000215">HAVAL</option>
                  <option value="MQCB0000056">HOLD</option>
                  <option value="MQCB0000073">HOLDDEN</option>
                  <option value="MQCB0000026">HONDA</option>
                  <option value="MQCB0000021">HUMMER</option>
                  <option value="MQCB0000049">HYUNDAI</option>
                  <option value="MQCB0000001">ISUZU</option>
                  <option value="MQCB0000226">JAC</option>
                  <option value="MQCB0000034">JAGUAR</option>
                  <option value="MQCB0000053">JEEP</option>
                  <option value="MQCB0000045">KIA</option>
                  <option value="MQCB0000004">LAMBORGHINI</option>
                  <option value="MQCB0000149">LAMBRETTA</option>
                  <option value="MQCB0000048">LAND ROVER</option>
                  <option value="MQCB0000055">LEXUS</option>
                  <option value="MQCB0000039">LOTUS</option>
                  <option value="MQCB0000018">MASERATI</option>
                  <option value="MQCB0000024">MAZDA</option>
                  <option value="MQCB0000042">MCLR</option>
                  <option value="MQCB0000157">MERCEDES BENZ</option>
                  <option value="MQCB0000033">MERCEDES-BENZ</option>
                  <option value="MQCB0000050">MG</option>
                  <option value="MQCB0000158">MINI</option>
                  <option value="MQCB0000036">MINI COOPER</option>
                  <option value="MQCB0000076">MINI ROVER</option>
                  <option value="MQCB0000019">MIOK</option>
                  <option value="MQCB0000030">MITSUBISHI</option>
                  <option value="MQCB0000060">NAZA</option>
                  <option value="MQCB0000223">NETA</option>
                  <option value="MQCB0000234">NEX</option>
                  <option value="MQCB0000046">NISSAN</option>
                  <option value="MQCB0000011">OPEL</option>
                  <option value="MQCB0000216">ORA</option>
                  <option value="MQCB0000166">PERODUA</option>
                  <option value="MQCB0000010">PEUGEOT</option>
                  <option value="MQCB0000025">PORSCHE</option>
                  <option value="MQCB0000023">PROTON</option>
                  <option value="MQCB0000041">RANGE ROVER</option>
                  <option value="MQCB0000029">RENAULT</option>
                  <option value="MQCB0000173">ROLLS ROYCE</option>
                  <option value="MQCB0000015">ROLLS-ROYCE</option>
                  <option value="MQCB0000174">ROVER</option>
                  <option value="MQCB0000009">SAAB</option>
                  <option value="MQCB0000031">SEAT</option>
                  <option value="MQCB0000047">SKODA</option>
                  <option value="MQCB0000017">SMART</option>
                  <option value="MQCB0000005">SPYKER</option>
                  <option value="MQCB0000188">SSANG YONG</option>
                  <option value="MQCB0000003">SSANGYONG</option>
                  <option value="MQCB0000006">SUBARU</option>
                  <option value="MQCB0000014">SUZUKI</option>
                  <option value="MQCB0000008">TATA</option>
                  <option value="MQCB0000227">TESLA</option>
                  <option value="MQCB0000013">THAIRUNG</option>
                  <option value="MQCB0000007">TOYOTA</option>
                  <option value="MQCB0000028">VOLKSWAGEN</option>
                  <option value="MQCB0000222">VOLT</option>
                  <option value="MQCB0000002">VOLVO</option>
                  <option value="MQCB0000204">WULING</option>
                </select>
                <label className="form-label">ยี่ห้อรถ</label>
                <div className="feedback">กรุณาเลือก</div>
              </div>
              <div className="form-group mb-12 carmodel">
                <select
                  name="p$lt$ctl00$pageplaceholder$p$lt$ctl00$CarInformation$ddlCarModel"
                  id="p_lt_ctl00_pageplaceholder_p_lt_ctl00_CarInformation_ddlCarModel"
                  className="js-ddlSelect form-control"
                  disabled
                >
                  <option value="">เลือกรุ่นรถ</option>
                </select>
                <label className="form-label">รุ่นรถ</label>
                <div className="feedback">กรุณาเลือก</div>
              </div>
            </div>
            <div className="form-group mb-12 carcolor">
              <select
                name="carColorId"
                id="carColorId"
                //defaultValue={carInfo.carColorId}
                className="js-ddlSelect form-control"
              >
                <option value="">เลือกสีรถ</option>
                {carColor?.map((color: any) => (
                  <option key={color.carColorId} value={color.carColorId}>
                    {color.carColorNameTh}
                  </option>
                ))}
              </select>
              <label className="form-label">สีรถ</label>
              <div className="feedback">กรุณาเลือก</div>
            </div>
            <div className="form-group form-vehicle-id mb-12 chassisnumber">
              {/* onkeydown="if (!window.__cfRLUnblockHandlers) return false; return (event.keyCode!=13);" */}
              <input
                name="p$lt$ctl00$pageplaceholder$p$lt$ctl00$CarInformation$txtChassisNumber"
                type="text"
                maxLength={17}
                id="p_lt_ctl00_pageplaceholder_p_lt_ctl00_CarInformation_txtChassisNumber"
                className="form-control engNum"
                placeholder="ตัวอย่าง AAAAAA123AA123456"
                data-cf-modified-903f39338c6b3be20c53ec4e-=""
              />
              <label className="form-label">เลขตัวถัง</label>
              {/* onclick="if (!window.__cfRLUnblockHandlers) return false; hintVehicleOnclick()" */}
              <button
                type="button"
                className="bg-transparent border-0 z-index-2"
                data-bs-toggle="modal"
                data-bs-target="#vidHelperModal"
                data-cf-modified-903f39338c6b3be20c53ec4e-=""
              >
                <img alt="ตัวช่วย" width="24" height="24" src="/assets/icon/icon-question.png" className="" />
              </button>
              {/* onclick="if (!window.__cfRLUnblockHandlers) return false; clearValue('txtChassisNumber', 'chassisnumber', false); checkCarChassisNumber();" */}
              <a
                className="d-flex align-items-center justify-content-center clearFeild-btn-wrapper z-index-1"
                data-cf-modified-903f39338c6b3be20c53ec4e-=""
              >
                <img
                  className="img-fluid mb-2 mx-auto position-absolute clearFeild-btn"
                  alt="test"
                  width="24"
                  height="24"
                  src="/cmisite/media/assets/icon-clear.png"
                />
              </a>
              <div className="feedback">กรุณากรอก</div>
            </div>
            <div className="form-group mb-12 radio-list-horizontal">
              <span className="EditingFormLabel fs-14 ">รถของคุณป้ายแดงหรือไม่ ?</span>
              <div className="mt-2">
                <div id="p_lt_ctl00_pageplaceholder_p_lt_ctl00_CarInformation_UpdatePanel2">
                  {/* <table id="p_lt_ctl00_pageplaceholder_p_lt_ctl00_CarInformation_rdoIsRed">
                                        <tr>
                                            <td><input id="p_lt_ctl00_pageplaceholder_p_lt_ctl00_CarInformation_rdoIsRed_0" type="radio" name="p$lt$ctl00$pageplaceholder$p$lt$ctl00$CarInformation$rdoIsRed" value="NOTRED" checked /><label htmlFor="p_lt_ctl00_pageplaceholder_p_lt_ctl00_CarInformation_rdoIsRed_0">ไม่ใช่</label></td>

                                        </tr>
                                        <tr>
                                             onclick="if (!window.__cfRLUnblockHandlers) return false; javascript:setTimeout(&#39;__doPostBack(\&#39;p$lt$ctl00$pageplaceholder$p$lt$ctl00$CarInformation$rdoIsRed$1\&#39;,\&#39;\&#39;)&#39;, 0)" 
                                            <td><input id="p_lt_ctl00_pageplaceholder_p_lt_ctl00_CarInformation_rdoIsRed_1" type="radio" name="p$lt$ctl00$pageplaceholder$p$lt$ctl00$CarInformation$rdoIsRed" value="ISRED" data-cf-modified-903f39338c6b3be20c53ec4e-="" /><label htmlFor="p_lt_ctl00_pageplaceholder_p_lt_ctl00_CarInformation_rdoIsRed_1">ใช่ ป้ายแดง</label></td>
                                        </tr>
                                    </table> */}
                </div>
              </div>
            </div>
            <div className="form-group mb-12 licenseregis">
              {/* onkeydown="if (!window.__cfRLUnblockHandlers) return false; return (event.keyCode!=13);" */}
              <input
                name="p$lt$ctl00$pageplaceholder$p$lt$ctl00$CarInformation$txtLicenseRegis"
                type="text"
                maxLength={13}
                id="p_lt_ctl00_pageplaceholder_p_lt_ctl00_CarInformation_txtLicenseRegis"
                className="form-control carRegistra"
                placeholder="ตัวอย่าง 2ขข2222"
                data-cf-modified-903f39338c6b3be20c53ec4e-=""
              />
              {/* onclick="if (!window.__cfRLUnblockHandlers) return false; clearValue('txtLicenseRegis', 'licenseregis'); checkCarRegis();" */}
              <a
                className="d-flex align-items-center justify-content-center clearFeild-btn-wrapper clearfiled-hide"
                data-cf-modified-903f39338c6b3be20c53ec4e-=""
              >
                <img
                  className="img-fluid mb-2 mx-auto position-absolute clearFeild-btn hide"
                  alt="test"
                  width="24"
                  height="24"
                  src="/cmisite/media/assets/icon-clear.png"
                />
              </a>
              <label className="form-label">ทะเบียนรถ</label>
              <div className="feedback">กรุณากรอก</div>
              <input
                type="hidden"
                name="p$lt$ctl00$pageplaceholder$p$lt$ctl00$CarInformation$hdLicensePrefix"
                id="p_lt_ctl00_pageplaceholder_p_lt_ctl00_CarInformation_hdLicensePrefix"
              />
              <input
                type="hidden"
                name="p$lt$ctl00$pageplaceholder$p$lt$ctl00$CarInformation$hdLicenseNo"
                id="p_lt_ctl00_pageplaceholder_p_lt_ctl00_CarInformation_hdLicenseNo"
              />
            </div>
            <div id="p_lt_ctl00_pageplaceholder_p_lt_ctl00_CarInformation_UpdatePanel1">
              <div id="p_lt_ctl00_pageplaceholder_p_lt_ctl00_CarInformation_zoneIsRed" className="js-zoneIsRed">
                <div className="form-group mb-12 yearregis">
                  <select
                    name="p$lt$ctl00$pageplaceholder$p$lt$ctl00$CarInformation$ddlYearRegis"
                    id="p_lt_ctl00_pageplaceholder_p_lt_ctl00_CarInformation_ddlYearRegis"
                    className="js-ddlSelect form-control"
                  >
                    <option value="">เลือกปีที่จดทะเบียน</option>
                    <option value="2025">2025 (2568)</option>
                    <option value="2024">2024 (2567)</option>
                    <option value="2023">2023 (2566)</option>
                    <option value="2022">2022 (2565)</option>
                    <option value="2021">2021 (2564)</option>
                    <option value="2020">2020 (2563)</option>
                    <option value="2019">2019 (2562)</option>
                    <option value="2018">2018 (2561)</option>
                    <option value="2017">2017 (2560)</option>
                    <option value="2016">2016 (2559)</option>
                    <option value="2015">2015 (2558)</option>
                    <option value="2014">2014 (2557)</option>
                    <option value="2013">2013 (2556)</option>
                    <option value="2012">2012 (2555)</option>
                    <option value="2011">2011 (2554)</option>
                    <option value="2010">2010 (2553)</option>
                    <option value="2009">2009 (2552)</option>
                    <option value="2008">2008 (2551)</option>
                    <option value="2007">2007 (2550)</option>
                    <option value="2006">2006 (2549)</option>
                    <option value="2005">2005 (2548)</option>
                    <option value="2004">2004 (2547)</option>
                    <option value="2003">2003 (2546)</option>
                    <option value="2002">2002 (2545)</option>
                    <option value="2001">2001 (2544)</option>
                    <option value="2000">2000 (2543)</option>
                    <option value="1999">1999 (2542)</option>
                    <option value="1998">1998 (2541)</option>
                    <option value="1997">1997 (2540)</option>
                    <option value="1996">1996 (2539)</option>
                    <option value="1995">1995 (2538)</option>
                    <option value="1994">1994 (2537)</option>
                    <option value="1993">1993 (2536)</option>
                    <option value="1992">1992 (2535)</option>
                    <option value="1991">1991 (2534)</option>
                    <option value="1990">1990 (2533)</option>
                    <option value="1989">1989 (2532)</option>
                    <option value="1988">1988 (2531)</option>
                    <option value="1987">1987 (2530)</option>
                    <option value="1986">1986 (2529)</option>
                    <option value="1985">1985 (2528)</option>
                    <option value="1984">1984 (2527)</option>
                    <option value="1983">1983 (2526)</option>
                    <option value="1982">1982 (2525)</option>
                    <option value="1981">1981 (2524)</option>
                    <option value="1980">1980 (2523)</option>
                    <option value="1979">1979 (2522)</option>
                    <option value="1978">1978 (2521)</option>
                    <option value="1977">1977 (2520)</option>
                    <option value="1976">1976 (2519)</option>
                  </select>
                  <label className="form-label">ปีที่จดทะเบียน</label>
                  <div className="feedback">กรุณาเลือก</div>
                </div>
                <div className="form-group mb-12 province">
                  <select
                    name="p$lt$ctl00$pageplaceholder$p$lt$ctl00$CarInformation$ddlProvince"
                    id="p_lt_ctl00_pageplaceholder_p_lt_ctl00_CarInformation_ddlProvince"
                    className="js-ddlSelect form-control"
                  >
                    <option value="">เลือกจังหวัดที่จดทะเบียน</option>
                    <option value="64">กระบี่</option>
                    <option value="1">กรุงเทพมหานคร</option>
                    <option value="56">กาญจนบุรี</option>
                    <option value="34">กาฬสินธุ์</option>
                    <option value="49">กำแพงเพชร</option>
                    <option value="28">ขอนแก่น</option>
                    <option value="13">จันทบุรี</option>
                    <option value="15">ฉะเชิงเทรา</option>
                    <option value="11">ชลบุรี</option>
                    <option value="9">ชัยนาท</option>
                    <option value="25">ชัยภูมิ</option>
                    <option value="69">ชุมพร</option>
                    <option value="45">เชียงราย</option>
                    <option value="38">เชียงใหม่</option>
                    <option value="72">ตรัง</option>
                    <option value="14">ตราด</option>
                    <option value="50">ตาก</option>
                    <option value="17">นครนายก</option>
                    <option value="58">นครปฐม</option>
                    <option value="36">นครพนม</option>
                    <option value="19">นครราชสีมา</option>
                    <option value="63">นครศรีธรรมราช</option>
                    <option value="47">นครสวรรค์</option>
                    <option value="3">นนทบุรี</option>
                    <option value="76">นราธิวาส</option>
                    <option value="43">น่าน</option>
                    <option value="77">บึงกาฬ</option>
                    <option value="20">บุรีรัมย์</option>
                    <option value="4">ปทุมธานี</option>
                    <option value="62">ประจวบคีรีขันธ์</option>
                    <option value="16">ปราจีนบุรี</option>
                    <option value="74">ปัตตานี</option>
                    <option value="5">พระนครศรีอยุธยา</option>
                    <option value="44">พะเยา</option>
                    <option value="65">พังงา</option>
                    <option value="73">พัทลุง</option>
                    <option value="53">พิจิตร</option>
                    <option value="52">พิษณุโลก</option>
                    <option value="61">เพชรบุรี</option>
                    <option value="54">เพชรบูรณ์</option>
                    <option value="42">แพร่</option>
                    <option value="66">ภูเก็ต</option>
                    <option value="32">มหาสารคาม</option>
                    <option value="37">มุกดาหาร</option>
                    <option value="46">แม่ฮ่องสอน</option>
                    <option value="24">ยโสธร</option>
                    <option value="75">ยะลา</option>
                    <option value="33">ร้อยเอ็ด</option>
                    <option value="68">ระนอง</option>
                    <option value="12">ระยอง</option>
                    <option value="55">ราชบุรี</option>
                    <option value="7">ลพบุรี</option>
                    <option value="40">ลำปาง</option>
                    <option value="39">ลำพูน</option>
                    <option value="30">เลย</option>
                    <option value="22">ศรีสะเกษ</option>
                    <option value="35">สกลนคร</option>
                    <option value="70">สงขลา</option>
                    <option value="71">สตูล</option>
                    <option value="2">สมุทรปราการ</option>
                    <option value="60">สมุทรสงคราม</option>
                    <option value="59">สมุทรสาคร</option>
                    <option value="18">สระแก้ว</option>
                    <option value="10">สระบุรี</option>
                    <option value="8">สิงห์บุรี</option>
                    <option value="51">สุโขทัย</option>
                    <option value="57">สุพรรณบุรี</option>
                    <option value="67">สุราษฎร์ธานี</option>
                    <option value="21">สุรินทร์</option>
                    <option value="31">หนองคาย</option>
                    <option value="27">หนองบัวลำภู</option>
                    <option value="6">อ่างทอง</option>
                    <option value="26">อำนาจเจริญ</option>
                    <option value="29">อุดรธานี</option>
                    <option value="41">อุตรดิตถ์</option>
                    <option value="48">อุทัยธานี</option>
                    <option value="23">อุบลราชธานี</option>
                  </select>
                  <label className="form-label">จังหวัดที่จดทะเบียน</label>
                  <div className="feedback">กรุณาเลือก</div>
                </div>
              </div>
            </div>

            <h6 className="fs-18 f-bd mb-12 mt-4">ระยะเวลาคุ้มครอง</h6>
            <span className="fs-14 f-bd d-block mb-2 coverageDate-textFeild">วันที่เริ่มความคุ้มครอง</span>
            <div className="form-group mb-12 form-coverage">
              <div>
                <div className="d-flex">
                  <div className="w-100 position-relative year">
                    <select
                      name="p$lt$ctl00$pageplaceholder$p$lt$ctl00$CarInformation$ddlYearCoverage"
                      id="p_lt_ctl00_pageplaceholder_p_lt_ctl00_CarInformation_ddlYearCoverage"
                      className="form-control"
                    ></select>
                    <label className="form-label">ปี</label>
                  </div>
                  <div className="ms-2 me-2 w-100 position-relative month">
                    <select
                      name="p$lt$ctl00$pageplaceholder$p$lt$ctl00$CarInformation$ddlMonthCoverage"
                      id="p_lt_ctl00_pageplaceholder_p_lt_ctl00_CarInformation_ddlMonthCoverage"
                      className="form-control"
                    ></select>
                    <label className="form-label">เดือน</label>
                  </div>
                  <div className="ms-0 w-100 position-relative day">
                    <select
                      name="p$lt$ctl00$pageplaceholder$p$lt$ctl00$CarInformation$ddlDayCoverage"
                      id="p_lt_ctl00_pageplaceholder_p_lt_ctl00_CarInformation_ddlDayCoverage"
                      className="form-control"
                    ></select>
                    <label className="form-label">วัน</label>
                  </div>
                </div>
                <div className="feedback d-none">กรุณาเลือก</div>
              </div>
              <input
                type="hidden"
                name="p$lt$ctl00$pageplaceholder$p$lt$ctl00$CarInformation$coverageDateStartVal"
                id="p_lt_ctl00_pageplaceholder_p_lt_ctl00_CarInformation_coverageDateStartVal"
              />
              <input
                type="hidden"
                name="p$lt$ctl00$pageplaceholder$p$lt$ctl00$CarInformation$coverageDateEndVal"
                id="p_lt_ctl00_pageplaceholder_p_lt_ctl00_CarInformation_coverageDateEndVal"
              />
              <input
                type="hidden"
                name="p$lt$ctl00$pageplaceholder$p$lt$ctl00$CarInformation$hdCoverageEndDate"
                id="p_lt_ctl00_pageplaceholder_p_lt_ctl00_CarInformation_hdCoverageEndDate"
                value="2025-05-21"
              />
              <input
                type="hidden"
                name="p$lt$ctl00$pageplaceholder$p$lt$ctl00$CarInformation$hdChannelText"
                id="p_lt_ctl00_pageplaceholder_p_lt_ctl00_CarInformation_hdChannelText"
                value="CXM"
              />
              <input
                type="hidden"
                name="p$lt$ctl00$pageplaceholder$p$lt$ctl00$CarInformation$hdPriceText"
                id="p_lt_ctl00_pageplaceholder_p_lt_ctl00_CarInformation_hdPriceText"
                value="645.21"
              />
              <input
                type="hidden"
                name="p$lt$ctl00$pageplaceholder$p$lt$ctl00$CarInformation$hdVehicleCategoryId"
                id="p_lt_ctl00_pageplaceholder_p_lt_ctl00_CarInformation_hdVehicleCategoryId"
                value="1"
              />
              <input
                type="hidden"
                name="p$lt$ctl00$pageplaceholder$p$lt$ctl00$CarInformation$hdVehicleCategoryText"
                id="p_lt_ctl00_pageplaceholder_p_lt_ctl00_CarInformation_hdVehicleCategoryText"
                value="ส่วนบุคคล"
              />
              <input
                type="hidden"
                name="p$lt$ctl00$pageplaceholder$p$lt$ctl00$CarInformation$hdVehicleNameText"
                id="p_lt_ctl00_pageplaceholder_p_lt_ctl00_CarInformation_hdVehicleNameText"
                value="รถเก๋ง"
              />

              <input
                type="hidden"
                name="p$lt$ctl00$pageplaceholder$p$lt$ctl00$CarInformation$hdTypeOfDataCustomerText"
                id="p_lt_ctl00_pageplaceholder_p_lt_ctl00_CarInformation_hdTypeOfDataCustomerText"
                value="NEW"
              />
              <input
                type="hidden"
                name="p$lt$ctl00$pageplaceholder$p$lt$ctl00$CarInformation$hdSelVehicleNameText"
                id="p_lt_ctl00_pageplaceholder_p_lt_ctl00_CarInformation_hdSelVehicleNameText"
              />
            </div>

            <div className="d-flex justify-content-between mt-2 mb-4">
              <span className="f-md text-grey">วันที่สิ้นสุดความคุ้มครอง</span>
              <span className="f-bd text-grey line-dotted">
                <strong id="p_lt_ctl00_pageplaceholder_p_lt_ctl00_CarInformation_coverageDateEndShow">
                  31 มกราคม 2567
                </strong>
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        {/* onclick="if (!window.__cfRLUnblockHandlers) return false; return checkValidation();" */}
        <a
          href="/th/CustomerInformation"
          id="p_lt_ctl00_pageplaceholder_p_lt_ctl00_CarInformation_btnSubmit"
          className="btn btn-primary fs-6 d-flex justify-content-center align-items-center mx-auto mb-4 f-bd"
          data-cf-modified-903f39338c6b3be20c53ec4e-=""
        >
          ดำเนินการต่อ
        </a>
      </div>

      <div
        className="modal hint-modal fade"
        id="vidHelperModal"
        aria-labelledby="exampleModalLongTitle"
        style={{ display: 'none' }}
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title f-bd fs-18" id="exampleModalLongTitle">
                หมายเลขตัวถังดูได้จากที่ไหนบ้าง
              </h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body" style={{ maxHeight: '314px' }}>
              <nav>
                <div className="nav nav-tabs border-0" id="nav-tab" role="tablist">
                  {/* onclick="if (!window.__cfRLUnblockHandlers) return false; PushGTMDefault('car_info', 'click_hint', 'เล่มทะเบียน');PushGTMDefault('car_info', 'display', 'เล่มทะเบียน');" */}
                  <button
                    className="nav-link f-bd active"
                    id="nav-bookNumber-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#nav-bookNumber"
                    type="button"
                    role="tab"
                    aria-controls="nav-bookNumber"
                    aria-selected="false"
                    data-cf-modified-903f39338c6b3be20c53ec4e-=""
                  >
                    เล่มทะเบียน
                  </button>
                  {/* onclick="if (!window.__cfRLUnblockHandlers) return false; PushGTMDefault('car_info', 'click_hint', 'ป้ายภาษี');PushGTMDefault('car_info', 'display', 'ป้ายภาษี');" */}
                  <button
                    className="nav-link f-bd"
                    id="nav-ctp-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#nav-ctp"
                    type="button"
                    role="tab"
                    aria-controls="nav-ctp"
                    aria-selected="true"
                    data-cf-modified-903f39338c6b3be20c53ec4e-=""
                  >
                    ป้ายภาษี
                  </button>
                  {/* onclick="if (!window.__cfRLUnblockHandlers) return false; PushGTMDefault('car_info', 'click_hint', 'ตัวรถ');PushGTMDefault('car_info', 'display', 'ตัวรถ');" */}
                  <button
                    className="nav-link f-bd me-0"
                    id="nav-ctpNumber-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#nav-ctpNumber"
                    type="button"
                    role="tab"
                    aria-controls="nav-ctpNumber"
                    aria-selected="false"
                    data-cf-modified-903f39338c6b3be20c53ec4e-=""
                  >
                    ตัวรถ
                  </button>
                </div>
              </nav>
              <div className="tab-content" id="nav-tabContent">
                <div
                  className="tab-pane fade show active"
                  id="nav-bookNumber"
                  role="tabpanel"
                  aria-labelledby="nav-bookNumber-tab"
                >
                  <img
                    className="img-fluid d-block my-3 mx-auto"
                    alt="เล่มทะเบียน"
                    width="280"
                    height="226"
                    src="/assets/object/hint-book-number.png"
                  />
                </div>
                <div className="tab-pane fade" id="nav-ctp" role="tabpanel" aria-labelledby="nav-ctp-tab">
                  <img
                    className="img-fluid d-block my-3 mx-auto"
                    alt="ป้ายภาษี"
                    width="300"
                    height="226"
                    src="/assets/object/hint-ctp.png"
                  />
                </div>
                <div className="tab-pane fade" id="nav-ctpNumber" role="tabpanel" aria-labelledby="nav-ctpNumber-tab">
                  <img
                    className="img-fluid d-block my-3 mx-auto"
                    alt="ตัวรถ"
                    width="280"
                    height="226"
                    src="/assets/object/hint-ctp-number.png"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <script type="903f39338c6b3be20c53ec4e-text/javascript">
    let selectOrderBy = [];
    document.addEventListener(("DOMContentLoaded"), () => {
        $('select[id*="ddlCarBrand"]').select2(
            {
                "language": { "noResults": function () { return "ไม่พบผลการค้นหา"; } },
                escapeMarkup: function (markup) { return markup; },
                dropdownPosition: 'below'
            },
        )
            .on('select2:select', function (e) {
                selectOrderBy.push('car_brand');
                getTextInOption('select_car_brand', 'ddlCarBrand');
                checkCarBrand();
            })
            .on("select2:close", function (e) {
                checkCarBrand();
            });

        $('select[id*="ddlCarModel"]').select2({ "language": { "noResults": function () { return "ไม่พบผลการค้นหา"; } }, escapeMarkup: function (markup) { return markup; }, dropdownPosition: 'below' })
            .on('select2:select', function (e) {
                selectOrderBy.push('car_model');
                getTextInOption('select_car_model', 'ddlCarModel');
                checkCarModel();
            })
            .on("select2:close", function (e) {
                checkCarModel();
            });

        $('select[id*="ddlCarColor"]').select2({ "language": { "noResults": function () { return "ไม่พบผลการค้นหา"; } }, escapeMarkup: function (markup) { return markup; }, dropdownPosition: 'below' })
            .on('select2:select', function (e) {
                let valCarColor = document.querySelector('.formMain select[id*=ddlCarColor]').value;
                if (valCarColor == "") {
                    document.querySelector('.formMain .carcolor').classList.add('validated-error');
                } else {
                    document.querySelector('.formMain .carcolor').classList.remove('validated-error');
                    selectOrderBy.push('car_color');
                    getTextInOption('select_car_color', 'ddlCarColor');
                }
                checkCarColor();
            })
            .on("select2:close", function (e) {
                checkCarColor();
            });

        $('select[id*="ddlYearRegis"]').select2({ "language": { "noResults": function () { return "ไม่พบผลการค้นหา"; } }, escapeMarkup: function (markup) { return markup; }, dropdownPosition: 'below' })
            .on("change", function (e) {

                let valYearRegis = document.querySelector('.formMain select[id*=ddlYearRegis]').value;
                if (valYearRegis != "") {
                    selectOrderBy.push('car_year_regis');
                    PushGTMDefault('car_info', 'select_car_year', valYearRegis);
                }
                checkYearRegis();
            })
            .on("select2:close", function (e) {
                checkYearRegis();
            });

        $('select[id*="ddlProvince"]').select2({ "language": { "noResults": function () { return "ไม่พบผลการค้นหา"; } }, escapeMarkup: function (markup) { return markup; }, dropdownPosition: 'below' })
            .on("change", function (e) {
                let valProvinceRegis = document.querySelector('.formMain select[id*=ddlProvince]').value;
                if (valProvinceRegis != "") {
                    selectOrderBy.push('car_province');
                    getTextInOption('select_car_registered_province', 'ddlProvince');
                }

                checkProvinceRegis();
            })
            .on("select2:close", function (e) {
                checkProvinceRegis();
            });

        $('select[id*="ddlYearCoverage"]').select2({
            "language": { "noResults": function () { return "ไม่พบผลการค้นหา"; } },
            escapeMarkup: function (markup) { return markup; },
            dropdownPosition: 'below',
            placeholder: 'เลือกปี'
        })
            .on("change", function (e) { monthYearChange("year"); })
            .on('select2:select', function (e) {
                selectOrderBy.push('year_coverage');
                document.querySelector('.form-group.mb-12.form-coverage').classList.remove('validated-error');
                if (document.querySelector('select[id*="ddlYearCoverage"]').value == '') {
                    document.querySelector('.form-group.mb-12.form-coverage .year').classList.add('validated-error');
                    document.querySelector('.form-group.mb-12.form-coverage .feedback').textContent = "กรุณาเลือก";
                    document.querySelector('.form-group.mb-12.form-coverage .feedback').classList.remove('d-none');
                    document.querySelector('.form-group.mb-12.form-coverage .feedback').classList.add('d-block');
                }
                else {
                    PushGTMDefault('car_info', 'select_start_cover_year', document.querySelector('select[id*="ddlYearCoverage"]').value);
                    document.querySelector('.form-group.mb-12.form-coverage .year').classList.remove('validated-error');
                }
                removeErrorCoverageDate();

            });

        $('select[id*="ddlMonthCoverage"]').select2({
            "language": { "noResults": function () { return "ไม่พบผลการค้นหา"; } },
            escapeMarkup: function (markup) { return markup; },
            dropdownPosition: 'below',
            placeholder: 'เลือกเดือน'
        })
            .on("change", function (e) { monthYearChange("month"); })
            .on('select2:select', function (e) {
                selectOrderBy.push('month_coverage');
                document.querySelector('.form-group.mb-12.form-coverage').classList.remove('validated-error');
                if (document.querySelector('select[id*="ddlMonthCoverage"]').value == '') {
                    document.querySelector('.form-group.mb-12.form-coverage .month').classList.add('validated-error');
                    document.querySelector('.form-group.mb-12.form-coverage .feedback').textContent = "กรุณาเลือก";
                    document.querySelector('.form-group.mb-12.form-coverage .feedback').classList.remove('d-none');
                    document.querySelector('.form-group.mb-12.form-coverage .feedback').classList.add('d-block');
                }
                else {
                    PushGTMDefault('car_info', 'select_start_cover_month', document.querySelector('select[id*="ddlMonthCoverage"]').value);
                    document.querySelector('.form-group.mb-12.form-coverage .month').classList.remove('validated-error');
                }

                removeErrorCoverageDate();
            });

        $('select[id*="ddlDayCoverage"]').select2({
            "language": { "noResults": function () { return "ไม่พบผลการค้นหา"; } },
            escapeMarkup: function (markup) { return markup; },
            dropdownPosition: 'below',
            placeholder: 'เลือกวัน'
        })
            .on("change", function (e) {
                const monthSelect = document.querySelector('select[id*="ddlMonthCoverage"]').value;
                const yearSelect = document.querySelector('select[id*="ddlYearCoverage"]').value;
                const daySelect = document.querySelector('select[id*="ddlDayCoverage"]').value;

                if (yearSelect != '' && monthSelect != '' && daySelect != '') {
                    const date = yearSelect + '-' + setZero(monthSelect) + '-' + setZero(daySelect);
                    setCoverageDate(date, false)
                }
            })
            .on('select2:select', function (e) {
                selectOrderBy.push('day_coverage');
                document.querySelector('.form-group.mb-12.form-coverage').classList.remove('validated-error');
                if (document.querySelector('select[id*="ddlDayCoverage"]').value == '') {
                    document.querySelector('.form-group.mb-12.form-coverage .day').classList.add('validated-error');
                    document.querySelector('.form-group.mb-12.form-coverage .feedback').textContent = "กรุณาเลือก";
                    document.querySelector('.form-group.mb-12.form-coverage .feedback').classList.remove('d-none');
                    document.querySelector('.form-group.mb-12.form-coverage .feedback').classList.add('d-block');
                }
                else {
                    PushGTMDefault('car_info', 'select_start_cover_day', document.querySelector('select[id*="ddlDayCoverage"]').value);
                    document.querySelector('.form-group.mb-12.form-coverage .day').classList.remove('validated-error');
                }
                removeErrorCoverageDate();

            });

        ////click div element การเลือกรุ่นรถจะเปลี่ยนที่ DDl ด้วย มีซ้ำเพราะเพื่อการทำงานทำงานครั้งแรกที่ยังไม่ postback
        document.querySelectorAll("select.js-ddlSelectBrand").forEach((ddl) => {
            ddl.closest(".formMain").querySelectorAll(".js-listdata").forEach((element) => {
                element.addEventListener("click", () => {
                    let selectValue = element.getAttribute('data-index');
                    ddl.value = selectValue;
                    ddl.onchange();
                });
            });

            //add class card ที่ถุกเลือก
            if (ddl.value != 0) {
                if (ddl.closest(".formMain").querySelector(`.js-listdata[data-index='${ddl.value}']`)) {
                    ddl.closest(".formMain").querySelector(`.js-listdata[data-index='${ddl.value}']`).classList.add("active");
                }
            }
        });

        let listEnNum = document.querySelectorAll(".engNum");
        for (let s = 0; s < listEnNum.length; s++) {
            listEnNum[s].addEventListener('blur', function (event) {
                event.target.value = event.target.value.replace(/^\s+|\s+$/g, "");
            }, true);
            setInputFilter(listEnNum[s], function (value) {
                return /^[a-zA-z0-9]*$/i.test(value);
            });
        }

        let carRegis = document.querySelector('.carRegistra');
        setInputFilterInput(carRegis, function (value) {
            return /^[- 0-9ก-๙]*$/i.test(value);
        });
        carRegis.addEventListener('keyup', function (e) {
            var checkbool = formatRegis(e.target.value);
            e.target.value = checkbool;
        });

        //เลขตัวถัง
        document.querySelector('.formMain input[id*=txtChassisNumber]').addEventListener('change', function (e) {
            PushGTMDefault('car_info', 'fill', 'vehicle_id_number');
            selectOrderBy.push('car_id');
            checkCarChassisNumber();
        }, true);

        document.querySelector('.formMain input[id*=txtChassisNumber]').addEventListener('keyup', function (e) {
            let valLicensePlate = document.querySelector('.formMain input[id*=txtChassisNumber]').value;
            if (valLicensePlate.length > 0) {
                document.querySelector('.form-group.chassisnumber a').classList.remove("z-index-1");
                document.querySelector('.form-group.chassisnumber button').classList.remove("z-index-2");
                document.querySelector('.form-group.chassisnumber a').classList.add("z-index-2");
            }
            else if (valLicensePlate.length == 0) {
                document.querySelector('.form-group.chassisnumber a').classList.remove("z-index-2");
                document.querySelector('.form-group.chassisnumber button').classList.add("z-index-2");
            }
        }, true);

        document.querySelector('.formMain input[id*=txtChassisNumber]').addEventListener('blur', function (e) {
            checkCarChassisNumber();
        }, true);

        document.querySelector('.formMain input[id*=txtChassisNumber]').addEventListener('focusout', function (e) {
            setTimeout(() => {
                document.querySelector('.form-group.chassisnumber button').classList.add("z-index-2");
                document.querySelector('.form-group.chassisnumber a').classList.add("z-index-1");
            }, 200);

        }, true);

        document.querySelector('.formMain input[id*=txtChassisNumber]').addEventListener('focus', function (e) {

            let valLicensePlate = document.querySelector('.formMain input[id*=txtChassisNumber]').value;
            if (valLicensePlate.length > 0) {
                document.querySelector('.form-group.chassisnumber a').classList.remove("z-index-1");
                document.querySelector('.form-group.chassisnumber button').classList.remove("z-index-2");
                document.querySelector('.form-group.chassisnumber a').classList.add("z-index-2");
            }

        }, true);

        //radio รถป้ายแดง
        document.querySelector('.formMain [id*=rdoIsRed]').addEventListener('click', function (e) {
            let textRdoIsRed = "";
            if (document.querySelector('.formMain [id*=rdoIsRed]:checked').value == 'NOTRED') {
                textRdoIsRed = 'ไม่ใช่';
            }
            else {
                textRdoIsRed = 'ใช่ ป้ายแดง';
            }
            PushGTMDefault('car_info', 'select_license_plate', textRdoIsRed);
            selectOrderBy.push('car_isred');
        });


        // ทะเบียนรถ
        document.querySelector('.formMain input[id*=txtLicenseRegis]').addEventListener('change', function (e) {
            PushGTMDefault('car_info', 'fill', 'car_registration');
            selectOrderBy.push('car_registration');
            checkCarRegis();
        }, true);
        document.querySelector('.formMain input[id*=txtLicenseRegis]').addEventListener('blur', function (e) {
            checkCarRegis();
        }, true);
        document.querySelector('.formMain input[id*=txtLicenseRegis]').addEventListener('keyup', function (e) {
            showButtonRemoveLicense();
        }, true);
        document.querySelector('.formMain input[id*=txtLicenseRegis]').addEventListener('focus', function (e) {
            setShowHide(true, 'licenseregis');
        }, true);
        document.querySelector('.formMain input[id*=txtLicenseRegis]').addEventListener('focusout', function (e) {
            setShowHide(false, 'licenseregis');
        }, true);

        //start
        showButtonRemoveLicense();

        //car-brand
        document.querySelector("[id*=panelSelect] .car-brand").addEventListener('click', function (e) {
            selectOrderBy.push('car_brand_pic');
        }, true);

        generateYearList();

        //check session is renew and รถยนตร์
        if (document.querySelector("[id*=hdTypeOfDataCustomerText]").value == 'RENEW' &&
            document.querySelector("[id*=hdSelVehicleNameText]").value == 'รถยนตร์') {
            //send GTM event:43
            dataLayer.push({
                'event': 'track_event',
                'event_category': 'vehicle_category',
                'event_action': 'click_purpose',
                'event_label': document.querySelector("[id*=hdVehicleCategoryText]").value
            });

            //send GTM event:5
            pushGTMSelectItemEcommerce();
        }

        var jsModalHintVehicle = document.getElementById('vidHelperModal');
        if (jsModalHintVehicle) {
            let startTimeModal;
            jsModalHintVehicle.addEventListener('shown.bs.modal', function (event) {
                let txtHint = document.querySelector('#vidHelperModal .active').textContent;
                dataLayer.push({ 'event': 'track_event', 'event_category': 'car_info', 'event_action': 'display', 'event_label': txtHint });
                startTimeModal = performance.now();
            });
            jsModalHintVehicle.addEventListener('hidden.bs.modal', function (event) {
                let txtHint = document.querySelector('#vidHelperModal .active').textContent;
                let endTimeModal = performance.now();
                let timeModal = Math.ceil((endTimeModal - startTimeModal) / 1000);
                dataLayer.push({ 'event': 'track_event', 'event_category': 'car_info', 'event_action': 'close_hint', 'event_label': txtHint, 'time_spent': timeModal });
            });
        }

    });

    function showButtonRemoveChassisNumber() {
        let valLicensePlate = document.querySelector('.formMain input[id*=txtChassisNumber]').value;
        if (valLicensePlate.length > 0) {
            document.querySelector('.form-group.chassisnumber a').classList.remove("z-index-1");
            document.querySelector('.form-group.chassisnumber button').classList.remove("z-index-2");
            document.querySelector('.form-group.chassisnumber a').classList.add("z-index-2");
        }
        else if (valLicensePlate.length == 0) {
            document.querySelector('.form-group.chassisnumber a').classList.remove("z-index-2");
            document.querySelector('.form-group.chassisnumber button').classList.remove("z-index-1");
            document.querySelector('.form-group.chassisnumber a').classList.add("z-index-1");
            document.querySelector('.form-group.chassisnumber button').classList.add("z-index-2");
        }
    }

    function showButtonRemoveLicense() {
        let valLicensePlate = document.querySelector('.formMain input[id*=txtLicenseRegis]').value;
        if (valLicensePlate.length > 0) {
            document.querySelector('.form-group.licenseregis a img').classList.remove("hide");
        }
        else if (valLicensePlate.length == 0) {
            document.querySelector('.form-group.licenseregis a img').classList.add("hide");
        }
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

    function getTextInOption(action, id) {
        let selectElement = document.querySelector(`select[id*="${id}"]`);
        let selectedOption = selectElement.options[selectElement.selectedIndex];
        let selectedText = selectedOption.textContent;
        PushGTMDefault('car_info', action, selectedText);
    }
    // function setCoverageDate(datetime) {
    //     const dateNow = new Date();
    //     const dateN = new Date(datetime);
    //     const picker = new easepick.create({
    //         element: document.querySelector('[id*=coverageDateStartSel]'),
    //         lang: 'th-TH',
    //         format: 'DD MMMM YYYY',
    //         css: [
    //             '/custom/plugin/easepick/css/core.css',
    //             '/custom/plugin/easepick/css/lock-plugin.css',
    //         ],
    //         plugins: ['LockPlugin'],
    //         LockPlugin: {
    //             minDate: new Date(),
    //             maxDate: new Date(dateNow.setDate(dateNow.getDate() + 90)),
    //         },
    //         setup(picker) {
    //             picker.on('select', (e) => {
    //                 const { view, date, target } = e.detail;
    //                 document.querySelector('[id*=coverageDateStartVal]').value = date.toLocaleDateString('en-GB');
    //                 let dateCheck = date.getMonth() + "" + date.getDate();
    //                 let dateEnd = new Date(date.setFullYear(date.getFullYear() + 1));
    //                 if (dateCheck == "129") {
    //                     dateEnd.setMonth(1);
    //                     dateEnd.setDate(28);
    //                 }
    //                 document.querySelector('[id*=coverageDateEndVal]').value = dateEnd.toLocaleDateString('en-GB');
    //                 document.querySelector('[id*=coverageDateEndShow]').innerText = dateEnd.toLocaleDateString('th-TH', { day: "numeric", year: "numeric", month: "long" });
    //             });
    //         },

    //     });
    //     picker.setDate(dateN);
    //     document.querySelector('[id*=coverageDateStartVal]').value = dateN.toLocaleDateString('en-GB');
    //     let dateCheckN = dateN.getMonth() + "" + dateN.getDate();
    //     let dateEndN = new Date(dateN.setFullYear(dateN.getFullYear() + 1));
    //     if (dateCheckN == "129") {
    //         dateEndN.setMonth(1);
    //         dateEndN.setDate(28);
    //     }
    //     document.querySelector('[id*=coverageDateEndVal]').value = dateEndN.toLocaleDateString('en-GB');
    //     let dateEndText = dateEndN.toLocaleDateString('th-TH', { day: "numeric", year: "numeric", month: "long" });
    //     document.querySelector('[id*=coverageDateEndShow]').innerText = dateEndText;
    // }

    function removeErrorCoverageDate() {
        if (document.querySelector('select[id*="ddlYearCoverage"]').value != '' &&
            document.querySelector('select[id*="ddlMonthCoverage"]').value != '' &&
            document.querySelector('select[id*="ddlDayCoverage"]').value != '') {
            document.querySelector('.form-group.mb-12.form-coverage .feedback').textContent = "";
            document.querySelector('.form-group.mb-12.form-coverage .feedback').classList.remove('d-block');
            document.querySelector('.form-group.mb-12.form-coverage .feedback').classList.add('d-none');
        }
    }

    function setCoverageDate(datetime, submit = false) {
        if (datetime) {
            const dateN = new Date(datetime);

            document.querySelector('[id*=coverageDateStartVal]').value = dateN;
            if (submit) {
                document.querySelector('[id*=coverageDateStartVal]').value = dateN.toLocaleDateString('en-GB');
            }
            let dateEndN = new Date(dateN.setFullYear(dateN.getFullYear() + 1));
            let dateEndText = dateEndN.toLocaleDateString('th-TH', { day: "numeric", year: "numeric", month: "long" });
            document.querySelector('[id*=coverageDateEndVal]').value = dateEndN.toLocaleDateString('en-GB');

            const monthSelect = document.querySelector('select[id*="ddlMonthCoverage"]').value;
            const yearSelect = document.querySelector('select[id*="ddlYearCoverage"]').value;
            const daySelect = document.querySelector('select[id*="ddlDayCoverage"]').value;
            if (yearSelect != '' && monthSelect != '' && daySelect != '') {
                document.querySelector('[id*=coverageDateEndShow]').innerText = dateEndText;
            }
            else {
                document.querySelector('[id*=coverageDateEndShow]').innerText = '';
            }
        }
        else {
            document.querySelector('[id*=coverageDateStartVal]').value = '';
            document.querySelector('[id*=coverageDateEndVal]').value = '';
            document.querySelector('[id*=coverageDateEndShow]').innerText = '';
        }

    }

    function focusCover() {
        scrollToTargetAdjusted('.formMain .year');
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

    function setInputFilterInput(textbox, inputFilter) {
        ["input"].forEach(function (event) {
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

    function formatRegis(input) {
        var result = input;
        var size = input.length;
        if (size == 0) {
            document.querySelector('.formMain .licenseregis').classList.add('validated-error');
            document.querySelector('.formMain .licenseregis .feedback').textContent = "กรุณากรอก";
            document.querySelector('[id*=hdLicensePrefix]').value = "";
            document.querySelector('[id*=hdLicenseNo]').value = "";
        }
        else if (/^[0-9]{6}$/.test(input) || /^[0-9]{2}-{1}[0-9]{4}$/.test(input)) {
            document.querySelector('.formMain .licenseregis').classList.remove('validated-error');
            document.querySelector('.formMain .licenseregis .feedback').textContent = "";
            input = input.replace(/-/g, '')
            result = input.substring(0, 2) + "-" + input.substring(2, 6);
            document.querySelector('[id*=hdLicensePrefix]').value = input.substring(0, 2);
            document.querySelector('[id*=hdLicenseNo]').value = input.substring(2, 6);
        }
        else if (/^[0-9]{1}?[ก-ฮ]{2}?[0-9]{1,4}$/.test(input) || /^[0-9]{1}?[ก-ฮ]{2}\s{1}?[0-9]{1,4}$/.test(input)) {
            document.querySelector('.formMain .licenseregis').classList.remove('validated-error');
            document.querySelector('.formMain .licenseregis .feedback').textContent = "";
            input = input.replace(/ /g, '')
            result = input.substring(0, 3) + " " + input.substring(3, size);
            document.querySelector('[id*=hdLicensePrefix]').value = input.substring(0, 3);
            document.querySelector('[id*=hdLicenseNo]').value = input.substring(3, size);
        }
        else if (/^[ก-๙]{1,8}?[0-9]{1,4}$/.test(input) || /^[ก-๙]{1,8}\s{1}?[0-9]{1,4}$/.test(input)) {
            document.querySelector('.formMain .licenseregis').classList.remove('validated-error');
            document.querySelector('.formMain .licenseregis .feedback').textContent = "";
            input = input.replace(/ /g, '')
            var charThai = input.replace(/[0-9]/g, '');
            var charNum = input.replace(/[ก-๙]/g, '');
            result = charThai + " " + charNum;
            document.querySelector('[id*=hdLicensePrefix]').value = charThai;
            document.querySelector('[id*=hdLicenseNo]').value = charNum;
        }
        else {
            document.querySelector('.formMain .licenseregis').classList.add('validated-error');
            document.querySelector('.formMain .licenseregis .feedback').textContent = "กรุณากรอกให้ถูกต้อง";
            document.querySelector('[id*=hdLicensePrefix]').value = "";
            document.querySelector('[id*=hdLicenseNo]').value = "";
        }
        return result;
    }

    //in update panal
    var prm = Sys.WebForms.PageRequestManager.getInstance();
    if (prm != null) {
        prm.add_initializeRequest((sender, args) => {
        });

        prm.add_endRequest((sender, e) => {
            if (e.get_error() != undefined) {
                e.set_errorHandled(true);
            }

            $('select[id*="ddlCarBrand"]').select2().off();
            $('select[id*="ddlCarModel"]').select2().off();

            $('select[id*="ddlCarBrand"]').select2({ "language": { "noResults": function () { return "ไม่พบผลการค้นหา"; } }, escapeMarkup: function (markup) { return markup; }, dropdownPosition: 'below', 'data': { id: 'newOption', text: 'New Option222222' } })
                .on('select2:select', function (e) {
                    let valCarBrand = document.querySelector('.formMain select[id*=ddlCarBrand]').value;
                    if (valCarBrand != "") {
                        selectOrderBy.push('car_brand');
                        getTextInOption('select_car_brand', 'ddlCarBrand');
                    }

                    checkCarBrand();
                })
                .on("select2:close", function (e) {
                    checkCarBrand();
                });


            $('select[id*="ddlCarModel"]').select2({ "language": { "noResults": function () { return "ไม่พบผลการค้นหา"; } }, escapeMarkup: function (markup) { return markup; }, dropdownPosition: 'below' })
                .on('select2:select', function (e) {
                    let valCarModel = document.querySelector('.formMain select[id*=ddlCarModel]').value;
                    if (valCarModel != "") {
                        selectOrderBy.push('car_model');
                        getTextInOption('select_car_model', 'ddlCarModel');
                    }
                    checkCarModel();
                })
                .on("select2:close", function (e) {
                    checkCarModel();
                });

            //click div element การเลือกรุ่นรถจะเปลี่ยนที่ DDl ด้วย
            document.querySelectorAll("select.js-ddlSelectBrand").forEach((ddl) => {
                ddl.closest(".formMain").querySelectorAll(".js-listdata").forEach((element) => {
                    element.addEventListener("click", () => {
                        let selectValue = element.getAttribute('data-index');
                        ddl.value = selectValue;
                        ddl.onchange();

                    });
                });

                //add class card ที่ถุกเลือก
                if (ddl.value != 0) {
                    if (ddl.closest(".formMain").querySelector(`.js-listdata[data-index='${ddl.value}']`)) {
                        ddl.closest(".formMain").querySelector(`.js-listdata[data-index='${ddl.value}']`).classList.add("active");
                    }
                }
                else {
                    checkCarBrand();
                }
            });

            //fix ยิง GTM เบิ้ล
            // $('select[id*="ddlYearRegis"]').select2().off('select2:select');
            // $('select[id*="ddlProvince"]').select2().off('select2:select');
            $('select[id*="ddlYearRegis"]').select2().off();
            $('select[id*="ddlProvince"]').select2().off();

            $('select[id*="ddlYearRegis"]').select2({ "language": { "noResults": function () { return "ไม่พบผลการค้นหา"; } }, escapeMarkup: function (markup) { return markup; }, dropdownPosition: 'below' })
                .on('select2:select', function (e) {
                    let valYearRegis = document.querySelector('.formMain select[id*=ddlYearRegis]').value;
                    if (valYearRegis != "") {
                        selectOrderBy.push('car_year_regis');
                        PushGTMDefault('car_info', 'select_car_year', valYearRegis);
                    }
                    checkYearRegis();
                })
                .on("select2:close", function (e) {
                    checkYearRegis();
                });

            $('select[id*="ddlProvince"]').select2({ "language": { "noResults": function () { return "ไม่พบผลการค้นหา"; } }, escapeMarkup: function (markup) { return markup; }, dropdownPosition: 'below' })
                .on('select2:select', function (e) {
                    let valProvinceRegis = document.querySelector('.formMain select[id*=ddlProvince]').value;
                    if (valProvinceRegis != "") {
                        selectOrderBy.push('car_province');
                        getTextInOption('select_car_registered_province', 'ddlProvince');
                    }
                    checkProvinceRegis();
                })
                .on("select2:close", function (e) {
                    checkProvinceRegis();
                });

            document.querySelector('.formMain [id*=rdoIsRed]').addEventListener('change', function (e) {
                let textRdoIsRed = "";
                if (document.querySelector('.formMain [id*=rdoIsRed]:checked').value == 'NOTRED') {
                    textRdoIsRed = 'ไม่ใช่';
                }
                else {
                    textRdoIsRed = 'ใช่ ป้ายแดง';
                }
                PushGTMDefault('car_info', 'select_license_plate', textRdoIsRed);
                selectOrderBy.push('car_isred');
            });
        });
    };


    function checkCarBrand(checkError = "") {
        var valCarBrand = document.querySelector('.formMain select[id*=ddlCarBrand]').value;
        if (valCarBrand == "") {
            document.querySelector('.formMain .carbrand').classList.add('validated-error');
            checkError += "car-brand|";
        } else {
            document.querySelector('.formMain .carbrand').classList.remove('validated-error');
        }
        return checkError;
    }

    function checkYearRegis() {
        var valIsRed = document.querySelector('.formMain [id*=rdoIsRed]:checked').value;
        if (valIsRed == "NotRed" || valIsRed == "NOTRED") {
            var valYearRegis = document.querySelector('.formMain select[id*=ddlYearRegis]').value;
            if (valYearRegis == "") {
                document.querySelector('.formMain .yearregis').classList.add('validated-error');

            } else {
                document.querySelector('.formMain .yearregis').classList.remove('validated-error');
            }
        }
    }

    function checkProvinceRegis() {
        var valIsRed = document.querySelector('.formMain [id*=rdoIsRed]:checked').value;
        if (valIsRed == "NotRed" || valIsRed == "NOTRED") {
            var valProvince = document.querySelector('.formMain select[id*=ddlProvince]').value;
            if (valProvince == "") {
                document.querySelector('.formMain .province').classList.add('validated-error');

            } else {
                document.querySelector('.formMain .province').classList.remove('validated-error');
            }
        }
    }

    function checkCarModel(checkError = "") {
        var valCarModel = document.querySelector('.formMain select[id*=ddlCarModel]').value;
        if (valCarModel == "") {
            if (document.querySelector('.formMain select[id*=ddlCarModel][disabled]') == null) {
                document.querySelector('.formMain .carmodel').classList.add('validated-error');
                checkError += "carmodel|";
            }

        } else {
            document.querySelector('.formMain .carmodel').classList.remove('validated-error');
        }
        return checkError;
    }

    function checkCarColor(checkError = "") {
        var valCarColor = document.querySelector('.formMain select[id*=ddlCarColor]').value;
        if (valCarColor == "") {
            document.querySelector('.formMain .carcolor').classList.add('validated-error');
            checkError += "carcolor|";
        } else {
            document.querySelector('.formMain .carcolor').classList.remove('validated-error');
        }
        return checkError;
    }

    function checkCarChassisNumber(checkError = "") {
        var valChassisNumber = document.querySelector('.formMain input[id*=txtChassisNumber]').value;
        if (valChassisNumber == "") {
            document.querySelector('.formMain .chassisnumber').classList.add('validated-error');
            checkError += "chassisnumber|";
        } else {
            document.querySelector('.formMain .chassisnumber').classList.remove('validated-error');
        }
        return checkError;
    }

    function checkCarRegis(checkError = "", submit = false) {
        var valLicenseRegis = document.querySelector('.formMain input[id*=txtLicenseRegis]').value;
        if (valLicenseRegis == "") {
            document.querySelector('.formMain .licenseregis').classList.add('validated-error');
            checkError += "licenseregis|";
        } else {
            if (valLicenseRegis == "ป้ายแดง 0000") {
                document.querySelector('.formMain .licenseregis').classList.add('validated-error');
                document.querySelector('.formMain .licenseregis .feedback').textContent = "กรุณากรอกให้ถูกต้อง";
                checkError += "licenseregis|";
            }
            else {
                if (document.querySelector('[id*=hdLicensePrefix]').value != "" && document.querySelector('[id*=hdLicenseNo]').value != "") {
                    document.querySelector('.formMain .licenseregis').classList.remove('validated-error');
                } else {
                    document.querySelector('.formMain .licenseregis').classList.add('validated-error');
                    checkError += "licenseregis|";
                }
            }
           
        }
        return checkError;
    }

    function checkCarIsred(checkError = "") {
        var valIsRed = document.querySelector('.formMain [id*=rdoIsRed]:checked').value;
        if (valIsRed == "NotRed" || valIsRed == "NOTRED") {
            var valYearRegis = document.querySelector('.formMain select[id*=ddlYearRegis]').value;
            if (valYearRegis == "") {
                document.querySelector('.formMain .yearregis').classList.add('validated-error');
                checkError += "yearregis|";
            } else {
                document.querySelector('.formMain .yearregis').classList.remove('validated-error');
            }
            var valProvince = document.querySelector('.formMain select[id*=ddlProvince]').value;
            if (valProvince == "") {
                document.querySelector('.formMain .province').classList.add('validated-error');
                checkError += "province|";
            } else {
                document.querySelector('.formMain .province').classList.remove('validated-error');
            }
        }
        return checkError;
    }

    function checkValidation() {

        var checkError = "";
        checkError += checkCarBrand(checkError);
        checkError += checkCarModel(checkError);
        checkError += checkCarColor(checkError);
        checkError += checkCarChassisNumber(checkError);
        checkError += checkCarRegis(checkError, true);
        checkError += checkCarIsred(checkError);

        checkError += validatedDateCoverage(checkError);

        if (checkError != "") {
            pushGTMSubmitOnclick(false, checkError);
            scrollToTargetAdjusted('.formMain .' + checkError.split('|')[0]);

            return false;
        }
        else {
            pushGTMSubmitOnclick(true);
            pushGTMAddToCartEcommerce();
            new bootstrap.Modal(document.getElementById('ModalLoading')).show();
            return true;
        }
    }

    function validatedDateCoverage(checkError = "") {
        const monthSelect = document.querySelector('select[id*="ddlMonthCoverage"]').value;
        const yearSelect = document.querySelector('select[id*="ddlYearCoverage"]').value;
        const daySelect = document.querySelector('select[id*="ddlDayCoverage"]').value;
        if (yearSelect == '' && monthSelect == '' && daySelect == '') {
            document.querySelector('.form-group.mb-12.form-coverage').classList.add('validated-error');
            checkError += "year|month|day|";
            return checkError;
        }
        else if (yearSelect == '' || monthSelect == '' || daySelect == '') {
            document.querySelector('.form-group.mb-12.form-coverage').classList.remove('validated-error');
            document.querySelector('.form-group.mb-12.form-coverage .feedback').textContent = "กรุณาเลือก";
            document.querySelector('.form-group.mb-12.form-coverage .feedback').classList.remove('d-none');
            document.querySelector('.form-group.mb-12.form-coverage .feedback').classList.add('d-block');
            if (yearSelect == '') {
                document.querySelector('.form-group.mb-12.form-coverage .year').classList.add('validated-error');
                checkError += "year|";
            }
            else {
                document.querySelector('.form-group.mb-12.form-coverage .year').classList.remove('validated-error');
            }
            if (monthSelect == '') {
                document.querySelector('.form-group.mb-12.form-coverage .month').classList.add('validated-error');
                checkError += "month|";
            }
            else {
                document.querySelector('.form-group.mb-12.form-coverage .month').classList.remove('validated-error');
            }
            if (daySelect == '') {
                document.querySelector('.form-group.mb-12.form-coverage .day').classList.add('validated-error');
                checkError += "day|";
            }
            else {
                document.querySelector('.form-group.mb-12.form-coverage .day').classList.remove('validated-error');
            }
            return checkError;
        }
        else if (yearSelect != '' && monthSelect != '' && daySelect != '') {
            document.querySelector('.form-group.mb-12.form-coverage').classList.remove('validated-error');
            document.querySelector('.form-group.mb-12.form-coverage .year').classList.remove('validated-error');
            document.querySelector('.form-group.mb-12.form-coverage .month').classList.remove('validated-error');
            document.querySelector('.form-group.mb-12.form-coverage .day').classList.remove('validated-error');
            document.querySelector('.form-group.mb-12.form-coverage .feedback').textContent = "";
            document.querySelector('.form-group.mb-12.form-coverage .feedback').classList.remove('d-block');
            document.querySelector('.form-group.mb-12.form-coverage .feedback').classList.add('d-none');

            // y-m-d
            const date = yearSelect + '-' + setZero(monthSelect) + '-' + setZero(daySelect);
            setCoverageDate(date, true);
            return checkError;
        }
    }

    function scrollToTargetAdjusted(target, offset = 0) {
        var heahei = document.querySelector(".head-bar").offsetHeight + 5;
        var element = document.querySelector(target);
        var headerOffset = heahei + offset;
        var elementPosition = element.getBoundingClientRect().top;
        var offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
        });
    }

    function getRadioVal(namee) {
        const radioButtons = document.querySelectorAll(namee);
        let selectedSize;
        for (const radioButton of radioButtons) {
            if (radioButton.checked) {
                selectedSize = radioButton.value;
                break;
            }
        }
        return selectedSize;
    }

    // Function of Birthday  
    function generateYearList() {
        let startDate = new Date();
        let startDate2 = new Date();
        let endDate = new Date(startDate2.setDate(startDate.getDate() + 90));
        startDate = new Date(document.querySelector('[id*=hdCoverageEndDate]').value);
        //getMonth Note: 0=January, 1=February etc.

        let yearStart = startDate.getFullYear();
        let monthStart = startDate.getMonth();
        let dateStart = startDate.getUTCDate();

        let yearEnd = endDate.getFullYear();
        let monthEnd = endDate.getMonth();
        let dateEnd = endDate.getUTCDate();

        var yearData = [];

        var selectYearElement = $('select[id*="ddlYearCoverage"]');
        yearData.push({ id: '', text: 'เลือกปี' });
        yearData.push({ id: yearStart, text: yearStart + 543 });
        selectYearElement.select2({ data: yearData });
        if (yearEnd - yearStart > 0) {

            yearData.push({ id: yearEnd, text: yearEnd + 543 });
            selectYearElement.select2({ data: yearData });
        }

        var selectMonthElement = $('select[id*="ddlMonthCoverage"]');
        const month = ["มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน", "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"];

        var monthData = [];
        let index = 0;

        if (monthStart < monthEnd || monthStart == monthEnd) {
            for (var i = monthStart; i <= monthEnd; i++) {
                if (index == 0) {
                    monthData.push({ id: '', text: 'เลือกเดือน' });
                }
                monthData.push({ id: i + 1, text: month[i] });
                index++;
            }
            selectMonthElement.select2({ data: monthData });
        }
        //กรณีข้ามปี
        else if (monthStart > monthEnd) {
            for (var i = monthStart; i <= 11; i++) {
                if (index == 0) {
                    monthData.push({ id: '', text: 'เลือกเดือน' });
                }
                monthData.push({ id: i + 1, text: month[i] });
                index++;
            }

            selectMonthElement.select2({ data: monthData });
        }


        const daysIn_ = getAllDaysInMonth(yearStart, monthStart + 1);
        setFirstDay(daysIn_, dateStart);

        if (document.querySelector('[id*=coverageDateStartVal]').value != '') {
            let coverageDay = document.querySelector('[id*=coverageDateStartVal]').value;

            document.querySelector('select[id*="ddlYearCoverage"]').value = new Date(coverageDay).getFullYear() + 543;
            $('select[id*="ddlYearCoverage"]').val(new Date(coverageDay).getFullYear()).trigger('change');

            document.querySelector('select[id*="ddlMonthCoverage"]').value = new Date(coverageDay).getMonth() + 1;
            $('select[id*="ddlMonthCoverage"]').val(new Date(coverageDay).getMonth() + 1).trigger('change');

            setDateWhenHaveData(document.querySelector('select[id*="ddlYearCoverage"]').value,
                document.querySelector('select[id*="ddlMonthCoverage"]').value,
                new Date(coverageDay).getDate());

            document.querySelector('select[id*="ddlDayCoverage"]').value = new Date(coverageDay).getDate();
            $('select[id*="ddlDayCoverage"]').val(new Date(coverageDay).getDate()).trigger('change');
        }
    }

    function setFirstDay(allDays, dateStart, daySelect = 0, newRender = false) {
        if (newRender) {
            let dateStartNew = parseInt(dateStart);
            for (var i = 1; i <= 31; i++) {
                $('select[id*="ddlDayCoverage"]').find('option[value="' + i + '"]').remove();
                $('select[id*="ddlDayCoverage"]').trigger('change');
            }

            for (var i = dateStartNew; i <= allDays; i++) {
                $('select[id*="ddlDayCoverage"]').append(new Option(parseInt(i), parseInt(i), false, false)).trigger('change');
            }
            $('select[id*="ddlDayCoverage"]').val(parseInt(daySelect)).trigger('change');
        }
        else {
            var selectDayElement = $('select[id*="ddlDayCoverage"]');

            // Loop through the array and create options
            let dayData = [];
            let index = 0;
            for (var i = dateStart; i <= allDays; i++) {
                if (index == 0) {
                    dayData.push({ id: '', text: 'เลือกวัน' });
                }
                dayData.push({ id: i, text: i });
                index++;
            }
            selectDayElement.select2({ data: dayData });
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
        var selectDayElement = $('select[id*="ddlDayCoverage"]');
        var dayData = [];
        for (var i = 0; i < days; i++) {
            dayData.push({ id: i + 1, text: i + 1 });
        }

        selectDayElement.select2({ data: dayData });
    }

    function monthYearChange(check = "") {
        let startDate = new Date();
        let startDate2 = new Date();
        let endDate = new Date(startDate2.setDate(startDate.getDate() + 90));
        startDate = new Date(document.querySelector('[id*=hdCoverageEndDate]').value);
        //getMonth Note: 0=January, 1=February etc.

        let yearStart = startDate.getFullYear();
        let monthStart = startDate.getMonth() + 1;
        let dateStart = startDate.getUTCDate();

        let yearEnd = endDate.getFullYear();
        let monthEnd = endDate.getMonth() + 1;
        let dateEnd = endDate.getUTCDate();
        
        const monthSelect = document.querySelector('select[id*="ddlMonthCoverage"]').value;
        const yearSelect = document.querySelector('select[id*="ddlYearCoverage"]').value;

        if (yearStart < yearEnd && yearSelect != '' && check != 'month') {
            checkIsFirstYear(yearSelect, monthSelect);
        }
        if (monthSelect != '') {
            checkIsFirstMonth(monthSelect, yearSelect);
        }

        const daySelect = document.querySelector('select[id*="ddlDayCoverage"]').value;
        // y-m-d
        if (yearSelect != '' && monthSelect != '' && daySelect != '') {
            const date = yearSelect + '-' + setZero(monthSelect) + '-' + setZero(daySelect);
            setCoverageDate(date, false)
        }
        else {
            document.querySelector('[id*=coverageDateEndShow]').innerText = "";
        }
    }

    function setZero(text) {
        if (text.length == 1) {
            return '0' + text;
        }

        return text;
    }

    function setDateWhenHaveData(yearSelect, monthSelect, daySelect) {
        let startDate = new Date();
        let startDate2 = new Date();
        let endDate = new Date(startDate2.setDate(startDate.getDate() + 90));
        startDate = new Date(document.querySelector('[id*=hdCoverageEndDate]').value);
        //getMonth Note: 0=January, 1=February etc.

        let yearStart = startDate.getFullYear();
        let monthStart = startDate.getMonth() + 1;
        let dateStart = startDate.getUTCDate();

        let yearEnd = endDate.getFullYear();
        let monthEnd = endDate.getMonth() + 1;
        let dateEnd = endDate.getUTCDate();

        if (monthStart == monthSelect) {
            const allDays = getAllDaysInMonth(yearSelect, monthSelect);
            if (daySelect < dateStart && daySelect > allDays) {
                document.querySelector('select[id*="ddlDayCoverage"]').innerHTML = "";
            }
            setFirstDay(allDays, dateStart, daySelect, true);
        } else if (monthEnd == monthSelect) {
            const allDaysOfLastMonth = getAllDaysInMonth(yearSelect, monthSelect);

            setLastDay(allDaysOfLastMonth, dateEnd, daySelect);
        } else if (monthSelect > monthStart && monthSelect < monthEnd) {
            const allDaysOfLastMonth = getAllDaysInMonth(yearSelect, monthSelect);
            setBetweenDay(allDaysOfLastMonth, dateEnd, daySelect);
        }
        return false;
    }
    function checkIsFirstMonth(monthSelect, yearSelect) {
        let startDate = new Date();
        let startDate2 = new Date();
        let endDate = new Date(startDate2.setDate(startDate.getDate() + 90));
        startDate = new Date(document.querySelector('[id*=hdCoverageEndDate]').value);
        //getMonth Note: 0=January, 1=February etc.

        let yearStart = startDate.getFullYear();
        let monthStart = startDate.getMonth() + 1;
        let dateStart = startDate.getUTCDate();

        let yearEnd = endDate.getFullYear();
        let monthEnd = endDate.getMonth() + 1;
        let dateEnd = endDate.getUTCDate();

        const daySelect = document.querySelector('select[id*="ddlDayCoverage"]').value;

        if (monthSelect == 0) {
            monthSelect = parseInt(monthSelect);
            monthSelect++;
        }
        if (monthStart == monthSelect) {
            const allDays = getAllDaysInMonth(yearStart, monthSelect);
            if (daySelect < dateStart && daySelect > allDays) {
                document.querySelector('select[id*="ddlDayCoverage"]').innerHTML = "";
            }
            setFirstDay(allDays, dateStart, daySelect, true);
        } else if (monthEnd == monthSelect) {
            const allDaysOfLastMonth = getAllDaysInMonth(yearStart, monthSelect);
            setLastDay(allDaysOfLastMonth, dateEnd, daySelect);
        } else if (monthSelect > monthStart && monthSelect < monthEnd && yearStart == yearEnd) {
            const allDaysOfLastMonth = getAllDaysInMonth(yearStart, monthSelect);
            setBetweenDay(allDaysOfLastMonth, dateEnd, daySelect);
        }
        else if (monthSelect > monthStart && yearStart < yearEnd) {
            const allDaysOfLastMonth = getAllDaysInMonth(yearStart, monthSelect);
            setBetweenDay(allDaysOfLastMonth, dateEnd, daySelect);
        }
        else if (yearStart < yearEnd && monthSelect != monthStart && monthSelect != monthEnd) {
            monthSelect = isNaN(monthSelect) ? 0 : monthSelect;
            const allDaysOfLastMonth = getAllDaysInMonth(yearStart, monthSelect);
            setBetweenDay(allDaysOfLastMonth, dateEnd, daySelect);
        }

        return false;
    }

    function checkIsFirstYear(yearSelect, monthSelect = '') {
        let startDate = new Date();
        let startDate2 = new Date();
        let endDate = new Date(startDate2.setDate(startDate.getDate() + 90));
        startDate = new Date(document.querySelector('[id*=hdCoverageEndDate]').value);
        //getMonth Note: 0=January, 1=February etc.

        let yearStart = startDate.getFullYear();
        let monthStart = startDate.getMonth() + 1;
        let dateStart = startDate.getUTCDate();

        let yearEnd = endDate.getFullYear();
        let monthEnd = endDate.getMonth() + 1;
        let dateEnd = endDate.getUTCDate();

        const daySelect = document.querySelector('select[id*="ddlDayCoverage"]').value;

        if (yearEnd > yearStart) {
            //กรณีข้ามปี
            if (yearSelect > yearStart && yearSelect != '') {
                document.querySelector('select[id*="ddlMonthCoverage"]').innerHTML = "";
                var selectMonthElement = $('select[id*="ddlMonthCoverage"]');
                const month = ["มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน", "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"];

                var monthData = [];
                let index = 0;

                for (var i = 0; i < monthEnd; i++) {
                    if (index == 0) {
                        monthData.push({ id: '', text: 'เลือกเดือน' });
                    }
                    monthData.push({ id: i + 1, text: month[i] });
                    index++;
                }
                selectMonthElement.select2({ data: monthData });

            }
            else if (yearStart == yearEnd && yearSelect != '') {
                document.querySelector('select[id*="ddlMonthCoverage"]').innerHTML = "";
                var selectMonthElement = $('select[id*="ddlMonthCoverage"]');
                const month = ["มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน", "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"];

                var monthData = [];
                let index = 0;

                for (var i = monthStart - 1; i <= monthEnd; i++) {
                    if (index == 0) {
                        monthData.push({ id: '', text: 'เลือกเดือน' });
                    }
                    monthData.push({ id: i + 1, text: month[i] });
                    index++;
                }
                selectMonthElement.select2({ data: monthData });

            }
            else if (yearStart == yearSelect && yearSelect != '') {
                document.querySelector('select[id*="ddlMonthCoverage"]').innerHTML = "";
                var selectMonthElement = $('select[id*="ddlMonthCoverage"]');
                const month = ["มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน", "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"];

                var monthData = [];
                let index = 0;

                for (var i = monthStart - 1; i <= 12; i++) {
                    if (index == 0) {
                        monthData.push({ id: '', text: 'เลือกเดือน' });
                    }
                    monthData.push({ id: i + 1, text: month[i] });
                    index++;
                }
                selectMonthElement.select2({ data: monthData });
            }

            document.querySelector('select[id*="ddlMonthCoverage"]').value = monthSelect + 1;
        }

        return false;
    }
    function setLastDay(allDays, dateEnd, daySelect) {
        var selectElementDay = $('select[id*="ddlDayCoverage"]');
        if (daySelect > dateEnd) {
            document.querySelector('select[id*="ddlDayCoverage"]').innerHTML = "";
            let dayData = [];
            for (var i = 0; i < dateEnd; i++) {
                if (i == 0) {
                    dayData.push({ id: '', text: 'เลือกวัน' });
                }
                dayData.push({ id: i + 1, text: i + 1 });
            }
            selectElementDay.select2({ data: dayData });

        } else if (daySelect < dateEnd || daySelect == dateEnd) {

            let startIndex = parseInt(daySelect) + 1;
            for (var i = 0; i <= 31; i++) {
                $('select[id*="ddlDayCoverage"]').find('option[value="' + i + '"]').remove();
                $('select[id*="ddlDayCoverage"]').trigger('change');
            }

            var dayData = [];
            for (var i = 0; i <= dateEnd; i++) {
                if (i == 0) {
                    //$('select[id*="ddlDayCoverage"]').append(new Option('', 'เลือกวัน', false, false)).trigger('change');
                }
                else {
                    $('select[id*="ddlDayCoverage"]').append(new Option(parseInt(i), parseInt(i), false, false)).trigger('change');
                }

            }
            document.querySelector('select[id*="ddlDayCoverage"]').value = daySelect;
            $('select[id*="ddlDayCoverage"]').val(daySelect).trigger('change');

        }
    }

    function setBetweenDay(allDays, dateEnd, daySelect) {
        var selectElementDay = $('select[id*="ddlDayCoverage"]');

        if (daySelect > allDays || daySelect == '') {
            var dayData = [];
            document.querySelector('select[id*="ddlDayCoverage"]').innerHTML = "";
            for (var i = 0; i < allDays; i++) {
                if (i == 0) {
                    dayData.push({ id: '', text: 'เลือกวัน' });
                }
                dayData.push({ id: i + 1, text: i + 1 });
            }
            selectElementDay.select2({ data: dayData });
        }
        else if (daySelect < allDays) {

            for (var i = 1; i <= 31; i++) {
                $('select[id*="ddlDayCoverage"]').find('option[value="' + i + '"]').remove();
                $('select[id*="ddlDayCoverage"]').trigger('change');
            }

            for (var i = 1; i <= allDays; i++) {
                $('select[id*="ddlDayCoverage"]').append(new Option(parseInt(i), parseInt(i), false, false)).trigger('change');
            }
            $('select[id*="ddlDayCoverage"]').val(parseInt(daySelect)).trigger('change');
        }
    }

    function resetYear(days) {
        document.querySelector('select[id*="ddlDayCoverage"]').innerHTML = "";
        setDay(days);
        document.querySelector('select[id*="ddlDayCoverage"]').value = "";
    }

    function addDay(currentDay, allDay) {
        var selectDayElement = $('select[id*="ddlDayCoverage"]');

        var selectedOption = $('select[id*="ddlDayCoverage"]').select2('data')[0];

        let startIndex = parseInt(selectedOption.id) + 1;

        for (var i = startIndex; i <= 31; i++) {
            $('select[id*="ddlDayCoverage"]').find('option[value="' + i + '"]').remove();
            $('select[id*="ddlDayCoverage"]').trigger('change');
        }
        // var index = 1;
        var dayData = [];
        for (var i = startIndex; i <= allDay; i++) {
            var dayData = [];
            $('select[id*="ddlDayCoverage"]').append(new Option(parseInt(i), parseInt(i), false, false)).trigger('change');
        }
    }

    function checkIsDayBetween(days) {
        const selectElementDay = document.querySelector('select[id*="ddlDayCoverage"]').value;

        if (parseInt(selectElementDay) > parseInt(days) || selectElementDay == "") {
            document.querySelector('select[id*="ddlDayCoverage"]').value = "";
            resetYear(days);
        }
        else {
            addDay(parseInt(selectElementDay), parseInt(days));
            // resetYear(days);
        }
    }

    function hintVehicleOnclick() {
        PushGTMDefault('car_info', 'click_hint', 'vehicle_id_number');
    }

    function findDuplicates(array1, array2) {
        return array1.filter(item => array2.includes(item));
    }

    function pushGTMSubmitOnclick(validate, error = null) {
        //car brand
        let valCarBrand = document.querySelector('select[id*=ddlCarBrand]');
        let selectedBrandOption = valCarBrand.options[valCarBrand.selectedIndex];
        let selectedBrandText = selectedBrandOption.textContent;

        //car model
        let valCarModel = document.querySelector('select[id*=ddlCarModel]');
        let selectedModelOption = valCarModel.options[valCarModel.selectedIndex];
        let selectedModelText = selectedModelOption.textContent;

        //car color
        let valCarColor = document.querySelector('select[id*=ddlCarColor]');
        let selectedCarcolorOption = valCarColor.options[valCarColor.selectedIndex];
        let selectedCarColorText = selectedCarcolorOption.textContent;

        let valLicenseRegis = document.querySelector('.formMain input[id*=txtLicenseRegis]').value;

        let selectedProvinceText = "";
        let selectedYearRegisText = "";

        //isRed 
        let isRed = document.querySelector('.formMain [id*=rdoIsRed]:checked').value;
        let variantText = '';
        if (isRed == 'NOTRED' || isRed == 'NotRed') {
            //province
            let selectProvince = document.querySelector(`select[id*="ddlProvince"]`);
            let selectedProvinceOption = selectProvince.options[selectProvince.selectedIndex];
            selectedProvinceText = selectedProvinceOption.textContent;

            //year regis
            let selectYearRegis = document.querySelector(`select[id*="ddlYearRegis"]`);
            let selectedYearRegisOption = selectYearRegis.options[selectYearRegis.selectedIndex];
            selectedYearRegisText = selectedYearRegisOption.textContent;
            variantText = 'ป้ายขาว';
        }
        else {
            variantText = 'ป้ายแดง';
        }

        //coverage
        let yearSelect = document.querySelector('select[id*="ddlYearCoverage"]').value;
        let monthSelect = document.querySelector('select[id*="ddlMonthCoverage"]').value;
        let daySelect = document.querySelector('select[id*="ddlDayCoverage"]').value;
        let dateStartCoverageFormat = `${yearSelect ? yearSelect : ''}-${monthSelect ? monthSelect : ''}-${daySelect ? daySelect : ''}`;
        let dateEndCoverageFormat = '';
        let plusYearCoverage = '';
        if (yearSelect != '') {
            plusYearCoverage = parseInt(yearSelect) + 1;
        }
        dateEndCoverageFormat = `${plusYearCoverage ? plusYearCoverage : ''}-${monthSelect ? monthSelect : ''}-${daySelect ? daySelect : ''}`;

        if (validate) {
            //field ให้ดึงค่าลำดับการกรอกของ user
            let selectEvent = selectOrderBy.join(', ');
            dataLayer.push({
                'event': 'track_event',
                'event_category': 'car_info',
                'event_action': 'submit_car-info',
                'event_label': 'submit_complete',
                'field': selectEvent,
                'car_brand': selectedBrandText,
                'car_model': selectedModelText,
                'car_color': selectedCarColorText,
                'license_plate': variantText,
                'car_year': selectedYearRegisText.slice(0, 4),
                'car_registration_province': selectedProvinceText,
                'start_coverage_date': dateStartCoverageFormat, //2023-09-25, 2023--
                'end_coverage_date': dateEndCoverageFormat, //2024-09-25, 2024--
            });
        }
        else {
            let fieldError = error.split('|').join(', ');
            //ถ้า error field เกิดทุกช่องให้ส่งค่าว่า error_all_field
            let fieldErrorMaster = [
                'car-brand',
                'carmodel',
                'carcolor',
                'chassisnumber',
                'licenseregis',
                'yearregis',
                'province',
                'year',
                'month',
                'day'
            ];

            let fieldError_ = error.split('|');
            let fieldErrorLength = findDuplicates(fieldErrorMaster, fieldError_);

            if (fieldErrorLength.length == fieldErrorMaster.length) {
                fieldError = "error_all_field";
            }
            else {
                for (let i = 0; i <= fieldErrorLength.length; i++) {
                    if (fieldErrorLength[i] == 'car-brand') {
                        fieldErrorLength[i] = 'car_brand';
                    }
                    else if (fieldErrorLength[i] == 'carmodel') {
                        fieldErrorLength[i] = 'car_model';
                    }
                    else if (fieldErrorLength[i] == 'carcolor') {
                        fieldErrorLength[i] = 'car_color';
                    }
                    else if (fieldErrorLength[i] == 'chassisnumber') {
                        fieldErrorLength[i] = 'car_id';
                    }
                    else if (fieldErrorLength[i] == 'licenseregis') {
                        fieldErrorLength[i] = 'car_registration';
                    }
                    else if (fieldErrorLength[i] == 'yearregis') {
                        fieldErrorLength[i] = 'car_year_regis';
                    }
                }

                fieldError = fieldErrorLength.join(', ');
            }

            dataLayer.push({
                'event': 'track_event',
                'event_category': 'car_info',
                'event_action': 'submit_car-info',
                'event_label': 'submit_incomplete',
                'field': fieldError,
                'car_brand': selectedBrandText,
                'car_model': selectedModelText,
                'car_color': selectedCarColorText,
                'license_plate': variantText,
                'car_year': selectedYearRegisText.slice(0, 4),
                'car_registration_province': selectedProvinceText,
                'start_coverage_date': dateStartCoverageFormat, //2023-09-25, 2023--
                'end_coverage_date': dateEndCoverageFormat, //2024-09-25, 2024--
            });
        }
    }

    function pushGTMAddToCartEcommerce() {
        //car brand
        let valCarBrand = document.querySelector('select[id*=ddlCarBrand]');
        let selectedBrandOption = valCarBrand.options[valCarBrand.selectedIndex];
        let selectedBrandText = selectedBrandOption.textContent;

        //car model
        let valCarModel = document.querySelector('select[id*=ddlCarModel]');
        let selectedModelOption = valCarModel.options[valCarModel.selectedIndex];
        let selectedModelText = selectedModelOption.textContent;

        //car color
        let valCarColor = document.querySelector('select[id*=ddlCarColor]');
        let selectedCarcolorOption = valCarColor.options[valCarColor.selectedIndex];
        let selectedCarColorText = selectedCarcolorOption.textContent;

        //licensePlate regis
        let valLicenseRegis = document.querySelector('.formMain input[id*=txtLicenseRegis]').value;

        //province
        let selectedProvinceText = "";
        //year regis
        let selectedYearRegisText = "";

        //isRed 
        let isRed = document.querySelector('.formMain [id*=rdoIsRed]:checked').value;
        let variantText = '';
        if (isRed == 'NOTRED' || isRed == 'NotRed') {
            variantText = 'ป้ายขาว';

            //province
            let selectProvince = document.querySelector(`select[id*="ddlProvince"]`);
            let selectedProvinceOption = selectProvince.options[selectProvince.selectedIndex];
            selectedProvinceText = selectedProvinceOption.textContent;

            //year regis
            let selectYearRegis = document.querySelector(`select[id*="ddlYearRegis"]`);
            let selectedYearRegisOption = selectYearRegis.options[selectYearRegis.selectedIndex];
            selectedYearRegisText = selectedYearRegisOption.textContent;
        }
        else {
            variantText = 'ป้ายแดง';
        }

        //coverage
        let yearSelect = document.querySelector('select[id*="ddlYearCoverage"]').value;
        let monthSelect = document.querySelector('select[id*="ddlMonthCoverage"]').value;
        let daySelect = document.querySelector('select[id*="ddlDayCoverage"]').value;
        let dateStartCoverageFormat = `${yearSelect ? yearSelect : ''}-${monthSelect ? monthSelect : ''}-${daySelect ? daySelect : ''}`;
        let dateEndCoverageFormat = '';
        let plusYearCoverage = '';
        if (yearSelect != '') {
            plusYearCoverage = parseInt(yearSelect) + 1;
        }
        dateEndCoverageFormat = `${plusYearCoverage ? plusYearCoverage : ''}-${monthSelect ? monthSelect : ''}-${daySelect ? daySelect : ''}`;

        dataLayer.push({
            "event": "add_to_cart",
            "ecommerce": {
                "currency": "THB",
                "value": document.querySelector("[id*=hdPriceText]").value,
                "channel": document.querySelector("[id*=hdChannelText]").value,// ***Required / eg. ntl_app, ntl_web, heygoody
                "items": [
                    {
                        "item_id": document.querySelector("[id*=hdVehicleCategoryId]").value, //***Required / eg. 0001
                        "item_name": document.querySelector("[id*=hdVehicleNameText]").value + "/" + document.querySelector("[id*=hdVehicleCategoryText]").value, //***Required / eg. รถเก๋ง / ส่วนบุคคล, รถบรรทุก / ไม่เกิน 3 ตัน {{car_type / ประเภทการใช้งาน}}
                        "item_brand": document.querySelector("[id*=hdVehicleCategoryText]").value, //eg. ส่วนบุคคล, ไม่เกิน 3 ตัน {vehicle_category}
                        "item_category": selectedBrandText, //{car_brand}
                        "item_category2": selectedModelText, //{car_model}
                        "item_category3": selectedCarColorText, //{car_color}
                        "item_category4": selectedYearRegisText.slice(0, 4), //{car_year}
                        "item_category5": selectedProvinceText, //{car_registered_province} 
                        "item_variant": variantText, //eg. ป้ายแดง, ป้ายขาว
                        "start_coverage_date": dateStartCoverageFormat,
                        "end_coverage_date": dateEndCoverageFormat,
                        "price": document.querySelector("[id*=hdPriceText]").value,// ***Required / eg. 645.21 
                        "quantity": 1
                    },
                ],
            }
        });
    }

    const selCarBrand = (element) => {
        let carBrandText = element.getAttribute('data-text');
        PushGTMDefault('car_info', 'select_car_brand', carBrandText);
    }

    function backOnclick() {
        PushGTMEventClickBack();
        new bootstrap.Modal(document.getElementById('ModalLoading')).show();
    }

    //ยิง GTM event:5 กรณี renew
    function pushGTMSelectItemEcommerce() {
        //car brand
        let valCarBrand = document.querySelector('select[id*=ddlCarBrand]');
        let selectedBrandOption = valCarBrand.options[valCarBrand.selectedIndex];
        let selectedBrandText = selectedBrandOption.textContent;

        //car model
        let valCarModel = document.querySelector('select[id*=ddlCarModel]');
        let selectedModelOption = valCarModel.options[valCarModel.selectedIndex];
        let selectedModelText = selectedModelOption.textContent;

        //car color
        let valCarColor = document.querySelector('select[id*=ddlCarColor]');
        let selectedCarcolorOption = valCarColor.options[valCarColor.selectedIndex];
        let selectedCarColorText = selectedCarcolorOption.textContent;

        //licensePlate regis
        let valLicenseRegis = document.querySelector('.formMain input[id*=txtLicenseRegis]').value;

        //province
        let selectProvince = document.querySelector(`select[id*="ddlProvince"]`);
        let selectedProvinceText = '';
        if (selectProvince != null) {
            let selectedProvinceOption = selectProvince.options[selectProvince.selectedIndex];
            selectedProvinceText = selectedProvinceOption.textContent;
        }

        //year regis
        let selectYearRegis = document.querySelector(`select[id*="ddlYearRegis"]`);
        let selectedYearRegisText = '';
        if (selectYearRegis != null) {
            let selectedYearRegisOption = selectYearRegis.options[selectYearRegis.selectedIndex];
            selectedYearRegisText = selectedYearRegisOption.textContent;
        }
        //isRed
        let isRed = document.querySelector('.formMain [id*=rdoIsRed]:checked').value;
        let variantText = '';
        if (isRed == 'NOTRED' || isRed == 'NotRed') {
            variantText = 'ป้ายขาว';
        }
        else {
            variantText = 'ป้ายแดง';
        }

        //coverage1
        let yearSelect = document.querySelector('select[id*="ddlYearCoverage"]').value;
        let monthSelect = document.querySelector('select[id*="ddlMonthCoverage"]').value;
        let daySelect = document.querySelector('select[id*="ddlDayCoverage"]').value;
        let dateStartCoverageFormat = `${yearSelect ? yearSelect : ''}-${monthSelect ? monthSelect : ''}-${daySelect ? daySelect : ''}`;
        let dateEndCoverageFormat = '';
        let plusYearCoverage = '';
        if (yearSelect != '') {
            plusYearCoverage = parseInt(yearSelect) + 1;
        }
        dateEndCoverageFormat = `${plusYearCoverage ? plusYearCoverage : ''}-${monthSelect ? monthSelect : ''}-${daySelect ? daySelect : ''}`;

        dataLayer.push({
            "event": "select_item",
            "ecommerce": {
                "channel": document.querySelector("[id*=hdChannelText]").value,// ***Required / eg. ntl_app, ntl_web, heygoody
                "items": [
                    {
                        "item_id": document.querySelector("[id*=hdVehicleCategoryId]").value, //***Required / eg. 0001
                        "item_name": document.querySelector("[id*=hdVehicleNameText]").value + "/" + document.querySelector("[id*=hdVehicleCategoryText]").value, //***Required / eg. รถเก๋ง / ส่วนบุคคล, รถบรรทุก / ไม่เกิน 3 ตัน {{car_type / ประเภทการใช้งาน}}
                        "item_brand": document.querySelector("[id*=hdVehicleCategoryText]").value, //eg. ส่วนบุคคล, ไม่เกิน 3 ตัน {vehicle_category}
                        "item_category": selectedBrandText == "เลือกยี่ห้อรถ" ? "" : selectedBrandText, //{car_brand}
                        "item_category2": selectedModelText == "เลือกรุ่นรถ" ? "" : selectedModelText, //{car_model}
                        "item_category3": selectedCarColorText == "เลือกสีรถ" ? "" : selectedCarColorText, //{car_color}
                        "item_category4": selectedYearRegisText == "เลือกปีที่จดทะเบียน" ? "" : selectedYearRegisText.slice(0, 4), //{car_year}
                        "item_category5": selectedProvinceText == "เลือกจังหวัดที่จดทะเบียน" ? "" : selectedProvinceText, //{car_registered_province} 
                        "item_variant": variantText, //eg. ป้ายแดง, ป้ายขาว
                        "start_coverage_date": dateStartCoverageFormat,
                        "end_coverage_date": dateEndCoverageFormat,
                        "price": document.querySelector("[id*=hdPriceText]").value,// ***Required / eg. 645.21 
                        "quantity": 1
                    },
                ],
            }
        });
    }

    function clearValue(type, containner, hide = true) {
        document.querySelector(`.formMain input[id*=${type}]`).value = "";

        if (hide) {
            document.querySelector(`.form-group.${containner} a img`).classList.add("hide");
        }
        else {
            document.querySelector(`.form-group.${containner} a`).classList.remove("z-index-2");
            document.querySelector(`.form-group.${containner} button`).classList.remove("z-index-1");
            document.querySelector(`.form-group.${containner} button`).classList.add("z-index-2");
        }
    }
</script> */}

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
    </main>
  )
}
