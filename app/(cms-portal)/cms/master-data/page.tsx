/* eslint-disable @next/next/no-img-element */
'use client'
import React, { useEffect, useRef, useState } from 'react'
import LoadingComponent from '@/layout/components/loading/LoadingComponent'
import { Accordion, AccordionTab } from 'primereact/accordion'
import { DataTable } from 'primereact/datatable'
import { Dialog } from 'primereact/dialog'
import { Column } from 'primereact/column'
import { Toast } from 'primereact/toast'
import { Button } from 'primereact/button'
import { ApiRoute } from '@/src/shared/utils/profile'
import {
  getMasterDataByEndpoint,
  syncMasterDataByEndpoint,
  updateMasterDataByEndpoint,
} from '@/services/client/master-data.service'
import { clientCookie } from '@/src/shared/utils/clientCookie'
import { InputSwitch } from 'primereact/inputswitch'

const MasterDataPage = () => {
  const tabs = [
    {
      name: 'car-brands',
      label: 'Car Brands',
      columns: [
        { field: 'carBrandId', header: 'Brand Id' },
        { field: 'carBrandName', header: 'Brand Name' },
        { field: 'carTypeKey', header: 'Type Key' },
        { field: 'insurerCode', header: 'Insurer Code' },
        { field: 'createDate', header: 'Create Date' },
        { field: 'createBy', header: 'Create By' },
      ],
    },
    {
      name: 'car-brands-ranking',
      label: 'Car Brands Ranking',
      columns: [
        { field: 'carBrandID', header: 'Brand Id' },
        { field: 'carBrandName', header: 'Brand Name' },
        { field: 'ranking', header: 'Ranking' },
        { field: 'channel', header: 'Channel' },
        { field: 'imagePath', header: 'Img Path' },
      ],
    },
    {
      name: 'car-colors',
      label: 'Car Colors',
      columns: [
        { field: 'carColorId', header: 'Color Id' },
        { field: 'carColorNameTh', header: 'Color Name Th' },
        { field: 'carColorNameEn', header: 'Color Name En' },
        { field: 'createDate', header: 'Create Date' },
        { field: 'createBy', header: 'Create By' },
      ],
    },
    {
      name: 'channels',
      label: 'Channels',
      columns: [
        { field: 'displayName', header: 'Name' },
        { field: 'keyCode', header: 'Code' },
      ],
    },
    {
      name: 'compulsory-groups',
      label: 'Compulsory Groups',
      columns: [
        { field: 'displayName', header: 'Name' },
        { field: 'categoryGroup', header: 'Group' },
        { field: 'categoryText', header: 'Text' },
        { field: 'categoryImgText', header: 'Img Text' },
        { field: 'categoryImgPath', header: 'Img Path' },
        { field: 'channel', header: 'Channel' },
      ],
    },
    {
      name: 'compulsory-rates',
      label: 'Compulsory Rates',
      columns: [
        { field: 'channel', header: 'Channel' },
        { field: 'carType', header: 'Car Type' },
        { field: 'carTypeName', header: 'Type Name' },
        { field: 'cmiCarTypeCode', header: 'Type Code' },
        { field: 'cmiCarTypeName', header: 'Type Name' },
        { field: 'cmiCarTypeRoryor', header: 'Type Roryor' },
        { field: 'cmiSubCarTypeCode', header: 'Sub Car Type Code' },
        { field: 'typeOfUseCode', header: 'Use Code' },
        { field: 'typeOfUseDetail', header: 'Detail' },
        { field: 'cmiCategorySubType', header: 'Sub Type' },
        { field: 'cmiSubCarTypeDetail', header: 'Sub Car Type Detail' },
        { field: 'min', header: 'Min' },
        { field: 'max', header: 'Max' },
        { field: 'isEvType', header: 'Is EV Type' },
        { field: 'cmiCoverage', header: 'Coverage' },
        { field: 'displayDetail', header: 'Detail' },
        { field: 'bodyType', header: 'Body Type' },
        { field: 'useOfMotor', header: 'Use of Motor' },
        { field: 'createDate', header: 'Create Date' },
        { field: 'createBy', header: 'Create By' },
      ],
    },
    {
      name: 'compulsory-types',
      label: 'Compulsory Types',
      columns: [
        { field: 'displayName', header: 'Name' },
        { field: 'carTypeKey', header: 'Type Key' },
        { field: 'categoryGroup', header: 'Group' },
        { field: 'channel', header: 'Channel' },
        { field: 'itemOrder', header: 'Item Order' },
        { field: 'imagePath', header: 'Img Path' },
      ],
    },
    {
      name: 'insurers',
      label: 'Insurers',
      columns: [
        { field: 'insurerFullName', header: 'Full Name' },
        { field: 'insurerShortName', header: 'Short Name' },
        { field: 'insurerCode', header: 'Code' },
        { field: 'insurerImgPath', header: 'Img Path' },
        { field: 'channel', header: 'Channel' },
        { field: 'active', header: 'Active' },
      ],
    },
    {
      name: 'prefix',
      label: 'Prefix',
      columns: [
        { field: 'codeName', header: 'Code Name' },
        { field: 'prefixNameTH', header: 'Prefix Name TH' },
        { field: 'prefixNameEN', header: 'Prefix Name EN' },
        { field: 'itemOrder', header: 'Item Order' },
        { field: 'channel', header: 'Channel' },
      ],
    },
  ]

  const toast = useRef<Toast>(null)
  const [loading, setLoading] = useState(false)
  const [clientPerms, setClientPerms] = useState<string[]>([])
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const [dataMap, setDataMap] = useState<{ [key: string]: any[] }>({})
  const [confirmSyncDialog, setConfirmSyncDialog] = useState(false)
  const [tabName, setTabName] = useState<string>('')

  const setApiRoute = async (): Promise<any> => {
    const c = await ApiRoute()
    const de = JSON.parse(Buffer.from(c, 'base64').toString('binary'))
    return de
  }

  useEffect(() => {
    const cc = clientCookie()
    setClientPerms(cc?.perms)
  }, [])

  const fetchData = async (tabName: string) => {
    if (!tabName) return
    setLoading(true)
    try {
      const route = await setApiRoute()
      const res = await getMasterDataByEndpoint(route, route?.amd, tabName)
      const resData = await res.json()
      setDataMap((prev) => ({ ...prev, [tabName]: resData?.data }))
    } catch {
      toast.current?.show({ severity: 'error', summary: 'Error', detail: `Failed to load ${tabName}`, life: 5000 })
    }
    setLoading(false)
  }

  const handleTabChange = (e: any) => {
    const tabName = tabs[e?.index]?.name
    setActiveIndex(e.index)
    fetchData(tabName)
  }

  const handleSync = async () => {
    setLoading(true)
    try {
      const route = await setApiRoute()
      const res = await syncMasterDataByEndpoint(route, route?.amd, tabName)
      if (!res?.ok) {
        toast.current?.show({ severity: 'error', summary: 'Error', detail: `Failed to sync ${tabName}`, life: 5000 })
        return
      }
      await res.json()
      fetchData(tabName) //* reload data
      toast.current?.show({ severity: 'success', summary: 'Successful', detail: `Syncing ${tabName} Done`, life: 5000 })
    } catch {
      toast.current?.show({ severity: 'error', summary: 'Error', detail: `Failed to sync ${tabName}`, life: 5000 })
    } finally {
      setLoading(false)
      setConfirmSyncDialog(false)
    }
  }

  const onOpenConfirmSync = (tabName: string) => {
    setTabName(tabName)
    setConfirmSyncDialog(true)
  }

  const confirmSyncDialogFooter = (
    <>
      <Button label="No" icon="pi pi-times" text onClick={() => setConfirmSyncDialog(false)} />
      <Button label="Yes" icon="pi pi-check" text onClick={handleSync} />
    </>
  )

  const activeBodyTemplate = (rowData: any) => {
    const handleChange = async (e: any) => {
      const route = await setApiRoute()
      const res = await updateMasterDataByEndpoint(route, route?.amd, 'insurers', {
        ...rowData,
        active: e.value,
      })
      if (!res?.ok) {
        toast.current?.show({
          severity: 'error',
          summary: 'Error',
          detail: `Failed to update insurer ${rowData.insurerCode}`,
          life: 5000,
        })
        return
      }
      toast.current?.show({
        severity: 'success',
        summary: 'Updated',
        detail: `Insurer ${rowData.insurerCode} active status changed`,
        life: 3000,
      })
      fetchData('insurers')
    }

    return <InputSwitch checked={rowData.active} onChange={handleChange} />
  }

  return (
    <div className="grid">
      <div className="col-12">
        <div className="card">
          <Toast ref={toast} />
          <h5>
            <i className="pi pi-table" style={{ fontSize: '2rem' }}></i>
            <strong> Master Data</strong>
          </h5>
        </div>

        {loading && <LoadingComponent />}

        <div className="card">
          <Accordion onTabChange={handleTabChange} activeIndex={activeIndex}>
            {tabs.map((tab, idx) => (
              <AccordionTab key={tab?.name} header={tab?.label}>
                {(clientPerms ?? []).includes('master-data:update') && (
                  <div className="mb-3">
                    <Button
                      label="Sync Master"
                      icon="pi pi-refresh"
                      severity="danger"
                      outlined
                      onClick={() => onOpenConfirmSync(tab?.name)}
                    />
                  </div>
                )}

                <DataTable
                  value={dataMap[tab?.name] ?? []}
                  paginator
                  rows={10}
                  className="p-datatable-sm"
                  scrollable
                  scrollHeight="600px"
                >
                  {tab.columns.map((col) => (
                    <Column
                      key={col?.field}
                      field={col?.field}
                      header={col?.header}
                      body={tab.name === 'insurers' && col.field === 'active' ? activeBodyTemplate : undefined}
                    />
                  ))}
                </DataTable>

                <Dialog
                  visible={confirmSyncDialog}
                  style={{ width: '450px' }}
                  header="Confirm"
                  modal
                  footer={confirmSyncDialogFooter}
                  onHide={() => setConfirmSyncDialog(false)}
                >
                  <div className="flex align-items-center justify-content-center">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {tabName && (
                      <span>
                        Are you sure you want to sync master data <b>{tabName}</b>?
                      </span>
                    )}
                  </div>
                </Dialog>
              </AccordionTab>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  )
}

export default MasterDataPage
