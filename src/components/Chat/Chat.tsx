import React from "react";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import IconButton from "@mui/material/IconButton";
import Photo from "./logo192.png";
import Messages from "./Messages";
import Input from "./Input";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../chatContext/UserContext";
import { Avatar } from "@mui/material";
import UserHelper from "../../libs/UserHelper";
import { User } from "../../types/User";
import { ReactComponent as BackArrow } from "../../assets/icons/Flecha.svg";
import BolsaBuscador from "../../assets/illustrations/Bolsa_Buscador.png";

function stringAvatar(name: string) {
  return {
    sx: {
      "border-width": 1,
      "border-color": "#976D9C",
      bgcolor: "#976D9C",
      width: 30,
      height: 30,
      fontSize: 14,
      fontWeight: "bold",
    },
    children: `${name.split(" ")[0][0]}`,
  };
}

function Chat() {
  const navigate = useNavigate();
  const { data } = React.useContext(UserContext);

  const [user, setUser] = React.useState<User>();
  const [imageProfile, setImageProfile] = React.useState<string>("");

  React.useEffect(() => {
    UserHelper.getUserByUsername(data.user.displayName).then((res) => {
      setUser(res);
    });
  }, []);

  React.useEffect(() => {
    if (user) {
      UserHelper.retrieveProfilePicture(user?.profile_picture).then((res) => {
        setImageProfile(res);
      });
    }
  }, [user]);

  function getAvatar(avatar: string | undefined, dataUser: User) {
    return avatar ? (
      <Avatar
        src={avatar}
        sx={{
          width: 30,
          height: 30,
          "border-width": 2,
          "border-color": "#976D9C",
        }}
        alt={dataUser.username}
      />
    ) : (
      <Avatar {...stringAvatar(dataUser.name)} />
    );
  }

  return (
    <div className="chat absolute z-50 h-screen w-screen bg-white">
      <div className="fixed top-0 left-0 right-0 mx-4 h-20 flex-row items-center justify-center border-b-2 bg-white pt-8 pb-4">
        <div className="flex items-center  justify-start space-x-4 px-4">
          <BackArrow
            onClick={() => {
              navigate("/chatmenu");
            }}
          />
          <div>{user ? getAvatar(imageProfile, user) : <div />}</div>
          <div className="text-[14px] font-bold">{user?.name}</div>
        </div>
      </div>
      <div className="m-20" />
      <div className="fixed -z-40 mx-8 mt-24 opacity-30">
        <img
          className="pointer-events-none mt-8 ml-7 max-h-[calc(100vh-400px)] select-none"
          src={BolsaBuscador}
          alt="Bolsa Buscador"
        />
      </div>
      <Messages />
      <Input />
    </div>
  );
}

export default Chat;
