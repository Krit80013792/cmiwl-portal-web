'use client'

import { prefillDataSlice } from '@/stores/redux/slices/prefillDataSlice'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Skeleton } from 'primereact/skeleton'
import { getPrefillData } from '../../_actions'
import useLoading from '@/helpers/hooks/useLoading'
import SeeMoreButton from '../SeeMoreButton'


const OldVehicle = ({ channel }: { channel: any }) => {
  const { openLoading, closeLoading } = useLoading()
  const dispatch = useDispatch()
  const route = useRouter()
  const [data, setData] = useState<any>({})
  const [isLoadingData, setIsLoadingData] = useState<boolean>(true)


  const fetchData = useCallback(async () => {
    try {
      setIsLoadingData(true)
      openLoading()
      const res = await getPrefillData()
      const { data } = res.data
      if (res) {
        setData(data.prefill)
      }
    } catch (error) {
      console.error('Error fetching prefill data:', error)
    } finally {
      setIsLoadingData(false)
      closeLoading()
    }
  }, [openLoading, closeLoading])

  useEffect(() => {
    fetchData()
  }, [fetchData, dispatch])

  const handleSubmit = async (selected: any) => {
    dispatch(
      prefillDataSlice.actions.setPrefillData({
        ...data,
        channel,
        productCmiDetail: {
          ...(selected?.productCmiDetail ?? data?.productCmiDetail),
          carTypeName: selected?.productCmiDetail?.displayName ?? data?.productCmiDetail?.displayName,
        },
        deliveryType: {
          isEmail: data?.deliveryType?.isEmail,
          isSms: data?.deliveryType?.isSms,
          isPolicyEmail: data?.deliveryType?.isEmail,
          isPolicySms: data?.deliveryType?.isSms,
          policyEmail: data?.deliveryType?.policyEmail,
          policySms: data?.deliveryType?.policySms,
        },
      }),
    )
    route.push('/th/CarInformation')
  }


  //TODO: need to change productCmiDetail model as a list instead of object
  const [mockProductCmiDetail, setMockProductCmiDetail] = useState<any>([])
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null)
  const [isLastItem, setIsLastItem] = useState<boolean>(false)

  const createMockProductCmiList = (baseDetail: any, count: number) => {
    return Array.from({ length: count }, (_, index) => {
      const suffix = index + 1
      const baseLicenseNo = baseDetail?.productCmiDetail?.licenseNo ?? baseDetail?.licenseNo ?? ''
      const baseLicensePrefix = baseDetail?.licensePrefix ?? ''

      return {
        ...baseDetail,
        id: `${baseDetail?.id ?? 'mock'}-${suffix}`,
        licensePrefix: `${baseLicensePrefix}${suffix}`,
        productCmiDetail: {
          ...(baseDetail?.productCmiDetail ?? {}),
          licenseNo: `${baseLicenseNo}${suffix}`,
        },
      }
    })
  }

  const handleFetchMore = () => {
    const productCmiDetail = data?.productCmiDetail
    if (productCmiDetail) {
      setMockProductCmiDetail(createMockProductCmiList(productCmiDetail, 4))
    }
    setIsLastItem(true)
  }

  useEffect(() => {
    const productCmiDetail = data?.productCmiDetail
    if (productCmiDetail) {
      setMockProductCmiDetail(createMockProductCmiList(productCmiDetail, 3))
    }
  }, [data?.productCmiDetail])

  return (
    <div className="row car-select mb-4">
      <div>
        <div className="col-6 pe-2" style={{ width: '100%' }}>
          {isLoadingData ? (
            // Skeleton loading state
            <div className="pt-10 pb-2 px-12 rounded-4 choice-card text-center h-100">
              <Skeleton width="70%" height="1.5rem" className="mb-2 mx-auto" />
              <Skeleton width="40%" height="1rem" className="mx-auto" />
            </div>
          ) : (
            // Actual vehicle data
            <>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '17px' }}>
                {
                  mockProductCmiDetail.map((item: any) => (
                    <div
                      key={item?.id}
                      className={`pt-10 pb-2 px-12 rounded-4 choice-card text-center h-100${selectedProduct?.id === item?.id ? ' active' : ''}`}
                    >
                      <button
                        onClick={() => {
                          setSelectedProduct(item)
                          handleSubmit(item)
                        }}
                        type="button"
                        className="w-100 border-0 bg-transparent"
                      >
                        <p className="mb-0 text-grey fs-22">
                          <strong className="f-bd">{`${item?.licensePrefix ?? ''}-${item?.productCmiDetail?.licenseNo ?? ''}`}</strong>
                        </p>
                        <p className="mb-0 text-center text-grey">รถยนต์</p>
                      </button>
                    </div>
                  ))
                }
              </div>
              <div style={{ display: 'flex', justifyContent: 'center' }} >
                <SeeMoreButton hidden={isLastItem} onFetchMore={() => handleFetchMore()} />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default OldVehicle

