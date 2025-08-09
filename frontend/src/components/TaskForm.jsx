import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { createTask } from '../services/taskService';

export default function TaskForm({ onTaskCreated }) {
    const [form, setForm] = useState({
        title: '',
        description: '',
        priority: 'medium',
        status: 'todo',
        dueDate: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        await createTask(form);
        setForm({
            title: '',
            description: '',
            priority: 'medium',
            status: 'todo',
            dueDate: ''
        });
        if (onTaskCreated) onTaskCreated();
    };

    return (
        <Form onSubmit={handleSubmit} className="task-form">
            <Form.Group className="mb-3">
                <Form.Label>Title</Form.Label>
                <Form.Control
                    placeholder="Enter task title"
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    required
                />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Enter task description"
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Priority</Form.Label>
                <Form.Select
                    value={form.priority}
                    onChange={(e) => setForm({ ...form, priority: e.target.value })}
                >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Status</Form.Label>
                <Form.Select
                    value={form.status}
                    onChange={(e) => setForm({ ...form, status: e.target.value })}
                >
                    <option value="todo">To Do</option>
                    <option value="inprogress">In Progress</option>
                    <option value="done">Done</option>
                </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Due Date</Form.Label>
                <Form.Control
                    type="date"
                    value={form.dueDate}
                    onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
                />
            </Form.Group>

            <Button type="submit" variant="primary">
                Add Task
            </Button>
        </Form>
    );
}