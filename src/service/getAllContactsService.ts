import { CacheService } from '../domain/cacheService'
import { Contact, GetAllContacts } from '../domain/contact'

export default class GetAllContactsService implements GetAllContacts {
  constructor (private readonly cacheService: CacheService) { }

  private readonly cacheKey = 'ContactsKey'

  private getDataFromDB (_input: GetAllContacts.Input): GetAllContacts.Output {
    console.log('Running Fake Query in DB')
    const dataDB = [
      { name: 'Jefferson', lastName: 'Follmann', age: 30 },
      { name: 'Andressa', lastName: 'Duarte', age: 20 },
      { name: 'Antônio', lastName: 'Follmann', age: 10 }
    ]
    this.cacheService.set<Contact[]>(this.cacheKey, dataDB, 2)
    return { now: new Date(), isCached: false, contacts: dataDB }
  }

  async handle (input: GetAllContacts.Input): Promise<GetAllContacts.Output> {
    const cachedData = await this.cacheService.get<Contact[]>(this.cacheKey)
    if (cachedData) return { now: new Date(), isCached: true, contacts: cachedData }
    return this.getDataFromDB(input)
  }
}
