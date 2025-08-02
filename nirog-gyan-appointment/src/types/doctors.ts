export interface Doctor {
  id: number;
  name: string;
  specialization: string;
  image: string;
  availability: string;
  schedule: Record<string, string>;
}
