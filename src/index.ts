import { GetAllContacts } from './domain/contact'
import MemoryCache from './infra/memoryCache'
import GetAllContactService from './service/getAllContactsService'
import RedisCache from './infra/redisCache'

const makeInMemoryCacheService = (): MemoryCache => new MemoryCache()
const makeRedisCacheService = (): RedisCache => new RedisCache('redis://localhost')

const makeGetAllContactService = (): GetAllContacts => {
  const cacheService = process.env.CACHE_MODE === 'REDIS'
    ? makeRedisCacheService()
    : makeInMemoryCacheService()

  return new GetAllContactService(cacheService)
}

const run = () => {
  const service = makeGetAllContactService()
  const executionLoop = (timeInterval: number, maxExecutionCount: number) => {
    let executionCount = 0
    const interval = setInterval(async () => {
      executionCount += 1
      if (executionCount >= maxExecutionCount) {
        clearInterval(interval)
      }
      const response = await service.handle({})
      console.log(response)
    }, timeInterval)
  }
  const oneSecond = 1 * 1000
  executionLoop(oneSecond, 8)
}

run()
