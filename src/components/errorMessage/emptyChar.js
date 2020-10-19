import React from 'react';
import WarningRoundedIcon from '@material-ui/icons/WarningRounded';
import { Alert, Card, CardImg, CardImgOverlay } from 'reactstrap';
import ErrorImg from './empty.jpg'

const emptyChar = () => {
  return (
    <>
      <Card>
        <CardImg src={ErrorImg} alt="Error" />
        <CardImgOverlay>
          <Alert color="warning" style={{marginTop: '62%'}}>
            <WarningRoundedIcon /> Choose a character!
          </Alert>
        </CardImgOverlay>
      </Card>
      
    </>
  );
}
 
export default emptyChar;