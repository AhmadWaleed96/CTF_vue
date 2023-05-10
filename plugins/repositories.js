import createRepository from '~/common/api/repository.js'

export default (ctx, inject) => {
  inject('repositories', createRepository(ctx.$axios))
}