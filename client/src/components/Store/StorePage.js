import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Axios from 'axios'
import { Row, Col, ButtonGroup, Button } from 'react-bootstrap'

import { BASE_API_URL, SPECIFIC_STORE_URL } from '../../constants/common'
import { ImgWrapper } from '../common'

const StorePage = () => {
  const { id } = useParams()
  const [state, setState] = useState({ store: { id } })
  const {
    store: { name, description, image },
  } = state

  const getStore = async () => {
    try {
      const { data } = await Axios.get(`${BASE_API_URL}/${SPECIFIC_STORE_URL}/${id}`)
      setState({ ...state, store: data.results })
    } catch (e) {
      console.error(e)
    }
  }

  useEffect(() => {
    getStore()
    return undefined
  }, [])

  if (!name) return null

  return (
    <Row>
      <Col xs={12} md={4}>
        <ImgWrapper>
          <img
            src={`${image}?random=${id}`}
            alt={name}
            loading="lazy"
            className="position-absolute w-100"
            style={{ top: 0, left: 0, right: 0 }}
          />
        </ImgWrapper>
      </Col>
      <Col xs={12} md={8} className="d-flex flex-column">
        <h1>{name}</h1>
        <p>{description}</p>
        <ButtonGroup className="mt-auto justify-content-end">
          <Button variant="danger" className="flex-grow-0">
            Remove This Shop
          </Button>
        </ButtonGroup>
      </Col>
    </Row>
  )
}

export default StorePage
