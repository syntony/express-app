import React from 'react'
import { Card } from 'react-bootstrap'

const StoreCard = (props) => {
  const { name, description } = props
  return (
    <Card className="h-100">
      <Card.Header>{name}</Card.Header>
      <Card.Body>
        <Card.Text>{description}</Card.Text>
      </Card.Body>
    </Card>
  )
}

export default StoreCard
