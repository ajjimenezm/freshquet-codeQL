import { Avatar, Skeleton, Rating } from '@mui/material';
import { useEffect, useState } from 'react';
import UserHelper from '../../libs/UserHelper';

interface ReviewCardProps {
  buyerId: string;
  buyerUserName: string;
  buyerName: string;
  buyerProfilePicture?: string;
  score: number;
  comment: string;
}

const ReviewCard = (props: ReviewCardProps) => {
  const [avatar, setAvatar] = useState<string>();

  useEffect(() => {
    if (props.buyerProfilePicture) {
      UserHelper.retrieveProfilePicture(props.buyerProfilePicture).then(
        (res) => {
          setAvatar(res);
        }
      );
    }
  }, []);

  useEffect(() => {
    if (!props.buyerProfilePicture) {
      UserHelper.getUserById(props.buyerId).then((res) => {
        if (res.profile_picture) {
          UserHelper.retrieveProfilePicture(res.profile_picture).then((res) => {
            setAvatar(res);
          });
        }
      });
    }
  }, []);

  return (
    <div className="w-full border-b-[1px] border-solid border-b-slate-300 pb-1">
      <div className="relative z-[2] float-right mt-2 mr-5">
        {createAvatar(
          avatar ? avatar : '',
          props.buyerUserName,
          props.buyerName
        )}
      </div>
      <div>
        <div className="flex flex-col">
          <div className="font-outfit text-[16px] font-medium">
            {props.buyerName}
          </div>
          <div className="mt-4 font-outfit text-[14px] font-medium">
            {transformScore(props.score)} - {props.score}
          </div>
          <div className="ml-[-2px]">
            <Rating value={props.score} precision={0.5} readOnly size="small" />
          </div>
          <div className="mt-1 font-outfit text-[14px] font-normal text-[#767676]">
            {props.comment}
          </div>
        </div>
      </div>
    </div>
  );
};

const createAvatar = (avatar: string, username: string, name: string) => {
  if (username && name) {
    return avatar ? (
      <Avatar
        src={avatar}
        alt={username}
        sx={{
          border: 'solid',
          borderColor: '#4C987B',
          width: 40,
          height: 40,
          borderRadius: '50%',
        }}
      />
    ) : (
      <Avatar {...UserHelper.StringAvatar(name, 40, 40, 20)} />
    );
  } else {
    return (
      <Skeleton variant="circular" width={40} height={40} animation={'wave'} />
    );
  }
};

const transformScore = (score: number): string => {
  let scoreString = '';
  if (score >= 0 && score < 1) {
    scoreString = 'Muy mal';
  } else if (score >= 1 && score < 2) {
    scoreString = 'Mal';
  } else if (score >= 2 && score < 3) {
    scoreString = 'Regular';
  } else if (score >= 3 && score < 4) {
    scoreString = 'Bueno';
  } else if (score >= 4 && score < 4.5) {
    scoreString = 'Muy bueno';
  } else if (score >= 4.5 && score <= 5) {
    scoreString = 'Excelente';
  } else {
    scoreString = 'Sin calificación';
  }
  return scoreString;
};

export default ReviewCard;
