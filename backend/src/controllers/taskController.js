const taskService = require('../services/taskService');

class TaskController {
    async getTasks(req, res, next) {
        try {
            const tasks = await taskService.getUserTasks(req.user._id);
            res.status(200).json({
                success: true,
                count: tasks.length,
                data: { tasks }
            });
        } catch (error) {
            next(error);
        }
    }

    async createTask(req, res, next) {
        try {
            const task = await taskService.createTask(req.body, req.user._id);
            res.status(201).json({
                success: true,
                message: 'Task created successfully',
                data: { task }
            });
        } catch (error) {
            next(error);
        }
    }

    async getTask(req, res, next) {
        try {
            const task = await taskService.getTaskById(req.params.id, req.user._id);
            res.status(200).json({
                success: true,
                data: { task }
            });
        } catch (error) {
            next(error);
        }
    }

    async updateTask(req, res, next) {
        try {
            const task = await taskService.updateTask(req.params.id, req.body, req.user._id);
            res.status(200).json({
                success: true,
                message: 'Task updated successfully',
                data: { task }
            });
        } catch (error) {
            next(error);
        }
    }

    async deleteTask(req, res, next) {
        try {
            await taskService.deleteTask(req.params.id, req.user._id);
            res.status(200).json({
                success: true,
                message: 'Task deleted successfully'
            });
        } catch (error) {
            next(error);
        }
    }

    async updateTaskStatus(req, res, next) {
        try {
            const { status } = req.body;
            const task = await taskService.updateTaskStatus(req.params.id, status, req.user._id);
            res.status(200).json({
                success: true,
                message: 'Task status updated successfully',
                data: { task }
            });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new TaskController();