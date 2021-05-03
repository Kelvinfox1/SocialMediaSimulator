import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Card } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import fx from 'money'

const Product = ({ product }) => {
  const [price, setPrice] = useState('')
  const [amount, setAmount] = useState('')

  const currencySymbol = useSelector((state) => state.currencySymbol)
  const { currency } = currencySymbol

  const exchangeRate = useSelector((state) => state.exchangeRate)
  const { Rate } = exchangeRate

  useEffect(() => {
    if (currency || Rate) {
      setPrice(currency.symbol)
    } else {
      setPrice('USD')
    }

    if (Rate) {
      fx.base = Rate.base
      fx.rates = Rate.rates
      setAmount(fx(product.price).from('USD').to(currency.code).toFixed(3))
    } else {
      setAmount(product.price)
    }
  }, [currency, Rate, product.price])

  return (
    <>
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

          <Card.Text as='h5'>
            {price}.{amount} per <b>{product.name}</b>
          </Card.Text>
        </Card.Body>
      </Card>
    </>
  )
}

export default Product
