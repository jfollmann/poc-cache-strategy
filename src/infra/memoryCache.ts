import NodeCache from 'node-cache'

import { CacheService } from '../domain/cacheService'

export default class MemoryCache implements CacheService {
  cacheService: NodeCache

  defaultTTL = 3

  constructor () {
    this.cacheService = new NodeCache({ stdTTL: this.defaultTTL })
    console.log('** Using MemoryCache **')
  }

  get<T> (key: string): Promise<T | undefined> {
    return Promise.resolve(this.cacheService.get<T>(key))
  }

  set<T> (key: string, value: T, ttlInSeconds?: number): Promise<boolean> {
    return Promise.resolve(ttlInSeconds
      ? this.cacheService.set<T>(key, value, ttlInSeconds)
      : this.cacheService.set<T>(key, value))
  }

  del (key: string): Promise<boolean> {
    return Promise.resolve(this.cacheService.del(key) > 0)
  }
}
