import { Module } from '@nestjs/common';
import { ProfileController } from './controllers/profile.controller';

import { UsersModule } from './../users/users.module';

@Module({
  imports: [UsersModule],
  controllers: [ProfileController],
})
export class ProfileModule {}
