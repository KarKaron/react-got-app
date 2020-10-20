import React, { Component } from 'react';
import gotService from '../../services/gotServise';
import Header from '../header/header';
import RandomChar from '../randomChar/randomChar';
import { CharactersPage, BooksPage, HousesPage } from '../pages/';
import ErrorMessage from '../errorMessage/errorMessage';

import { Col, Row, Container, Button } from 'reactstrap';

export default class App extends Component {
  gotService = new gotService();

  state = {
    showRandomChar: true,
    buttonText: 'Hide Element',
    error: false
  }

  componentDidCatch() { 
    this.setState({ error: true }) 
  }

  onToogle = () => {
    const showRandomChar = !this.state.showRandomChar
    let text = 'Hide Element'

    if (!showRandomChar) { text = 'Show Element' }

    this.setState({
      showRandomChar: showRandomChar,
      buttonText: text
    })
  }

  render() {    
    const {showRandomChar, buttonText, error} = this.state;
    
    if (error) { return <ErrorMessage/> }

    const content = showRandomChar ? <RandomChar/> : null

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
          <CharactersPage/>
          <BooksPage/>
          <HousesPage/>
        </Container>
      </>
    );
  }
}
