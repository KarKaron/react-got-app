import React, { Component } from 'react';
import { Col, Row, Container, Button } from 'reactstrap';
import Header from '../header/header';
import RandomChar from '../randomChar/randomChar';
import ItemList from '../itemList/itemList';
import CharDetails from '../charDetails/charDetails';

export default class App extends Component {

  state = {
    visible: true,
    buttonText: 'Hide Element'
  }

  onToogle = () => {
    const newVisible = !this.state.visible
    let text = 'Hide Element'
    if (!newVisible) {
      text = 'Show Element'
    } 
    this.setState({
      visible: newVisible,
      buttonText: text
    })
  }

  render() {
    const {visible, buttonText} = this.state;

    const content = visible ? <RandomChar/> : null

    return (
      <> 
        <Container>
          <Header />
        </Container>
        <Container>
          <Row>
            <Col lg={{size: 5, offset: 0}}>
              {content}
              <Button 
                color="primary"
                onClick={this.onToogle}
                style={{ marginBottom: '20px' }}
              >
                {buttonText}
              </Button>  
            </Col>
          </Row>
          <Row>
            <Col md='6'>
              <ItemList />
            </Col>
            <Col md='6'>
              <CharDetails />
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}
