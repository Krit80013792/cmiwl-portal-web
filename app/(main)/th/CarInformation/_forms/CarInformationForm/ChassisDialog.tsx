import Image from 'next/image'
import React, { useState } from 'react'
import styled from 'styled-components'

interface ChassisDialogProps {
  open: boolean
  onClose: () => void
}

const TabButton = styled.button.withConfig({
  shouldForwardProp: (prop) => prop !== 'active',
}) <{ active?: boolean }>`
  padding: 8px 16px;
  border-radius: 50px;
  color: #3e3e3e;
  color: ${({ active }) => (active ? '#FFFFFF !important' : '#1E1E1F !important')};
  background-color: ${({ active }) => (active ? '#3F74F5 !important' : '#F2F2F2 !important')};

`

const TABS = [
  {
    key: 'bookNumber',
    label: 'เล่มทะเบียน',
    image: {
      alt: 'เล่มทะเบียน',
      width: 280,
      height: 226,
      src: '/assets/object/hint-book-number.png',
    },
  },
  {
    key: 'ctp',
    label: 'ป้ายภาษี',
    image: {
      alt: 'ป้ายภาษี',
      width: 300,
      height: 226,
      src: '/assets/object/hint-ctp.png',
    },
  },
  {
    key: 'ctpNumber',
    label: 'ตัวรถ',
    image: {
      alt: 'ตัวรถ',
      width: 280,
      height: 226,
      src: '/assets/object/hint-ctp-number.png',
    },
  },
]

export const ChassisDialog: React.FC<ChassisDialogProps> = ({ open, onClose }) => {
  const [activeTab, setActiveTab] = useState('bookNumber')

  if (!open) return null

  const currentTab = TABS.find((tab) => tab.key === activeTab)

  return (
    <div
      className="modal fade show"
      style={{ display: 'block', background: 'rgba(30, 30, 31, 0.80)' }}
      tabIndex={-1}
      aria-modal="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content" style={{ borderRadius: '16px', border: 'none' }}>
          <div className="modal-header">
            <h5 className="modal-title f-bd fs-18" id="exampleModalLongTitle" style={{ flex: '1', textAlign: 'center' }}>
              หมายเลขตัวถังดูได้จากที่ไหนบ้าง
            </h5>
            <button type="button" className="btn-close" aria-label="Close" onClick={onClose} />
          </div>
          <div className="modal-body" style={{ maxHeight: '314px' }}>
            <nav>
              <div className="nav nav-tabs border-0" id="nav-tab" role="tablist" style={{ display: 'grid', gap: '8px', gridTemplateColumns: 'repeat(3, 1fr)', backgroundColor: '#F2F2F2', padding: '6px', borderRadius: '32px', boxShadow: '2px 3px 8px 0 rgba(0, 0, 0, 0.10) inset' }}>
                {TABS.map((tab) => (
                  <TabButton
                    key={tab.key}
                    type="button"
                    role="tab"
                    aria-controls={`nav-${tab.key}`}
                    aria-selected={activeTab === tab.key}
                    active={activeTab === tab.key}
                    onClick={() => setActiveTab(tab.key)}
                  >
                    {tab.label}
                  </TabButton>
                ))}
              </div>
            </nav>
            <div className="tab-content" id="nav-tabContent">
              {currentTab && (
                <div
                  className="tab-pane fade show active"
                  id={`nav-${currentTab.key}`}
                  role="tabpanel"
                  aria-labelledby={`nav-${currentTab.key}-tab`}
                >
                  <Image
                    className="img-fluid d-block my-3 mx-auto"
                    alt={currentTab.image.alt}
                    width={currentTab.image.width}
                    height={currentTab.image.height}
                    src={currentTab.image.src}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
