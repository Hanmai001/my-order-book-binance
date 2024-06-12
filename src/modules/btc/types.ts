export enum Decimals {
  ZERO = '0',
  ONE = '1',
  TWO = '2'
}

export enum Depth {
  FIVE = '5',
  TEN = '10',
  TWENTY = '20',
}

export interface BtcQuery {
  symbol?: string;
  limit?: number
}