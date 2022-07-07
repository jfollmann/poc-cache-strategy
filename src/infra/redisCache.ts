import Redis from 'ioredis'

import { CacheService } from '../domain/cacheService'

export default class RedisCache implements CacheService {
  cacheService: Redis

  defaultTTL = 3

  constructor (url: string) {
    this.cacheService = new Redis(url)
    console.log('** Using RedisCache **')
  }

  async get<T> (key: string): Promise<T | undefined> {
    const data = await this.cacheService.get(key)
    if (data) return JSON.parse(data)
  }

  async set<T> (key: string, value: T, ttlInSeconds?: number | undefined): Promise<boolean> {
    const response = await this.cacheService.set(key, JSON.stringify(value), 'EX', ttlInSeconds || this.defaultTTL)
    return response === 'OK'
  }

  async del (key: string): Promise<boolean> {
    return await this.cacheService.del(key) > 0
  }
}
