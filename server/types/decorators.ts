import { HttpCode } from '@nestjs/common'

export const OKpost = () => HttpCode(201)
export const OK = () => HttpCode(200)
export const Redirect = () => HttpCode(302)
