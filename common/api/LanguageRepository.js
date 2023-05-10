import { LANGUAGE } from '../constants'

export default ($axios) => ({
  async getLanguages() {
    return await $axios.get(LANGUAGE.GET_LANGUAGES);
  }
})

