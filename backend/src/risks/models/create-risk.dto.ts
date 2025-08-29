import { IsString, IsInt, Min, Max, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';
import { Likelihood, Severity } from '../../shared/risk-domain';

/**
 * DTO to create a Risk.
 * Server will compute score and level; client must NOT send them.
 */
export class CreateRiskDto {
  @IsString()
  @IsNotEmpty()
  hazard!: string;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(5)
  likelihood!: Likelihood;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(5)
  severity!: Severity;
}
