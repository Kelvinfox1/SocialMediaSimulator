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
  title:
    '#1 SOCIAL MEDIA MARKETING PLATFORM IN KENYA FOR 5 YEARS! | myfirmsmm.com',
  description:
    'Myfirmsmm has the Cheapest SMM Panel and 100% High Quality for all social networks. Get the best Instagram panel today! Boost your Online presence',
  keywords:
    'buy youtube views in Kenya, boost Instagram profile in kenya, top social media marketing in kenya, buy facebook likes in Kenya, youtube Kenya offers, boost your online presence in kenya, Youtube Kenya, smm reseller panel Kenya, sosyalmedya panel, Tiktok panel Kenya, views and likes in Kenya, Kenya panel, online marketing in Kenya, pata likes, pata views kenya',
}

export default Meta
