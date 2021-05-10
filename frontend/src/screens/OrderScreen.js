import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { PayPalButton } from 'react-paypal-button-v2'
import { Link } from 'react-router-dom'
import { Row, Col, ListGroup, Image, Card, Button, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import {
  getOrderDetails,
  payOrder,
  deliverOrder,
  lipaNaMpesa,
  lipaNaMpesaCallback,
} from '../actions/orderActions'
import {
  ORDER_PAY_RESET,
  ORDER_DELIVER_RESET,
} from '../constants/orderConstants'
import fx from 'money'

const OrderScreen = ({ match, history }) => {
  const [transactionId, setTransactionId] = useState('')

  const orderId = match.params.id

  const [sdkReady, setSdkReady] = useState(false)

  const dispatch = useDispatch()

  const orderDetails = useSelector((state) => state.orderDetails)
  const { order, loading, error } = orderDetails

  const orderPay = useSelector((state) => state.orderPay)
  const { loading: loadingPay, success: successPay } = orderPay

  const orderDeliver = useSelector((state) => state.orderDeliver)
  const { loading: loadingDeliver, success: successDeliver } = orderDeliver

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const orderPayMpesa = useSelector((state) => state.orderPayMpesa)
  const { loading: loadingMpesaPay, success: successMpesaPay } = orderPayMpesa

  if (successMpesaPay) {
    dispatch(lipaNaMpesaCallback())
  }

  if (!loading) {
    //   Calculate prices
    const addDecimals = (num) => {
      return (Math.round(num * 100) / 100).toFixed(2)
    }

    order.itemsPrice = addDecimals(
      order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    )
  }

  const currencySymbol = localStorage.getItem('currency')
  const currency = JSON.parse(currencySymbol)

  const exchangeRate = localStorage.getItem('exchangeRate')
  const Rate = JSON.parse(exchangeRate)

  fx.base = Rate.base
  fx.rates = Rate.rates

  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    }

    const addPayPalScript = async () => {
      const { data: clientId } = await axios.get('/api/config/paypal')
      const script = document.createElement('script')
      script.type = 'text/javascript'
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
      script.async = true
      script.onload = () => {
        setSdkReady(true)
      }
      document.body.appendChild(script)
    }

    if (!order || successPay || successDeliver || order._id !== orderId) {
      dispatch({ type: ORDER_PAY_RESET })
      dispatch({ type: ORDER_DELIVER_RESET })
      dispatch(getOrderDetails(orderId))
    } else if (!order.isPaid) {
      if (!window.paypal) {
        addPayPalScript()
      } else {
        setSdkReady(true)
      }
    }
  }, [dispatch, orderId, successPay, successDeliver, order, userInfo, history])

  const successPaymentHandler = (paymentResult) => {
    console.log(paymentResult)
    dispatch(payOrder(orderId, paymentResult))
  }

  const payHandler = (e) => {
    e.preventDefault()
    const paymentResult = {
      id: transactionId,
      status: 'mpesa',
      update_time: Date.now(),
      payer: {
        email_address: order.user.email,
      },
    }
    console.log(paymentResult)
    dispatch(payOrder(orderId, paymentResult))
  }

  const deliverHandler = () => {
    dispatch(deliverOrder(order))
  }

  const lipanaMpesa = () => {
    const phone = order.shippingAddress.phone
    dispatch(lipaNaMpesa(phone))
    console.log('mpesa')
    console.log(phone)
  }

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant='danger'>{error}</Message>
  ) : (
    <>
      <h1>Order {order._id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Name: </strong> {order.user.name}
              </p>
              <p>
                <strong>Email: </strong>{' '}
                <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
              </p>
              <p>
                <strong>Address:</strong>
                {order.shippingAddress.address}, {order.shippingAddress.phone}{' '}
              </p>
              {order.isDelivered ? (
                <Message variant='success'>
                  Delivered on {order.deliveredAt}
                </Message>
              ) : (
                <Message variant='danger'>Not Delivered</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method: </strong>
                {order.paymentMethod}
              </p>
              {order.isPaid ? (
                <Message variant='success'>Paid on {order.paidAt}</Message>
              ) : (
                <Message variant='danger'>Not Paid</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>
              {order.orderItems.length === 0 ? (
                <Message>Order is empty</Message>
              ) : (
                <ListGroup variant='flush'>
                  {order.orderItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} x {currency.symbol}.
                          {fx(item.price)
                            .from('USD')
                            .to(currency.code)
                            .toFixed(3)}{' '}
                          ={currency.symbol}.
                          {fx(item.qty * item.price)
                            .from('USD')
                            .to(currency.code)
                            .toFixed(3)}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>
                    {currency.symbol}.{' '}
                    {fx(order.itemsPrice)
                      .from('USD')
                      .to(currency.code)
                      .toFixed(3)}
                  </Col>
                </Row>
              </ListGroup.Item>
              {/*   <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>ksh.{order.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>ksh.{order.taxPrice}</Col>
                </Row>
              </ListGroup.Item> */}
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>
                    {' '}
                    {currency.symbol}.
                    {fx(order.totalPrice)
                      .from('USD')
                      .to(currency.code)
                      .toFixed(0)}
                  </Col>
                </Row>
              </ListGroup.Item>
              {!order.isPaid && order.paymentMethod === 'PayPal' && (
                <ListGroup.Item>
                  {loadingPay && <Loader />}
                  {!sdkReady ? (
                    <Loader />
                  ) : (
                    <PayPalButton
                      amount={order.totalPrice}
                      onSuccess={successPaymentHandler}
                    />
                  )}
                </ListGroup.Item>
              )}
              {!order.isPaid && order.paymentMethod !== 'PayPal' && (
                <ListGroup.Item>
                  <Button
                    type='button'
                    className='btn btn-block mpesa'
                    variant='light'
                    onClick={lipanaMpesa}
                  >
                    <Image
                      src='/images/mpesa.png'
                      style={{ height: '25px' }}
                      fluid
                    />
                  </Button>
                  <hr />
                  <p>1. Go to Safaricom Menu</p>
                  <p>2. Select Mpesa</p>
                  <p>3. Select Lipa na Mpesa</p>
                  <p>4. Select Buy Goods and Services</p>
                  <p>
                    5. Enter the Till No <b>5828867</b>{' '}
                  </p>
                  <p>6. Enter the exact amount indicated in the total</p>
                  <p>7. Then Confirm and Complete the transaction</p>
                </ListGroup.Item>
              )}

              {loadingDeliver && <Loader />}
              {userInfo &&
                userInfo.isAdmin &&
                order.isPaid &&
                !order.isDelivered && (
                  <ListGroup.Item>
                    <Button
                      type='button'
                      className='btn btn-block'
                      onClick={deliverHandler}
                    >
                      Mark As Delivered
                    </Button>
                  </ListGroup.Item>
                )}
              {userInfo &&
                userInfo.isAdmin &&
                order.paymentMethod !== 'PayPal' &&
                !order.isPaid && (
                  <ListGroup.Item>
                    <>
                      <Form onSubmit={payHandler}>
                        <Form.Group controlId='transactionId'>
                          <Form.Label>Transaction Id</Form.Label>
                          <Form.Control
                            required
                            type='transactionId'
                            placeholder='Enter Transaction Id'
                            value={transactionId}
                            onChange={(e) => setTransactionId(e.target.value)}
                          ></Form.Control>
                        </Form.Group>

                        <Button type='submit' variant='primary'>
                          Mark Order as Paid
                        </Button>
                      </Form>
                    </>
                  </ListGroup.Item>
                )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default OrderScreen
