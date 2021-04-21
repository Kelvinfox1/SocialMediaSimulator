import React from 'react'
import { Col, Row, Image, ListGroup } from 'react-bootstrap'

const AboutUs = () => {
  return (
    <>
      <Row>
        <Col md={6}>
          <h1>About Us</h1>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h1>
                ABOUT MY FIRM SMM <i class='fas fa-info' aria-hidden='true'></i>
              </h1>
              <p>
                My firm Smm Is built by a couple of very active and enthusiastic
                professionals. The founders hire IT experts,online marketers and
                influencers, judging both of there education and experience.
                Even team members with differnt skills are hired for those
                particular service provision. Satisfied customers are the
                inspiration of My Firm Smm. Every team member works their best
                to understand and meet all the needs of clients Besides this
                popular and cheap SMM site,has provided services for many years
                We have achived a good name in the market.
              </p>
            </ListGroup.Item>
            <br></br>
            <ListGroup.Item>
              <h1>
                VISION <i class='fas fa-low-vision' aria-hidden='true'></i>
              </h1>
              <p>
                The website will provide cheap and affordable social media
                marketting all over the world To provide a big job market for IT
                experts and influencers
              </p>
            </ListGroup.Item>
            <br></br>
            <ListGroup.Item>
              <h1>
                AFFILIATE PROGRAM{' '}
                <i class='fas fa-tasks' aria-hidden='true'></i>
              </h1>
              <p>
                The website provides the best AFFILIATE PROGRAM, this is
                becaouse when you are a regestered member of the site and you
                invite anyone in the platform you earn 10% of any purchase made
                by your downline, for example,Client A is a regestered member
                and invites client B. Client B regesteres in the platform and
                uses Client A username as his/her upline Whenever client B makes
                an order , Client A earns a 10% commision Ever mounth on date
                28, every upline receive his/her commision via Mpesa or other
                suitable payment methods
              </p>
              <hr></hr>
              <h1>
                How it works <i class='fas fa-briefcase' aria-hidden='true'></i>
              </h1>
              <p>
                during regestration you the site will ask you for the username
                of your upline.
              </p>
              <ol>
                <li>
                  During regestration we will generate a 5 digit code to use
                  when inviting friends
                </li>
                <li>
                  In every month date 28, Your earnings will be disbused to your
                  mpesa number
                </li>
              </ol>
            </ListGroup.Item>
            <br></br>
            <ListGroup.Item>
              <h1>
                Location <i class='fas fa-map' aria-hidden='true'></i>
              </h1>
              <p>
                My firm smm is an online retailer website,with physical offices
                in Kenya, Kirinyaga county we sell social media marketting
                services .
              </p>
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={6}>
          {' '}
          <Image src='/images/about.png' fluid />
          <Image src='/images/affiliate.png' fluid />
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <h1>How to make an order</h1>
          <div className='video-responsive'>
            <iframe
              width='853'
              height='480'
              src='https://www.youtube.com/embed/Xef6ombeARA'
              frameBorder='0'
              allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
              allowFullScreen
              title='Embedded youtube'
            />
          </div>
          <p> Steps </p>
          <ol>
            <li> Click on a product</li>
            <li>Enter the quantity of what you want and click ADD CART</li>
            <li>Sign in or Register if you are a new client</li>
            <li>
              Enter the link to the your account and your phone number and click
              CONTINUE.
            </li>
            <li>
              {' '}
              choose on payment method suitable to you .and click continue.
            </li>
            <li>check your order and click PLACE order.</li>
            <li>A recite will appear and will guide you how</li>
          </ol>
        </Col>
        <Col md={6}>
          <h1>TERMS AND CONDITIONS</h1>
          <p>
            after placing an order the last step is paying for an order @My firm
            Smm Payment we don't proceess unpaid orders We dont also offer
            Refunds,so incase of any inconviniences, Please create a ticket.
          </p>
        </Col>
      </Row>
    </>
  )
}

export default AboutUs
