// backend/src/risks/risks.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Risk } from './entities/risk.entity';
import { CreateRiskDto } from './models/create-risk.dto';
import { UpdateRiskDto } from './models/update-risk.dto';
import { computeScore, computeLevel, RiskLevel } from '../shared/risk-domain';

@Injectable()
export class RisksService {
  constructor(
    @InjectRepository(Risk)
    private readonly riskRepository: Repository<Risk>,
  ) {}

  /**
   * Creates a new risk. Server computes score and level.
   */
  async create(createRiskDto: CreateRiskDto): Promise<Risk> {
    const score = computeScore(createRiskDto.likelihood, createRiskDto.severity);
    const level = computeLevel(score);

    const risk = this.riskRepository.create({
      ...createRiskDto,
      score,
      level,
    });

    return this.riskRepository.save(risk);
  }

  /**
   * Returns risks ordered by score DESC with optional filters.
   * - level: RiskLevel
   * - q: search in hazard (case-insensitive by MySQL collation)
   */
  async findAll(level?: RiskLevel, q?: string): Promise<Risk[]> {
    const qb = this.riskRepository
      .createQueryBuilder('risk')
      .orderBy('risk.score', 'DESC');

    if (level) {
      qb.andWhere('risk.level = :level', { level });
    }

    if (q && q.trim().length > 0) {
      // MySQL: LIKE es case-insensitive si la collation es *_ci (por defecto).
      qb.andWhere('risk.hazard LIKE :q', { q: `%${q.trim()}%` });
    }

    return qb.getMany();
  }

  /**
   * Returns a single risk by id.
   */
  async findOne(id: string): Promise<Risk> {
    const risk = await this.riskRepository.findOne({ where: { id } });
    if (!risk) {
      throw new NotFoundException(`Risk with ID ${id} not found`);
    }
    return risk;
  }

  /**
   * Updates a risk. Recomputes score/level if likelihood or severity change.
   */
  async update(id: string, updateRiskDto: UpdateRiskDto): Promise<Risk> {
    const risk = await this.findOne(id);

    let nextScore = risk.score;
    let nextLevel = risk.level;

    if (
      updateRiskDto.likelihood !== undefined ||
      updateRiskDto.severity !== undefined
    ) {
      const newLikelihood = updateRiskDto.likelihood ?? risk.likelihood;
      const newSeverity = updateRiskDto.severity ?? risk.severity;
      nextScore = computeScore(newLikelihood, newSeverity);
      nextLevel = computeLevel(nextScore);
    }

    Object.assign(risk, updateRiskDto, {
      score: nextScore,
      level: nextLevel,
    });

    return this.riskRepository.save(risk);
  }

  /**
   * Deletes a risk by id.
   */
  async remove(id: string): Promise<void> {
    const risk = await this.findOne(id);
    await this.riskRepository.remove(risk);
  }
}
