import { useEffect, useState } from 'react'


type Input = {
  params: Promise<{
    person: string
  }>
}

const usePersonId = ({ params }: Input) => {
  const [ state, setState ] = useState({
    personId: null,
    isFetching: false,
  })

  useEffect(() => {
    params.then((data) => {
      setState({ personId: data.person, isFetching: false })
    })
  }, [ params, setState ])

  return state
}


export default usePersonId
