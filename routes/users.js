import { Router } from "express";
import bcrypt from "bcrypt";
import pool from '../src/db.js';

const router = Router();

router.post('/login', async (req, res) => {
  try {
    const { login, password } = req.body;

    if (!login || !password) {
      return res.status(400).json({ message: 'Логин и пароль обязательны' });
    }

    const data = await pool.query(
      'SELECT * FROM public.users WHERE login = $1',
      [login]
    );

    if (data.rowCount === 0) {
      return res.status(404).json({ message: 'Пользователь не найден' });
    }

    const user = data.rows[0];
    const isValid = await bcrypt.compare(password, user.password);

    if (isValid) {
      return res.status(200).json({
        message: 'Вход выполнен успешно!',
        result: { login: user.login, id: user.id, status: 'success' }
      });
    } else {
      return res.status(403).json({ message: 'Неправильный пароль!' });
    };
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: 'Ошибка сервера' });
  }
});

router.post('/register', async (req, res) => {
  try {
    const { login, password } = req.body;

    if (!login || !password) return res.status(400).json({ message: 'Логин и пароль обязательны' });

    const data = await pool.query('SELECT * FROM public.users WHERE login = $1', [login]);
      
    if (data.rowCount > 0) return res.status(400).send({ message: 'Пользователь уже существует' });

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const result = await pool.query('INSERT INTO public.users (login, password) VALUES ($1, $2) RETURNING id, login', [login, hashedPassword]);
    const user = result.rows[0];
    return res
      .status(201)
      .json({ message: 'Пользователь успешно создан', user })
  } catch(e) {
    res.status(500).json({ message: e });
  }
});

export default router;
