import Advertisement from '../types/Advertisement';
import AdvertisementCard from './AdvertisementCard';
import Heading from './Heading';
import SubHeading from './SubHeading';
import axios from 'axios';
import React from 'react';
import AdvertisementCardSkeleton from './AdvertisementCardSkeleton';

const Home = () => {
  const [dataLoaded, setDataLoaded] = React.useState(false);
  const [advertisementsToShow, setAdvertisementsToShow] =
    React.useState<JSX.Element[]>();
  const [advertisements, setAdvertisements] = React.useState<Advertisement[]>(
    []
  );

  React.useEffect(() => {
    getAdvertisements();
  }, []);

  React.useEffect(() => {
    setAdvertisementsToShow(
      advertisements.map((ad) => {
        return (
          <AdvertisementCard
            key={ad._id}
            advertisement={ad}
            onClickFunction={function (): void {
              throw new Error('Function not implemented.');
            }}
          />
        );
      })
    );
  }, [dataLoaded]);

  const getAdvertisements = () => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_DEFAULT_ROUTE}advertisements/all`)
      .then((response) => {
        if (response.status === 200) {
          setAdvertisements(response.data);
          setDataLoaded(true);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <Heading text="Lo más fresco para tí" />
      <SubHeading text="Creemos que estos productos pueden interesarte" />

      <div className="ml-5 mr-5">
        {dataLoaded ? (
          advertisementsToShow
        ) : (
          <>
            <AdvertisementCardSkeleton />
            <AdvertisementCardSkeleton />
            <AdvertisementCardSkeleton />
            <AdvertisementCardSkeleton />
            <AdvertisementCardSkeleton />
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
