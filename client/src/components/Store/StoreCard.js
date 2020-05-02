import React from 'react'
import { Card } from 'react-bootstrap'

const StoreCard = (props) => {
  const { id, name, image, description } = props
  return (
    <Card className="h-100">
      <Card.Header>{name}</Card.Header>
      <Card.Body>
        <div className="w-100 h-0 position-relative overflow-hidden mb-4" style={{ paddingTop: '75%' }}>
          <Card.Img
            src={`${image}?random=${id}`}
            alt={name}
            loading="lazy"
            className="position-absolute"
            style={{ top: 0, left: 0, right: 0 }}
          />
        </div>
        <Card.Text>{description}</Card.Text>
      </Card.Body>
    </Card>
  )
}

export default StoreCard
