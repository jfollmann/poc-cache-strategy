export interface CacheService {
  get<T = any>(key: string): Promise<T | undefined>,
  set<T = any>(key: string, value: T, ttlInSeconds?: number): Promise<boolean>,
  del(key: string): Promise<boolean>
}
