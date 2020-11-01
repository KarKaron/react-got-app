import React, { Component } from 'react';
import gotService from '../../services/gotServise';
import Header from '../header/header';
import RandomChar from '../randomChar/randomChar';
import { CharactersPage, HousesPage, BooksPage, BooksItem } from '../pages/';
import ErrorMessage from '../errorMessage/errorMessage';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { Col, Row, Container, Button } from 'reactstrap';
import styled from 'styled-components';

const AppBlock = styled.div`
  overflow-x: hidden;
  background: url('../img/got.jpg') center center no-repeat;
  background-size: cover;
  font-size: 16px;
  height: 100%;
`;

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
      <Router>
        <AppBlock> 
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
            <Route path="/characters" component={CharactersPage} />
            <Route path="/houses" component={HousesPage} />
            <Route path="/books" exact component={BooksPage} />
            <Route path="/books/:id" render={
              ({match}) => {
                const {id} = match.params; 
                return <BooksItem bookId={id} /> 
              }
            }/>
          </Container>
        </AppBlock>
      </Router>
    );
  }
}
