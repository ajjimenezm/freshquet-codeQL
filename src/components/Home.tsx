//#region types

enum Category {
  Fresh = 'fresh',
  Miscellaneous = 'miscellaneous',
}

interface IAdsListProps {
  adsData: AdsDataType;
}

type AdsDataType = {
  ads: AdsType[];
};

type AdsType = {
  id: number;
  name: String;
  pricePerKilogram: number;
  category: Category;
  averageReviewScore: number;
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
            <div
              key={ad.id}
              style={{ display: 'flex', justifyContent: 'space-between' }}
            >
              <div>{ad.name}</div>

              <div>
                {ad.pricePerKilogram} - {ad.category}
              </div>
            </div>
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
        id: 0,
        name: 'tomaticos',
        pricePerKilogram: 1.25,
        category: Category.Fresh,
        averageReviewScore: 0,
      },
      {
        id: 1,
        name: 'tomaticos mejores',
        pricePerKilogram: 2,
        category: Category.Fresh,
        averageReviewScore: 0,
      },
      {
        id: 2,
        name: 'platanicos',
        pricePerKilogram: 3.1,
        category: Category.Fresh,
        averageReviewScore: 0,
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
