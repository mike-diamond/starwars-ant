import { useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getLocalStorageData } from 'helpers'


type Input = {
  page: number
  search: string
}

const usePersons = ({ page, search }: Input) => {
  const { data, isPending, error } = useQuery({
    queryKey: [ 'people', page, search ],
    queryFn: () => {
      let query = `?page=${page}`

      if (search) {
        query += `&search=${search}`
      }

      return fetch(`https://swapi.py4e.com/api/people/${query}`)
        .then(r => r.json()) as Promise<ApiData.Persons>
    },
  })

  const modifiedData = useMemo(() => {
    if (data?.results) {
      const results = data.results.map((person) => {
        const personId = person.url.replace(/.*\/people\/|\/$/g, '')
        const localStorageData = getLocalStorageData(personId)

        return ({
          ...person,
          ...localStorageData,
          id: personId,
        })
      })

      return {
        ...data,
        results,
      }
    }

    return data
  }, [ data ])

  return {
    data: modifiedData as ApiData.ModifiedPersons | undefined,
    error,
    isPending,
  }
}


export default usePersons
