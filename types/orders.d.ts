type Item = {
  name: string
  price: number
  quantity: number
  reaction: ReactionOption | null
}

type AddItem = Omit<Item, 'reaction'>

type Order = {
  _id: string
  userId: string
  restaurant: {
    id: string
    name: string
    ogImage: OgImage
  }
  createdAt: string
  updatedAt: string
  items: Record<string, Item>
  cost: {
    subtotal: number
    tax: number
    serviceFee: number
    tip?: number
    total: number
  }
  status: 'Placed' | 'Confirmed' | 'In Progress' | 'Complete' | 'Cancelled'
}

type OrderPublic = Omit<Order, 'cost' | 'status'>

type CreateOrder = Omit<Order, '_id' | 'updatedAt' | 'status' | 'items'> & {
  items: Record<string, AddItem>
}

type ReactionOption = {
  rank: number
  present: string
  past: string
}
