import { Award } from './award.model';
import { Job } from './job.model';
import { Material } from './material.model';

export interface User {
  id: string;
  username: string;
  name: string;
  avatar: string;
  passportId: string;
  legalStatus: string;
  tickets: number;
  materials: Material[];
  awards: Award[];
  jobs: Job[];
}
