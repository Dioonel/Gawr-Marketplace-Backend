import { Module, Global } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigType } from '@nestjs/config';

import config from './../config';

@Global()
@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: (myConfig: ConfigType<typeof config>) => {
        const {user, password} = myConfig.db;
        return {
          uri: `mongodb+srv://${user}:${password}@nestcluster.uudwxna.mongodb.net/?retryWrites=true&w=majority`,
          useUnifiedTopology: true
        }
      },
      inject: [config.KEY],
    })
  ],
  exports: [MongooseModule]
})
export class DatabaseModule {}
