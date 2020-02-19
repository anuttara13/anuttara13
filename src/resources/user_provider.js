import HttpRequest from './http_request'

class UserProvider extends HttpRequest {
  constructor () {
    // api api
    super('https://api.myjson.com/bins/17k39m')
  }

  async getUser () {
    const {data} = await this.get('https://api.myjson.com/bins/12x0bc')
    return data
  }
  async getUser2 () {
    const {data} = await this.get('https://api.myjson.com/bins/17k39m')
    return data
  }
}

export default UserProvider