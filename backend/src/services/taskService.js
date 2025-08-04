const Task = require('../models/Task');

class TaskService {
    async getUserTasks(userId) {
        return await Task.find({ userId }).sort({ createdAt: -1 });
    }

    async createTask(taskData, userId) {
        const task = new Task({
            ...taskData,
            userId
        });
        return await task.save();
    }

    async getTaskById(taskId, userId) {
        const task = await Task.findOne({ _id: taskId, userId });
        if (!task) {
            throw new Error('Task not found or unauthorized');
        }
        return task;
    }

    async updateTask(taskId, updateData, userId) {
        const task = await Task.findOneAndUpdate(
            { _id: taskId, userId },
            updateData,
            { new: true, runValidators: true }
        );

        if (!task) {
            throw new Error('Task not found or unauthorized');
        }
        return task;
    }

    async deleteTask(taskId, userId) {
        const task = await Task.findOneAndDelete({ _id: taskId, userId });
        if (!task) {
            throw new Error('Task not found or unauthorized');
        }
        return task;
    }

    async updateTaskStatus(taskId, status, userId) {
        const task = await Task.findOneAndUpdate(
            { _id: taskId, userId },
            { status },
            { new: true, runValidators: true }
        );

        if (!task) {
            throw new Error('Task not found or unauthorized');
        }
        return task;
    }
}

module.exports = new TaskService();