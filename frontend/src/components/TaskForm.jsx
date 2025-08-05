import { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
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
        <Form onSubmit={handleSubmit}>
            <Row className="mb-3">
                <Col>
                    <Form.Control
                        placeholder="Title"
                        value={form.title}
                        onChange={(e) => setForm({ ...form, title: e.target.value })}
                        required
                    />
                </Col>
                <Col>
                    <Form.Control
                        placeholder="Description"
                        value={form.description}
                        onChange={(e) => setForm({ ...form, description: e.target.value })}
                    />
                </Col>
            </Row>
            <Row className="mb-3">
                <Col>
                    <Form.Select
                        value={form.priority}
                        onChange={(e) => setForm({ ...form, priority: e.target.value })}
                    >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                    </Form.Select>
                </Col>
                <Col>
                    <Form.Select
                        value={form.status}
                        onChange={(e) => setForm({ ...form, status: e.target.value })}
                    >
                        <option value="todo">To Do</option>
                        <option value="inprogress">In Progress</option>
                        <option value="done">Done</option>
                    </Form.Select>
                </Col>
                <Col>
                    <Form.Control
                        type="date"
                        value={form.dueDate}
                        onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
                    />
                </Col>
            </Row>
            <Button type="submit" variant="primary">Add Task</Button>
        </Form>
    );
}
