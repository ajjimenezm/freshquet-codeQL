import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdvertisementManagement from '../../libs/AdvertisementManagement';
import Advertisement from '../../types/Advertisement';
import AdvertisementCardStandard from '../shared/AdvertismentCardStandard';

interface SellerProductProps {
  seller_id: string;
}

const SellerProducts = (props: SellerProductProps) => {
  const [advertisements, setAdvertisements] = useState<Advertisement[]>([]);
  const [advertisementsToShow, setAdvertisementsToShow] =
    useState<JSX.Element[]>();

  useEffect(() => {
    AdvertisementManagement.GetAllAdvertisementsFromSeller(
      props.seller_id
    ).then((res) => {
      setAdvertisements(res);
    });
  }, []);

  useEffect(() => {
    setAdvertisementsToShow(
      advertisements.map((ad) => {
        return (
          <div key={ad._id} className="m-2 w-[275px]">
            <AdvertisementCardStandard advertisement={ad} />
          </div>
        );
      })
    );
  }, [advertisements]);

  return (
    <div className="flex flex-wrap justify-center">
      {advertisementsToShow && advertisementsToShow.length > 0 ? (
        advertisementsToShow
      ) : (
        <div className="mt-1 text-center">
          <div className="font-space-mono text-[14px] font-semibold">
            No products found
          </div>
        </div>
      )}
    </div>
  );
};

export default SellerProducts;
