import { useState } from 'react';
import { Form, Button, Card } from 'react-bootstrap';
import { register as registerUser } from '../services/authService';
import { useNavigate } from 'react-router-dom';

export default function Register() {
    const [form, setForm] = useState({ username: '', email: '', password: '' });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await registerUser(form);
            alert('Registration successful. Please login.');
            navigate('/login');
        } catch {
            alert('Registration failed');
        }
    };

    return (
        <Card className="p-4">
            <h2>Register</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        value={form.username}
                        onChange={(e) => setForm({ ...form, username: e.target.value })}
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        value={form.password}
                        onChange={(e) => setForm({ ...form, password: e.target.value })}
                        required
                    />
                </Form.Group>
                <Button type="submit" variant="primary">Register</Button>
            </Form>
        </Card>
    );
}
