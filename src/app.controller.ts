import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { HealthCheck, HealthCheckService, HttpHealthIndicator, MemoryHealthIndicator, TypeOrmHealthIndicator } from "@nestjs/terminus";
import { Public } from './auth/public.decorator';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly health: HealthCheckService,
    private readonly http: HttpHealthIndicator,
    private readonly db: TypeOrmHealthIndicator,
    private readonly memory: MemoryHealthIndicator,
    @InjectDataSource()
    private readonly defaultDataSource: DataSource,
    ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  
  @Get('health')
  @HealthCheck()
  @Public()
  check() {
      return this.health.check([
          () => this.http.pingCheck('my-blog', process.env.HEALTH_CHECK),
          () => this.db.pingCheck('database', { connection: this.defaultDataSource }),
          () => this.memory.checkHeap('memory heap', 300 * 1024 * 1024),
          () => this.memory.checkRSS('memory RSS', 300 * 1024 * 1024),
      ])
  }
}
