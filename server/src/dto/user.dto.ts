import {
  IsNotEmpty,
  Length,
  IsString,
  IsEmail,
  IsNumber,
  IsInstance,
  Equals,
  Validate,
  Max,
  Min,
  isNumber,
} from 'class-validator'
import { coin } from 'types/types'
import {
  DoesCoinExist,
  IsBuyOrSell,
} from './customValidationPipe/validation.pipe'

export class userDto {
  @IsNotEmpty()
  @IsEmail()
  email: string

  @Length(1, 30)
  @IsString()
  password: string

  @IsNotEmpty()
  @Length(4, 30)
  @IsString()
  username: string
}

export class BodySignUp {
  @IsNotEmpty()
  @IsEmail()
  email: string

  @Length(8, 30)
  @IsString()
  password: string
}
export class QueryUUIDDto {
  @IsNotEmpty()
  uuid: string
}
export class BodyAccessDto {
  @IsNotEmpty()
  access: string
}

export class TradesResponseDTO {
  e: string
  E: number
  s: string
  t: number
  p: string
  q: string
  b: number
  a: number
  T: number
  m: boolean
  M: boolean
}

export class TransactionObject {
  @IsNotEmpty()
  @Validate(IsBuyOrSell)
  side: 'BUY' | 'SELL'

  @IsNotEmpty()
  @IsNumber({ allowInfinity: false })
  @Max(100000000000)
  @Min(0.0000000001)
  amount: number

  @IsNotEmpty()
  @IsString()
  @Validate(DoesCoinExist)
  coin: coin

  @IsNotEmpty()
  @IsNumber({ allowNaN: false }, {})
  price: number
}

export class CurrenciesDTO {
  btcusdt: TradesResponseDTO
  shibusdt: TradesResponseDTO
  ethusdt: TradesResponseDTO
  dogeusdt: TradesResponseDTO
  solusdt: TradesResponseDTO
  xrpusdt: TradesResponseDTO
  adausdt: TradesResponseDTO
  maticusdt: TradesResponseDTO
  dotusdt: TradesResponseDTO
  bnbusdt: TradesResponseDTO
  uniusdt: TradesResponseDTO
  ltcusdt: TradesResponseDTO
}

export class KlineResponseAdapter {
  open: number
  high: number
  low: number
  close: number
  closeTime: number
  openTime: number
  constructor(protected _message: any[]) {
    let message = _message[0]
    let N = (e: string) => Number(e)

    this.openTime = message[0]
    this.closeTime = message[6]
    this.open = N(message[1])
    this.low = N(message[3])
    this.high = N(message[2])
    this.close = N(message[4])
  }
}

export class MoneyDTO {
  @IsNotEmpty()
  @IsNumber({ allowNaN: false }, {})
  price: number
}
