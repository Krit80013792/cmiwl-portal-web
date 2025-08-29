'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { getCarBrands, getCarColors, getCarModels } from '../../_actions'
import FormDialog, { FormDialogRef } from '@/modules/FormDialog'
import { RadioButton } from 'primereact/radiobutton'

interface FormProps {
  data: any
}

const CarInformationForm = ({ data }: FormProps) => {
  const dialogChassisRef = useRef<FormDialogRef>(null)
  const [carColorList, setCarColorList] = useState<any[]>([])
  const [carBrandList, setCarBrandList] = useState<any[]>([])
  const [carModelList, setCarModelList] = useState<any[]>([])
  const [carBrandId, setCarBrandId] = useState<string | null>(null)
  const [carModelId, setCarModelId] = useState<string | null>(null)
  const [carColorId, setCarColorId] = useState<string | null>(null)
  const [chassisNumber, setChassisNumber] = useState<string | null>(null)
  const [isRedLicense, setIsRedLicense] = useState<boolean>(false)
  const [carLicense, setCarLicense] = useState<string | null>(null)

  const fetchCarColors = useCallback(async () => {
    const res = await getCarColors({ token: data?.token })
    setCarColorList(res.data.data)
  }, [])

  const fetchCarBrands = useCallback(async () => {
    const res = await getCarBrands({ token: data?.token, vehicleCategory: data?.vehicleCategory })
    setCarBrandList(res.data.data)
  }, [])

  useEffect(() => {
    fetchCarColors()
    fetchCarBrands()
  }, [fetchCarColors, fetchCarBrands])

  const fetchCarModelData = async (brandId: string) => {
    const res = await getCarModels({ token: data?.token, carBrandId: brandId, vehicleCategory: data?.vehicleCategory })
    setCarModelList(res.data.data)
    setCarBrandId(brandId)
  }

  const handleChassisHelp = () => {
    dialogChassisRef.current?.open({
      title: 'หมายเลขตัวถังดูได้จากที่ไหนบ้าง',
      style: { maxWidth: '480px', width: '90%' },
      draggable: false,
      children: (
        <div style={{ minWidth: 350, background: '#f8f9fa', borderRadius: 8, padding: 20 }}>
          <div className="p-field mb-3" style={{ display: 'flex', marginBottom: 12 }}></div>
        </div>
      ),
    })
  }

  return (
    <form>
      <div className="formMain">
        <div className="row car-brand">
          {carBrandList
            ?.slice()
            ?.sort((a: any, b: any) => a.carBrandRanking - b.carBrandRanking)
            ?.slice(0, 9)
            ?.map((brand: any) => {
              const isActive = carBrandId === brand.carBrandId
              return (
                <div
                  className="col-4 pe-6 mb-12"
                  key={brand.carBrandId}
                  onClick={() => fetchCarModelData(brand.carBrandId)}
                >
                  <div className={`rounded-4 text-center js-listdata choice-card h-100${isActive ? ' active' : ''}`}>
                    <Image alt={brand?.carBrandName} width="48" height="48" src={brand?.carBrandImage} />
                  </div>
                </div>
              )
            })}
        </div>
        <div className="form-group mb-12 carbrand">
          <select
            name="carBrand"
            className="form-control"
            onChange={(e) => fetchCarModelData(e.target.value)}
            value={carBrandId || ''}
          >
            <option value="">เลือกยี่ห้อรถ</option>
            {carBrandList
              ?.slice()
              ?.sort((a: any, b: any) => a.carBrandRanking - b.carBrandRanking)
              ?.map((brand: any) => (
                <option key={brand?.carBrandId} value={brand?.carBrandId}>
                  {brand?.carBrandName}
                </option>
              ))}
          </select>
          <label className="form-label" htmlFor="carBrand">
            ยี่ห้อรถ
          </label>
          <div className="feedback">กรุณาเลือก</div>
        </div>
        <div className="form-group mb-12 carmodel">
          <select
            className="form-control"
            disabled={!carBrandId}
            onChange={(e) => setCarModelId(e.target.value)}
            value={carModelId || ''}
          >
            <option value="">เลือกรุ่นรถ</option>
            {carModelList?.map((model: any) => (
              <option key={model} value={model}>
                {model}
              </option>
            ))}
          </select>
          <label className="form-label" htmlFor="carModel">
            รุ่นรถ
          </label>
          <div className="feedback">กรุณาเลือก</div>
        </div>
        <div className="form-group mb-12 carcolor">
          <select
            name="carColorId"
            className="form-control"
            value={carColorId || ''}
            onChange={(e) => setCarColorId(e.target.value)}
          >
            <option value="">เลือกสีรถ</option>
            {carColorList?.map((color: any) => (
              <option key={color.carColorId} value={color.carColorId}>
                {color.carColorNameTh}
              </option>
            ))}
          </select>
          <label className="form-label" htmlFor="carColorId">
            สีรถ
          </label>
          <div className="feedback">กรุณาเลือก</div>
        </div>
        <div className="form-group form-vehicle-id mb-12 chassisnumber">
          <input
            name="chassisNumber"
            type="text"
            maxLength={17}
            className="form-control engNum"
            placeholder="ตัวอย่าง AAAAAA123AA123456"
            value={chassisNumber || ''}
            onChange={(e) => setChassisNumber(e.target.value)}
          />
          <label className="form-label" htmlFor="chassisNumber">
            เลขตัวถัง
          </label>
          <button type="button" className="bg-transparent border-0 z-index-2" onClick={handleChassisHelp}>
            <Image alt="ตัวช่วย" width="24" height="24" src="/assets/icon/icon-question.png" />
          </button>
          <FormDialog ref={dialogChassisRef} />
        </div>
        <div className="form-group mb-12 radio-list-horizontal">
          <span className="EditingFormLabel fs-14 ">รถของคุณป้ายแดงหรือไม่ ?</span>
          <div className="mt-2">
            <div style={{ display: 'flex' }}>
              <div className="flex-wrap gap-3" style={{ display: 'flex' }}>
                <div style={{ display: 'flex' }}>
                  <RadioButton
                    name="pizza"
                    value="Cheese"
                    onChange={(e) => setIsRedLicense(e.value)}
                    checked={!isRedLicense}
                  />
                  <label htmlFor="isNotRed" className="ml-2">
                    ไม่ใช่
                  </label>
                </div>
                <div style={{ display: 'flex' }}>
                  <RadioButton
                    name="pizza"
                    value="Mushroom"
                    onChange={(e) => setIsRedLicense(e.value)}
                    checked={isRedLicense}
                  />
                  <label htmlFor="isRedLicense" className="ml-2">
                    ใช่ ป้ายแดง
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="form-group mb-12 licenseregis">
          <input
            name="carLicense"
            type="text"
            maxLength={13}
            className="form-control carRegistra"
            placeholder="ตัวอย่าง 2ขข2222"
            value={carLicense || ''}
            onChange={(e) => setCarLicense(e.target.value)}
          />
          <label className="form-label" htmlFor="carId">
            ทะเบียนรถ
          </label>
          <div className="feedback">กรุณากรอก</div>
        </div>
        <div id="p_lt_ctl00_pageplaceholder_p_lt_ctl00_CarInformation_zoneIsRed" className="js-zoneIsRed">
          <div className="form-group mb-12 yearregis">
            <select
              name="p$lt$ctl00$pageplaceholder$p$lt$ctl00$CarInformation$ddlYearRegis"
              id="p_lt_ctl00_pageplaceholder_p_lt_ctl00_CarInformation_ddlYearRegis"
              className="form-control"
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
            <label className="form-label" htmlFor="carYear">
              ปีที่จดทะเบียน
            </label>
            <div className="feedback">กรุณาเลือก</div>
          </div>
          <div className="form-group mb-12 province">
            <select
              name="p$lt$ctl00$pageplaceholder$p$lt$ctl00$CarInformation$ddlProvince"
              id="p_lt_ctl00_pageplaceholder_p_lt_ctl00_CarInformation_ddlProvince"
              className="form-control"
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
            <label className="form-label" htmlFor="carProvince">
              จังหวัดที่จดทะเบียน
            </label>
            <div className="feedback">กรุณาเลือก</div>
          </div>
        </div>
      </div>

      <div className="formMain">
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
                <label className="form-label" htmlFor="protectedYear">
                  ปี
                </label>
              </div>
              <div className="ms-2 me-2 w-100 position-relative month">
                <select
                  name="p$lt$ctl00$pageplaceholder$p$lt$ctl00$CarInformation$ddlMonthCoverage"
                  id="p_lt_ctl00_pageplaceholder_p_lt_ctl00_CarInformation_ddlMonthCoverage"
                  className="form-control"
                ></select>
                <label className="form-label" htmlFor="protectedMonth">
                  เดือน
                </label>
              </div>
              <div className="ms-0 w-100 position-relative day">
                <select
                  name="p$lt$ctl00$pageplaceholder$p$lt$ctl00$CarInformation$ddlDayCoverage"
                  id="p_lt_ctl00_pageplaceholder_p_lt_ctl00_CarInformation_ddlDayCoverage"
                  className="form-control"
                ></select>
                <label className="form-label" htmlFor="protectedDay">
                  วัน
                </label>
              </div>
            </div>
            <div className="feedback d-none">กรุณาเลือก</div>
          </div>
        </div>

        <div className="d-flex justify-content-between mt-2 mb-4">
          <span className="f-md text-grey">วันที่สิ้นสุดความคุ้มครอง</span>
          <span className="f-bd text-grey line-dotted">
            <strong>31 มกราคม 2567</strong>
          </span>
        </div>
      </div>
    </form>
  )
}

export default CarInformationForm
