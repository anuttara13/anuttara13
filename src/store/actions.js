// https://vuex.vuejs.org/en/actions.html
import UserProvider from '@/resources/user_provider'
const userService = new UserProvider()

export default {
  async getUser ({commit}) {
      const data = await userService.getUser()
      commit('SET_USER', data)
  },
  async getUser2 ({commit}) {
    const data = await userService.getUser2()
    commit('SET_USER2', data)
}
}
