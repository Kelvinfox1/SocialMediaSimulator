import asyncHandler from 'express-async-handler'
import axios from 'axios'

const access = asyncHandler(async (req, res, next) => {
  const consumer_key = process.env.MPESA_KEY
  const consumer_secret = process.env.MPESA_SECRET

  const url = process.env.MPESA_AUTH_URL

  const Authorization = `Basic ${new Buffer.from(
    `${consumer_key}:${consumer_secret}`,
    'utf-8'
  ).toString('base64')}`

  try {
    let { data } = await axios.get(url, {
      headers: {
        Authorization: Authorization,
      },
    })

    req.token = data['access_token']

    return next()
  } catch (err) {
    return res.send({
      success: false,
      message: err['response']['statusText'],
    })
  }
})

export { access }
