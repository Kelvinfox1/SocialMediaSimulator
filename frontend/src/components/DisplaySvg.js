import React from 'react'
import { Container, Image, Row, Col } from 'react-bootstrap'

const DisplaySvg = () => {
  return (
    <Container>
      <Row>
        <Col md={6}>
          <Image
            src='/images/dashboard.svg'
            fluid
            style={{ height: '300px', margin: 'auto' }}
          />
        </Col>
        <Col md={6}>
          <h1>#1 SOCIAL MEDIA MARKETTING PLATFORM</h1>
          <p>A result-driven platform to help you make an impression online</p>
          <p>
            With unbeatable offers promote your videos/ brands by going viral
          </p>
          <p>.... We Walk the Talk</p>
        </Col>
      </Row>
    </Container>
  )
}

export default DisplaySvg
