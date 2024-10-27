import { Component, inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TaskStore } from '../../core/tasks/tasks.store';
import { Task, TaskStatus } from '../../core/models/task.model';
import { ConfirmDialogComponent } from './items/confirm-dialog/confirm-dialog.component';
import { TaskDialogComponent } from './items/task-dialog/task-dialog.component';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatSelectModule,
  ],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
})
export class TaskListComponent implements OnInit {
  protected taskStore = inject(TaskStore);
  public dialog = inject(MatDialog);

  public selectedStatus: TaskStatus | '' = '';
  public selectedSortField: keyof Task = 'createdAt';
  public selectedSortOrder: 'asc' | 'desc' = 'asc';

  public filteredTasks: Task[] = [];

  ngOnInit() {
    this.taskStore.loadTasks();
  }

  openTaskDialog(task?: Task) {
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      data: task || { title: '', description: '', status: 'todo' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (task) {
          this.taskStore.updateTask(task._id!, result);
        } else {
          this.taskStore.addTask(result);
        }
      }
    });
  }

  confirmDelete(task: Task) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: { title: task.title },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.taskStore.removeTask(task._id!);
      }
    });
  }
}
