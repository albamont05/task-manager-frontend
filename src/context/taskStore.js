import { create } from "zustand";
import taskService from "../services/taskService"; // Importa el servicio

const useTaskStore = create((set) => ({
  tasks: [],
  loading: false,
  error: null,
  fetchTasks: async () => {
    set({ loading: true, error: null });
    try {
      const tasks = await taskService.getTasks();
      set({ tasks, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },
  addTask: async (newTask) => {
    try {
      const addedTask = await taskService.createTask(newTask);
      set((state) => ({ tasks: [...state.tasks, addedTask] }));
    } catch (error) {
      set({ error: error.message });
    }
  },
  updateStatusTask: async (updatedTask) => {
    try {
      const updated = await taskService.updateTask(
        updatedTask._id,
        updatedTask
      );
      set((state) => ({
        tasks: state.tasks.map((task) =>
          task._id === updated._id ? updated : task
        ),
      }));
    } catch (error) {
      set({ error: error.message });
    }
  },
  updateTask: async (id, updatedTask) => {
    try {
      const updated = await taskService.updateTask(id, updatedTask);
      set((state) => ({
        tasks: state.tasks.map((task) => (task._id === id ? updated : task)),
      }));
    } catch (error) {
      set({ error: error.message });
    }
  },
  deleteTask: async (taskId) => {
    try {
      const deleted_id = await taskService.deleteTask(taskId);
      set((state) => ({
        tasks: state.tasks.filter((task) => task._id !== deleted_id),
      }));
    } catch (error) {
      set({ error: error.message });
    }
  },
}));

export default useTaskStore;
