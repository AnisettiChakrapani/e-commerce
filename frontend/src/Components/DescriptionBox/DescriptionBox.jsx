import React from 'react'
import './DescriptionBox.css'

const DescriptionBox = () => {
  return (
    <div className='descriptionbox'>
        <div className="descriptionbox-navigator">
            <div className="descriptionbox-nav-box">Description</div>
            <div className='descriptionbox-nav-box fade'>Reviews (123)</div>    
        </div>
        <div className="description-description">
            <p>An Ecommerce website is a website that enables the exchange of goods and services and the transmission of funds and data over the internet. It allows businesses to sell physical or digital products, services, or experiences to customers through an online platform. Ecommerce websites use technology and digital platforms, including websites, mobile apps, and social media, to facilitate buying and selling.</p>
            <p>Ecommrce websites typically display products or services and detailed descriptions, images, prices and any available varieties like sizes, colors. each product usually has its own dedicated information</p>
        </div>
    </div>
  )
}

export default DescriptionBox