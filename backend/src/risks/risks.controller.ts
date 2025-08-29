import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { RisksService } from './risks.service';
import { CreateRiskDto } from './models/create-risk.dto';
import { UpdateRiskDto } from './models/update-risk.dto';
import { RiskLevel } from '../shared/risk-domain';

@Controller('risks')
export class RisksController {
  constructor(private readonly risksService: RisksService) {}

  @Post()
  async create(@Body() createRiskDto: CreateRiskDto) {
    return this.risksService.create(createRiskDto);
  }

  @Get()
  async findAll(
    @Query('level') level?: RiskLevel,
    @Query('q') searchQuery?: string,
  ) {
    return this.risksService.findAll(level, searchQuery);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.risksService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateRiskDto: UpdateRiskDto) {
    return this.risksService.update(id, updateRiskDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string) {
    await this.risksService.remove(id);
  }

  @Get('admin/test')
  async smokeTest() {
    return { ok: true };
  }
}
