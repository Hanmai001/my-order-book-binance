export enum Decimals {
  ZERO = '0',
  ONE = '1',
  TWO = '2'
}

export enum Depth {
  FIFTHTEEN = '15',
  THIRTY = '30',
  FIFTHTY = '50',
  HUNDRED = '100',
}

export interface Order {
  price: string;
  quantity: string;
}

export interface OderBookQuery {
  symbol?: string;
  limit?: number
}