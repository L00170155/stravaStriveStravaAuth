const axios = require("axios"); // function to get the data from the API

let getAuth = async () => {
  const clientID = "67455";
  const clientSecret = "6664ed63e6bdf33157406afc37fbecfb0739fef5";
  const refreshToken = "bde54941a65fbd9f42e0fef4da68bbf3736a93ba"
  const createToken = "https://www.strava.com/oauth/authorize?client_id="
  const httpLink = "http://localhost/exchange_token&approval_prompt=force&scope=activity:read_all"
  const auth_link = "https://www.strava.com/oauth/token"
  const activities_link = "https://www.strava.com/api/v3/athlete/activities"
  const access_token = "58c12bdbc30e50f12bc2aa1ff9d82f1c43f361fa"
  //const activities_link ="https://www.strava.com/api/v3/athletes/4191787"
        
    
        //https://www.strava.com/oauth/authorize?client_id=67455&response_type=code&redirect_uri=http://localhost/exchange_token&approval_prompt=force&scope=activity:read_all
        console.log(createToken + clientID + "&response_type=code&redirect_uri=" + httpLink)
        const stravaTokenResponse = await axios.all([
          axios.post(`https://www.strava.com/oauth/authorize?client_id=67455&response_type=code&redirect_uri=http://localhost/exchange_token&approval_prompt=force&scope=activity:read_all`)
          //axios.post(`${createToken}${clientID}&response_type=code&redirect_uri=${httpLink}`)
        ]);
        console.log(stravaTokenResponse)
        const stravaAuthResponse = await axios.all([
          axios.post(`${auth_link}?client_id=${clientID}&client_secret=${clientSecret}&refresh_token=${refreshToken}&grant_type=refresh_token`)
        ]);
        console.log(stravaAuthResponse[0].data.access_token)
        const stravaActivityResponse = await axios.get(`${activities_link}?access_token=${stravaAuthResponse[0].data.access_token}`)
        .catch(function (error) {
          // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        });

        //const stravaActivityResponse = await axios.get(`${activities_link}?access_token=${access_token}`);
        //console.log(stravaActivityResponse.data);
        return stravaActivityResponse
      }
     
module.exports = async (req, res) => {
  let responseAuth = await getAuth();
  console.log(responseAuth.data)
  res.send(responseAuth.data);
};
