const axios = require("axios"); // function to get the data from the API


let getAuth = async () => {
  const clientID = "67455";
  const clientSecret = "6664ed63e6bdf33157406afc37fbecfb0739fef5";
  const refreshToken = "bde54941a65fbd9f42e0fef4da68bbf3736a93ba"
  const auth_link = "https://www.strava.com/oauth/token"
  //const activities_link = "https://www.strava.com/api/v3/athlete/activities"
  const activities_link ="https://www.strava.com/api/v3/athletes/4191787"

        const stravaAuthResponse = await axios.all([
          axios.post(`${auth_link}?client_id=${clientID}&client_secret=${clientSecret}&refresh_token=${refreshToken}&grant_type=refresh_token`)
        ]);
        
        const stravaActivityResponse = await axios.get(`${activities_link}?access_token=${stravaAuthResponse[0].data.access_token}`);
        console.log(stravaActivityResponse.data);
        return stravaActivityResponse
      }
     
module.exports = async (req, res) => {
  console.log("auth2")
  let responseAuth = await getAuth();
  console.log(responseAuth)
  res.send(responseAuth.data);
};
