import { constants } from 'helpers'
import localStorage from 'modules/local-storage'

import fields from './fields'


const getLocalStorageData = (personId: string) => {
  const key = `${constants.dataLocalStorageKey}_${personId}`
  const values = localStorage.getItem(key)

  if (typeof values !== 'object' || values === null) {
    localStorage.removeItem(key)
    return {}
  }

  return fields.reduce((acc, field) => {
    const fieldId = field.id
    const value = values?.[fieldId as keyof typeof values]

    if (typeof value === 'string') {
      acc[fieldId as keyof typeof acc] = value
    }

    return acc
  }, {} as Record<string, string>)
}


export default getLocalStorageData
