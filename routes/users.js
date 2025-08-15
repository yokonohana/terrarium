import { Router } from "express";
import pool from '../src/db.js'; // импорт пула подключения к базе

const router = Router();

router.post('/login', async (req, res) => {
  try {
    const { login, password } = req.body;

    if (!login || !password) return res.status(400).json({ message: 'Логин и пароль обязательны' });

    const data = await pool.query('SELECT * FROM public.users WHERE login = $1', [login]);
    
    if (data.rowCount === 0) return res.status(404).send({ message: 'Пользователь не найден' });
    
    const user = data.rows[0];

    if (user.password !== password) {
      return res.status(403).send({ message: 'Неправильный пароль!' });
    } else {
      return res.status(201).json({ message: 'Вход выполнен успешно!',  result: {
        login: user.login, status: 'success'
      }})
    }
  } catch(e) {
    console.error(e);
    res.status(500).json({ message: e });
  }
});

router.post('/register', async (req, res) => {
  try {
    const { login, password } = req.body;

    if (!login || !password) return res.status(400).json({ message: 'Логин и пароль обязательны' });

    const data = await pool.query('SELECT * FROM public.users WHERE login = $1', [login]);
      
    if (data.rowCount > 0) return res.status(400).send({ message: 'Пользователь уже существует' });

    const result = await pool.query('INSERT INTO public.users (login, password) VALUES ($1, $2) RETURNING id, login', [login, password]);
    const user = result.rows[0];
    return res.status(201).json({ message: 'Пользователь успешно создан', user})
  } catch(e) {
    res.status(500)._construct({ message: e });
  }
});

export default router;
