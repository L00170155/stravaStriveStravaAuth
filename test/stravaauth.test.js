const axios = require('axios');
const stravaAuthResponse= require('../src/routes/stravaauth');

jest.mock('axios');


// test('should fetch users', () => {
//     const users = [{name: 'Bob'}];
//     const resp = {data: users};
//     axios.get.mockResolvedValue(resp);

describe("fetchUsers", () => {
    describe("when API call is successful", () => {
      it("should return users list", async () => {
        // given
        const users = [
          { id: 1, name: "John" },
          { id: 2, name: "Andrew" },
        ];
        axios.get.mockResolvedValueOnce(users);
  
        // when
        const result = await stravaAuthResponse();
  
        // then
        // expect(axios.get).toHaveBeenCalledWith(`${BASE_URL}/users`);
        expect(result).toEqual(users);
      });
    });
  });

