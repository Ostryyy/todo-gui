import { Component, inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TaskStore } from '../../core/tasks/tasks.store';
import { Task } from '../../core/models/task.model';
import { ConfirmDialogComponent } from './items/confirm-dialog/confirm-dialog.component';
import { TaskDialogComponent } from './items/task-dialog/task-dialog.component';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
})
export class TaskListComponent implements OnInit {
  protected taskStore = inject(TaskStore);
  public dialog = inject(MatDialog);

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
