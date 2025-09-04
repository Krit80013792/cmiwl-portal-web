import { useCallback, useState } from 'react'
import { ObjectSchema, ValidationError } from 'yup'

export type HandleFormChange = (key: string, value: any, index?: number, arrName?: any) => void
export type HandleFormSubmit = (cb: () => void) => void

interface UseFormHook<T> {
  handleChange: HandleFormChange
  handleSubmit: HandleFormSubmit
  errors: Record<string, any>
  values: T
  setValues?: React.Dispatch<React.SetStateAction<T | any>>
}

export const useForm = <T>(initialState?: T, validateSchema?: ObjectSchema<any>): UseFormHook<T> => {
  const [values, setValues] = useState<T | any>(initialState)
  const [errors, setErrors] = useState<Record<string, any>>({})

  const extractErrors = (error: ValidationError) =>
    error.inner?.reduce(
      (accumulator: Record<string, any>, eachError: ValidationError) => ({
        ...accumulator,
        [`${eachError?.path}`]: eachError.message,
      }),
      {},
    )

  const updateValues = useCallback((name: string, value: any, index?: number, arrName?: any) => {
    setValues((prevInput: T | any) => {
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
    (key: any, value: any, index?: number, arrName?: any) => {
      updateValues(key, value, index, arrName)
    },
    [updateValues],
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
    (cb) => {
      if (handleError()) {
        cb()
      }
    },
    [handleError],
  )

  return {
    handleChange,
    handleSubmit,
    errors,
    values,
    setValues,
  }
}
