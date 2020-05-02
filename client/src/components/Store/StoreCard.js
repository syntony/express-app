import React from 'react'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import { SPECIFIC_STORE_URL } from '../../constants/common'
import { ImgWrapper } from '../common'

const StoreCard = (props) => {
  const { id, name, image, description } = props
  return (
    <Card as={Link} to={`/${SPECIFIC_STORE_URL}/${id}`} className="h-100 text-decoration-none">
      <Card.Header className="text-dark">{name}</Card.Header>
      <Card.Body>
        <ImgWrapper>
          <Card.Img
            src={`${image}?random=${id}`}
            alt={name}
            loading="lazy"
            className="position-absolute w-100"
            style={{ top: 0, left: 0, right: 0 }}
          />
        </ImgWrapper>
        <Card.Text className="text-dark">{description}</Card.Text>
      </Card.Body>
    </Card>
  )
}

export default StoreCard
