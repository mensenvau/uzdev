import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import helmet from 'helmet'
import { envConfig } from './config/env.config.js'

// Import routers
import authRouter from './routes/auth/auth.router.js'
import userRouter from './routes/user/user.router.js'
import roleRouter from './routes/role/role.router.js'
import policyRouter from './routes/policy/policy.router.js'
import groupRouter from './routes/group/group.router.js'
import formRouter from './routes/form/form.router.js'

const app = express()

// Security middleware
app.use(helmet())

// CORS configuration
app.use(cors({
  origin: envConfig.FRONTEND_URL,
  credentials: true
}))

// Body parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Logging
if (envConfig.NODE_ENV === 'development') {
  app.use(morgan('dev'))
} else {
  app.use(morgan('combined'))
}

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

// API Routes
app.use('/api/auth', authRouter)
app.use('/api/users', userRouter)
app.use('/api/roles', roleRouter)
app.use('/api/policies', policyRouter)
app.use('/api/groups', groupRouter)
app.use('/api/forms', formRouter)

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  })
})

// Global error handler
app.use((err, req, res, next) => {
  console.error('Global error handler:', err)

  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal server error',
    ...(envConfig.NODE_ENV === 'development' && { stack: err.stack })
  })
})

export default app
