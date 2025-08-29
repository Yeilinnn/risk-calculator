import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RisksService } from '../src/risks/risks.service';
import { Risk } from '../src/risks/entities/risk.entity';
import { CreateRiskDto } from '../src/risks/models/create-risk.dto';
import { UpdateRiskDto } from '../src/risks/models/update-risk.dto';
import { NotFoundException } from '@nestjs/common';

describe('RisksService', () => {
  let service: RisksService;
  let repository: Repository<Risk>;

  const mockRepository = {
    create: jest.fn(),
    save: jest.fn(),
    findOne: jest.fn(),
    remove: jest.fn(),
    createQueryBuilder: jest.fn(() => ({
      andWhere: jest.fn().mockReturnThis(),
      orderBy: jest.fn().mockReturnThis(),
      getMany: jest.fn(),
    })),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RisksService,
        {
          provide: getRepositoryToken(Risk),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<RisksService>(RisksService);
    repository = module.get<Repository<Risk>>(getRepositoryToken(Risk));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create a risk with computed score and level', async () => {
      const createRiskDto: CreateRiskDto = {
        hazard: 'Wet floor',
        likelihood: 3,
        severity: 4,
      };

      const expectedRisk = {
        ...createRiskDto,
        id: 'uuid-1',
        score: 12,
        level: 'High',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockRepository.create.mockReturnValue(expectedRisk);
      mockRepository.save.mockResolvedValue(expectedRisk);

      const result = await service.create(createRiskDto);

      expect(result.score).toBe(12);
      expect(result.level).toBe('High');
      expect(mockRepository.create).toHaveBeenCalledWith({
        ...createRiskDto,
        score: 12,
        level: 'High',
      });
    });
  });

  describe('findAll', () => {
    it('should return all risks ordered by score DESC', async () => {
      const risks = [
        { id: '1', score: 20, level: 'Critical' },
        { id: '2', score: 15, level: 'High' },
        { id: '3', score: 8, level: 'Medium' },
      ];

      mockRepository.createQueryBuilder().getMany.mockResolvedValue(risks);

      const result = await service.findAll();

      expect(result).toEqual(risks);
      expect(mockRepository.createQueryBuilder().orderBy).toHaveBeenCalledWith('risk.score', 'DESC');
    });

    it('should filter by level', async () => {
      const risks = [{ id: '1', score: 15, level: 'High' }];
      mockRepository.createQueryBuilder().getMany.mockResolvedValue(risks);

      await service.findAll('High');

      expect(mockRepository.createQueryBuilder().andWhere).toHaveBeenCalledWith('risk.level = :level', { level: 'High' });
    });

    it('should filter by search query', async () => {
      const risks = [{ id: '1', hazard: 'Wet floor', score: 12 }];
      mockRepository.createQueryBuilder().getMany.mockResolvedValue(risks);

      await service.findAll(undefined, 'wet');

      expect(mockRepository.createQueryBuilder().andWhere).toHaveBeenCalledWith(
        'LOWER(risk.hazard) LIKE LOWER(:searchQuery)',
        { searchQuery: '%wet%' }
      );
    });
  });

  describe('findOne', () => {
    it('should return a risk by id', async () => {
      const risk = { id: '1', hazard: 'Wet floor' };
      mockRepository.findOne.mockResolvedValue(risk);

      const result = await service.findOne('1');

      expect(result).toEqual(risk);
    });

    it('should throw NotFoundException when risk not found', async () => {
      mockRepository.findOne.mockResolvedValue(null);

      await expect(service.findOne('999')).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update a risk and recompute score/level', async () => {
      const existingRisk = {
        id: '1',
        hazard: 'Wet floor',
        likelihood: 2,
        severity: 3,
        score: 6,
        level: 'Medium',
      };

      const updateDto: UpdateRiskDto = { likelihood: 4 };

      mockRepository.findOne.mockResolvedValue(existingRisk);
      mockRepository.save.mockResolvedValue({ ...existingRisk, ...updateDto, score: 12, level: 'High' });

      const result = await service.update('1', updateDto);

      expect(result.score).toBe(12);
      expect(result.level).toBe('High');
    });

    it('should not recompute score/level when likelihood/severity unchanged', async () => {
      const existingRisk = {
        id: '1',
        hazard: 'Wet floor',
        likelihood: 2,
        severity: 3,
        score: 6,
        level: 'Medium',
      };

      const updateDto: UpdateRiskDto = { hazard: 'Slippery surface' };

      mockRepository.findOne.mockResolvedValue(existingRisk);
      mockRepository.save.mockResolvedValue({ ...existingRisk, ...updateDto });

      const result = await service.update('1', updateDto);

      expect(result.score).toBe(6);
      expect(result.level).toBe('Medium');
    });
  });

  describe('remove', () => {
    it('should remove a risk', async () => {
      const risk = { id: '1', hazard: 'Wet floor' };
      mockRepository.findOne.mockResolvedValue(risk);
      mockRepository.remove.mockResolvedValue(risk);

      await service.remove('1');

      expect(mockRepository.remove).toHaveBeenCalledWith(risk);
    });
  });
});
