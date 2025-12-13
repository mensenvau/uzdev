import app from './app.js'
import { envConfig } from './config/env.config.js'
import { testConnection } from './config/db.config.js'

const PORT = envConfig.PORT

// Test database connection before starting server
testConnection()
  .then((connected) => {
    if (!connected) {
      console.error('❌ Failed to connect to database. Please check your configuration.')
      process.exit(1)
    }

    // Start server
    app.listen(PORT, () => {
      console.log('\n🚀 Core App Backend Server')
      console.log(`📡 Environment: ${envConfig.NODE_ENV}`)
      console.log(`🌐 Server running on: http://localhost:${PORT}`)
      console.log(`💚 Health check: http://localhost:${PORT}/health`)
      console.log('\n📚 API Endpoints:')
      console.log(`   Auth:     http://localhost:${PORT}/api/auth`)
      console.log(`   Users:    http://localhost:${PORT}/api/users`)
      console.log(`   Roles:    http://localhost:${PORT}/api/roles`)
      console.log(`   Policies: http://localhost:${PORT}/api/policies`)
      console.log(`   Groups:   http://localhost:${PORT}/api/groups`)
      console.log(`   Forms:    http://localhost:${PORT}/api/forms`)
      console.log('\n✨ Ready to accept requests!\n')
    })
  })
  .catch((error) => {
    console.error('❌ Server startup failed:', error)
    process.exit(1)
  })

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('\n⚠️  SIGTERM signal received: closing HTTP server')
  process.exit(0)
})

process.on('SIGINT', () => {
  console.log('\n⚠️  SIGINT signal received: closing HTTP server')
  process.exit(0)
})
