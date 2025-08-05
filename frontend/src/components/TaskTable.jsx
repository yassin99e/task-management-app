import { useEffect, useState } from 'react';
import { Table, Button, Form } from 'react-bootstrap';
import { getTasks, deleteTask, updateTask } from '../services/taskService';

export default function TaskTable({ refreshFlag }) {
    const [tasks, setTasks] = useState([]);
    const [filters, setFilters] = useState({ status: '', priority: '' });
    const [editTaskId, setEditTaskId] = useState(null);
    const [editData, setEditData] = useState({});

    const loadTasks = async () => {
        try {
            const { data } = await getTasks();
            setTasks(data.data.tasks);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        loadTasks();
    }, [refreshFlag]);

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure?')) return;
        await deleteTask(id);
        loadTasks();
    };

    const handleUpdate = async (id) => {
        await updateTask(id, editData);
        setEditTaskId(null);
        loadTasks();
    };

    const filteredTasks = tasks.filter(task =>
        (filters.status ? task.status === filters.status : true) &&
        (filters.priority ? task.priority === filters.priority : true)
    );

    return (
        <div>
            {/* Filters */}
            <div className="mb-3 d-flex gap-2">
                <Form.Select
                    value={filters.status}
                    onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                >
                    <option value="">All Status</option>
                    <option value="todo">To Do</option>
                    <option value="inprogress">In Progress</option>
                    <option value="done">Done</option>
                </Form.Select>

                <Form.Select
                    value={filters.priority}
                    onChange={(e) => setFilters({ ...filters, priority: e.target.value })}
                >
                    <option value="">All Priorities</option>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                </Form.Select>
            </div>

            {/* Table */}
            <Table bordered hover responsive>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Priority</th>
                        <th>Status</th>
                        <th>Due Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredTasks.map(task => (
                        <tr key={task._id}>
                            <td>
                                {editTaskId === task._id ? (
                                    <Form.Control
                                        value={editData.title || ''}
                                        onChange={(e) => setEditData({ ...editData, title: e.target.value })}
                                    />
                                ) : task.title}
                            </td>
                            <td>
                                {editTaskId === task._id ? (
                                    <Form.Control
                                        value={editData.description || ''}
                                        onChange={(e) => setEditData({ ...editData, description: e.target.value })}
                                    />
                                ) : task.description}
                            </td>
                            <td>
                                {editTaskId === task._id ? (
                                    <Form.Select
                                        value={editData.priority || ''}
                                        onChange={(e) => setEditData({ ...editData, priority: e.target.value })}
                                    >
                                        <option value="low">Low</option>
                                        <option value="medium">Medium</option>
                                        <option value="high">High</option>
                                    </Form.Select>
                                ) : task.priority}
                            </td>
                            <td>
                                {editTaskId === task._id ? (
                                    <Form.Select
                                        value={editData.status || ''}
                                        onChange={(e) => setEditData({ ...editData, status: e.target.value })}
                                    >
                                        <option value="todo">To Do</option>
                                        <option value="inprogress">In Progress</option>
                                        <option value="done">Done</option>
                                    </Form.Select>
                                ) : task.status}
                            </td>
                            <td>{task.dueDate ? new Date(task.dueDate).toLocaleDateString() : ''}</td>
                            <td>
                                {editTaskId === task._id ? (
                                    <>
                                        <Button size="sm" variant="success" onClick={() => handleUpdate(task._id)}>Save</Button>{' '}
                                        <Button size="sm" variant="secondary" onClick={() => setEditTaskId(null)}>Cancel</Button>
                                    </>
                                ) : (
                                    <>
                                        <Button
                                            size="sm"
                                            variant="warning"
                                            onClick={() => {
                                                setEditTaskId(task._id);
                                                setEditData({
                                                    title: task.title,
                                                    description: task.description,
                                                    priority: task.priority,
                                                    status: task.status
                                                });
                                            }}
                                        >
                                            Update
                                        </Button>{' '}
                                        <Button size="sm" variant="danger" onClick={() => handleDelete(task._id)}>
                                            Delete
                                        </Button>
                                    </>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
}
