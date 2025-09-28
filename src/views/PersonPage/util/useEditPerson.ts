import { useCallback, useMemo, useState } from 'react'
import { constants, getLocalStorageData } from 'helpers'
import localStorage from 'modules/local-storage'


type State = {
  name: string
  height: string
  mass: string
  hair_color: string
  skin_color: string
  eye_color: string
  birth_year: string
  gender: string
}

const useEditPerson = (personId: string | null) => {
  const [ values, setValues ] = useState<State>({
    name: '',
    height: '',
    mass: '',
    hair_color: '',
    skin_color: '',
    eye_color: '',
    birth_year: '',
    gender: '',
  })

  const localStorageData = useMemo(() => {
    if (personId) {
      return getLocalStorageData(personId) as Partial<State>
    }

    return {}
  }, [ personId ])

  const save = useCallback(() => {
    const key = `${constants.dataLocalStorageKey}_${personId}`

    localStorage.setItem(key, values)
  }, [ personId, values ])


  return {
    values,
    localStorageData,
    save,
    setValues,
  }
}


export default useEditPerson
