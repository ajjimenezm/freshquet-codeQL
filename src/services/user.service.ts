import axios from 'axios';

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

const retrieveProfilePicture = (imgname: string) => {
  if (imgname.length) {
    axios
      .get(
        `${process.env.REACT_APP_BACKEND_DEFAULT_ROUTE}users/profile-picture/${imgname}`
      )
      .then((res) => {
        console.log(res);
      });
  } else {
    console.log('no image');
  }
};

export default { uploadProfilePicture, retrieveProfilePicture };
