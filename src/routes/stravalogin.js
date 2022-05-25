const axios = require("axios");
let getAuth = async () => {
  const clientID = "67455";
  const clientSecret = "6664ed63e6bdf33157406afc37fbecfb0739fef5";
  const refreshToken = "bde54941a65fbd9f42e0fef4da68bbf3736a93ba";
  const auth_link = "https://www.strava.com/oauth/token";
  const user_link = "https://www.strava.com/api/v3/athletes/4191787";

  const stravaAuthResponse = await axios.all([
    axios
      .post(
        `${auth_link}?client_id=${clientID}&client_secret=${clientSecret}&refresh_token=${refreshToken}&grant_type=refresh_token`
      )
      .catch(function (error) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      }),
  ]);
  const stravaActivityResponse = await axios
    .get(`${user_link}?access_token=${stravaAuthResponse[0].data.access_token}`)
    .catch(function (error) {
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    });

  return stravaActivityResponse;
};

module.exports = async (req, res) => {
  let responseAuth = await getAuth();
  if (responseAuth.data) res.send(responseAuth.data);
};
