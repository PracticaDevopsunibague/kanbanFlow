import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { tasksAPI } from '../services/api';

const TaskCard = React.memo(({ task, index, onClick }) => (
  <Draggable draggableId={task.id.toString()} index={index}>
    {(provided, snapshot) => (
      <div
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        className={`bg-white p-4 rounded-lg shadow-sm border hover:shadow-md transition-all duration-200 cursor-pointer ${
          snapshot.isDragging ? 'rotate-3 shadow-lg' : ''
        }`}
        onClick={() => onClick(task)}
      >
        <h4 className="font-medium text-gray-900 mb-2 line-clamp-2">{task.title}</h4>
        {task.description && (
          <p className="text-sm text-gray-600 mb-3 line-clamp-2">{task.description}</p>
        )}
        <div className="flex justify-between items-center">
          <span className={`px-2 py-1 text-xs rounded-full font-medium ${
            task.priority === 'high' ? 'bg-red-100 text-red-700' :
            task.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
            'bg-green-100 text-green-700'
          }`}>
            {task.priority === 'high' ? '🔴 Alta' :
             task.priority === 'medium' ? '🟡 Media' : '🟢 Baja'}
          </span>
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white text-xs font-medium">
              {task.created_by?.[0] || 'U'}
            </div>
          </div>
        </div>
      </div>
    )}
  </Draggable>
));

const Column = React.memo(({ status, column, tasks, onTaskClick }) => (
  <div className={`rounded-xl border-2 ${column.color} p-4 h-full flex flex-col`}>
    <div className={`${column.headerColor} -m-4 mb-4 p-4 rounded-t-xl border-b border-gray-200`}>
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-gray-800 flex items-center">
          <span className="mr-2">{column.icon}</span>
          {column.title}
        </h3>
        <span className="bg-white px-2 py-1 rounded-full text-xs font-medium text-gray-600">
          {tasks.length}
        </span>
      </div>
    </div>
    
    <Droppable droppableId={status}>
      {(provided, snapshot) => (
        <div
          {...provided.droppableProps}
          ref={provided.innerRef}
          className={`flex-1 space-y-3 min-h-[400px] transition-colors duration-200 ${
            snapshot.isDraggingOver ? 'bg-blue-50 bg-opacity-50' : ''
          }`}
        >
          {tasks.map((task, index) => (
            <TaskCard
              key={task.id}
              task={task}
              index={index}
              onClick={onTaskClick}
            />
          ))}
          {provided.placeholder}
          
          {tasks.length === 0 && (
            <div className="flex items-center justify-center h-32 text-gray-400 text-sm">
              <div className="text-center">
                <div className="text-2xl mb-2">{column.icon}</div>
                <p>No hay tareas aquí</p>
              </div>
            </div>
          )}
        </div>
      )}
    </Droppable>
  </div>
));

const TaskModal = React.memo(({ task, isOpen, onClose }) => {
  if (!isOpen || !task) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl max-w-lg w-full mx-4 shadow-xl">
        <div className="flex justify-between items-start mb-6">
          <h3 className="text-xl font-semibold text-gray-900">{task.title}</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="space-y-4">
          {task.description && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Descripción
              </label>
              <p className="text-gray-900 bg-gray-50 p-3 rounded-lg">{task.description}</p>
            </div>
          )}
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Estado
              </label>
              <span className={`inline-flex px-3 py-1 text-sm rounded-full font-medium ${
                task.status === 'pending' ? 'bg-gray-100 text-gray-800' :
                task.status === 'in_progress' ? 'bg-blue-100 text-blue-800' :
                'bg-green-100 text-green-800'
              }`}>
                {task.status === 'pending' ? '📋 Pendiente' :
                 task.status === 'in_progress' ? '⚡ En Progreso' : '✅ Completado'}
              </span>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Prioridad
              </label>
              <span className={`inline-flex px-3 py-1 text-sm rounded-full font-medium ${
                task.priority === 'high' ? 'bg-red-100 text-red-800' :
                task.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                'bg-green-100 text-green-800'
              }`}>
                {task.priority === 'high' ? '🔴 Alta' :
                 task.priority === 'medium' ? '🟡 Media' : '🟢 Baja'}
              </span>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Creado por
            </label>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white text-sm font-medium">
                {task.created_by?.[0] || 'U'}
              </div>
              <span className="text-gray-900">{task.created_by}</span>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Fecha de creación
            </label>
            <p className="text-gray-900">
              {new Date(task.created_at).toLocaleDateString('es-ES', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </p>
          </div>
        </div>
        
        <div className="flex justify-end mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
});

const KanbanBoard = ({ projectId }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTask, setSelectedTask] = useState(null);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [error, setError] = useState(null);

  const columns = useMemo(() => ({
    pending: { 
      title: 'Pendiente', 
      color: 'bg-gray-50 border-gray-200',
      headerColor: 'bg-gray-100',
      icon: '📋'
    },
    in_progress: { 
      title: 'En Progreso', 
      color: 'bg-blue-50 border-blue-200',
      headerColor: 'bg-blue-100',
      icon: '⚡'
    },
    completed: { 
      title: 'Completado', 
      color: 'bg-green-50 border-green-200',
      headerColor: 'bg-green-100',
      icon: '✅'
    }
  }), []);

  useEffect(() => {
    if (projectId) {
      loadTasks();
    }
  }, [projectId]);

  const loadTasks = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await tasksAPI.getAll(projectId);
      setTasks(response.data);
    } catch (error) {
      setError('Error cargando tareas');
      console.error('Error cargando tareas:', error);
    } finally {
      setLoading(false);
    }
  }, [projectId]);

  const onDragEnd = useCallback(async (result) => {
    if (!result.destination) return;

    const { draggableId, destination, source } = result;
    const taskId = draggableId;
    const newStatus = destination.droppableId;

    // Optimistic update
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id.toString() === taskId
          ? { ...task, status: newStatus }
          : task
      )
    );

    try {
      await tasksAPI.updateStatus(taskId, newStatus);
    } catch (error) {
      // Revert on error
      setTasks(prevTasks =>
        prevTasks.map(task =>
          task.id.toString() === taskId
            ? { ...task, status: source.droppableId }
            : task
        )
      );
      setError('Error actualizando estado');
      console.error('Error actualizando estado:', error);
    }
  }, []);

  const getTasksByStatus = useCallback((status) => {
    return tasks.filter(task => task.status === status);
  }, [tasks]);

  const handleTaskClick = useCallback((task) => {
    setSelectedTask(task);
    setShowTaskModal(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setShowTaskModal(false);
    setSelectedTask(null);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="w-8 h-8 animate-spin mx-auto mb-4">
            <svg className="w-full h-full text-blue-600" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
            </svg>
          </div>
          <p className="text-gray-600">Cargando tablero...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <svg className="w-16 h-16 text-red-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Error al cargar</h3>
          <p className="text-gray-500 mb-4">{error}</p>
          <button
            onClick={loadTasks}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full p-6">
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
          {Object.entries(columns).map(([status, column]) => (
            <Column
              key={status}
              status={status}
              column={column}
              tasks={getTasksByStatus(status)}
              onTaskClick={handleTaskClick}
            />
          ))}
        </div>
      </DragDropContext>

      <TaskModal
        task={selectedTask}
        isOpen={showTaskModal}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default React.memo(KanbanBoard);