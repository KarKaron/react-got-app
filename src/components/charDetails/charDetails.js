import React, { Component } from 'react';
import gotService from '../../services/gotServise';
import EmptyChar from '../errorMessage/emptyChar';
import Spinner from '../spinner/spinner';
import ErrorMessage from '../errorMessage/errorMessage';

import styled from 'styled-components';

const CharDetail = styled.div`
  background-color: #fff;
  padding: 25px 25px 15px 25px;
  margin-bottom: 40px;
  border-radius: 4px;
`;

const CharDetailTitle = styled.h4`
  margin-bottom: 20px;
  text-align: center;
`;

const Term = styled.span`
  font-weight: bold;
`;

const Data = styled.span`
  color: grey;
  margin-left: 10px;
`;

export default class CharDetails extends Component {

  gotService = new gotService();  
  state = {
    char: null,
    loading: true,
    error: false
  }

  componentDidCatch() {
    this.setState({
      error: true
    })
  }

  componentDidMount() {
    this.updateChar();
  }

  componentDidUpdate(prevProps) {
    if (this.props.charId !== prevProps.charId) {
      this.updateChar();
    }
  }

  onCharDetailsLoaded = (char) => {
    this.setState({
        char,
        loading: false
    })
  }

  updateChar() {
    const {charId} = this.props;

    if (!charId) {
      return;
    }

    this.setState({
      loading: true
    })

    this.gotService.getCharacter(charId)
        .then( this.onCharDetailsLoaded )
        .catch( () => this.onError())
  }

  onError(){
    this.setState({
        char: null,
        error: true
    })
  }

  render() {

    const {char, loading, error} = this.state;

    if (!char && error) {
      return <ErrorMessage/>
    } else if (!char) {
      return <EmptyChar/>
    }
    
    if (loading) {
      return (
        <CharDetail>
          <Spinner/>
        </CharDetail>
      )
    }

    const {name, gender, born, died, culture} = char;

    return (
      <CharDetail>
        <CharDetailTitle>{name}</CharDetailTitle>
        <ul className="list-group list-group-flush">
          <li className="list-group-item d-flex justify-content-between">
            <Term>Gender</Term>
            <Data>{gender}</Data>
          </li>
          <li className="list-group-item d-flex justify-content-between">
            <Term>Born</Term>
            <Data>{born}</Data>
          </li>
          <li className="list-group-item d-flex justify-content-between">
            <Term>Died</Term>
            <Data>{died}</Data>
          </li>
          <li className="list-group-item d-flex justify-content-between">
            <Term>Culture</Term>
            <Data>{culture}</Data>
          </li>
        </ul>      
      </CharDetail>
    );
  }
}