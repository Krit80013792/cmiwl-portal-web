
import { getDataFromSession } from '@/helpers/functions/getDataFromSession'
import MainWithDynamicStyle from '@/cmi-layout/components/MainWithDynamicStyle'
import CoverageCondition from './CoverageCondition'
import Link from 'next/link'
import Image from 'next/image'

export default async function ConverageConditionPage() {
    const { channelData } = await getDataFromSession()
    let configValue: any = {}
    try {
        configValue = JSON.parse(channelData?.channelConfig?.configValue ?? '{}')
    } catch {
        configValue = {}
    }
    return (
        <section id="coverage-condition-page">
            <MainWithDynamicStyle
                primaryColor={configValue?.primaryColor}
                secondaryColor={configValue?.secondaryColor}
            >
                <div className="head-bar">
                    <div className="container d-flex align-items-center">
                        <Link href="/th/select-insurer" className="back-btn">
                            <img alt="กลับ" width="36" height="36" src="/assets/icon/back.png" />
                        </Link>
                        <p
                            id="p_lt_ctl00_pageplaceholder_p_lt_ctl00_VehicleCategory_lbHeaderBar"
                            className="text-center mb-0 w-100 fs-18 f-bd"
                        >
                            พ.ร.บ.
                        </p>
                    </div>
                </div>

                <div className="container pt-48">
                    <Image
                        src="/assets/coverage-condition/coverage-condition.svg"
                        alt="เงื่อนไขการรับประกันแต่ละบริษัท"
                        width={556}
                        height={584}
                    />
                </div>


                <div className="container">
                    <div style={{ marginTop: '16px' }}>
                        <h1 className="mb-12 fs-18 text-black">
                            <strong className="f-bd">เงื่อนไขการรับประกันแต่ละบริษัท</strong>
                        </h1>
                    </div>

                    <CoverageCondition />
                </div>
            </MainWithDynamicStyle>
        </section>
    )
}
