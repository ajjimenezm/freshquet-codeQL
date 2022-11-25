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

  const getuserTypeRequest = axios.get(
    `${process.env.REACT_APP_BACKEND_DEFAULT_ROUTE}users/type`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('userToken')}`,
      },
    }
  );

  await axios.all([getUserRequest, getuserTypeRequest]).then(
    axios.spread((...responses) => {
      const responseOne = responses[0];
      const responseTwo = responses[1];
      returnUser = responseOne.data;
      returnUser.userType = responseTwo.data;
    })
  );

  return returnUser;
}

export default { uploadProfilePicture, retrieveProfilePicture, getOwnProfile };
