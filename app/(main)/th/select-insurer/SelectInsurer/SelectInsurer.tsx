'use client'
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react"

export function formatPrice(value: number): string {
    return value.toLocaleString('th-TH', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });
    // 10000 -> "฿10,000.00"
}

const SelectInsurer = () => {
    const [insurer, setInsurer] = useState<any>([])
    const [selectedInsurerId, setSelectedInsurerId] = useState<string>('')
    const router = useRouter()

    useEffect(() => {
        const fetchInsurers = async () => {
            //todo: fetch insurer here
            //todo: sort price should sort in be
            const insurers = [{
                id: 'ergo',
                name: 'เออร์โก',
                image: '/assets/insurer/ergo.svg',
                sortOrder: 1,
                discountPrice: {
                    value: 10000,
                    unit: 'บาท/ปี',
                },
                originalPrice: {
                    value: 12000,
                    unit: 'บาท/ปี',
                },
                isRecommended: true,
            }, {
                id: 'viriya',
                name: 'วิริยะ',
                image: '/assets/insurer/viriya.svg',
                sortOrder: 2,
                originalPrice: {
                    value: 11500,
                    unit: 'บาท/ปี',
                },
                isRecommended: false,
            }]
            setInsurer(insurers)
        }
        fetchInsurers()
    }, [])

    const handleSelectInsurer = (insurer: any) => {
        setSelectedInsurerId(insurer.id)
        //todo: displach state to redux to use in another page 

        router.push('/th/car-information')
    }

    return (
        <section id="select-insurer-list">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {insurer.map((insurer: any) => (
                    <button
                        onClick={() => handleSelectInsurer(insurer)}
                        key={insurer.id}
                        style={{
                            display: 'flex', gap: '8px', alignItems: 'center', borderRadius: '12px', padding: '8px', height: '56px', border: selectedInsurerId === insurer.id ? '2px solid #2563EB' : '1px solid #DDDDDF',
                        }}
                    >
                        <div style={{ position: 'relative', padding: '4px', borderRadius: '8px', border: '1px solid #F2F2F2' }}>
                            {insurer.isRecommended && (
                                <img style={{ position: 'absolute', top: '0', right: '0', transform: 'translate(15px, -15px)' }} src="/assets/icon/recommend.svg" alt="recommended" />
                            )}
                            <img src={insurer.image} alt={insurer.name} />
                        </div>
                        <span style={{ flex: '1', textAlign: 'start' }}>{insurer.name}</span>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                            {insurer.discountPrice ? (
                                <>
                                    <div style={{ display: 'flex', gap: '4px', alignItems: 'end' }}>
                                        <span style={{ lineHeight: '20px', fontWeight: '700', fontSize: '20px', background: 'linear-gradient(90deg, #FF4696 0%, #F50 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                                            {formatPrice(insurer.discountPrice.value)}
                                        </span>
                                        <span style={{ fontSize: '12px' }}>
                                            {insurer.discountPrice.unit}
                                        </span>
                                    </div>
                                    {insurer.originalPrice && (
                                        <span style={{ textDecoration: 'line-through', color: '#999999', fontSize: '12px' }}>
                                            {formatPrice(insurer.originalPrice.value)} {insurer.originalPrice.unit}
                                        </span>
                                    )}
                                </>
                            ) : (
                                insurer.originalPrice && (
                                    <div style={{ display: 'flex', gap: '4px', alignItems: 'end' }}>
                                        <span style={{ lineHeight: '20px', fontWeight: '700', fontSize: '20px', background: 'linear-gradient(90deg, #000000 0%, #000000 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                                            {formatPrice(insurer.originalPrice.value)}
                                        </span>
                                        <span style={{ fontSize: '12px' }}>
                                            {insurer.originalPrice.unit}
                                        </span>
                                    </div>
                                )
                            )}
                        </div>
                    </button>
                ))}
                <Link href="/th/coverage-condition" style={{ marginTop: '18px', textAlign: 'center', color: '#1E1E1F' }}>
                    เงื่อนไขและรายละเอียดความคุ้มครอง
                </Link>
            </div>
        </section>
    )
}

export default SelectInsurer