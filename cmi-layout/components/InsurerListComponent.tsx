/* eslint-disable @next/next/no-img-element */
'use client';
import React from 'react';
import { useRouter } from 'next/navigation';

const InsurerListComponent = () => {
    const router = useRouter();

    const handleIntroChannel = (e: React.MouseEvent<HTMLDivElement>) => {
        router.push(`/th/intro-channel`);
    };

    return (
        <div className="container pb-20" onClick={handleIntroChannel}>
            <input type="submit" name="p$lt$ctl00$pageplaceholder$p$lt$ctl00$VIBError$btnHomePage" value="VIB" id="p_lt_ctl00_pageplaceholder_p_lt_ctl00_VIBError_btnHomePage" className="btn btn-primary fs-6 d-flex justify-content-center align-items-center mx-auto mb-0" />
        </div>
    );
};

export default InsurerListComponent;
