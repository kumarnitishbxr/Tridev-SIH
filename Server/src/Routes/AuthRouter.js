const express = require('express')
const authRouter = express.Router()
const {register, logout, login, registerAdmin, deleteUser, updateUserInfo} = require('../Controller/AuthFunctions')
const authenticateUser = require('../Middleware/authenticateUser')
const authenticateAdmin = require('../Middleware/authenticateAdmin')



authRouter.post('/register', register)
authRouter.post('/login', login)
authRouter.post('/logout', authenticateUser, logout)
authRouter.post('/admin/register', authenticateAdmin, registerAdmin)
authRouter.delete('/delete', authenticateUser, deleteUser)
authRouter.patch('/update', authenticateUser, updateUserInfo)



module.exports = authRouter