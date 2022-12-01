import React from 'react'
import { Spinner } from 'react-bootstrap'
const Loading = () => (
    <Spinner animation="border" role="status">
      <span className="visually-hidden">Loading...</span>
    </Spinner>
)
export default Loading