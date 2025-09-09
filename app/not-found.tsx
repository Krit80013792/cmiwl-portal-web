import React from 'react'
import { Metadata } from 'next'
import styles from './not-found.module.css'
import { Button } from 'primereact/button'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'ต่อ พ.ร.บ. รถยนต์ออนไลน์ (ประกันภาคบังคับ) กับติดล้อ',
    description:
      'พ.ร.บ. รถยนต์ ต่อง่าย สะดวก รวดเร็วกับเว็บติดล้อ ประกันภัยภาคบังคับคุ้มครองทั้งคุณและบุคคลภายนอก ต่อพ.ร.บ. ออนไลน์รับกรมธรรม์อิเล็กทรอนิกส์ทันทีที่นี่',
  }
}

export default function Custom404() {
  return (
    <main>
      <div className={`${styles.fullPage}`}>
        <div className={styles['content-block-404']}>
          <div className={styles['text-center']}>
            <img
              src="/cmisite/media/assets/component-illustrate-error-404.webp"
              alt="404"
              width="360"
              height="171"
              className={`${styles['img-fluid']} mb-3`}
            />
          </div>
          <div className={`container ${styles['text-center']}`}>
            <h1 className={`${styles['fs-18']} ${styles['f-bd']} mb-12`}>ขออภัย ไม่พบหน้าที่คุณต้องการ</h1>
            <p className={`${styles['fs-16']} ${styles['f-bd']} ${styles['text-caption']} mb-0`}>
              ลองตรวจสอบลิงก์ของคุณอีกครั้ง <span className="d-inline-block">หรือกลับหน้าหลัก</span>
            </p>
          </div>
        </div>
        <div className={styles['btn-wrapper-404']}>
          <div className={`container ${styles['text-center']}`}>
            <a href="/" className="text-decoration-none">
              <Button
                label="กลับหน้าหลัก"
                className={`${styles['btn-primary']} fs-6 d-flex justify-content-center align-items-center mb-4`}
              />
            </a>
          </div>
        </div>
      </div>
    </main>
  )
}
