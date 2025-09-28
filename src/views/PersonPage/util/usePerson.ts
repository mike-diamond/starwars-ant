import { useQuery } from '@tanstack/react-query'


type PersonApiData = ApiData.Person & {
  detail?: string
}

const usePerson = (personId?: string) => {
  const { data, isPending, error } = useQuery({
    queryKey: [ 'person', personId ],
    queryFn: () => {
      return fetch(`https://swapi.py4e.com/api/people/${personId}`).then(r => r.json()) as PersonApiData
    },
    enabled: Boolean(personId),
  })

  return {
    data,
    error,
    isPending,
  }
}


export default usePerson
