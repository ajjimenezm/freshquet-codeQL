import Jardinera from "../../assets/illustrations/Jardinera_Home.png";
import Regadera from "../../assets/illustrations/Regadera_SabiasQue_Home.png";
import Plantita_Home from "../../assets/illustrations/Plantita_Home.png";
import BotonHomeMinimizar from "../../assets/illustrations/BotonHomeMinimizar.png";
import Caja_ProductosCercaDeTi_Home from "../../assets/illustrations/Caja_ProductosCercaDeTi_Home.png";
import AdvertisementCard from "./AdvertismentCard";
import SellerCard from "./SellerCard";
import { useEffect } from "react";
import AdvertisementManagement from "../../libs/AdvertisementManagement";
import React from "react";
import Advertisement from "../../types/Advertisement";
import { User } from "../../types/User";
import LocationManagement from "../../libs/LocationManagement";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [advertisements, setAdvertisements] = React.useState<Advertisement[]>(
    []
  );
  const [advertisementsToShow, setAdvertisementsToShow] =
    React.useState<JSX.Element[]>();

  const [sellers, setSellers] = React.useState<User[]>([]);
  const [sellersToShow, setSellersToShow] = React.useState<JSX.Element[]>();

  const [minimizeHeader, setMinimizeHeader] = React.useState(false);

  const [address, setAddress] = React.useState("");

  useEffect(() => {
    AdvertisementManagement.GetAllAdvertisements().then((res) => {
      setAdvertisements(res);
    });

    AdvertisementManagement.GetAllSellers().then((res) => {
      setSellers(res);
    });

    navigator.geolocation.getCurrentPosition(async (position) => {
      const userLocs = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      };

      LocationManagement.GetAddressFromCoordinates(
        userLocs.latitude,
        userLocs.longitude
      ).then((res) => {
        setAddress(`${res[0]}, ${res[1]}`);
      });
    });
  }, []);

  React.useEffect(() => {
    setAdvertisementsToShow(
      advertisements.map((ad) => {
        return <AdvertisementCard key={ad._id} advertisement={ad} />;
      })
    );
  }, [advertisements]);

  React.useEffect(() => {
    setSellersToShow(
      sellers.map((seller) => {
        return <SellerCard key={seller._id} seller={seller} />;
      })
    );
  }, [sellers]);

  const handleMinimizeButton = () => {
    setMinimizeHeader(true);
  };

  return (
    <div className="">
      {minimizeHeader ? (
        <div className="m-4 mt-6 flex h-[160px] rounded-xl bg-fresh-fondo-amarillo p-4 pt-8 text-fresh-verde-oscuro">
          <div>
            <p className="text-[14px] font-normal">
              ¡Bienvenido a <strong className="font-outfit">freshquet</strong>!
            </p>
            <p className="text-[26px] font-semibold">
              Sé la semilla del cambio.
            </p>
          </div>
          <img
            className="pointer-events-none mt-3 h-[88px] w-[153pxpx] select-none pr-4"
            src={Plantita_Home}
            alt="Plantita_Home"
          />
        </div>
      ) : (
        <div>
          <div className="h-3/4 max-h-[calc(100vh-300px)] bg-fresh-fondo-amarillo pl-8 pr-16 pt-16 pb-24">
            <div className="select-none pb-4 text-fresh-verde-oscuro ">
              <p className="text-xl font-normal">
                ¡Bienvenido a <strong className="font-outfit">freshquet</strong>
                !
              </p>
              <p className="text-4xl font-semibold">
                Sé la semilla del cambio.
              </p>
            </div>
            <img
              className="pointer-events-none mt-8 ml-7 max-h-[calc(200vh-800px)] select-none"
              src={Jardinera}
              alt="Jardinera"
            />
          </div>

          <div
            className=" h-full rounded-[100px] bg-white"
            onClick={handleMinimizeButton}
          >
            <div className="bg-fresh-fondo-amarillo">
              <div className="flex h-[50px] w-full items-center justify-center rounded-t-[30px] bg-white">
                <img className="" src={BotonHomeMinimizar} alt="Jardinera" />
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-4 pl-4">
        <p className=" font-outfit text-[18px] font-semibold">
          Productos destacados
        </p>
        <div className="flex h-1/4 space-x-8 overflow-x-auto pb-4">
          {advertisementsToShow}
          <div />
        </div>
      </div>

      <div className="m-4 mt-6 flex h-[160px] rounded-xl bg-fresh-verde-azul p-4 pt-8 text-fresh-verde-oscuro">
        <div>
          <p className=" font-outfit text-[20px] font-semibold">
            Sabías que...
          </p>
          <p className=" font-outfit text-[14px] font-medium">
            La agricultura ecológica garantiza alimentos más saludables y
            sabrosos.
          </p>
        </div>
        <img
          className="pointer-events-none mt-3 h-[88px] w-[153pxpx] select-none"
          src={Regadera}
          alt="Regadera"
        />
      </div>

      <div className="space-y-4 pt-4 pl-4">
        <p className=" font-outfit text-[18px] font-semibold">
          Agricultores destacados
        </p>
        <div className="flex h-1/4 space-x-8 overflow-x-auto pb-4">
          {sellersToShow}
          <div />
        </div>
      </div>

      <div className="space-y-4 p-4">
        <p className=" font-outfit text-[18px] font-semibold">
          Productos cerca de ti
        </p>
        <div
          onClick={() => {
            navigate("/nearbyProducts");
          }}
          className="mt-6 h-[225px] rounded-xl bg-cover pt-[190px] pr-8 text-right align-bottom text-[#66496A]"
          style={{
            backgroundImage: `url(${Caja_ProductosCercaDeTi_Home})`,
          }}
        >
          <p className=" font-space-mono text-[14px] font-bold">{address}</p>
        </div>
      </div>

      <div className="h-[100px]"></div>
    </div>
  );
};

export default Home;
