import { Button, Rating, TextField } from '@mui/material';
import axios from 'axios';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AdvertisementManagement from '../../libs/AdvertisementManagement';
import Heading from '../Heading';

interface PlaceReviewProps {
  purchaseId?: string;
}

/** SE ASUME QUE SOLO SE LLEGA A ESTA PANTALLA SI LA COMPRA IS_ENDED */
const PlaceReview = (props: PlaceReviewProps) => {
  const { purchaseId } = useParams<{ purchaseId: string }>();
  const navigate = useNavigate();

  const [rating, setRating] = React.useState<number | null>(0);
  const [hover, setHover] = React.useState(-1);
  const [comment, setComment] = React.useState<string>('');
  const [confcode, setConfcode] = React.useState<string>('');

  React.useEffect(() => {
    //Esto ha de cambiar pero no sé como hacerlo bonito :)
    alert(
      'Error al obtener la compra. Por favor, inténtelo de nuevo más tarde.'
    );
    if (!purchaseId) navigate(-1);
  }, [purchaseId]);

  const sendReview = () => {
    AdvertisementManagement.PlacePurchaseReview(
      purchaseId as string,
      rating || 0,
      comment,
      confcode
    ).then((res) => {
      console.log(res);
    });
  };

  return (
    <div className="ml-8 mt-8 mb-8 mr-8 flex flex-col space-y-3">
      <Heading text="Deja una reseña" />
      <Rating
        name="rating"
        defaultValue={0}
        precision={0.5}
        size="large"
        className="justify-center"
        onChange={(event, newValue) => {
          setRating(newValue);
        }}
        getLabelText={getLabelText}
        onChangeActive={(event, newHover) => {
          setHover(newHover);
        }}
      />
      <TextField
        id="review-comment"
        label="Comenta tu experiencia"
        multiline
        minRows={4}
        maxRows={8}
        onChange={(event) => {
          setComment(event.target.value);
        }}
      />
      <TextField
        required
        id="conf-code"
        label="Código de confirmación de compra"
        onChange={(event) => {
          setConfcode(event.target.value);
        }}
      />
      <div className="flex-row justify-end space-x-2">
        <Button
          variant="text"
          onClick={() => {
            console.log(rating);
            console.log(comment);
            console.log(confcode);
          }}
        >
          Cancelar
        </Button>
        <Button variant="outlined" onClick={() => sendReview()}>
          Enviar
        </Button>
      </div>
    </div>
  );
};

const labels: { [index: string]: string } = {
  0: 'Extremadamente disatisfecho',
  0.5: 'Muy disatisfecho',
  1: 'Disatisfecho',
  1.5: 'Poco disatisfecho',
  2: 'Neutral',
  2.5: 'Poco satisfecho',
  3: 'Satisfecho',
  3.5: 'Muy satisfecho',
  4: 'Extremadamente satisfecho',
  4.5: 'Excelente',
  5: 'Excelente',
};

function getLabelText(value: number) {
  return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
}

export default PlaceReview;
