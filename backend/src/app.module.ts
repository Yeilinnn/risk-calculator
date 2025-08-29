import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { CoreModule } from './core/core.module';
import { RisksModule } from './risks/risks.module';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.MYSQL_HOST || 'localhost',
      port: parseInt(process.env.MYSQL_PORT || '3306'),
      username: process.env.MYSQL_USER || 'root',
      password: process.env.MYSQL_PASSWORD || 'your_password',
      database: process.env.MYSQL_DB || 'risk_calculator',
      entities: [join(__dirname, '**/*.entity{.ts,.js}')],
      synchronize: false,
      logging: process.env.NODE_ENV === 'development',
    }),
    CoreModule,
    RisksModule,
  ],
})
export class AppModule {}
