import { useEffect, useState } from 'react'
import { useEffectUpdate } from './useEffectUpdate'

export const useFormRegister = (initialState, callBack) => {
  const [fields, setFields] = useState(initialState)

  useEffectUpdate(() => {
    if (callBack) callBack(fields)
  }, [fields])

  const handleChange = ({ target }) => {
    const field = target.name
    let value = target.value

    switch (target.type) {
      case 'number':
      case 'range':
        value = +target.value || ''
        break
      case 'checkbox':
        value = target.checked
        break
      case 'date':
        value = new Date(value)
        break
      case 'time':
        const newDate = new Date()
        const hours = value.split(':')[0]
        const minutes = value.split(':')[1]
        newDate.setHours(hours)
        newDate.setMinutes(minutes)
        value = newDate
        break

      default:
        break
    }
    setFields((prevFields) => ({ ...prevFields, [field]: value }))
  }

  const getFormattedDate = (value) => {
    const valueDate = new Date(value)
    return `${valueDate.getFullYear()}-${(
      valueDate.getMonth() +
      1 +
      ''
    ).padStart(2, '0')}-${(valueDate.getDate() + '').padStart(2, '0')}`
  }

  const getFormattedTime = (value) => {
    const valueTime = new Date(value)
    return `${(valueTime.getHours() + '').padStart(2, '0')}:${(
      valueTime.getMinutes() + ''
    ).padStart(2, '0')}`
  }

  const register = (field, type = '', value) => {
    // value only used when type === 'radio'
    const inputProp = {
      onChange: handleChange,
      name: field,
      id: field,
      value: fields[field],
      type,
    }
    if (type === 'checkbox') inputProp.checked = fields[field]
    if (type === 'date') inputProp.value = getFormattedDate(fields[field])
    if (type === 'time') inputProp.value = getFormattedTime(fields[field])
    if (type === 'radio') {
      inputProp.value = value
      inputProp.id = value
      inputProp.checked = fields[field] === value
    }
    return inputProp
  }

  return [register, setFields, fields]
}
