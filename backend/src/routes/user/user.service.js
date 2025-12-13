import { hashPassword } from '../../utils/password.util.js'
import { queryMany, queryOne } from '../../utils/db.util.js'

export async function userCreate(email, username, password) {
  const existingUser = await queryOne(
    'SELECT id FROM users WHERE email = ? OR username = ?',
    [email, username]
  )

  if (existingUser) {
    throw new Error('Email or username already exists')
  }

  const hashedPassword = await hashPassword(password)

  const result = await queryMany(
    'INSERT INTO users (email, username, password) VALUES (?, ?, ?)',
    [email, username, hashedPassword]
  )

  return await queryOne('SELECT id, email, username, created_at FROM users WHERE id = ?', [result.insertId])
}

export async function userList(limit = 10, offset = 0) {
  return await queryMany(
    'SELECT id, email, username, created_at FROM users LIMIT ? OFFSET ?',
    [limit, offset]
  )
}

export async function userGet(id) {
  const user = await queryOne(
    'SELECT id, email, username, created_at FROM users WHERE id = ?',
    [id]
  )

  if (!user) {
    throw new Error('User not found')
  }

  return user
}

export async function userUpdate(id, email, username) {
  const user = await queryOne('SELECT id FROM users WHERE id = ?', [id])

  if (!user) {
    throw new Error('User not found')
  }

  const updates = []
  const values = []

  if (email) {
    updates.push('email = ?')
    values.push(email)
  }

  if (username) {
    updates.push('username = ?')
    values.push(username)
  }

  if (updates.length === 0) {
    return await queryOne('SELECT id, email, username, created_at FROM users WHERE id = ?', [id])
  }

  values.push(id)

  await queryMany(
    `UPDATE users SET ${updates.join(', ')} WHERE id = ?`,
    values
  )

  return await queryOne('SELECT id, email, username, created_at FROM users WHERE id = ?', [id])
}

export async function userDelete(id) {
  const user = await queryOne('SELECT id FROM users WHERE id = ?', [id])

  if (!user) {
    throw new Error('User not found')
  }

  await queryMany('DELETE FROM users WHERE id = ?', [id])

  return { id }
}
