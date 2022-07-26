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
          console.log('res 1', res)
          if (res.data.response_code === 1 || res.data.response_code === 2) {
            console.log('res 2', res)
            setError('No questions found!')
            return
          } else {
            console.log('res 3', res)
            setResponse(res.data)
          }
        })
        .catch(err => {
          console.log('res 4', err)
          setError('Couldn not fetch data')
        })
        .finally(() => setLoading(false))
    }

    fetchData()
  }, [url])

  return { response, error, loading }
}

export default useAxios
