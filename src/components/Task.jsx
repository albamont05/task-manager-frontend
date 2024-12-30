import { useState } from 'react';
import useTaskStore from '../context/taskStore';
import Modal from './Modal';

const Task = ({ task }) => {
    const { deleteTask } = useTaskStore();
    const updateStatusTask = useTaskStore((state) => state.updateStatusTask);
    const updateTask = useTaskStore((state) => state.updateTask);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [taskToEdit, setTaskToEdit] = useState(null);

    const handleStatusChange = (e) => {
        updateStatusTask({ ...task, completed: e.target.checked });
    };

    function dateFormat(date) {
        if (!date) return '';

        try {
            const fecha = new Date(date);
            return fecha.toLocaleDateString('es-VE', { // Especifica el locale 'es-VE' para el formato DD/MM/AAAA
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
            });
        } catch (error) {
            console.error("Fecha inválida:", date);
            return 'Fecha inválida';
        }
    };

    const openEditModal = (task) => {
        setTaskToEdit(task);
        setIsEditModalOpen(true);
    };

    const closeEditModal = () => {
        setIsEditModalOpen(false);
        setTaskToEdit(null);
    };

    const handleEditTask = (e) => {
        e.preventDefault();
        if (taskToEdit.title.trim() !== '') {
            updateTask(taskToEdit._id, { title: taskToEdit.title, description: taskToEdit.description });
            closeEditModal();
        }
    };

    return (
        <div className="flex flex-col justify-between bg-gray-50 px-6 py-5 rounded-3xl shadow-xl">
            <h3 className="font-bold text-black first-letter:uppercase">{task.title}</h3>
            <p className="text-sm text-black grow">{task.description}</p>
            <div className='flex justify-between items-center mt-4'>
                <div className="text-black text-xs sm:text-normal md:mr-0 mr-2 ">
                    {dateFormat(task.createdAt)}
                </div>
                <div className='flex justify-between items-center'>
                    <div className='flex items-center justify-between text-black text-xs sm:text-normal text-semibold mr-2'>
                        <input className="appearance-none h-4 w-4 border border-gray-300 rounded-md bg-amber-500 checked:bg-teal-600 focus:outline-none transition duration-200 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="checkbox" checked={task.completed} onChange={handleStatusChange} /> {task.completed ? 'Completada' : 'Pendiente'}
                    </div>

                    <button className='px-2 py-1 mr-1 text-sm bg-teal-600 hover:bg-teal-700' onClick={() => openEditModal(task)}>
                        <svg className='size-4' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fillRule="evenodd" clipRule="evenodd" d="M20.8477 1.87868C19.6761 0.707109 17.7766 0.707105 16.605 1.87868L2.44744 16.0363C2.02864 16.4551 1.74317 16.9885 1.62702 17.5692L1.03995 20.5046C0.760062 21.904 1.9939 23.1379 3.39334 22.858L6.32868 22.2709C6.90945 22.1548 7.44285 21.8693 7.86165 21.4505L22.0192 7.29289C23.1908 6.12132 23.1908 4.22183 22.0192 3.05025L20.8477 1.87868ZM18.0192 3.29289C18.4098 2.90237 19.0429 2.90237 19.4335 3.29289L20.605 4.46447C20.9956 4.85499 20.9956 5.48815 20.605 5.87868L17.9334 8.55027L15.3477 5.96448L18.0192 3.29289ZM13.9334 7.3787L3.86165 17.4505C3.72205 17.5901 3.6269 17.7679 3.58818 17.9615L3.00111 20.8968L5.93645 20.3097C6.13004 20.271 6.30784 20.1759 6.44744 20.0363L16.5192 9.96448L13.9334 7.3787Z" fill="#ffffff"></path> </g></svg>
                    </button>

                    <button className='px-2 py-1 text-sm hover:bg-red-700' onClick={() => deleteTask(task._id)}>
                        <svg className='size-4' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier"></g><g id="SVGRepo_tracerCarrier"></g><g id="SVGRepo_iconCarrier"> <path d="M18 6L17.1991 18.0129C17.129 19.065 17.0939 19.5911 16.8667 19.99C16.6666 20.3412 16.3648 20.6235 16.0011 20.7998C15.588 21 15.0607 21 14.0062 21H9.99377C8.93927 21 8.41202 21 7.99889 20.7998C7.63517 20.6235 7.33339 20.3412 7.13332 19.99C6.90607 19.5911 6.871 19.065 6.80086 18.0129L6 6M4 6H20M16 6L15.7294 5.18807C15.4671 4.40125 15.3359 4.00784 15.0927 3.71698C14.8779 3.46013 14.6021 3.26132 14.2905 3.13878C13.9376 3 13.523 3 12.6936 3H11.3064C10.477 3 10.0624 3 9.70951 3.13878C9.39792 3.26132 9.12208 3.46013 8.90729 3.71698C8.66405 4.00784 8.53292 4.40125 8.27064 5.18807L8 6M14 10V17M10 10V17" stroke="#ffffff" ></path> </g></svg>
                    </button>
                </div>
            </div>

            {taskToEdit && ( // Solo renderiza el modal si hay una tarea para editar
                <Modal title={'Editar Tarea'} isOpen={isEditModalOpen} onClose={closeEditModal}>
                    <form onSubmit={handleEditTask}>
                        <input
                            type="text"
                            placeholder="Título de la tarea"
                            className="w-full p-2 border rounded mb-2 bg-white text-black"
                            value={taskToEdit.title}
                            onChange={(e) => setTaskToEdit({ ...taskToEdit, title: e.target.value })}
                        />
                        <textarea
                            placeholder="Descripción de la tarea"
                            className="w-full p-2 border rounded mb-2 bg-white text-black"
                            value={taskToEdit.description}
                            onChange={(e) => setTaskToEdit({ ...taskToEdit, description: e.target.value })}
                        />
                        <button type="submit" className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded">Guardar Cambios</button>
                    </form>
                </Modal>
            )}
        </div>
    );
};

export default Task;