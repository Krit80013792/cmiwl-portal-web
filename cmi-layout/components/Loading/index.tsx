import React, { useEffect, useState } from 'react'

export default function LoadingComponent() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    setVisible(true)
    return () => setVisible(false)
  }, [])

  return (
    <>
      <style>
        {`
          .modalSpinner .modal-content {
              width: 180px;
              height: 144px;
              flex-grow: 0;
              margin: 43px 90px 19px;
              padding: 16px 38px 16px 39px;
              border-radius: 8px;
              background-color: rgba(29,29,29,0.7)!important;
          }
          .modalSpinner .spinner-border {
              width: 45px;
              height: 45px;
          }
          .modalSpinner {
              -webkit-backdrop-filter: blur(20px);
              backdrop-filter: blur(20px);
              background-color: rgba(0, 21, 38, 0.5);
              opacity: 0;
              visibility: hidden;
              transition: opacity 0.4s ease, visibility 0.4s;
          }
          .modalSpinner.show-fade {
              opacity: 1;
              visibility: visible;
          }
        `}
      </style>
      <div
        className={`modal fade modalSpinner${visible ? ' show-fade' : ''}`}
        style={{ display: 'block' }}
        id="ModalLoading"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content bg-transparent border-0 justify-content-center align-items-center mx-auto">
            <div className="spinner-border text-light"></div>
            <p className="text-white text-center mt-3 mb-0">
              กำลังดำเนินการ
              <br />
              กรุณารอซักครู่
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
