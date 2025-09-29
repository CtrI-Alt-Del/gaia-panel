import { faker } from '@faker-js/faker'

import type { UserDto } from '../user-dto'

export class UsersFaker {
  static fakeDto(baseDto?: Partial<UserDto>): UserDto {
    return {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      role: faker.helpers.arrayElement(['admin', 'user']),
      isActive: true,
      ...baseDto,
    }
  }

  static fakeMany(count: number = 10, baseDto?: Partial<UserDto>): UserDto[] {
    return Array.from({ length: count }, () => UsersFaker.fakeDto(baseDto))
  }
}
