import { useEffect } from 'react';
import useTaskStore from '../context/taskStore';
import Task from './Task';

const TaskList = ({ filter }) => {
  const { tasks, loading, error, fetchTasks } = useTaskStore();

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  if (loading) return <div className='text-black'>Cargando tareas...</div>;
  if (error) return <div className='text-red-500'>Error: {error}</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 bg-gray-200 p-4 rounded-3xl">
      {tasks.filter(task => {
        if (filter === 'all') return true;
        return task.completed === (filter === 'completed');
      }).length === 0 ? ( // Condición: ¿el array filtrado está vacío?
        <div className="w-full flex justify-center items-center text-center text-black">
          No hay tareas para mostrar.
        </div>
      ) : ( // Si no está vacío, renderiza las tareas
        tasks.filter(task => {
          if (filter === 'all') return true;
          return task.completed === (filter === 'completed');
        }).map(task => (
          <Task key={task._id} task={task} />
        ))
      )}
    </div>
  );
};

export default TaskList;