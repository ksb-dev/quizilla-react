import { useEffect, useState } from 'react'
import axios from 'axios'

const useAxios = ({ url }) => {
  const [response, setResponse] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  axios.defaults.baseURL = 'https://opentdb.com/'

  useEffect(() => {
    const fetchData = () => {
      axios
        .get(url)
        .then(res => {
          if (res.data.response_code === 2) {
            setError('No questions found!')
            return
          } else {
            setResponse(res.data)
          }
        })
        .catch(err => {
          setError('Couldn not fetch data')
        })
        .finally(() => setLoading(false))
    }

    fetchData()
  }, [url])

  return { response, error, loading }
}

export default useAxios
