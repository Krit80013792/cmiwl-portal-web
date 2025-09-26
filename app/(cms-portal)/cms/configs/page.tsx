/* eslint-disable @next/next/no-img-element */
'use client'
import React, { useEffect, useRef, useState } from 'react'
import LoadingComponent from '@/layout/components/loading/LoadingComponent'
import { Toast } from 'primereact/toast'
import { Button } from 'primereact/button'
import { Column } from 'primereact/column'
import { ColorPicker } from 'primereact/colorpicker'
import { FileUpload } from 'primereact/fileupload'
import { DataTable } from 'primereact/datatable'
import { Dialog } from 'primereact/dialog'
import { InputText } from 'primereact/inputtext'
import { Image } from 'primereact/image'
import { classNames } from 'primereact/utils'
import { ApiRoute } from '@/src/shared/utils/profile'
import { getMasterDataByEndpoint } from '@/services/client/master-data.service'
import { createConfig, updateConfig, getConfigs } from '@/services/client/configs.service'
import { MasterChannelDTO } from '@/src/application/dtos/MasterChannelDTO'
import { ConfigDTO } from '@/src/application/dtos/ConfigDTO'
import { clientCookie } from '@/src/shared/utils/clientCookie'

const ConfigsPage = () => {
  const emptyConfigValue = {
    primaryColor: '',
    secondaryColor: '',
    oicCertTxt: '',
    oicCertImg: '',
    oicCertElectronicTxt: '',
    oicCertElectronicImg: '',
  }

  const emptyConfig: ConfigDTO = {
    id: '',
    configId: '',
    configName: '',
    configKey: '',
    configValue: '',
    configDescription: '',
    configByChannel: '',
    createdBy: '',
    updatedBy: '',
    createdAt: new Date(),
    updatedAt: new Date(),
  } as ConfigDTO

  const toast = useRef<Toast>(null)
  const dtChannels = useRef<DataTable<any>>(null)
  const [clientPerms, setClientPerms] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [channels, setChannels] = useState<MasterChannelDTO[]>([])
  const [configsDialog, setConfigsDialog] = useState(false)
  const [viewDialog, setViewDialog] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [selectedChannel, setSelectedChannel] = useState<string>('')
  const [config, setConfig] = useState<ConfigDTO>(emptyConfig)
  const [configValue, setConfigValue] = useState<any>(emptyConfigValue)
  const fileUploadRef = useRef<FileUpload>(null)
  const [fileOicCert, setFileOicCert] = useState<File[]>([])
  const [fileB64OicCert, setFileB64OicCert] = useState<string | null>(null)
  const [fileOicECert, setFileOicECert] = useState<File[]>([])
  const [fileB64OicECert, setFileB64OicECert] = useState<string | null>(null)

  const setApiRoute = async (): Promise<any> => {
    const c = await ApiRoute()
    const de = JSON.parse(Buffer.from(c, 'base64').toString('binary'))
    return de
  }

  useEffect(() => {
    const cc = clientCookie()
    setClientPerms(cc?.perms)

    setLoading(true)
    const getData = async () => {
      const route = await setApiRoute()
      const resChannels = await getMasterDataByEndpoint(route, route?.amd, 'channels')
      const channelsData = await resChannels.json()
      setChannels(channelsData?.data)
      setLoading(false)
    }
    getData()
  }, [])

  const actionBodyTemplate = (rowData: MasterChannelDTO) => {
    return (
      <>
        {(clientPerms ?? []).includes('configs:read') && (
          <Button
            icon="pi pi-search"
            rounded
            text
            label="View"
            severity="info"
            className="mr-2"
            onClick={() => onOpenModalView(rowData?.keyCode)}
          />
        )}
        {['configs:create', 'configs:update'].some((perm) => (clientPerms ?? []).includes(perm)) && (
          <Button
            icon="pi pi-pencil"
            rounded
            text
            label="Edit"
            severity="secondary"
            className="mr-2"
            onClick={() => onOpenModalConfigs(rowData?.keyCode)}
          />
        )}
        {(clientPerms ?? []).includes('configs:delete') && <></>}
      </>
    )
  }

  const hideConfigsDialog = () => {
    setSubmitted(false)
    setConfigsDialog(false)
  }

  const saveConfig = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(false)
    setLoading(true)

    if (config?.configId) {
      if (
        !configValue.primaryColor ||
        !configValue.secondaryColor ||
        !configValue.oicCertTxt ||
        !configValue.oicCertElectronicTxt
      ) {
        setSubmitted(true)
        setConfigsDialog(true)
        setLoading(false)
        return
      }

      const oldConfigValue = JSON.parse(config?.configValue)

      configValue.oicCertImg = fileB64OicCert ?? oldConfigValue?.oicCertImg
      configValue.oicCertElectronicImg = fileB64OicECert ?? oldConfigValue?.oicCertElectronicImg

      config.configValue = JSON.stringify(configValue)

      await handleUpdateConfig(config)
    } else {
      if (
        !configValue.primaryColor ||
        !configValue.secondaryColor ||
        !configValue.oicCertTxt ||
        !configValue.oicCertElectronicTxt ||
        !fileB64OicCert ||
        !fileB64OicECert
      ) {
        setSubmitted(true)
        setConfigsDialog(true)
        setLoading(false)
        return
      }

      configValue.oicCertImg = fileB64OicCert ?? configValue.oicCertImg
      configValue.oicCertElectronicImg = fileB64OicECert ?? configValue.oicCertElectronicImg

      emptyConfig.configByChannel = selectedChannel
      emptyConfig.configValue = JSON.stringify(configValue)

      await handleInsertConfig(emptyConfig)
    }
    setLoading(false)
  }

  const handleInsertConfig = async (poConfig: ConfigDTO) => {
    const route = await setApiRoute()
    const res = await createConfig(route, poConfig)
    if (res?.status === 409) {
      const body = await res.json()
      toast.current?.show({ severity: 'warn', summary: 'Warning', detail: body?.message, life: 5000 })
      return
    }
    if (res?.ok) {
      setConfigsDialog(false)
      setConfig(emptyConfig)
      toast.current?.show({ severity: 'success', summary: 'Successful', detail: 'Config Created', life: 5000 })
    } else {
      toast.current?.show({ severity: 'error', summary: 'Error', detail: 'Failed to create Config', life: 5000 })
    }
  }

  const handleUpdateConfig = async (poConfig: ConfigDTO) => {
    const route = await setApiRoute()
    const res = await updateConfig(route, poConfig)
    if (res?.status === 409) {
      const body = await res.json()
      toast.current?.show({ severity: 'warn', summary: 'Warning', detail: body?.message, life: 5000 })
      return
    }
    if (res?.ok) {
      setConfigsDialog(false)
      setConfig(emptyConfig)
      toast.current?.show({ severity: 'success', summary: 'Successful', detail: 'Config Updated', life: 5000 })
    } else {
      toast.current?.show({ severity: 'error', summary: 'Error', detail: 'Failed to update Config', life: 5000 })
    }
  }

  const configsDialogFooter = (
    <>
      <Button label="Cancel" icon="pi pi-times" text onClick={hideConfigsDialog} />
      <Button label="Save" icon="pi pi-check" text onClick={saveConfig} />
    </>
  )

  const onOpenModalView = (psChannelCode: string) => {
    setLoading(true)
    const getData = async () => {
      const route = await setApiRoute()
      const resConfigs = await getConfigs(route, `channel=${psChannelCode}`)
      const configsData = await resConfigs.json()

      if (configsData?.data?.data?.length > 0) {
        const oConfig = configsData?.data?.data[0]
        setConfig(oConfig)
        setConfigValue(JSON.parse(oConfig.configValue))
      } else {
        setConfig(emptyConfig)
        setConfigValue(emptyConfigValue)
      }

      setLoading(false)
      setViewDialog(true)
    }
    getData()
  }

  const onOpenModalConfigs = (psChannelCode: string) => {
    setLoading(true)
    const getData = async () => {
      const route = await setApiRoute()
      const resConfigs = await getConfigs(route, `channel=${psChannelCode}`)
      const configsData = await resConfigs.json()

      if (configsData?.data?.data?.length > 0) {
        const oConfig = configsData?.data?.data[0]
        setConfig(oConfig)
        setConfigValue(JSON.parse(oConfig?.configValue))
      } else {
        setConfig(emptyConfig)
        setConfigValue(emptyConfigValue)
      }

      setSelectedChannel(psChannelCode)
      setLoading(false)
      setConfigsDialog(true)
    }
    getData()
  }

  const onInputPrimaryColorChange = (e: string) => {
    const sVal = e || ''
    let oConfigValue = { ...configValue }
    oConfigValue.primaryColor = sVal
    setConfigValue(oConfigValue)
  }

  const onInputSecondaryColorChange = (e: string) => {
    const sVal = e || ''
    let oConfigValue = { ...configValue }
    oConfigValue.secondaryColor = sVal
    setConfigValue(oConfigValue)
  }

  const onInputCertTxtChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const sVal = (e.target && e.target.value) || ''
    let oConfigValue = { ...configValue }
    oConfigValue.oicCertTxt = sVal
    setConfigValue(oConfigValue)
  }

  const onInputCertElectronicTxtChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const sVal = (e.target && e.target.value) || ''
    let oConfigValue = { ...configValue }
    oConfigValue.oicCertElectronicTxt = sVal
    setConfigValue(oConfigValue)
  }

  const onSelectOicCertFile = (e: any) => {
    const sFileType = e?.files[0]?.type.toString().toLowerCase()
    if (sFileType === 'image/jpg' || sFileType === 'image/jpeg') {
      setFileOicCert(e?.files)
      const reader = new FileReader()
      reader.onloadend = () => {
        setFileB64OicCert(reader.result as string)
      }
      reader.readAsDataURL(e?.files[0])
    } else {
      toast.current?.show({ severity: 'warn', summary: 'Warning', detail: 'Only .jpg files are allowed', life: 5000 })
      onCancelOicCertFile()
    }
  }

  const onCancelOicCertFile = () => {
    setFileOicCert([])
    setFileB64OicCert(null)
  }

  const onSelectOicECertFile = (e: any) => {
    const sFileType = e?.files[0]?.type.toString().toLowerCase()
    if (sFileType === 'image/jpg' || sFileType === 'image/jpeg') {
      setFileOicECert(e?.files)
      const reader = new FileReader()
      reader.onloadend = () => {
        setFileB64OicECert(reader.result as string)
      }
      reader.readAsDataURL(e?.files[0])
    } else {
      toast.current?.show({ severity: 'warn', summary: 'Warning', detail: 'Only .jpg files are allowed', life: 5000 })
      onCancelOicECertFile()
    }
  }

  const onCancelOicECertFile = () => {
    setFileOicECert([])
    setFileB64OicECert(null)
  }

  return (
    <div className="grid">
      <div className="col-12">
        <div className="card">
          <Toast ref={toast} />
          <h5>
            <i className="pi pi-wrench" style={{ fontSize: '2rem' }}></i>
            <strong> Channel Configs</strong>
          </h5>
        </div>

        {loading && <LoadingComponent />}

        {!loading && channels?.length > 0 && (
          <div className="card">
            <DataTable
              ref={dtChannels}
              value={channels}
              dataKey="id"
              paginator
              rows={20}
              rowsPerPageOptions={[5, 10, 20, 50, 100]}
              className="p-datatable-sm"
              scrollable
              scrollHeight="600px"
              paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
              currentPageReportTemplate="Showing {first} to {last} of {totalRecords} Records"
              loading={loading}
              globalFilterFields={['displayName', 'keyCode']}
              emptyMessage="No Records found."
            >
              <Column header="Name" field="displayName" sortable></Column>
              <Column header="Code" field="keyCode" sortable></Column>
              <Column body={actionBodyTemplate} headerStyle={{ minWidth: '10rem' }}></Column>
            </DataTable>
          </div>
        )}

        <style>
          {`
            .p-fileupload-buttonbar button:nth-child(2){
              display:none;
            }
          `}
        </style>
        <Dialog
          visible={configsDialog}
          style={{ width: '550px' }}
          header="Channel configs"
          modal
          maximizable
          className="p-fluid"
          footer={configsDialogFooter}
          onHide={hideConfigsDialog}
        >
          <div className="field">
            <label htmlFor="primaryColor">
              <span style={{ color: 'red' }}>*</span> Primary Color{' '}
            </label>
            <br />
            <ColorPicker
              format="hex"
              value={configValue?.primaryColor}
              onChange={(e) => onInputPrimaryColorChange(e?.value as string)}
            />
            <br />
            <p>
              <span>Code: {configValue?.primaryColor}</span>
            </p>
          </div>
          <div className="field">
            <label htmlFor="secondaryColor">
              <span style={{ color: 'red' }}>*</span> Secondary Color{' '}
            </label>
            <br />
            <ColorPicker
              format="hex"
              value={configValue?.secondaryColor}
              onChange={(e) => onInputSecondaryColorChange(e?.value as string)}
            />
            <br />
            <p>
              <span>Code: {configValue?.secondaryColor}</span>
            </p>
          </div>
          <div className="field">
            <label htmlFor="oicCertTxt">
              <span style={{ color: 'red' }}>*</span> Cert text{' '}
            </label>
            <InputText
              id="oicCertTxt"
              name="oicCertTxt"
              value={configValue?.oicCertTxt}
              onChange={(e) => onInputCertTxtChange(e)}
              required
              className={classNames({
                'p-invalid': submitted && !configValue?.oicCertTxt,
              })}
            />
            {submitted && !configValue?.oicCertTxt && <small className="p-invalid">Cert text is required.</small>}
          </div>
          <div className="field">
            <label htmlFor="oicCertImg">
              <span style={{ color: 'red' }}>*</span> Cert Img{' '}
            </label>
            <FileUpload
              ref={fileUploadRef}
              id="oicCertImg"
              accept=".jpg,.jpeg"
              onSelect={onSelectOicCertFile}
              onClear={onCancelOicCertFile}
              onRemove={onCancelOicCertFile}
              chooseLabel="Browse JPG File"
              emptyTemplate={<p className="m-0">Drag and drop files to here to upload.</p>}
            />
          </div>
          <div className="field">
            <label htmlFor="oicCertElectronicTxt">
              <span style={{ color: 'red' }}>*</span> Cert Electronic text{' '}
            </label>
            <InputText
              id="oicCertElectronicTxt"
              name="oicCertElectronicTxt"
              value={configValue?.oicCertElectronicTxt}
              onChange={(e) => onInputCertElectronicTxtChange(e)}
              required
              className={classNames({
                'p-invalid': submitted && !configValue?.oicCertElectronicTxt,
              })}
            />
            {submitted && !configValue?.oicCertElectronicTxt && (
              <small className="p-invalid">Cert Electronic text is required.</small>
            )}
          </div>
          <div className="field">
            <label htmlFor="oicCertElectronicImg">
              <span style={{ color: 'red' }}>*</span> Cert Electronic Img{' '}
            </label>
            <FileUpload
              ref={fileUploadRef}
              id="oicCertElectronicImg"
              accept=".jpg,.jpeg"
              onSelect={onSelectOicECertFile}
              onClear={onCancelOicECertFile}
              onRemove={onCancelOicECertFile}
              chooseLabel="Browse JPG File"
              emptyTemplate={<p className="m-0">Drag and drop files to here to upload.</p>}
            />
          </div>
        </Dialog>

        <Dialog
          visible={viewDialog}
          style={{ width: '550px' }}
          header="Channel configs detail"
          modal
          maximizable
          className="p-fluid"
          onHide={() => setViewDialog(false)}
        >
          <div className="field">
            <label htmlFor="primaryColor">
              <span style={{ color: 'red' }}>*</span> Primary Color{' '}
            </label>
            <br />
            <ColorPicker format="hex" value={configValue?.primaryColor} />
            <br />
            <p>
              <span>Code: {configValue?.primaryColor}</span>
            </p>
          </div>
          <div className="field">
            <label htmlFor="secondaryColor">
              <span style={{ color: 'red' }}>*</span> Secondary Color{' '}
            </label>
            <br />
            <ColorPicker format="hex" value={configValue?.secondaryColor} />
            <br />
            <p>
              <span>Code: {configValue?.secondaryColor}</span>
            </p>
          </div>
          <div className="field">
            <label htmlFor="vOicCertTxt">
              <span style={{ color: 'red' }}>*</span> Cert text{' '}
            </label>
            <InputText id="vOicCertTxt" name="vOicCertTxt" value={configValue?.oicCertTxt} disabled />
          </div>
          <div className="field">
            <label htmlFor="vOicCertImg">
              <span style={{ color: 'red' }}>*</span> Cert Img{' '}
            </label>
            <br />
            <Image src={configValue?.oicCertImg} alt={configValue?.oicCertTxt} width="80" height="60" preview />
          </div>
          <div className="field">
            <label htmlFor="vOicCertElectronicTxt">
              <span style={{ color: 'red' }}>*</span> Cert Electronic text{' '}
            </label>
            <InputText
              id="vOicCertElectronicTxt"
              name="vOicCertElectronicTxt"
              value={configValue?.oicCertElectronicTxt}
              disabled
            />
          </div>
          <div className="field">
            <label htmlFor="vOicCertElectronicImg">
              <span style={{ color: 'red' }}>*</span> Cert Electronic Img{' '}
            </label>
            <br />
            <Image
              src={configValue?.oicCertElectronicImg}
              alt={configValue?.oicCertElectronicTxt}
              width="80"
              height="60"
              preview
            />
          </div>
        </Dialog>
      </div>
    </div>
  )
}

export default ConfigsPage
