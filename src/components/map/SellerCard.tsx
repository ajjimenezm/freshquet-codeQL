import { Avatar, Button } from "@mui/material";
import Tomates from "../../assets/illustrations/Tomates.jpg";
import AvatarPhoto from "../../assets/illustrations/Avatar.jpg";
import { User } from "../../types/User";
import { useEffect, useState } from "react";
import UserHelper from "../../libs/UserHelper";
import { Skeleton } from "@mui/material";
import AdvertisementManagement from "../../libs/AdvertisementManagement";
import { useNavigate } from "react-router-dom";

interface SellerCardProps {
  seller: User;
  openOnMaps: () => void;
}

function stringAvatar(name: string) {
  return {
    sx: {
      "border-width": 1,
      "border-color": "#976D9C",
      bgcolor: "#976D9C",
      width: 48,
      height: 48,
      fontSize: 20,
      fontWeight: "bold",
    },
    children: `${name.split(" ")[0][0]}`,
  };
}

const SellerCard = (props: SellerCardProps) => {
  const navigate = useNavigate();
  const [imageProfile, setImageProfile] = useState<string>("");
  const [imageLeft, setImageLeft] = useState<string>("");
  const [imageRight, setImageRight] = useState<string>("");

  const navigateFunction = (id: string) => {
    navigate(`/seller/${id}`);
  };

  useEffect(() => {
    UserHelper.retrieveProfilePicture(props.seller.profile_picture).then(
      (res) => {
        setImageProfile(res);
      }
    );

    AdvertisementManagement.GetAllAdvertisementsFromSeller(
      props.seller._id
    ).then((res) => {
      AdvertisementManagement.GetImageAdvertisment(res[0]._id).then((res) => {
        setImageLeft(res);
      });
      AdvertisementManagement.GetImageAdvertisment(res[1]._id).then((res) => {
        setImageRight(res);
      });
    });
  }, []);

  function getAvatar(avatar: string | undefined, dataUser: User) {
    return avatar ? (
      <Avatar
        src={avatar}
        sx={{
          width: 48,
          height: 48,
          "border-width": 1,
          "border-color": "#976D9C",
        }}
        alt={dataUser.username}
      />
    ) : (
      <Avatar {...stringAvatar(dataUser.name)} />
    );
  }

  return (
    <div className="text-semibold w-[160px] flex-shrink-0 overflow-hidden rounded-xl  border-[1px] border-fresh-morado bg-white text-fresh-morado">
      <div className="flex flex-col items-center justify-center space-y-2 border-b-[1px] border-fresh-morado pt-4 pb-4 text-center">
        <div onClick={navigateFunction.bind(null, props.seller._id)}>
          {getAvatar(imageProfile, props.seller)}
        </div>

        <p className=" text-[12px] font-medium">{props.seller.name}</p>
        <div
          className=" rounded bg-fresh-morado p-1 text-[10px] text-white"
          onClick={props.openOnMaps}
        >
          Cómo llegar
        </div>
      </div>

      <div className="flex h-[80px]">
        {imageLeft ? (
          <img src={imageLeft} alt={"test"} className="w-1/2 object-cover" />
        ) : (
          <Skeleton
            variant="rectangular"
            animation={false}
            sx={{ width: 112, height: 112, bgcolor: "#976D9C" }}
          />
        )}
        {imageRight ? (
          <img src={imageRight} alt={"test"} className="w-1/2 object-cover" />
        ) : (
          <Skeleton
            variant="rectangular"
            animation={false}
            sx={{ width: 112, height: 112, bgcolor: "#976D9C" }}
          />
        )}
      </div>
    </div>
  );
};

export default SellerCard;
