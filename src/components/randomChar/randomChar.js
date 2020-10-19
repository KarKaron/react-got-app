import React, {Component} from 'react';
import gotService from '../../services/gotServise'
import Spinner from '../spinner/spinner';
import ErrorMessage from '../errorMessage/errorMessage';
import styled from 'styled-components';

const RandomBlock = styled.div`
  background-color: #fff;
  padding: 25px 25px 15px 25px;
  margin-bottom: 40px;
`
const RandomBlockTitle = styled.h4`
  margin-bottom: 20px;
  text-align: center;
`
const Term = styled.span`
  font-weight: bold;
`
const Data = styled.span`
  color: grey;
  margin-left: 10px;
`

export default class RandomChar extends Component {

  constructor() {
    super();
    this.updateCharacter();
  }
  
  gotService = new gotService();  
  state = {
    char: {},
    loading: true,
    error: false
  }

  onCharLoaded = (char) => {
    this.setState({
      char,
      loading: false
    })
  }

  onError = (err) => {
    this.setState({
      error: true,
      loading: false
    })
  }

  updateCharacter() {
    //const id = Math.floor(Math.random()*140 + 25); // Случайное число от 25 до 140
    const id = 13000000;
    this.gotService.getCharacter(id)
        .then(this.onCharLoaded)
        .catch(this.onError);
  }

  render() {
    const {char, loading, error} = this.state;

    const mistake = error ? <ErrorMessage/> : null
    const spinner = loading ? <Spinner/> : null
    const content = !(loading || error) ? <View char={char}/> : null
  
    return (
      <RandomBlock className="rounded">
        {mistake}
        {spinner}
        {content}
      </RandomBlock>
    );
  }
}

const View = ({char}) => {

  const {name, gender, born, died, culture} = char;

  return (
    <>
      <RandomBlockTitle>
          Random Character: 
          <Data>{name}</Data>
        </RandomBlockTitle>
        <ul className="list-group list-group-flush">
          <li className="list-group-item d-flex justify-content-between">
            <Term>Gender </Term>
            <Data>{gender}</Data>
          </li>
          <li className="list-group-item d-flex justify-content-between">
            <Term>Born </Term>
            <Data>{born}</Data>
          </li>
          <li className="list-group-item d-flex justify-content-between">
            <Term>Died </Term>
            <Data>{died}</Data>
          </li>
          <li className="list-group-item d-flex justify-content-between">
            <Term>Culture </Term>
            <Data>{culture}</Data>
          </li>
        </ul>
    </>
  );
}
