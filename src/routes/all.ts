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
// END API

// START 404 / Catch-All
import './404'
// END 404 / Catch-All
