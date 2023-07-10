import { ObjectId } from 'mongodb'

declare global {
  type AllOptional<T> = {
    [Property in keyof T]?: T[Property]
  }

  // TODO: fix collection type
  type CollectionType<T, Ids extends keyof T | undefined = undefined> = any
  // Omit<
  //   Ids extends keyof T
  //     ?
  //         | T
  //         | {
  //             [key in Ids]: ObjectId
  //           }
  //     : T,
  //   '_id'
  // >
}
