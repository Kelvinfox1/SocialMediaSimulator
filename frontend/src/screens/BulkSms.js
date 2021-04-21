import React from 'react'
import { Col, Form, ListGroup, Row } from 'react-bootstrap'

const BulkSms = () => {
  return (
    <>
      <h1> Create A new SMS Campaign</h1>
      <Row>
        <Col md={8}>
          <br />
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <br />
              <br />
              <Form>
                <Form.Group as={Row} controlId='from'>
                  <Form.Label column sm='2'>
                    <b> SMS from :</b>
                  </Form.Label>
                  <Col sm='10'>
                    <Form.Control
                      style={{ borderRadius: '5px' }}
                      type='name'
                      placeholder='Sender'
                    />
                  </Col>
                </Form.Group>
                <br />

                <Form.Group as={Row} controlId='from'>
                  <Form.Label column sm='2'>
                    <b> SMS text:</b>
                  </Form.Label>
                  <Col sm='10'>
                    <Form.Control
                      style={{ borderRadius: '5px' }}
                      as='textarea'
                      type='name'
                      placeholder='Enter your message here'
                    />
                  </Col>
                </Form.Group>
                <br />

                <Form.Group as={Row} controlId='from'>
                  <Form.Label column sm='2'>
                    <b> Recipient:</b>
                  </Form.Label>
                  <Col sm='10'>
                    <Form.File
                      id='custom-file'
                      label='upload your contacts'
                      custom
                    />
                  </Col>
                </Form.Group>
              </Form>
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </>
  )
}

export default BulkSms
