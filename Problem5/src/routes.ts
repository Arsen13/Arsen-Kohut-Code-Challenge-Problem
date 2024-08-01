import { Router, Request, Response } from 'express';
import pool from './db';

const router = Router();

interface Todo {
    id: number;
    title: string;
    completed: boolean;
}

router.get('/', (req: Request, res: Response) => {
    res.send("Welcome to the Code Challenge Problem!");
});

router.post('/todos', async (req: Request, res: Response) => {
    const { title } = req.body;

    if (typeof title !== 'string' || title.trim() === '') {
        return res.status(400).json({ error: "Invalid title data" });
    }

    try {
        const result = await pool.query("INSERT INTO todos (title) VALUES ($1) RETURNING *", [title]);
        const createdTodo: Todo = result.rows[0];
        res.status(201).json(createdTodo);
    } catch (error) {
        console.error("Error adding todo", error);
        res.status(500).json({ error: "Error adding todo" });
    }
});

router.get('/todos', async (req: Request, res: Response) => {
    try {
        const result = await pool.query("SELECT * FROM todos")
        const todos: Todo[] = result.rows;
        res.json(todos);
    } catch (error) {
        console.error("Error fetching todos", error);
        res.status(500).json({ error: "Error fetching todos" });
    }
});

router.get('/todos/:id', async (req: Request, res: Response) => {
    const todoId = parseInt(req.params.id, 10);

    if (isNaN(todoId)) {
        res.status(400).json({ error: "Invalid todo ID"});
    }

    try {
        const result = await pool.query("SELECT * FROM todos WHERE id = $1", [todoId]);
        const todo: Todo = result.rows[0];
        res.status(201).json(todo);
    } catch (error) {
        console.error("Error getting todo by id", error);
        res.status(500).json({ error: "Error getting todo by id"});
    }
});

router.put('/todos/:id', async (req: Request, res: Response) => {
    const todoId = parseInt(req.params.id);
    const { title } = req.body;

    if (typeof title !== 'string' || title.trim() === '') {
        res.status(400).json({ error: "Invalid title data"});
    }

    if (isNaN(todoId)) {
        res.status(400).json({ error: "Invalid todo ID"});
    }

    try {
        const result = await pool.query("UPDATE todos SET title = $1 WHERE id = $2", [title, todoId]);
        res.status(200).json({ message: "Successfully update todo"})
    } catch (error) {
        console.error("Error updating todo", error);
        res.status(500).json({ error: "Error updating todo"});
    }
})

router.delete('/delete-todo/:id', async (req: Request, res: Response) => {
    const todoId = parseInt(req.params.id, 10);

    if (isNaN(todoId)) {
        res.status(400).json({ error: "Invalid todo ID" });
    }

    try {
        const result = await pool.query("DELETE FROM todos WHERE id = $1", [todoId]);
        res.status(200).json({ message: "Successfully deleted todo"});
    } catch (error) {
        console.error("Error deleting todo", error);
        res.status(500).json({ error: "Error deleting todo" });        
    }
})

export default router;