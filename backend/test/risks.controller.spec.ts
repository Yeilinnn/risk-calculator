import { Test, TestingModule } from '@nestjs/testing';
import { RisksController } from '../src/risks/risks.controller';
import { RisksService } from '../src/risks/risks.service';
import { CreateRiskDto } from '../src/risks/models/create-risk.dto';
import { UpdateRiskDto } from '../src/risks/models/update-risk.dto';

describe('RisksController', () => {
  let controller: RisksController;
  let service: RisksService;

  const mockRisksService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RisksController],
      providers: [
        {
          provide: RisksService,
          useValue: mockRisksService,
        },
      ],
    }).compile();

    controller = module.get<RisksController>(RisksController);
    service = module.get<RisksService>(RisksService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create a risk', async () => {
      const createRiskDto: CreateRiskDto = {
        hazard: 'Wet floor',
        likelihood: 3,
        severity: 4,
      };

      const expectedRisk = {
        id: 'uuid-1',
        ...createRiskDto,
        score: 12,
        level: 'High',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockRisksService.create.mockResolvedValue(expectedRisk);

      const result = await controller.create(createRiskDto);

      expect(result).toEqual(expectedRisk);
      expect(service.create).toHaveBeenCalledWith(createRiskDto);
    });
  });

  describe('findAll', () => {
    it('should return all risks without filters', async () => {
      const risks = [
        { id: '1', hazard: 'Wet floor', score: 12, level: 'High' },
        { id: '2', hazard: 'Slippery surface', score: 8, level: 'Medium' },
      ];

      mockRisksService.findAll.mockResolvedValue(risks);

      const result = await controller.findAll();

      expect(result).toEqual(risks);
      expect(service.findAll).toHaveBeenCalledWith(undefined, undefined);
    });

    it('should filter by level', async () => {
      const risks = [{ id: '1', hazard: 'Wet floor', score: 12, level: 'High' }];
      mockRisksService.findAll.mockResolvedValue(risks);

      const result = await controller.findAll('High');

      expect(result).toEqual(risks);
      expect(service.findAll).toHaveBeenCalledWith('High', undefined);
    });

    it('should filter by search query', async () => {
      const risks = [{ id: '1', hazard: 'Wet floor', score: 12, level: 'High' }];
      mockRisksService.findAll.mockResolvedValue(risks);

      const result = await controller.findAll(undefined, 'wet');

      expect(result).toEqual(risks);
      expect(service.findAll).toHaveBeenCalledWith(undefined, 'wet');
    });

    it('should apply both filters', async () => {
      const risks = [{ id: '1', hazard: 'Wet floor', score: 12, level: 'High' }];
      mockRisksService.findAll.mockResolvedValue(risks);

      const result = await controller.findAll('High', 'wet');

      expect(result).toEqual(risks);
      expect(service.findAll).toHaveBeenCalledWith('High', 'wet');
    });
  });

  describe('findOne', () => {
    it('should return a risk by id', async () => {
      const risk = { id: '1', hazard: 'Wet floor', score: 12, level: 'High' };
      mockRisksService.findOne.mockResolvedValue(risk);

      const result = await controller.findOne('1');

      expect(result).toEqual(risk);
      expect(service.findOne).toHaveBeenCalledWith('1');
    });
  });

  describe('update', () => {
    it('should update a risk', async () => {
      const updateRiskDto: UpdateRiskDto = { likelihood: 4 };
      const updatedRisk = {
        id: '1',
        hazard: 'Wet floor',
        likelihood: 4,
        severity: 3,
        score: 12,
        level: 'High',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockRisksService.update.mockResolvedValue(updatedRisk);

      const result = await controller.update('1', updateRiskDto);

      expect(result).toEqual(updatedRisk);
      expect(service.update).toHaveBeenCalledWith('1', updateRiskDto);
    });
  });

  describe('remove', () => {
    it('should remove a risk', async () => {
      mockRisksService.remove.mockResolvedValue(undefined);

      await controller.remove('1');

      expect(service.remove).toHaveBeenCalledWith('1');
    });
  });

  describe('smokeTest', () => {
    it('should return ok status', async () => {
      const result = await controller.smokeTest();

      expect(result).toEqual({ ok: true });
    });
  });
});
