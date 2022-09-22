import { useEffect, useState } from 'react'

export const useForm = (initialState, callBack) => {
  const [fields, setFields] = useState(initialState)

  useEffect(() => {
    if (callBack) callBack(fields)
  }, [fields])

  const handleChange = ({ target }) => {
    const field = target.name
    const value = target.type === 'number' ? +target.value || '' : target.value
    setFields((prevFields) => ({ ...prevFields, [field]: value }))
  }

  return [fields, handleChange, setFields]
}
