import React, { Component } from 'react';
import gotService from '../../services/gotServise';
import RowBlock from '../rowBlock/rowBlock';
import ItemList from '../itemList/itemList';
import ItemDetails, {Field} from '../itemDetails/itemDetails';
import ErrorMessage from '../errorMessage/errorMessage';

export default class HousesPage  extends Component {
  gotService = new gotService();
  
  state = {
    selectedHouse: 1,
    error: false
  }

  onItemSelected = (id) => { 
    this.setState({ selectedHouse: id }) 
  }

  componentDidCatch() { 
    this.setState({ error: true }) 
  }

  render() {
    const {selectedHouse, error} = this.state;

    if (error) { return <ErrorMessage/> }

    const itemList = (
      <ItemList
        onItemSelected={this.onItemSelected}
        getData={this.gotService.getAllHouses}
        renderItem={({name, region}) => `${name} (${region})`}
      />
    )

    const itemDetails = (
      <ItemDetails 
        elemId={selectedHouse}
        getDataId={this.gotService.getHouses}
      >
        <Field field="region" label="Region" />
        <Field field="words" label="Words" />
        <Field field="titles" label="Titles" />
        <Field field="overlord" label="Overlord" />
        <Field field="ancestralWeapons" label="Ancestral Weapons" />
      </ItemDetails>
    )

    return (
      <RowBlock
        left={itemList}
        right={itemDetails}
        name={'Houses'}
      />
    );
  }
} ;