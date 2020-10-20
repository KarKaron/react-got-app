import React from 'react';

import { Col, Row, Alert } from 'reactstrap';

const RowBlock = ({name, left, right}) => {
  return (
    <Row>
      <Col md='6'>
        <Alert color="primary" style={{marginBottom: '2%'}}>
          {name}
        </Alert>
        {left}
      </Col>
      <Col md='6'>
        {right}
      </Col>
    </Row>
  )
}

export default RowBlock;