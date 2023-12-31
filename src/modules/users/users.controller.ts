import {
  Controller,
  Post,
  Body,
  Patch,
  UnprocessableEntityException,
  Delete,
  Get,
  Param,
  UseGuards,
  Query,
  BadRequestException,
} from "@nestjs/common";
import {
  ApiTags,
  ApiOperation,
  ApiCreatedResponse,
  ApiUnprocessableEntityResponse,
  ApiBadRequestResponse,
  ApiResponse,
  ApiBody,
  ApiParam,
  ApiBearerAuth,
} from "@nestjs/swagger";
import { UUIDVersion } from "class-validator";
import { DeleteResult, UpdateResult } from "typeorm";

import { FilterUsersDTO, UsersDTO, CreateUserDTO, UpdateUserDTO } from "./user.dto";
import { User } from "./user.entity";
import { UsersService } from "./users.service";
import { JwtAuthGuard } from "../auth/jwt.guard";

@ApiTags("Users")
@Controller("users")
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post()
  @ApiOperation({
    summary: "Cria um usuário",
  })
  @ApiBody({
    description: "Dados do usuário criado.",
    type: CreateUserDTO,
  })
  @ApiCreatedResponse({
    description: "Usuário criado.",
    type: UsersDTO,
  })
  @ApiBadRequestResponse({
    description: "A requisição não combina com o esperado.",
    type: BadRequestException,
  })
  @ApiUnprocessableEntityResponse({
    description: "Erro ao criar o paciente.",
    type: UnprocessableEntityException,
  })
  async createUser(@Body() createUser: CreateUserDTO): Promise<User> {
    return this.userService.create(createUser);
  }

  @Get(":id")
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth("access-token")
  @ApiOperation({
    summary: "Recupera um usuário.",
  })
  @ApiResponse({
    description: "Usuário atualizado.",
    type: UsersDTO,
  })
  @ApiParam({
    name: "Id do usuário",
    example: "c2fd0654-6f00-4d3d-a935-693979232eeb",
  })
  @ApiBadRequestResponse({
    description: "A requisição não combina com o esperado.",
    type: BadRequestException,
  })
  @ApiUnprocessableEntityResponse({
    description: "Erro ao criar o paciente.",
    type: UnprocessableEntityException,
  })
  async getUser(@Param("id") userId: UUIDVersion): Promise<User | UpdateResult> {
    return this.userService.find(userId);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth("access-token")
  @ApiOperation({
    summary: "Recupera todos os usuário.",
  })
  @ApiResponse({
    description: "Usuário atualizado.",
    type: () => Array<UsersDTO>,
  })
  async getAllUsers(@Query() queryFilter: FilterUsersDTO): Promise<User[]> {
    return this.userService.findAll(queryFilter);
  }

  @Patch(":id")
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth("access-token")
  @ApiOperation({
    summary: "Edita um usuário.",
  })
  @ApiParam({
    name: "Id do usuário",
    example: "c2fd0654-6f00-4d3d-a935-693979232eeb",
  })
  @ApiBody({
    description: "Dados do usuário.",
    type: UpdateUserDTO,
  })
  @ApiResponse({
    description: "Usuário atualizado.",
    type: UsersDTO,
  })
  @ApiBadRequestResponse({
    description: "A requisição não combina com o esperado.",
    type: BadRequestException,
  })
  @ApiUnprocessableEntityResponse({
    description: "Erro ao criar o paciente.",
    type: UnprocessableEntityException,
  })
  async updateUser(
    @Param("id") userId: UUIDVersion,
    @Body() updatedUser: UpdateUserDTO
  ): Promise<User | UpdateResult> {
    return this.userService.update(userId, updatedUser);
  }

  @Delete(":id")
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth("access-token")
  @ApiOperation({
    summary: "Remove um usuário.",
  })
  @ApiParam({
    name: "Id do usuário",
    example: "c2fd0654-6f00-4d3d-a935-693979232eeb",
  })
  @ApiResponse({
    description: "Confirmação de deleção.",
    type: DeleteResult,
  })
  @ApiBadRequestResponse({
    description: "A requisição não combina com o esperado.",
    type: BadRequestException,
  })
  @ApiUnprocessableEntityResponse({
    description: "Erro ao criar o usuário.",
    type: UnprocessableEntityException,
  })
  async removeUser(@Param("id") userId: UUIDVersion): Promise<User | DeleteResult> {
    return this.userService.remove(userId);
  }
}
