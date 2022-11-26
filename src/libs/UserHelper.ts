import axios from 'axios';
import { User } from '../types/User';

const uploadProfilePicture = (file: any) => {
  axios.post(
    `${process.env.REACT_APP_BACKEND_DEFAULT_ROUTE}users/upload`,
    file,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('userToken')}`,
        'Content-Type': 'multipart/form-data',
      },
    }
  );
};

const retrieveProfilePicture = async (imgname: string): Promise<string> => {
  // eslint-disable-next-line @typescript-eslint/no-inferrable-types
  let img: string = '';

  if (!imgname || imgname === '') return '';

  await axios
    .get(
      `${process.env.REACT_APP_BACKEND_DEFAULT_ROUTE}users/profile-picture/${imgname}`,
      {
        responseType: 'arraybuffer',
      }
    )
    .then((res) => {
      img = `data:;base64,${Buffer.from(res.data, 'binary').toString(
        'base64'
      )}`;
    })
    .catch((err) => {
      console.log(err);
      img = '';
    });

  return img;
};

async function getOwnProfile(): Promise<User> {
  let returnUser: User = {
    _id: '',
    name: 'empty',
    username: '',
    password: '',
    phoneNumber: '',
    email: '',
    profilePicture: '',
    address: '',
    biography: '',
    latitude: 0,
    longitude: 0,
    userType: '',
  };

  const getUserRequest = axios.get(
    `${process.env.REACT_APP_BACKEND_DEFAULT_ROUTE}users/profile`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('userToken')}`,
      },
    }
  );

  await axios.all([getUserRequest]).then(
    axios.spread((res1) => {
      console.log(res1.data[0]);
      returnUser = res1.data[0];
    })
  );

  return returnUser;
}

export default { uploadProfilePicture, retrieveProfilePicture, getOwnProfile };
