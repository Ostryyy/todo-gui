import { DestroyRef, inject } from '@angular/core';
import { signalStore, withState, withMethods, patchState } from '@ngrx/signals';
import { Task, TaskStatus } from '../models/task.model';
import { TaskService } from './tasks.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { BehaviorSubject } from 'rxjs';

export const TaskStore = signalStore(
  { providedIn: 'root' },
  withState({
    tasks: [] as Task[],
    isLoading: false,
    error: null as { status: number; message: string } | null,
  }),
  withMethods((store) => {
    const taskService = inject(TaskService);
    const destroyRef = inject(DestroyRef);

    return {
      loadTasks: () => {
        patchState(store, { isLoading: true, error: null });
        taskService
          .getTasks()
          .pipe(takeUntilDestroyed(destroyRef))
          .subscribe({
            next: (tasks) => {
              patchState(store, { tasks, isLoading: false });
            },
            error: (error) => {
              patchState(store, {
                isLoading: false,
                error: { status: error.status, message: error.message },
              });
            },
          });
      },
      addTask: (task: Task) => {
        patchState(store, { isLoading: true, error: null });
        taskService
          .addTask(task)
          .pipe(takeUntilDestroyed(destroyRef))
          .subscribe({
            next: (newTask) => {
              patchState(store, {
                tasks: [...store.tasks(), newTask],
                isLoading: false,
              });
            },
            error: (error) => {
              patchState(store, {
                isLoading: false,
                error: { status: error.status, message: error.message },
              });
            },
          });
      },
      updateTask: (id: string, updatedTask: Partial<Task>) => {
        const taskToUpdate = store.tasks().find((task) => task._id === id);
        if (taskToUpdate) {
          const taskWithUpdates = { ...taskToUpdate, ...updatedTask };
          patchState(store, { isLoading: true, error: null });
          taskService
            .updateTask(taskWithUpdates)
            .pipe(takeUntilDestroyed(destroyRef))
            .subscribe({
              next: (updatedTaskFromApi) => {
                const updatedTasks = store
                  .tasks()
                  .map((task) => (task._id === id ? updatedTaskFromApi : task));
                patchState(store, { tasks: updatedTasks, isLoading: false });
              },
              error: (error) => {
                patchState(store, {
                  isLoading: false,
                  error: { status: error.status, message: error.message },
                });
              },
            });
        }
      },
      removeTask: (id: string) => {
        patchState(store, { isLoading: true, error: null });
        taskService
          .deleteTask(id)
          .pipe(takeUntilDestroyed(destroyRef))
          .subscribe({
            next: () => {
              const remainingTasks = store
                .tasks()
                .filter((task) => task._id !== id);
              patchState(store, { tasks: remainingTasks, isLoading: false });
            },
            error: (error) => {
              patchState(store, {
                isLoading: false,
                error: { status: error.status, message: error.message },
              });
            },
          });
      },
      getTasks: (
        status: TaskStatus | '',
        sortField?: keyof Task,
        sortOrder: 'asc' | 'desc' = 'asc'
      ) => {
        let tasks = store.tasks();

        if (status !== '') {
          tasks = tasks.filter((task) => task.status === status);
        }

        if (sortField) {
          tasks = tasks.sort((a, b) => {
            const fieldA = a[sortField];
            const fieldB = b[sortField];

            if (fieldA === undefined || fieldB === undefined) return 0;

            if (fieldA < fieldB) return sortOrder === 'asc' ? -1 : 1;
            if (fieldA > fieldB) return sortOrder === 'asc' ? 1 : -1;
            return 0;
          });
        }

        return tasks;
      },
      getError: () => store.error(),
      isLoading: () => store.isLoading(),
    };
  })
);
