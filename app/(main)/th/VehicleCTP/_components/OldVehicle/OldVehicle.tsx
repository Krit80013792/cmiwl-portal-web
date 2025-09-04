'use client'

import { prefillDataSlice } from '@/stores/redux/slices/prefillDataSlice'
import { useRouter } from 'next/navigation'
import { useDispatch } from 'react-redux'

const OldVehicle = ({ prefill }: { prefill: any }) => {
  const dispatch = useDispatch()
  const route = useRouter()

  const handleSubmit = async () => {
    dispatch(prefillDataSlice.actions.setPrefillData({ ...prefill }))
    route.push('/th/CarInformation')
  }
  return (
    <div className="row car-select mb-4">
      <div>
        <div className="col-6 pe-2">
          <div onClick={handleSubmit}>
            <div className="pt-10 pb-2 px-12 rounded-4 choice-card text-center h-100 active">
              <p className="mb-0 text-grey fs-22">
                <strong className="f-bd">{`${prefill?.productCmiDetail?.licensePrefix}-${prefill?.productCmiDetail?.licenseNo}`}</strong>
              </p>
              <p className="mb-0 text-center text-grey">รถยนต์</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OldVehicle
