import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Card } from 'react-bootstrap'
import Loader from '../components/Loader'
import axios from 'axios'
import fx from 'money'

const Product = ({ product }) => {
  const [location, setLocation] = useState(null)
  const [url, setUrl] = useState(
    'https://api.ipdata.co/?api-key=8093f3f58218ab7c3556886666045f237113f5e88feba55f8bb835ea&fields=currency'
  )
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const [uri, setUri] = useState(
    'https://openexchangerates.org/api/latest.json?app_id=8093f3f58218ab7c3556886666045f237113f5e88feba55f8bb835ea'
  )

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false)
      setIsLoading(true)

      try {
        const result = await axios(url)

        setLocation(result.data)
      } catch (error) {
        setIsError(true)
      }

      setIsLoading(false)
    }

    fetchData()
  }, [url])

  fx.base = 'KES'
  fx.rates = {
    EUR: 0.745101, // eg. 1 KES === 0.00766318 EUR
    USD: 7.781919, // 1 KES === 0.00927282 USD
    KES: 1, // always include the base rate (1:1)
    /* etc */
  }

  return (
    <>
      {isError && <div>Something went wrong ...</div>}
      {!location ? (
        <Loader />
      ) : (
        <Card
          className=' shadow p-3 mb-5 my-3 p-3 rounded'
          style={{ height: '25rem' }}
        >
          <Link to={`/product/${product._id}`}>
            <Card.Img src={product.image} variant='top' />
          </Link>

          <Card.Body>
            <Link to={`/product/${product._id}`}>
              <Card.Title as='div'>
                <strong>{product.name}</strong>
              </Card.Title>
            </Link>

            <Card.Text as='h3'>
              {location.currency.symbol}{' '}
              {fx(product.price)
                .from('KES')
                .to(location.currency.code)
                .toFixed(2)}{' '}
              per {product.name}
            </Card.Text>
          </Card.Body>
        </Card>
      )}
    </>
  )
}

export default Product
