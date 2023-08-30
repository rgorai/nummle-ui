export const parseOrderData = (
  order: ApiOrder | ApiOrderPublic
): Order | OrderPublic => ({
  ...order,
  items: order.items.reduce(
    (p, c) => ({ ...p, [c.itemId]: c }),
    {} as Order['items']
  ),
})
