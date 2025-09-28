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
    const value = values?.[fieldId]

    if (typeof value === 'string') {
      acc[fieldId] = value
    }

    return acc
  }, {})
}


export default getLocalStorageData
