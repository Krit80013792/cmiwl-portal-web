/* eslint-disable @next/next/no-img-element */
'use client';
import React from 'react';
import { useRouter } from 'next/navigation';

const VehicleCategoryComponent = () => {
    const router = useRouter();

    const handleCarInformation = (e: React.MouseEvent<HTMLDivElement>) => {
        router.push(`/th/CarInformation`);
    };

    return (
        <>
            {/* onclick="if (!window.__cfRLUnblockHandlers) return false; selVehicleCate(this);" */}
            <div id="p_lt_ctl00_pageplaceholder_p_lt_ctl00_VehicleCategory_showVehicleCategory" className="row seatamount-select mb-4">
                <div className='col-6 pe-2 mb-3  ' onClick={handleCarInformation}>
                    <div className='px-12 py-2 rounded-4 choice-card h-100 hey-active' data-index='23' data-cartype='1' data-text='รับจ้าง/ให้เช่า (รย.9)' data-price='2,041.56' >
                        <p className='mb-0 text-grey'>รับจ้าง/ให้เช่า (รย.9)</p>
                        <p className='mb-0 text-grey'><strong className='f-bd'>2,041.56 บาท/ปี</strong></p>
                    </div>
                </div>
                <div className='col-6 ps-2 mb-3  ' onClick={handleCarInformation}>
                    {/* onclick="if (!window.__cfRLUnblockHandlers) return false; selVehicleCate(this);" */}
                    <div className='px-12 py-2 rounded-4 choice-card h-100'
                        data-index='1' data-cartype='1' data-text='ส่วนบุคคล' data-price='645.21' >
                        <p className='mb-0 text-grey'>ส่วนบุคคล</p>
                        <p className='mb-0 text-grey'><strong className='f-bd'>645.21 บาท/ปี</strong></p>
                    </div>
                </div>
                <div className='col-6 pe-2 ' onClick={handleCarInformation}>
                    {/* onclick="if (!window.__cfRLUnblockHandlers) return false; selVehicleCate(this);" */}
                    <div className='px-12 py-2 rounded-4 choice-card h-100'
                        data-index='21' data-cartype='1' data-text='รับจ้าง หรือ ให้เช่า' data-price='2,041.56'>
                        <p className='mb-0 text-grey'>รับจ้าง หรือ ให้เช่า</p>
                        <p className='mb-0 text-grey'><strong className='f-bd'>2,041.56 บาท/ปี</strong></p>
                    </div>
                </div>
                <div className='col-6 ps-2 ' onClick={handleCarInformation}>
                    {/* onclick="if (!window.__cfRLUnblockHandlers) return false; selVehicleCate(this);" */}
                    <div className='px-12 py-2 rounded-4 choice-card h-100'
                        data-index='22' data-cartype='1' data-text='รับจ้าง/ให้เช่า (รย.6)' data-price='2,041.56' >
                        <p className='mb-0 text-grey'>รับจ้าง/ให้เช่า (รย.6)</p>
                        <p className='mb-0 text-grey'><strong className='f-bd'>2,041.56 บาท/ปี</strong></p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default VehicleCategoryComponent;
