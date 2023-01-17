import {
  ConflictException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common'
import { BodySignUp, QueryUUIDDto, userDto } from '../dto/user.dto'
import { PrismaService } from '../prisma/prisma.service'
import { compare, hash } from 'bcrypt'
import { JwtService } from '@nestjs/jwt/dist'
import { ConfigService } from '@nestjs/config'
import { randomUUID } from 'crypto'
import {
  AccessTokenStrategy,
  RefreshTokenStrategy,
  SignToken,
} from '../strategy'

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async signup(dto: userDto) {
    let __user = await this.prisma.user_table.findUnique({
      where: {
        email: dto.email,
      },
      select: {
        email: true,
      },
    })

    if (__user) {
      throw new ConflictException('user already exists')
    }

    let hashedPass = await hash(dto.password, 5)

    delete dto.password

    let activationURL = randomUUID()

    // here you send email

    let newUser = await this.prisma.user_table.create({
      data: {
        email: dto.email,
        password: hashedPass,
        username: dto.username,
        verified: false,
        activation_link: activationURL,
      },
      select: {
        email: true,
        id: true,
      },
    })

    if (!newUser) {
      throw new InternalServerErrorException(
        'can not create new User',
      )
    }

    let wallet = await this.prisma.wallet.create({
      data: {
        user_id: newUser.id,
      },
    })

    if (!wallet) {
      throw new InternalServerErrorException('can not create wallet')
    }

    return {
      statusCode: 201,
      message: 'user created',
    }
  }

  async signin(dto: BodySignUp) {
    let user = await this.prisma.user_table.findUnique({
      where: {
        email: dto.email,
      },
      select: {
        password: true,
        username: true,
        email: true,
        id: true,
      },
    })

    if (!user) {
      throw new ForbiddenException('Incorrect credentials')
    }

    let isCorrect = await compare(dto.password, user.password)

    if (!isCorrect) {
      throw new ForbiddenException('Incorrect credentials')
    }

    delete user.password, dto.password

    const jwtPayloadObject = {
      username: user.username,
      email: user.email,
      id: user.id,
    }

    let AccessToken = new SignToken(
      new AccessTokenStrategy(this.config, this.jwt),
    ).getToken(jwtPayloadObject)

    let RefreshToken = new SignToken(
      new RefreshTokenStrategy(this.config, this.jwt),
    ).getToken(jwtPayloadObject)

    return {
      access: AccessToken,
      refresh: RefreshToken,
    }
  }

  async changePassword(email: string, newPassword: string) {
    let user = await this.prisma.user_table.findUnique({
      where: {
        email: email,
      },
      select: {
        email: true,
      },
    })

    if (!user) {
      throw new UnauthorizedException('no such user')
    }

    try {
      let newPass = await hash(newPassword, 5)

      await this.prisma.user_table.update({
        where: {
          email: email,
        },
        data: {
          password: newPass,
        },
        select: {
          email: true,
        },
      })

      return {
        statusCode: 201,
        message: 'password is changed successfuly',
      }
    } catch (err) {
      throw new InternalServerErrorException(
        'cannot change the password',
      )
    }
  }

  async verification(uuid: string) {
    let response = await this.prisma.user_table.findFirst({
      where: {
        AND: {
          activation_link: uuid,
          verified: false,
        },
      },
      select: {
        activation_link: true,
        verified: true,
      },
    })

    if (!response) {
      throw new NotFoundException()
    }

    try {
      await this.prisma.user_table.update({
        data: {
          verified: true,
        },
        where: {
          activation_link: response.activation_link,
        },
        select: {
          email: true,
          verified: true,
        },
      })

      return 'updated'
    } catch (err) {
      throw new InternalServerErrorException(
        'can not verify at the moment',
      )
    }
  }

  auth() {
    return { statusCode: 201, message: 'user authorized' }
  }
}
