import React from 'react'
import { Helmet } from 'react-helmet'

const Meta = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name='description' content={description} />
      <meta name='keyword' content={keywords} />
    </Helmet>
  )
}

Meta.defaultProps = {
  title: 'Welcome To My firm smm',
  description: 'We sell the best online services for cheap',
  keywords: 'youtube likes, youtube views, youtube subscribers, facebook, instagram followers',
}

export default Meta
