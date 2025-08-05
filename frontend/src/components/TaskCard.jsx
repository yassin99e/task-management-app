import { Card, Button, Badge } from 'react-bootstrap';

export default function TaskCard({ task, onDelete }) {
    const statusColors = {
        todo: 'secondary',
        inprogress: 'warning',
        done: 'success'
    };

    return (
        <Card className="mb-3">
            <Card.Body>
                <Card.Title>
                    {task.title}{' '}
                    <Badge bg={statusColors[task.status]}>{task.status}</Badge>
                </Card.Title>
                {task.description && <Card.Text>{task.description}</Card.Text>}
                {task.dueDate && (
                    <Card.Text className="text-muted">
                        Due: {new Date(task.dueDate).toLocaleDateString()}
                    </Card.Text>
                )}
                <Button
                    variant="danger"
                    size="sm"
                    onClick={() => onDelete(task._id)}
                >
                    Delete
                </Button>
            </Card.Body>
        </Card>
    );
}
