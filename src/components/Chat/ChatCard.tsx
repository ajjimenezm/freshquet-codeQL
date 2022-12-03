import React from "react";
import Photo from "./jorgemoreno.png";
import { useNavigate } from "react-router-dom";
import { User } from "../../types/User";
import UserHelper from "../../libs/UserHelper";
import { Avatar } from "@mui/material";
import { Timestamp } from "firebase/firestore";

interface ChatCardProps {
  lastMessage: string;
  date: Timestamp;
  userInfo: {
    uid: string;
    displayName: string;
  };
  handleClick: (userInfo: { uid: string; displayName: string }) => void;
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

const ChatCard = (props: ChatCardProps) => {
  const [user, setUser] = React.useState<User>();
  const [imageProfile, setImageProfile] = React.useState<string>("");
  const date = props.date.toDate();

  React.useEffect(() => {
    UserHelper.getUserByUsername(props.userInfo.displayName).then((res) => {
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
          width: 48,
          height: 48,
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
    <div
      className="flex w-full flex-row items-center px-4 align-middle hover:bg-slate-100"
      onClick={() => props.handleClick(props.userInfo)}
    >
      {user ? getAvatar(imageProfile, user) : <div />}
      <div className="m-4 flex w-full flex-col items-start justify-evenly">
        <div className=" grid w-full grid-cols-2 gap-5">
          <div className="text-[16px] font-bold text-fresh-morado">
            {props.userInfo.displayName}
          </div>
          <div className="text-right text-[10px]">
            {date.toLocaleString("en-GB", {
              hour: "2-digit",
              minute: "2-digit",
              year: "2-digit",
              month: "2-digit",
              day: "2-digit",
            })}
          </div>
        </div>

        <div className="text-sm">{props.lastMessage}</div>
      </div>
    </div>
  );
};

export default ChatCard;
