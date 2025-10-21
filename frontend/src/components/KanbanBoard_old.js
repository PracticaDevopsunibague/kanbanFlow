import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { tasksAPI } from '../services/api';

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

    const { draggableId, destination } = result;
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
            ? { ...task, status: result.source.droppableId }
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

  if (loading) {
    return <div className="text-center py-8">Cargando tablero...</div>;
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {Object.entries(columns).map(([status, column]) => (
          <div key={status} className={`rounded-lg border-2 ${column.color} p-4`}>
            <h3 className="font-semibold text-lg mb-4">{column.title}</h3>
            <Droppable droppableId={status}>
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="min-h-[200px] space-y-3"
                >
                  {getTasksByStatus(status).map((task, index) => (
                    <Draggable
                      key={task.id}
                      draggableId={task.id.toString()}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="bg-white p-3 rounded-md shadow-sm border hover:shadow-md transition-shadow cursor-pointer"
                          onClick={() => handleTaskClick(task)}
                        >
                          <h4 className="font-medium text-gray-900">{task.title}</h4>
                          {task.description && (
                            <p className="text-sm text-gray-600 mt-1">{task.description}</p>
                          )}
                          <div className="flex justify-between items-center mt-2">
                            <span className={`px-2 py-1 text-xs rounded-full ${
                              task.priority === 'high' ? 'bg-red-100 text-red-800' :
                              task.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-green-100 text-green-800'
                            }`}>
                              {task.priority === 'high' ? 'Alta' :
                               task.priority === 'medium' ? 'Media' : 'Baja'}
                            </span>
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        ))}
      </div>

      {/* Modal de detalles de tarea */}
      {showTaskModal && selectedTask && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Detalles de la Tarea</h3>
              <button
                onClick={() => setShowTaskModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Título
                </label>
                <p className="text-gray-900">{selectedTask.title}</p>
              </div>
              
              {selectedTask.description && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Descripción
                  </label>
                  <p className="text-gray-900">{selectedTask.description}</p>
                </div>
              )}
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Estado
                </label>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  selectedTask.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                  selectedTask.status === 'in_progress' ? 'bg-blue-100 text-blue-800' :
                  'bg-green-100 text-green-800'
                }`}>
                  {selectedTask.status === 'pending' ? 'Pendiente' :
                   selectedTask.status === 'in_progress' ? 'En Progreso' : 'Completado'}
                </span>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Prioridad
                </label>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  selectedTask.priority === 'high' ? 'bg-red-100 text-red-800' :
                  selectedTask.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-green-100 text-green-800'
                }`}>
                  {selectedTask.priority === 'high' ? 'Alta' :
                   selectedTask.priority === 'medium' ? 'Media' : 'Baja'}
                </span>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Creado por
                </label>
                <p className="text-gray-900">{selectedTask.created_by}</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Fecha de creación
                </label>
                <p className="text-gray-900">
                  {new Date(selectedTask.created_at).toLocaleDateString('es-ES')}
                </p>
              </div>
            </div>
            
            <div className="flex justify-end mt-6">
              <button
                onClick={() => setShowTaskModal(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </DragDropContext>
  );
};

export default KanbanBoard;