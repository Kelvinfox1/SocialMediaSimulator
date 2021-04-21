import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'

const SearchBox = ({ history }) => {
  const [keyword, setKeyword] = useState('')

  const submitHandler = (e) => {
    e.preventDefault()
    if (keyword.trim()) {
      history.push(`/search/${keyword}`)
    } else {
      history.push('/')
    }
  }

  return (
    <Form onSubmit={submitHandler} inline>
      <Form.Control
        style={{ borderRadius: '10px' }}
        type='text'
        name='q'
        onChange={(e) => setKeyword(e.target.value)}
        placeholder='Search for Service...'
        className='mr-sm-2 ml-sm-5'
      ></Form.Control>
      <Button
        style={{ borderRadius: '10px' }}
        type='submit'
        variant='secondary'
        className='p-2'
      >
        Search
      </Button>
    </Form>
  )
}

export default SearchBox
