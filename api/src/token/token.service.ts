import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Token, TokenCreationAttrs } from './token.model';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class TokenService {
    constructor(
        @InjectModel(Token) private tokenRepository: typeof Token
    ) {
    }

    generateTokens(payload) {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, { expiresIn: '30m' })
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: '30d' })
        return { accessToken, refreshToken }
    }

    async saveToken(userId: number, refreshToken: string) {
        const tokenData = await this.tokenRepository.findOne({ where: { "userId": userId } })
        if (tokenData) {
            tokenData.refreshToken = refreshToken;
            return tokenData.save();
        }
        const token = this.tokenRepository.create(<TokenCreationAttrs>{
            "userId": userId,
            "refreshToken": refreshToken
        })
        return token;
    }
}
