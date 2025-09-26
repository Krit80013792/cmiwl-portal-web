import { useCallback, useState } from 'react'
import { ObjectSchema, ValidationError } from 'yup'
import { UseLoadingHook } from './useLoading'

export interface FormValues {
  name: string
  value: any
  index?: number
  arrName?: any
}

export type HandleFormChange = ({ name, value, index, arrName }: FormValues) => void
export type HandleFormSubmit = (cb: () => void | Promise<void>) => void
export type HandleFormError = () => boolean

interface UseFormHook<T> {
  handleChange: HandleFormChange
  handleSubmit: HandleFormSubmit
  handleError: HandleFormError
  errors: Record<string, any>
  values: T
  setValues?: any
}

export const useForm = <T>(
  initialState?: T,
  validateSchema?: ObjectSchema<any>,
  loading?: Pick<UseLoadingHook, 'openLoading' | 'closeLoading'>,
): UseFormHook<any> => {
  const [values, setValues] = useState<any>(initialState)
  const [errors, setErrors] = useState<Record<string, any>>({})

  const extractErrors = (error: ValidationError) =>
    error.inner?.reduce(
      (accumulator: Record<string, any>, eachError: ValidationError) => ({
        ...accumulator,
        [`${eachError?.path}`]: eachError.message,
      }),
      {},
    )

  const updateValues = useCallback(({ name, value, index, arrName }: FormValues) => {
    setValues((prevInput: any) => {
      if (index! >= 0) {
        let newArr = [...prevInput[name]]
        newArr[index!] = { ...newArr[index!], [arrName]: value }
        return { ...prevInput, [name]: newArr }
      }
      if (prevInput[name] === value) {
        return prevInput
      }
      return { ...prevInput, [name]: value }
    })
  }, [])

  const handleChange = useCallback<HandleFormChange>(
    async ({ name, value, index, arrName }: FormValues) => {
      updateValues({ name, value, index, arrName })

      if (validateSchema) {
        try {
          // Validate only the changed field
          await validateSchema.validateAt(name, { ...values, [name]: value })
          setErrors((prev: Record<string, any>) => ({ ...prev, [name]: undefined }))
        } catch (error: any) {
          setErrors((prev: Record<string, any>) => ({
            ...prev,
            [name]: error.message,
          }))
        }
      }
    },
    [updateValues, validateSchema, values],
  )

  const handleError = useCallback(() => {
    try {
      validateSchema?.validateSync(values, { abortEarly: false })
      setErrors({})
      return true
    } catch (error: any) {
      setErrors(extractErrors(error))
      return false
    }
  }, [validateSchema, values])

  const handleSubmit = useCallback<HandleFormSubmit>(
    async (cb) => {
      if (handleError()) {
        try {
          loading?.openLoading?.()
          await cb()
        } finally {
          loading?.closeLoading?.()
        }
      }
    },
    [handleError, loading],
  )

  return {
    handleChange,
    handleSubmit,
    errors,
    values,
    setValues,
    handleError,
  }
}
