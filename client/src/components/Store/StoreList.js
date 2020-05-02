import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import { Row, Col } from 'react-bootstrap'
import ReactPaginate from 'react-paginate'

import { BASE_API_URL, SPECIFIC_STORE_URL, STORES_FETCH_LIMIT } from '../../constants/common'
import StoreCard from './StoreCard'

const StoreList = () => {
  const [state, setState] = useState({
    stores: [],
    page: 0,
    pages: 1,
  })

  const { stores, page, pages } = state

  const getStoreList = async (p = page) => {
    try {
      const { data } = await Axios.get(`${BASE_API_URL}${SPECIFIC_STORE_URL}?limit=${STORES_FETCH_LIMIT}&page=${p}`)
      setState({ ...state, stores: data.results, pages: data.meta.pages, page: data.meta.page })
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getStoreList()
    return undefined
  }, [])

  return (
    <>
      <h1 className="mb-4">Stores</h1>

      <Row>
        {stores.map((store) => (
          <Col key={store.id} xs={12} md={6} lg={4} className="mb-4">
            <StoreCard {...store} />
          </Col>
        ))}
      </Row>

      <Row>
        <Col xs={12} className="d-flex justify-content-center align-content-center">
          <ReactPaginate
            breakClassName="page-item"
            containerClassName="pagination"
            // subContainerClassName="pages pagination"
            pageClassName="page-item"
            pageLinkClassName="page-link cursor-pointer"
            activeClassName="active"
            previousClassName="page-item"
            nextClassName="page-item"
            previousLinkClassName="page-link cursor-pointer"
            nextLinkClassName="page-link cursor-pointer"
            disabledClassName="disabled"
            pageCount={pages}
            forcePage={page}
            onPageChange={({ selected }) => getStoreList(selected)}
          />
        </Col>
      </Row>
    </>
  )
}

export default StoreList
