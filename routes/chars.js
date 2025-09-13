import { Router } from "express";
import pool from '../src/db.js';

const router = Router();

// GET /api/characters/:userId — получить список персонажей пользователя
router.get('/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId) return res.status(400).json({ message: 'userId обязателен' });

    const data = await pool.query(
      'SELECT id, data FROM public.characters WHERE user_id = $1 ORDER BY id',
      [userId]
    );

    res.status(200).json({ characters: data.rows });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
});

// GET /api/characters/one/:id — получить персонажа по id
router.get('/one/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: 'id обязателен' });
    }

    const result = await pool.query(
      'SELECT id, user_id, data FROM public.characters WHERE id = $1',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Персонаж не найден' });
    }

    const row = result.rows[0];

    res.status(200).json({
      character: {
        id: row.id,
        userId: row.user_id,
        data: row.data
      }
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
});


// POST /api/characters/add — добавить нового персонажа
router.post('/add', async (req, res) => {
  try {
    const { userId, data } = req.body;
    if (!userId || !data) return res.status(400).json({ message: 'userId и data обязательны' });

    const result = await pool.query(
      'INSERT INTO public.characters (user_id, data) VALUES ($1, $2) RETURNING id, data',
      [userId, data]
    );

    res.status(201).json({ message: 'Персонаж успешно создан', character: result.rows[0] });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
});

// PUT /api/characters/update/:id — обновить персонажа
router.put('/update/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { userId, data } = req.body;

    if (!id || !userId || !data) {
      return res.status(400).json({ message: 'id, userId и data обязательны' });
    }

    const result = await pool.query(
      'UPDATE public.characters SET data = $1 WHERE id = $2 AND user_id = $3 RETURNING id, data',
      [data, id, userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Персонаж не найден или нет доступа' });
    }

    res.status(200).json({
      message: 'Персонаж успешно обновлён',
      character: result.rows[0],
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
});

// DELETE /api/characters/delete/:id — удалить персонажа
router.delete('/delete/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query(
      'DELETE FROM characters WHERE id = $1',
      [id]
    );
    return res.status(200).json({ message: 'success' });
  } catch (e) {
    console.log(e);
  }
});

export default router;
