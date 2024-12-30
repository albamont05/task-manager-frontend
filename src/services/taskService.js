import axios from "axios";

const API_URL = "https://task-manager-backend-474c.onrender.com/api/tasks";

const taskService = {
  async getTasks() {
    try {
      const response = await axios.get(API_URL);
      return response.data;
    } catch (error) {
      console.error("Error al obtener las tareas:", error);
      throw error; // Re-lanza el error para que sea manejado por el componente
    }
  },

  async createTask(newTask) {
    try {
      const response = await axios.post(API_URL, newTask);
      return response.data;
    } catch (error) {
      console.error("Error al crear la tarea:", error);
      throw error;
    }
  },

  async updateTask(taskId, updatedTask) {
    try {
      const response = await axios.patch(`${API_URL}/${taskId}`, updatedTask);
      return response.data;
    } catch (error) {
      console.error("Error al actualizar la tarea:", error);
      throw error;
    }
  },

  async deleteTask(taskId) {
    try {
      await axios.delete(`${API_URL}/${taskId}`);
      // No es necesario retornar nada en un delete exitoso, pero para consistencia se podria retornar un mensaje o el id eliminado
      return taskId;
    } catch (error) {
      console.error("Error al eliminar la tarea:", error);
      throw error;
    }
  },
};

export default taskService;
