'use client'

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import LoadingComponent from '@/layout/components/loading/LoadingComponent'
import { Toast } from 'primereact/toast'
import { Dropdown } from 'primereact/dropdown'
import { InputText } from 'primereact/inputtext'
import { Calendar } from 'primereact/calendar'
import { Button } from 'primereact/button'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { ApiRoute } from '@/src/shared/utils/profile'
import { formatDateToYMD } from '@/src/shared/utils/utils'
import { getCMIApiLogs } from '@/services/client/cmiLogsApi.service'
import { dataColumns } from './_constants'
import FormDialog, { FormDialogRef } from '@/modules/FormDialog'
import { getMasterDataByEndpoint } from '@/services/client/master-data.service'
import dayjs from 'dayjs'
import Section from './_components/Section'
import InfoRow from './_components/Info'

interface Options {
  label: string
  value: string
}

const OrderReportAdminPage = () => {
  const toastRef = useRef<Toast>(null)
  const dialogViewRef = useRef<FormDialogRef>(null)
  const [channel, setChannel] = useState<string>('all')
  const [channelOptions, setChannelOptions] = useState<Options[]>([])
  const [orderStatus, setOrderStatus] = useState<string>('all')
  const [startDate, setStartDate] = useState<Date | null>(new Date())
  const [endDate, setEndDate] = useState<Date | null>(new Date())
  const [name, setName] = useState<string>('')
  const [licensePlate, setLicensePlate] = useState<string>('')
  const [orderNo, setOrderNo] = useState<string>('')
  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  const setApiRoute = async (): Promise<any> => {
    const c = await ApiRoute()
    const de = JSON.parse(Buffer.from(c, 'base64').toString('binary'))
    return de
  }

  const fetchData = async () => {
    try {
      setLoading(true)
      const apiRoute = await setApiRoute()
      const sStartDate = formatDateToYMD(new Date(startDate || new Date()))
      const sEndDate = formatDateToYMD(new Date(endDate || new Date()))
      const channelParam = channel === 'all' ? channelOptions.map((option) => option.value).join(',') : channel
      const orderStatusParam = orderStatus === 'all' ? 'pending,completed,failed' : orderStatus
      const res = await getCMIApiLogs(
        apiRoute,
        `channel=${channelParam}&startDate=${sStartDate}&endDate=${sEndDate}&name=${name}&licensePlate=${licensePlate}&orderNo=${orderNo}&orderStatus=${orderStatusParam}`,
      )
      const data = await res.json()

      if (data?.data?.length > 0) {
        setData(data.data)
      } else {
        setData([])
        toastRef.current &&
          toastRef.current.show({
            severity: 'warn',
            summary: 'No Data',
            detail: 'No data found for the selected filters',
            life: 3000,
          })
      }
    } catch (error) {
      console.error('Error fetching data:', error)
      if (toastRef.current) {
        toastRef.current.show({ severity: 'error', summary: 'Error', detail: 'Failed to fetch data', life: 3000 })
      }
    } finally {
      setLoading(false)
    }
  }

  const fetchChannelOptions = useCallback(async () => {
    try {
      const apiRoute = await setApiRoute()
      const res = await getMasterDataByEndpoint(apiRoute, apiRoute?.amd, 'channels')
      const data = await res.json()
      const options: Options[] = data.data
        .filter((channel: { active: boolean }) => channel.active)
        .map((channel: { displayName: string; keyCode: string }) => ({
          label: channel.displayName,
          value: channel.keyCode.toLocaleUpperCase(),
        }))
      setChannelOptions(options)
    } catch (error) {
      console.error('Error fetching channel options:', error)
    }
  }, [])

  useEffect(() => {
    fetchChannelOptions()
  }, [fetchChannelOptions])

  const handleSearch = async () => {
    if (name || licensePlate || orderNo) {
      await fetchData()
    } else {
      toastRef.current &&
        toastRef.current.show({
          severity: 'warn',
          summary: 'Warning',
          detail: 'กรุณากรอกข้อมูลอย่างน้อยหนึ่งรายการ (ชื่อ, ทะเบียนรถ หรือ หมายเลข Order)',
          life: 3000,
        })
    }
  }

  const handleResetSearch = async () => {
    setChannel('all')
    setStartDate(new Date())
    setEndDate(new Date())
    setName('')
    setLicensePlate('')
    setOrderNo('')
    setOrderStatus('all')
    setData([])
  }

  const logsData = useMemo(() => {
    const fmt = (v?: string | number | null) => (v ? String(v) : '-')
    const datetimeFmt = (v?: Date | null) => (v ? dayjs(v).format('DD/MM/YYYY HH:mm:ss') : '-')
    const dateFmt = (v?: Date | null) => (v ? dayjs(v).format('DD/MM/YYYY') : '-')
    const statusColor = (v?: string) => {
      const s = (v || '').toLowerCase()
      if (['success', 'paid', 'completed', 'ok'].includes(s)) return '#2e7d32'
      if (['pending', 'processing', 'inprogress'].includes(s)) return '#f59e0b'
      if (!s || s === '-') return '#6b7280'
      return '#dc2626'
    }

    return data.map((item) => {
      const handleView = () => {
        dialogViewRef.current?.open({
          title: 'Log Detail',
          draggable: false,
          // Match dialog width to content; keep it responsive
          style: { width: 'min(960px, 92vw)' },
          children: (
            <div
              style={{
                background: '#f8fafc',
                borderRadius: 12,
                padding: 20,
                maxHeight: '70vh',
                overflowY: 'auto',
                boxShadow: 'inset 0 0 0 1px #e5e7eb',
              }}
            >
              {/* หมายเลข Order */}
              <Section title={`หมายเลข Order: ${fmt(item?.orderNo)}`} accent="#3b82f6">
                <div>
                  <InfoRow label="เลขตัวถัง:" value={fmt(item?.detail?.chassisNo)} />
                  <InfoRow label="ทะเบียนรถ:" value={fmt(item?.licensePlate)} />
                  <InfoRow label="รายละเอียดรถ:" value={fmt(item?.detail?.carType)} />
                  <InfoRow label="ยี่ห้อรถ:" value={fmt(item?.detail?.carBrandName)} />
                </div>
                <div>
                  <InfoRow label="รุ่นรถ:" value={fmt(item?.detail?.carModelName)} />
                  <InfoRow label="จังหวัดที่จดทะเบียนรถ:" value={fmt(item?.detail?.provinceName)} />
                  <InfoRow label="วันที่เริ่มคุ้มครอง:" value={dateFmt(item?.detail?.effectiveDate)} />
                  <InfoRow label="วันที่สิ้นสุดวันคุ้มครอง:" value={dateFmt(item?.detail?.expiredDate)} />
                </div>
              </Section>

              {/* Business Validation */}
              <Section title="Business Validation" accent="#ef4444">
                <div>
                  <InfoRow label="วันที่ทำรายการ:" value={datetimeFmt(item?.requestDate)} />
                  <InfoRow label="Status:" value={fmt(item?.orderStatus)} valueColor={statusColor(item?.orderStatus)} />
                </div>
                <div>
                  <InfoRow label="Message:" value={fmt(item?.message)} />
                  <InfoRow label="Tech Message:" value={fmt(item?.detail?.techMessage)} />
                </div>
              </Section>

              {/* การส่งข้อมูลการชำระเงิน */}
              <Section title="การส่งข้อมูลการชำระเงิน" accent="#f59e0b">
                <div>
                  <InfoRow label="วันที่ทำรายการ:" value={datetimeFmt(item?.detail?.paymentDate)} />
                  <InfoRow label="ช่องทางการชำระเงิน:" value={fmt(item?.detail?.paymentChannel)} />
                  <InfoRow
                    label="Status:"
                    value={fmt(item?.detail?.paymentStatus)}
                    valueColor={statusColor(item?.detail?.paymentStatus)}
                  />
                </div>
                <div>
                  <InfoRow label="Message:" value={fmt(item?.detail?.paymentMessage)} />
                </div>
              </Section>

              {/* ผลการชำระเงิน (hook payment) */}
              <Section title="ผลการชำระเงิน (hook payment)" accent="#0baff5ff">
                <div>
                  <InfoRow label="วันที่ทำรายการ:" value={datetimeFmt(item?.detail?.paymentResultDate)} />
                  <InfoRow
                    label="สถานะการชำระเงิน:"
                    value={fmt(item?.detail?.paymentResultStatus)}
                    valueColor={statusColor(item?.detail?.paymentResultStatus)}
                  />
                </div>
                <div>
                  <InfoRow label="Payment No:" value={fmt(item?.detail?.paymentNo)} />
                  <InfoRow label="Amount:" value={fmt(item?.detail?.amount)} />
                </div>
              </Section>

              {/* ผลการออก e-policy */}
              <Section title="ผลการออก e-policy (hook policy)" accent="#a855f7">
                <div>
                  <InfoRow label="วันที่ทำรายการ:" value={datetimeFmt(item?.detail?.policyResultDate)} />
                  <InfoRow label="Policy No:" value={fmt(item?.detail?.policyNo)} />
                  <InfoRow label="Cover Note:" value={fmt(item?.detail?.covernote)} />
                  <InfoRow label="Partner Code:" value={fmt(item?.detail?.partnerCode)} />
                </div>
                <div>
                  <InfoRow label="Partner Ref No:" value={fmt(item?.detail?.partnerRefNo)} />
                  <InfoRow label="Ins Order No:" value={fmt(item?.detail?.insOrderNo)} />
                  <InfoRow label="Cross Running No:" value={fmt(item?.detail?.crossRunningNo)} />
                  <InfoRow label="Running No:" value={fmt(item?.detail?.runningNo)} />
                </div>
              </Section>

              {/* ผลการออกเอกสาร */}
              <Section title="ผลการออกเอกสาร (hook document)" accent="#10b981">
                <div>
                  <InfoRow label="วันที่ทำรายการ:" value={datetimeFmt(item?.detail?.documentResultDate)} />
                  <InfoRow label="Document No:" value={fmt(item?.detail?.documentNo)} />
                  <InfoRow label="Transaction No:" value={fmt(item?.detail?.transactionNo)} />
                  <InfoRow label="Partner Code:" value={fmt(item?.detail?.partnerCode)} />
                  <InfoRow label="Partner Ref No:" value={fmt(item?.detail?.partnerRefNo)} />
                </div>
                <div>
                  <InfoRow label="File Attachment No:" value={fmt(item?.detail?.fileAttatchmentNo)} />
                  <InfoRow label="File Attachment Code:" value={fmt(item?.detail?.fileAttatchmentCode)} />
                  <InfoRow label="File Attachment Name:" value={fmt(item?.detail?.fileAttatchmentName)} />
                  <InfoRow label="File Index:" value={fmt(item?.detail?.fileIndex)} />
                </div>
              </Section>
            </div>
          ),
        })
      }

      return {
        ...item,
        paymentNo: item?.detail?.paymentNo ? fmt(item?.detail?.paymentNo) : '-',
        requestDate: datetimeFmt(item?.requestDate),
        tel: item?.tel?.replace('+66', '0') || '-',
        actions: <Button label="View" icon="pi pi-eye" onClick={handleView} className="p-button-text" />,
      }
    })
  }, [data])

  return (
    <div className="grid">
      <div className="col-12">
        <div className="card">
          <Toast ref={toastRef} />
          <h5>
            <i className="pi pi-table" style={{ fontSize: '2rem' }} /> <strong>Order Report Admin</strong>
          </h5>
        </div>

        {loading && <LoadingComponent />}

        <div className="card p-fluid">
          <div className="field grid">
            <label htmlFor="channel" className="col-12 mb-2 md:col-2 md:mb-0">
              Channel:
            </label>
            <div className="col-12 md:col-6">
              <Dropdown
                inputId="channel"
                value={channel}
                onChange={(e) => setChannel(e.value)}
                options={[{ label: 'All', value: 'all' }, ...channelOptions]}
                placeholder="Select Channel"
              />
            </div>
          </div>
          <div className="field grid">
            <label htmlFor="startDate" className="col-12 mb-2 md:col-2 md:mb-0">
              วันที่เริ่มทำรายการ:{' '}
            </label>
            <div className="col-12 md:col-3">
              <Calendar
                inputId="startDate"
                value={startDate}
                onChange={(e) => setStartDate(e.value || null)}
                dateFormat="yy-mm-dd"
                showIcon
              />
            </div>
          </div>
          <div className="field grid">
            <label htmlFor="endDate" className="col-12 mb-2 md:col-2 md:mb-0">
              วันที่สิ้นสุดทำรายการ:{' '}
            </label>
            <div className="col-12 md:col-3">
              <Calendar
                inputId="endDate"
                value={endDate}
                onChange={(e) => setEndDate(e.value || null)}
                dateFormat="yy-mm-dd"
                showIcon
              />
            </div>
          </div>
          <div className="field grid">
            <label htmlFor="name" className="col-12 mb-2 md:col-2 md:mb-0">
              ชื่อ:{' '}
            </label>
            <div className="col-12 md:col-6">
              <InputText
                id="name"
                name="name"
                value={name}
                placeholder="ชื่อ"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>
          <div className="field grid">
            <label htmlFor="licensePlate" className="col-12 mb-2 md:col-2 md:mb-0">
              ทะเบียนรถ:{' '}
            </label>
            <div className="col-12 md:col-6">
              <InputText
                id="licensePlate"
                name="licensePlate"
                value={licensePlate}
                placeholder="ทะเบียนรถ"
                onChange={(e) => setLicensePlate(e.target.value)}
              />
            </div>
          </div>
          <div className="field grid">
            <label htmlFor="orderNo" className="col-12 mb-2 md:col-2 md:mb-0">
              หมายเลข Order:{' '}
            </label>
            <div className="col-12 md:col-6">
              <InputText
                id="orderNo"
                name="orderNo"
                value={orderNo}
                placeholder="หมายเลข Order"
                onChange={(e) => setOrderNo(e.target.value)}
              />
            </div>
          </div>
          <div className="field grid">
            <label htmlFor="channel" className="col-12 mb-2 md:col-2 md:mb-0">
              Order Status:
            </label>
            <div className="col-12 md:col-6">
              <Dropdown
                inputId="orderStatus"
                value={orderStatus}
                onChange={(e) => setOrderStatus(e.value)}
                options={[
                  { label: 'All', value: 'all' },
                  { label: 'pending', value: 'pending' },
                  { label: 'completed', value: 'completed' },
                  { label: 'failed', value: 'failed' },
                ]}
                placeholder="Select Order Status"
              />
            </div>
          </div>
          <div className="field grid">
            <div className="col-12 md:col-4"></div>
            <div className="col-12 md:col-2">
              <Button
                label="Reset"
                icon="pi pi-replay"
                severity="secondary"
                className="mr-2"
                onClick={handleResetSearch}
              />
            </div>
            <div className="col-12 md:col-2">
              <Button label="Search" icon="pi pi-search" severity="success" className="mr-2" onClick={handleSearch} />
            </div>
            <div className="col-12 md:col-4"></div>
          </div>
        </div>

        <div className="card">
          <DataTable
            value={logsData}
            dataKey="itemID"
            paginator
            rows={20}
            rowsPerPageOptions={[5, 10, 20, 50, 100]}
            className="p-datatable-sm"
            scrollable
            scrollHeight="600px"
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords} Records"
            loading={loading}
            globalFilterFields={['newsPageName', 'newsHeaderContent']}
            emptyMessage="Data not found."
          >
            {dataColumns.map((col, index) => (
              <Column
                key={col.field}
                header={col.header}
                headerStyle={col.headerStyle}
                field={col.field}
                sortable={col.sortable}
              />
            ))}
          </DataTable>
          <FormDialog ref={dialogViewRef} />
        </div>
      </div>
    </div>
  )
}

export default OrderReportAdminPage
