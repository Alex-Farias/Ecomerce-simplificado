import { Module, OnModuleInit } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserPerfilModule } from './model/user/perfil/userPerfil.module';
import { UserModule } from './model/user/user.module';
import { ProductModule } from './model/product/product.module';
import { ProductCategoryModule } from './model/product/category/productCategory.module';
import { CartModule } from './model/cart/cart.module';
import { CartItemModule } from './model/cart/item/cartItem.module';
import { OrderModule } from './model/order/order.module';
import { OrderItemModule } from './model/order/item/orderItem.module';
import { OrderHistoryModule } from './model/order/history/orderHistory.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_DOCKER_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      autoLoadEntities: true,
      synchronize: true,
      logging: true,
    }),
    UserModule,
    UserPerfilModule,
    ProductModule,
    ProductCategoryModule,
    CartModule,
    CartItemModule,
    OrderModule,
    OrderItemModule,
    OrderHistoryModule,
  ],
  controllers: [AppController], 
  providers: [AppService],
})

export class AppModule implements OnModuleInit{
  async onModuleInit() {
    const dataSource = new DataSource({
      type: 'postgres',
      host: process.env.DB_DOCKER_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });

    try {
      await dataSource.initialize();
      console.log('Database connected!');
    } catch (err) {
      console.error('Database connection error:', err);
    }
  }
}
