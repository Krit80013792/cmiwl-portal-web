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
                name: 'เออร์โกประกันภัย',
                image: '/assets/insurer/ergo.svg',
                link: 'https://www.google.com',
            }, {
                id: 'viriya',
                name: 'วิริยะประกันภัย',
                image: '/assets/insurer/viriya.svg',
                link: 'https://www.google.com',
            }])
        }
        fetchCoverage()
    }, [])

    return (
        <section id="coverage-condition-list">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', }}>
                {coverage.map((insurer: any) => (
                    <div
                        key={insurer.id}
                        style={{
                            display: 'flex', gap: '8px', alignItems: 'center', borderRadius: '12px', padding: '8px', height: '56px', border: '1px solid #DDDDDF',
                        }}
                    >
                        <div style={{ padding: '4px', border: '1px solid #F2F2F2', borderRadius: '8px' }}>
                            <img src={insurer.image} alt={insurer.name} />
                        </div>
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