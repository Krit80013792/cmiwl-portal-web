'use client'

import { useRouter } from 'next/navigation'
import React, { useContext, useRef, useState } from 'react'
import Image from 'next/image'
import { Toast } from 'primereact/toast'
import { Button } from 'primereact/button'
import { Password } from 'primereact/password'
import { LayoutContext } from '../../../layout/context/layoutcontext'
import { InputText } from 'primereact/inputtext'
import { ProgressSpinner } from 'primereact/progressspinner'
import { classNames } from 'primereact/utils'
import { config } from '@/src/shared/utils/config'
import { signIn } from '@/services/client/auth.service'
import forge from 'node-forge'
import { useDispatch } from 'react-redux'
import { userSlice } from '@/stores/redux/slices/userSlice'

const LoginPage = () => {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const [usr, setUsr] = useState('')
  const [pw, setPw] = useState('')
  const toast = useRef<Toast>(null)
  const { layoutConfig } = useContext(LayoutContext)

  const router = useRouter()
  const containerClassName = classNames(
    'surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden',
    { 'p-input-filled': layoutConfig.inputStyle === 'filled' },
  )

  const setConfAsync = async (): Promise<any> => {
    const c = await config()
    const de = JSON.parse(Buffer.from(c, 'base64').toString('binary'))
    return de
  }

  const onAuthentication = async (event: React.FormEvent) => {
    event.preventDefault()
    if (!usr || !pw) return
    setLoading(true)
    const authModel = {
      usr: usr,
      pw: pw,
    }
    try {
      const conf = await setConfAsync()
      const pk = conf?.pk
      const dePk = Buffer.from(pk, 'base64').toString('binary')
      const publicKey = forge.pki.publicKeyFromPem(dePk)
      const encryptedData = publicKey.encrypt(JSON.stringify(authModel), 'RSA-OAEP')
      const encrypted = Buffer.from(encryptedData, 'binary').toString('base64')
      const res = await signIn(conf, encrypted)
      const data = await res.json()
      if (res.ok) {
        const { userName, userGroupName } = data.data
        dispatch(userSlice.actions.setUserSlice({ userGroupName, userName }))
        const cmsm = Buffer.from(conf?.cmsm, 'base64').toString('binary')
        router.push(cmsm)
      } else {
        setLoading(false)
        toast.current?.show({ severity: 'error', summary: 'Error', detail: 'Failed to authentication', life: 5000 })
      }
    } catch {
      toast.current?.show({ severity: 'error', summary: 'Error', detail: 'Failed to authentication', life: 5000 })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={containerClassName}>
      {loading && (
        <div className="spinner-container">
          <ProgressSpinner aria-label="Loading" style={{ width: '100px', height: '100px' }} />
          <strong>Loading...</strong>
        </div>
      )}
      <div className="flex flex-column align-items-center justify-content-center">
        <Toast ref={toast} />
        <div
          style={{
            borderRadius: '56px',
            padding: '0.3rem',
            backgroundColor: '#85b2f9',
          }}
        >
          <div className="w-full py-8 px-5 sm:px-8" style={{ borderRadius: '53px', backgroundColor: 'white' }}>
            <div className="text-center mb-5">
              <Image id="js-logo" className="logo" src="/favicon.ico" width={48} height={48} alt="cmi" priority />
            </div>
            <div className="text-center mb-5">
              <strong>CMIWL</strong>
            </div>
            <form onSubmit={onAuthentication}>
              <div>
                <label htmlFor="email1" className="block text-900 text-xl font-medium mb-2">
                  Username
                </label>
                <InputText
                  id="email1"
                  value={usr}
                  onChange={(e) => setUsr(e.target.value)}
                  required
                  type="text"
                  placeholder="Username"
                  className="w-full md:w-30rem mb-5"
                  style={{ padding: '1rem' }}
                />

                <label htmlFor="password1" className="block text-900 font-medium text-xl mb-2">
                  Password
                </label>
                <style>{`.p-input-icon { position: absolute; right: 1rem; top: 50%; transform: translateY(-50%); }`}</style>
                <Password
                  value={pw}
                  onChange={(e) => setPw(e.target.value)}
                  required
                  toggleMask
                  feedback={false}
                  placeholder="Password"
                  className="w-full mb-5"
                  inputClassName="w-full p-3 md:w-30rem"
                />
                <div className="flex align-items-center justify-content-between mb-5 gap-5"></div>
                <Button label="Sign In" className="w-full p-3 text-xl" type="submit"></Button>
              </div>
            </form>
            <div className="text-center mb-5"></div>
            <div className="text-center mb-5">
              <span className="text-600 font-medium"></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
