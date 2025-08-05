import { useState } from 'react';
import TaskTable from '../components/TaskTable';
import TaskForm from '../components/TaskForm';
import { Button, ButtonGroup } from 'react-bootstrap';

export default function Dashboard() {
    const [activeView, setActiveView] = useState('table');
    const [refreshFlag, setRefreshFlag] = useState(false);

    // Function to trigger refresh in TaskTable
    const refreshTasks = () => setRefreshFlag(!refreshFlag);

    return (
        <div>
            <h2>Dashboard</h2>

            {/* Navigation buttons */}
            <ButtonGroup className="mb-4">
                <Button
                    variant={activeView === 'table' ? 'primary' : 'outline-primary'}
                    onClick={() => setActiveView('table')}
                >
                    View Tasks
                </Button>
                <Button
                    variant={activeView === 'form' ? 'primary' : 'outline-primary'}
                    onClick={() => setActiveView('form')}
                >
                    Create Task
                </Button>
            </ButtonGroup>

            {/* Conditional rendering */}
            {activeView === 'table' && <TaskTable refreshFlag={refreshFlag} />}
            {activeView === 'form' && <TaskForm onTaskCreated={refreshTasks} />}
        </div>
    );
}
