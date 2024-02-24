import { DOMAIN } from "../common/constants.js";

export default class Api {
  async callApi(uri, method, data) {
    const res = await axios({
      url: `${DOMAIN}/${uri}`,
      method,
      data,
    });
    return res.data;
  }
}
