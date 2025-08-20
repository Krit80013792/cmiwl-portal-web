/* eslint-disable @next/next/no-img-element */
'use client';
import React from 'react';
import { useRouter } from 'next/navigation';

const VehicleListComponent = (poCompulsoryTypes: any) => {
    const router = useRouter();

    console.log(poCompulsoryTypes);

    const handleVehicleCategory = (e: React.MouseEvent<HTMLDivElement>) => {
        router.push(`/th/VehicleCategory`);
    };

    const handleCarInformation = (e: React.MouseEvent<HTMLDivElement>) => {
        router.push(`/th/CarInformation`);
    };

    return (
        <div id="p_lt_ctl00_pageplaceholder_p_lt_ctl00_VehicleCTP_showVehicle" className="row vehicle">
            <div className='col-6 pe-2 mb-3  '>
                {/* onclick="if (!window.__cfRLUnblockHandlers) return false; selVehicle(this);" */}
                {/* data-cartype='1' data-cargroupval='type' data-cargroup='1' data-carDisplayName='รถเก๋ง' data-cf-modified-2d7b21b358a016e2ff53c284-="" */}
                <div className='py-12 px-3 rounded-4 choice-card text-center h-100 hey-active' onClick={handleVehicleCategory}>
                    <img className='img-fluid mb-1' width='80' height='42' alt='รถเก๋ง' src='/assets/icon/car.png' />
                    <p className='mb-0 text-center text-grey'>รถเก๋ง</p>
                </div>
            </div>
            <div className='col-6 ps-2 mb-3  '>
                {/* onclick="if (!window.__cfRLUnblockHandlers) return false; selVehicle(this);" */}
                {/* data-cartype='1' data-cargroupval='type' data-cargroup='2' data-carDisplayName='รถกระบะ 4 ประตู' data-cf-modified-2d7b21b358a016e2ff53c284-="" */}
                <div className='py-12 px-3 rounded-4 choice-card text-center h-100' onClick={handleVehicleCategory}>
                    <img className='img-fluid mb-1' width='80' height='42' alt='รถกระบะ 4 ประตู' src='/assets/icon/pickup4.png' />
                    <p className='mb-0 text-center text-grey'>รถกระบะ 4 ประตู</p>
                </div>
            </div>
            <div className='col-6 pe-2 mb-3  '>
                {/* onclick="if (!window.__cfRLUnblockHandlers) return false; selVehicle(this);" */}
                {/* data-cartype='2' data-cargroupval='weight' data-cargroup='3' data-carDisplayName='รถกระบะ 2 ประตู' data-cf-modified-2d7b21b358a016e2ff53c284-="" */}
                <div className='py-12 px-3 rounded-4 choice-card text-center h-100' onClick={handleCarInformation}>
                    <img className='img-fluid mb-1' width='80' height='42' alt='รถกระบะ 2 ประตู' src='/assets/icon/pickup.png' />
                    <p className='mb-0 text-center text-grey'>รถกระบะ 2 ประตู</p>
                </div>
            </div>
            <div className='col-6 ps-2 mb-3  '>
                {/* onclick="if (!window.__cfRLUnblockHandlers) return false; selVehicle(this);" */}
                {/* data-cartype='5' data-cargroupval='weight' data-cargroup='4' data-carDisplayName='รถบรรทุก' data-cf-modified-2d7b21b358a016e2ff53c284-="" */}
                <div className='py-12 px-3 rounded-4 choice-card text-center h-100' onClick={handleVehicleCategory}>
                    <img className='img-fluid mb-1' width='80' height='42' alt='รถบรรทุก' src='/assets/icon/truck.png' />
                    <p className='mb-0 text-center text-grey'>รถบรรทุก</p>
                </div>
            </div>
            <div className='col-6 pe-2 '>
                {/* onclick="if (!window.__cfRLUnblockHandlers) return false; selVehicle(this);" */}
                {/* data-cartype='7|8' data-cargroupval='seat' data-cargroup='5' data-carDisplayName='รถโดยสารมากกว่า 7 ที่นั่ง' data-cf-modified-2d7b21b358a016e2ff53c284-="" */}
                <div className='py-12 px-3 rounded-4 choice-card text-center h-100' onClick={handleVehicleCategory}>
                    <img className='img-fluid mb-1' width='80' height='42' alt='รถโดยสารมากกว่า 7 ที่นั่ง' src='/assets/icon/van.png' />
                    <p className='mb-0 text-center text-grey'>รถโดยสารมากกว่า 7 ที่นั่ง</p>
                </div>
            </div>
        </div>
    );
};

export default VehicleListComponent;
