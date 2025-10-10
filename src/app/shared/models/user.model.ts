import { Award } from './award.model';
import { Job } from './job.model';
import { MaterialBalance } from './material-balance.model';

export interface User {
  id: string;
  username: string;
  name: string;
  avatar: string;
  passportId: string;
  legalStatus: string;
  tickets: number;
  materials: MaterialBalance[];
  awards: Award[];
  jobs: Job[];
}
