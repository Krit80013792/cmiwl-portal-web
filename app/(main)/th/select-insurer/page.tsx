
import { getDataFromSession } from '@/helpers/functions/getDataFromSession'
import MainWithDynamicStyle from '@/cmi-layout/components/MainWithDynamicStyle'
import SelectInsurer from './SelectInsurer'

export default async function SelectInsurerPage() {
    const { channelData } = await getDataFromSession()
    let configValue: any = {}
    try {
        configValue = JSON.parse(channelData?.channelConfig?.configValue ?? '{}')
    } catch {
        configValue = {}
    }
    return (
        <section id="select-insurer-page">
            <MainWithDynamicStyle
                primaryColor={configValue?.primaryColor}
                secondaryColor={configValue?.secondaryColor}
            >
                <div className="head-bar">
                    <div className="container d-flex align-items-center">
                        <p className="text-center mb-0 w-100 fs-18 f-bd">พ.ร.บ.</p>
                    </div>
                </div>

                <div className="container pt-48">
                    <div className="pt-4">
                        <h1 className="mb-12 fs-18 text-black">
                            <strong className="f-bd">เลือกบริษัทประกันภัย</strong>
                        </h1>
                    </div>

                    <SelectInsurer />
                </div>
            </MainWithDynamicStyle>
        </section>
    )
}
