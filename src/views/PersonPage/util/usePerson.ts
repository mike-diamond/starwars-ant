import { useQuery } from '@tanstack/react-query'


type Person = {
  name: string
  height: string
  mass: string
  hair_color: string
  skin_color: string
  eye_color: string
  birth_year: string
  gender: string
  homeworld: string
  films: string[]
  species: string[]
  vehicles: string[]
  starships: string[]
  created: string
  edited: string
  url: string
}

type ApiData = {
  count: number
  results: Person[]
}

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

      return fetch(`https://swapi.py4e.com/api/people/${query}`).then(r => r.json()) as ApiData
    },
  })

  return {
    data,
    error,
    isPending,
  }
}


export default usePersons
