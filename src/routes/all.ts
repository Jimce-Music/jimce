/**
 * This file will register all fastify routes which are not dedicated to special internal purposes (like JWT auth)
 */

// START General
import './main'
// ----§NEW_HERE§--
// END GENERAL

// START API
// --api--§NEW_HERE§--

// Package:
// --api---§NEW_HERE§--

// Package: admin/users
import './api/admin/users/getList-users.ts' // GET /api/admin/users/list-users
import './api/admin/users/putCreateOrChange.ts' // POST /api/admin/users/create-or-change
import './api/admin/users/deleteUser.ts' // DELETE /api/admin/users/user
// --api-admin/users--§NEW_HERE§--

// Package: auth
import './api/auth/getCheck-token.ts' // GET /api/auth/check-token
import './api/auth/postLogin-basic.ts' // POST /api/auth/login-basic
// --api-auth--§NEW_HERE§--
// END API

// START 404 / Catch-All
import './404'
// END 404 / Catch-All
