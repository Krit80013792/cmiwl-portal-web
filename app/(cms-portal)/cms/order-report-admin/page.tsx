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
import { getCmiApiLogs } from '@/services/client/cmiLogsApi.service'
import { dataColumns } from './_constants'
import FormDialog, { FormDialogRef } from '@/modules/FormDialog'
import { getMasterDataByEndpoint } from '@/services/client/master-data.service'

interface ChannelOptions {
  label: string
  value: string
}

const OrderReportAdminPage = () => {
  const toastRef = useRef<Toast>(null)
  const dialogViewRef = useRef<FormDialogRef>(null)
  const [channel, setChannel] = useState<string>('')
  const [channelOptions, setChannelOptions] = useState<ChannelOptions[]>([])
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
      const res = await getCmiApiLogs(
        apiRoute,
        `channel=${channel}&startDate=${sStartDate}&endDate=${sEndDate}&name=${name}&licensePlate=${licensePlate}&orderNo=${orderNo}`,
      )
      const data = await res.json()
      if (data.data.length > 0) {
        setData(data.data)
      } else {
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
      const options: ChannelOptions[] = data.data.map((channel: { displayName: string; keyCode: string }) => ({
        label: channel.displayName,
        value: channel.keyCode,
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
    await fetchData()
  }

  const handleResetSearch = async () => {
    setChannel('')
    setStartDate(new Date())
    setEndDate(new Date())
    setName('')
    setLicensePlate('')
    setOrderNo('')
    setData([])
    await fetchData()
  }

  const logsData = useMemo(() => {
    return data.map((item) => {
      const handleView = () => {
        dialogViewRef.current?.open({
          title: 'Log Detail',
          draggable: false,
          style: { width: '400px' },
          children: (
            <div style={{ minWidth: 350, background: '#f8f9fa', borderRadius: 8, padding: 20 }}>
              <div className="p-field mb-3" style={{ display: 'flex', marginBottom: 12 }}>
                <label
                  htmlFor={`orderNo-detail-${item.orderNo}`}
                  className="font-bold"
                  style={{ width: 130, color: '#495057' }}
                >
                  Order No:
                </label>
                <span id={`orderNo-detail-${item.orderNo}`} style={{ color: '#212529' }}>
                  {item.orderNo || '-'}
                </span>
              </div>
              <div className="p-field mb-3" style={{ display: 'flex', marginBottom: 12 }}>
                <label
                  htmlFor={`channel-detail-${item.orderNo}`}
                  className="font-bold"
                  style={{ width: 130, color: '#495057' }}
                >
                  Channel:
                </label>
                <span id={`channel-detail-${item.orderNo}`} style={{ color: '#212529' }}>
                  {item.channel || '-'}
                </span>
              </div>
              <div className="p-field mb-3" style={{ display: 'flex', marginBottom: 12 }}>
                <label
                  htmlFor={`name-detail-${item.orderNo}`}
                  className="font-bold"
                  style={{ width: 130, color: '#495057' }}
                >
                  Name:
                </label>
                <span id={`name-detail-${item.orderNo}`} style={{ color: '#212529' }}>
                  {item.name || '-'}
                </span>
              </div>
              <div className="p-field mb-3" style={{ display: 'flex', marginBottom: 12 }}>
                <label
                  htmlFor={`licensePlate-detail-${item.orderNo}`}
                  className="font-bold"
                  style={{ width: 130, color: '#495057' }}
                >
                  License Plate:
                </label>
                <span id={`licensePlate-detail-${item.orderNo}`} style={{ color: '#212529' }}>
                  {item.licensePlate || '-'}
                </span>
              </div>
              <div className="p-field mb-3" style={{ display: 'flex', marginBottom: 12 }}>
                <label
                  htmlFor={`date-detail-${item.orderNo}`}
                  className="font-bold"
                  style={{ width: 130, color: '#495057' }}
                >
                  Date:
                </label>
                <span id={`date-detail-${item.orderNo}`} style={{ color: '#212529' }}>
                  {item.date || '-'}
                </span>
              </div>
              <div className="p-field mb-3" style={{ display: 'flex', marginBottom: 12 }}>
                <label
                  htmlFor={`status-detail-${item.orderNo}`}
                  className="font-bold"
                  style={{ width: 130, color: '#495057' }}
                >
                  Status:
                </label>
                <span
                  id={`status-detail-${item.orderNo}`}
                  style={{ color: item.status === 'success' ? '#28a745' : '#dc3545', fontWeight: 500 }}
                >
                  {item.status || '-'}
                </span>
              </div>
              <div className="p-field mb-3" style={{ display: 'flex', marginBottom: 12 }}>
                <label
                  htmlFor={`message-detail-${item.orderNo}`}
                  className="font-bold"
                  style={{ width: 130, color: '#495057' }}
                >
                  Message:
                </label>
                <span id={`message-detail-${item.orderNo}`} style={{ color: '#212529' }}>
                  {item.message || '-'}
                </span>
              </div>
            </div>
          ),
        })
      }
      return {
        ...item,
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
                options={channelOptions}
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
              <InputText id="name" name="name" placeholder="ชื่อ" onChange={(e) => setName(e.target.value)} />
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
                placeholder="หมายเลข Order"
                onChange={(e) => setOrderNo(e.target.value)}
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
            //ref={dt}
            value={logsData}
            //selection={selectedNewss}
            //onSelectionChange={(e) => setSelectedNewss(e.value)}
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
            //header={tableHeader}
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
