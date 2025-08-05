import { useState, useContext } from 'react';
import { Form, Button, Card } from 'react-bootstrap';
import { login as loginUser } from '../services/authService';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const [form, setForm] = useState({ email: '', password: '' });
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await loginUser(form);
            const token = data.data.token;
            const user = data.data.user;
            login(user, token);
            navigate('/dashboard');
        } catch (err) {
            alert('Login failed');
        }
    };

    return (
        <Card className="p-4">
            <h2>Login</h2>
            <Form onSubmit={handleSubmit}>
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
                <Button type="submit" variant="primary">Login</Button>
            </Form>
        </Card>
    );
}
