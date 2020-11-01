import React, {Component} from 'react';
import gotService from '../../services/gotServise'
import Spinner from '../spinner/spinner';
import ErrorMessage from '../errorMessage/errorMessage';
import PropTypes from 'prop-types';

import styled from 'styled-components';

const RandomBlock = styled.div`
  background-color: #fff;
  padding: 25px 25px 15px 25px;
  margin-bottom: 40px;
`;

const RandomBlockTitle = styled.h4`
  margin-bottom: 5px;
  text-align: center;
  min-height: 66px;
`;

const Term = styled.span`
  font-weight: bold;
`;

const Data = styled.span`
  color: grey;
  margin-left: 10px;
`;

export default class RandomChar extends Component {
  
  gotService = new gotService();  
  state = {
    char: {},
    loading: true,
    error: false
  }

  // static defaultProps = {
  //   interval: 15000
  // }

  componentDidMount() {
    this.updateCharacter();
    this.timeId = setInterval(this.updateCharacter, this.props.interval);
  }

  componentWillUnmount() {
    clearInterval(this.timeId);
  }

  onCharLoaded = (char) => {
    this.setState({
      char,
      loading: false
    })
  }

  onError = () => {
    this.setState({
      error: true,
      loading: false
    })
  }

  updateCharacter = () => {
    const id = Math.floor(Math.random()*140 + 25); // Случайное число от 25 до 140
    //const id = 13000000;
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

RandomChar.defaultProps = {
  interval: 15000
}

RandomChar.propTypes = {
  // interval: (props, propName, componentName) => {
  //   const value = props[propName];

  //   if (typeof value === 'number' && !isNaN(value)) {
  //     return null;
  //   }
  //   return new TypeError(`${componentName}: ${propName} must be a number!`); 
  // }
  interval: PropTypes.number
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
