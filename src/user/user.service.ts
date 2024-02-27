import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './user.repository';
import { User } from './user.entity';
import { LoginUserDto } from './dto/login-user.dto';
import { Content } from 'src/content/content.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
  ) {}

  async findAllUser(): Promise<User[]> {
    return await this.userRepository.findAllUser();
  }

  async findOneUser(id: number): Promise<User> {
    const user = await this.userRepository.findOneUser(id);
    if (!user) {
      throw new NotFoundException('User is not found');
    }
    return user;
  }

  async findOneUserWithContent(id: number): Promise<Content[]> {
    await this.findOneUser(id);
    const user = await this.userRepository.findOneUserWithContent(id);
    return user.content;
  }

  async findOneUserEmail(user_email: string): Promise<User> {
    const user = await this.userRepository.findOneUserEmail(user_email);
    if (!user) {
      throw new NotFoundException('User is not found.');
    }
    return user;
  }

  async findOneUserName(user_name: string): Promise<User> {
    const user = await this.userRepository.findOneUserName(user_name);
    if (user) {
      throw new BadRequestException('name is already exist.');
    }
    return user;
  }

  async validateUser(loginData: LoginUserDto): Promise<User> {
    const user = await this.findOneUserEmail(loginData.user_email);
    const matchPassword = await bcrypt.compare(loginData.password, user.password);
    if (!matchPassword) {
      throw new BadRequestException('Invalid credentials.');
    }
    return user;
  } 

  async signUpUser(createData: CreateUserDto): Promise<User> {
    const findUser = await this.userRepository.findOneUserEmail(createData.user_email);
    const hashedPassword = await bcrypt.hash(createData.password, 10);

    if (findUser) {
      throw new BadRequestException('user is already exist.');
    }

    const user = new User();
    user.user_email = createData.user_email
    user.user_name = createData.user_name;
    user.password = hashedPassword;

    await this.userRepository.createUser(user);
    return user;
  }

  async updatePassword(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findOneUser(id);
    const hashedPassword = await bcrypt.hash(updateUserDto.password, 10);
    await this.userRepository.updateUser(id, {
      user_email: user.user_email,
      user_name: user.user_name,
      password: hashedPassword,
      login_at: user.login_at,
    });
    return await this.findOneUser(id);
  }
  
  async updateUser(id: number, updateData: UpdateUserDto): Promise<User> {
    const findUser = await this.findOneUser(id);
    if (!findUser) {
      throw new BadRequestException('user is not found.');
    }

    findUser.user_name = updateData.user_name;
    findUser.password = updateData.password;
    findUser.login_at = new Date();
    await this.userRepository.updateUser(id, findUser);
    return await this.findOneUser(id);
  }

  async deleteUser(id: number): Promise<string> {
    const findUser = await this.userRepository.findOneUser(id);
    if (!findUser) {
      throw new BadRequestException('user is not found.');
    }
    await this.userRepository.deleteUser(id);
    return 'success delete user!';
  }
}
