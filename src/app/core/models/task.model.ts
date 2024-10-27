export type TaskStatus = 'todo' | 'in-progress' | 'done';

export interface Task {
  _id?: string;
  title: string;
  description: string;
  userId?: string;
  status: TaskStatus;
  createdAt?: Date;
}
