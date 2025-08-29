import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    Index,
  } from 'typeorm';
  import { Likelihood, Severity, RiskLevel } from '../../shared/risk-domain';
  
  @Entity({ name: 'risks' })
  export class Risk {
    @PrimaryGeneratedColumn('uuid')
    id!: string;
  
    @Index('idx_risk_hazard')
    @Column({ type: 'varchar', length: 255 })
    hazard!: string;
  
    // tinyint unsigned para valores 1..5
    @Column({ type: 'tinyint', unsigned: true })
    likelihood!: Likelihood;
  
    @Column({ type: 'tinyint', unsigned: true })
    severity!: Severity;
  
    @Column({ type: 'int', unsigned: true })
    score!: number;
  
    @Column({ type: 'enum', enum: ['Low', 'Medium', 'High', 'Critical'] })
    level!: RiskLevel;
  
    @CreateDateColumn({ type: 'datetime' })
    createdAt!: Date;
  
    @UpdateDateColumn({ type: 'datetime' })
    updatedAt!: Date;
  }
  