// Primary wallet → delegate wallets that hold related assets ($VIBESTR, etc).
// When scoring a primary, sum balances across the primary + all its delegates.
// All keys/values stored lowercase for case-insensitive lookup.

export const DELEGATE_MAP: Record<string, string[]> = {
  // brydisanto.eth
  '0xf7daddb9553d6c0ad80c66c7cfff281b1d5f35ad': [
    '0xaf8bfe31b257839731da01aad316b287a0fd62dd',
  ],
};

export function getDelegates(address: string): string[] {
  return DELEGATE_MAP[address.toLowerCase()] ?? [];
}
