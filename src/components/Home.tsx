import Advertisement from '../types/Advertisement';
import { Category } from '../types/Category';
import AdvertisementCard from './AdvertisementCard';
import Heading from './Heading';
import SubHeading from './SubHeading';
import axios from 'axios';

//#region types

interface IAdsListProps {
  adsData: AdsDataType;
}

type AdsDataType = {
  ads: Advertisement[];
};

//#endregion

const AdsList = (props: IAdsListProps) => {
  const ads = props.adsData.ads;

  return (
    <div>
      <div>
        {ads.map((ad) => {
          return (
            <AdvertisementCard
              key={ad.id}
              advertisement={ad}
              onClickFunction={function (): void {
                throw new Error('Function not implemented.');
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

const Home = () => {
  const data: AdsDataType = {
    ads: [
      {
        id: 'a',
        name: 'tomaticos',
        description: 'descripción',
        price: 1.25,
        category: Category.Fresh,
        averageReviewScore: 0,
        image: 'https://i.blogs.es/e44dc0/manzana/450_1000.webp',
      },
      {
        id: 'b',
        name: 'tomaticos mejores',
        description: 'descripción',
        price: 2,
        category: Category.Fresh,
        averageReviewScore: 0,
        image: 'https://i.blogs.es/e44dc0/manzana/450_1000.webp',
      },
      {
        id: 'c',
        name: 'platanicos',
        description: 'descripción',
        price: 3.1,
        category: Category.Fresh,
        averageReviewScore: 0,
        image: 'https://i.blogs.es/e44dc0/manzana/450_1000.webp',
      },
    ],
  };

  return (
    <div>
      <Heading text="Lo más fresco para tí" />
      <SubHeading text="Creemos que estos productos pueden interesarte" />

      <AdsList adsData={getAds()} />
    </div>
  );
};

function getAds(): AdsDataType {
  axios
    .get(`${process.env.REACT_APP_BACKEND_DEFAULT_ROUTE}advertisements/all`)
    .then((response) => {
      if (response.status === 200) {
        console.log(response.data);
      }
    })
    .catch((error) => {
      console.log(error);
    });

  return {
    ads: [],
  };
}

export default Home;
