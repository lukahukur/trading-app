import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator'

let coins = {
  btc: 'btc',
  shib: 'shib',
  eth: 'eth',
  doge: 'doge',
  sol: 'sol',
  xrp: 'xrp',
  ada: 'ada',
  matic: 'matic',
  dot: 'dot',
  bnb: 'bnb',
  uni: 'uni',
  ltc: 'ltc',
}

@ValidatorConstraint({})
export class IsBuyOrSell implements ValidatorConstraintInterface {
  validate(text: string, args: ValidationArguments) {
    return ['BUY', 'SELL'].includes(text)
  }

  defaultMessage(args: ValidationArguments) {
    return 'Unknown Operation'
  }
}

@ValidatorConstraint({})
export class DoesCoinExist implements ValidatorConstraintInterface {
  validate(text: string, args: ValidationArguments) {
    return Boolean(coins[text])
  }

  defaultMessage(args: ValidationArguments) {
    return 'No such coin (YET)'
  }
}
