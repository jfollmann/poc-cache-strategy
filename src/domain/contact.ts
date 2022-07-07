export type Contact = {
  name: string,
  lastName: string,
  age: number
}

export namespace GetAllContacts {
  export type Input = {}
  export type Output = {
    now: Date,
    isCached: boolean,
    contacts: Contact[]
  }
}

export interface GetAllContacts {
  handle(input: GetAllContacts.Input): Promise<GetAllContacts.Output>
}
