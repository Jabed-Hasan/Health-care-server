import jwt, { Secret } from "jsonwebtoken";
import prisma from "../../../shared/prisma";
import bcrypt from 'bcrypt';
import { JwtHelper } from "../../../helper/jwtHelper";
import { UserStatus } from "../../../generated/prisma/enums";
import config from "../../../config";





const loginUser = async(payload:{
    email: string;
    password: string;
}) => {
    const userData = await prisma.user.findUniqueOrThrow({
        where: {
            email: payload.email,
            status: UserStatus.ACTIVE,
        },
    });

    const isCorrectPassword: boolean = await bcrypt.compare(payload.password, userData.password);
    if(!isCorrectPassword){
        throw new Error('Incorrect password');
    }
    const  accessToken =  JwtHelper.genererateToken({
        email: userData.email,
        role: userData.role,
    },
    config.jwt.jwt_secret as Secret,
    config.jwt.expires_in as string
    
    );
const refreshToken = JwtHelper.genererateToken({
    email: userData.email,
    role: userData.role,    
},
config.jwt.refresh_token_secret as Secret,
config.jwt.refresh_token_expires_in as string
)
return { accessToken, refreshToken, needPasswordChange: userData.needsPasswordReset };
};



const refreshToken = async(token: string) => {
      let decodedToken;
      try {
        decodedToken = JwtHelper.verifyToken(token, 'abcdefgh');
      } catch (err) {
        throw new Error('Invalid refresh token');
      }

      const isUserExist = await prisma.user.findUniqueOrThrow({
        where: {
            email: decodedToken.email,
            status: UserStatus.ACTIVE,
        },
      });
        const newAccessToken = JwtHelper.genererateToken({
            email: isUserExist.email,
            role: isUserExist.role,
        },
        config.jwt.jwt_secret as Secret,
        config.jwt.expires_in as string
        );

        return {
            accessToken: newAccessToken,
            needPasswordChange: isUserExist.needsPasswordReset,
        };
};


export const AuthService = {
    loginUser,
    refreshToken,
};