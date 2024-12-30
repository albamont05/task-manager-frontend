import React, { useState } from 'react';
import "./index.css"; // Importa los estilos de Tailwind
import TaskList from "./components/TaskList";
import useTaskStore from './context/taskStore';
import Modal from './components/Modal';

function App() {
    const { addTask } = useTaskStore();
    const [newTaskTitle, setNewTaskTitle] = useState('');
    const [newTaskDescription, setNewTaskDescription] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [filter, setFilter] = useState('all');

    const handleOptionChange = (event) => {
        setFilter(event.target.value);
    };

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleAddTask = (e) => {
        e.preventDefault();
        if (newTaskTitle.trim() !== '') {
            addTask({ title: newTaskTitle, description: newTaskDescription, completed: false });
            setNewTaskTitle('');
            setNewTaskDescription('');
            setIsModalOpen(false);
        }
    };

    return (
        <div className="min-h- full min-h-screen h- full w-screen bg-white">
            <nav className="bg-gray-800">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 items-center justify-center">
                        <h1 className="text-3xl">Task Manager for Coally</h1>
                    </div>
                </div>
            </nav>

            <header className="bg-white shadow">
                <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8 flex justify-between items-center">
                    <h1 className="text-xl font-bold tracking-tight text-gray-900">Board</h1>
                    <div className='flex items-center justify-between'>
                        <div className='bg-white mr-3'>
                            <select value={filter} onChange={handleOptionChange}
                                className="appearance-none w-full bg-white text-black border border-gray-300 py-0 px-3 rounded leading-tight focus:outline-none focus:ring-2 focus:ring-teal-600 ">
                                <option value="all">Todas</option>
                                <option value="pending">Pendientes</option>
                                <option value="completed">Completadas</option>
                            </select>
                        </div>
                        <button onClick={openModal} className="p-0.5 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-full">
                            <svg className='size-6' viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns" fill="#000000"><g id="SVGRepo_bgCarrier"></g><g id="SVGRepo_tracerCarrier"></g><g id="SVGRepo_iconCarrier"> <title>plus-circle</title> <desc>Created with Sketch Beta.</desc> <defs> </defs> <g id="Page-1" stroke="none" fill="none" sketch:type="MSPage"> <g id="Icon-Set" sketch:type="MSLayerGroup" transform="translate(-464.000000, -1087.000000)" fill="#ffffff"> <path d="M480,1117 C472.268,1117 466,1110.73 466,1103 C466,1095.27 472.268,1089 480,1089 C487.732,1089 494,1095.27 494,1103 C494,1110.73 487.732,1117 480,1117 L480,1117 Z M480,1087 C471.163,1087 464,1094.16 464,1103 C464,1111.84 471.163,1119 480,1119 C488.837,1119 496,1111.84 496,1103 C496,1094.16 488.837,1087 480,1087 L480,1087 Z M486,1102 L481,1102 L481,1097 C481,1096.45 480.553,1096 480,1096 C479.447,1096 479,1096.45 479,1097 L479,1102 L474,1102 C473.447,1102 473,1102.45 473,1103 C473,1103.55 473.447,1104 474,1104 L479,1104 L479,1109 C479,1109.55 479.447,1110 480,1110 C480.553,1110 481,1109.55 481,1109 L481,1104 L486,1104 C486.553,1104 487,1103.55 487,1103 C487,1102.45 486.553,1102 486,1102 L486,1102 Z" id="plus-circle" sketch:type="MSShapeGroup"> </path> </g> </g> </g></svg>
                        </button>
                    </div>
                </div>
            </header>

            <main className="min-h-screen">
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                    <TaskList filter={filter} />
                </div>

                <div className=''>
                    <Modal title={'Crear Tarea'} isOpen={isModalOpen} onClose={closeModal}>
                        <form onSubmit={handleAddTask} className="">
                            <input
                                type="text"
                                placeholder="Título de la tarea"
                                className="w-full p-2 border rounded mb-2 bg-white text-black"
                                value={newTaskTitle}
                                onChange={(e) => setNewTaskTitle(e.target.value)}
                            />
                            <textarea
                                placeholder="Descripción de la tarea"
                                className="w-full p-2 border rounded mb-2 bg-white text-black"
                                value={newTaskDescription}
                                onChange={(e) => setNewTaskDescription(e.target.value)}
                            />
                            <button type="submit" className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded">
                                Añadir Tarea
                            </button>
                        </form>
                    </Modal>
                </div>
            </main>
            <footer className="bg-gray-800">
                <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8 flex justify-center items-center ">
                    <h3 className="text-xs md:text-lg font-normal tracking-tight text-white mr-3">❤️ Developed by Luis Baez - Full Stack Developer</h3>
                    <a href="https://www.linkedin.com/in/luis-alfredo-baez/" target="_blank" className="capitalize text-white text-xs md:text-lg font-semibold tracking-tight hover:text-teal-700">linkedin</a>
                </div>
            </footer>
        </div>
    );
}

export default App;
