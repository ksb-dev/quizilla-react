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
        .then(res => setResponse(res.data))
        .catch(err => setError(err))
        .finally(() => setLoading(true))
    }

    fetchData()
  }, [url])

  return { response, error, loading }
}

export default useAxios
