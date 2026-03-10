'use client'
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react"

export function formatPriceTHB(value: number): string {
    return value.toLocaleString('th-TH', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });
    // 10000 -> "฿10,000.00"
}

const CoverageCondition = () => {
    const [coverage, setCoverage] = useState<any>([])
    const router = useRouter()

    useEffect(() => {
        const fetchCoverage = async () => {
            //todo: fetch insurer here
            setCoverage([{
                id: 'ergo',
                name: 'เออร์โก',
                image: '/assets/insurer/ergo.svg',
                discountPrice: {
                    value: 10000,
                    unit: 'บาท/ปี',
                },
                originalPrice: {
                    value: 12000,
                    unit: 'บาท/ปี',
                },
            }, {
                id: 'viriya',
                name: 'วิริยะ',
                image: '/assets/insurer/viriya.svg',
                originalPrice: {
                    value: 11500,
                    unit: 'บาท/ปี',
                },
            }])
        }
        fetchCoverage()
    }, [])

    return (
        <section id="select-insurer-list">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {coverage.map((insurer: any) => (
                    <div
                        key={insurer.id}
                        style={{
                            display: 'flex', gap: '8px', alignItems: 'center', borderRadius: '12px', padding: '8px', height: '56px', border: '1px solid #DDDDDF',
                        }}
                    >
                        <img src={insurer.image} alt={insurer.name} />
                        <span style={{ flex: '1', textAlign: 'start' }}>{insurer.name}</span>
                        <a href={insurer.link} >
                            <img src="/assets/icon/download.svg" alt="download" width={20} height={20} />
                        </a>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default CoverageCondition