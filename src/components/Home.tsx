/**
import { ADDRGETNETWORKPARAMS } from "dns";
import YourProducts from "./Products_To_Sell/YourProducts";
import AddProduct from "./Products_To_Sell/AddProduct";
function Home() {
    return (
        <div>
            <h1>Welcome, Manolo</h1>
            <h2>Your products:</h2>
            <div className="products">
                <YourProducts name="Tomate" img="data:image/jpeg;base64,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"/>
                <YourProducts name="Lechuga" img="data:image/jpeg;base64,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" />
            </div>
            <AddProduct />
        </div>
    );
*/

import Advertisement from '../types/Advertisement';
import { Category } from '../types/Category';
import AdvertisementCard from './AdvertisementCard';

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
      <h2>Lo más fresco para tí</h2>
      <h4>Creemos que estos productos pueden interesarte</h4>

      <div>
        {ads.map((ad) => {
          return (
            <AdvertisementCard
              advertisement={ad}
              onClickFunction={function (): void {
                throw new Error('Function not implemented.');
              }}
            />
            /**<div
              key={ad.id}
              style={{ display: 'flex', justifyContent: 'space-between' }}
            >
              <div>{ad.name}</div>

              <div>
                {ad.pricePerKilogram} - {ad.category}
              </div>
            </div>**/
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
      <h1>Home</h1>

      <AdsList adsData={data} />
    </div>
  );
};

export default Home;
