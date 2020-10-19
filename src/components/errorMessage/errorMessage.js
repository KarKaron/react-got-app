import React from 'react';
import WarningRoundedIcon from '@material-ui/icons/WarningRounded';
import { Alert, Card, CardImg, CardImgOverlay } from 'reactstrap';
import ErrorImg from './error.jpg'

const ErrorMessage = () => {
  return (
    <>
      <Card>
        <CardImg width="100%" src={ErrorImg} alt="Error" />
        <CardImgOverlay>
          <Alert color="danger" style={{ marginTop: '50%' }}>
            <WarningRoundedIcon /> Ups... Something is wrong!
          </Alert>
        </CardImgOverlay>
      </Card>
      
    </>
  );
}
 
export default ErrorMessage;