import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { AuthService } from 'src/auth/auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { SigninDto } from './dto/signin.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('User')
    private readonly userModel: Model<User>,
    private readonly autService: AuthService,
  ) {}

  public async signup(signupDto: CreateUserDto) {
    return this.create(signupDto);
  }

  public async signin(signinDto: SigninDto): Promise<{
    statusCode: number;
    message: [];
    error: string;
    data: {
      _id: string;
      apelido: string;
      jwtToken: string;
      reset_password: boolean;
    };
  }> {
    let jwtToken = '';
    let match = 'OK';
    let reset_password = false;
    const user = await this.userModel.findOne({ _id: signinDto._id });
    if (user) {
      if (user.password === user._id) {
        reset_password = true;
      } else {
        match = await this.checkPassword(signinDto.password, user.password);
        if (match !== 'OK') {
          throw new NotFoundException(['Invalid credentials.']);
        }
      }
      await this.autService
        .createAcessToken(user._id)
        .then((response) => {
          jwtToken = response;
        })
        .catch((erro) => {
          throw new NotFoundException([
            `Invalid credentials for Token. ${erro}`,
          ]);
        });
    }

    return {
      statusCode: 200,
      message: [],
      error: '',
      data: {
        _id: user._id,
        apelido: user.name,
        jwtToken: jwtToken + user.role,
        reset_password,
      },
    };
  }

  create(createUserDto: CreateUserDto) {
    const user = new this.userModel(createUserDto);

    return user.save();
  }

  async findAll(): Promise<User[]> {
    return await this.userModel.find();
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userModel.findOne({ _id: id });
    if (!user) {
      throw new NotFoundException('User not found.');
    }
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    if (updateUserDto.resetPassword) {
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
    }

    const result = await this.userModel.updateOne({ _id: id }, updateUserDto);

    return result;
  }

  remove(id: string) {
    return `This action removes a #${id} user`;
  }

  private async checkPassword(
    password: string,
    passwordComp: string,
  ): Promise<string> {
    const matchCrypt = await bcrypt.compare(password, passwordComp);
    if (!matchCrypt) {
      throw new NotFoundException('Password not found.');
    }
    return 'OK';
  }
}
