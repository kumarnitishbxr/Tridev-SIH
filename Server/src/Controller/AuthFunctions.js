const User = require('../Model/User')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const validate = require('../Utils/validator')
const redisClient = require('../Config/RedisDB')



const register = async (req, res)=>{

    try {
        
        const {emailId, password} = req.body
        if(!emailId || !password)
            return res.status(400).json({message: 'missing required field'})

        const existingUser = await User.findOne({emailId})
        if(existingUser)
            return res.status(409).json({message:'user already exist with this email Address'})

        const result = validate(req.body)

        if(!result.success)
           return res.status(400).json({ message: result.message });

        req.body.password = await bcrypt.hash(password, 10)

        const user = await User.create(req.body);

        const Token = jwt.sign({_id: user._id, emailId: emailId, role: 'user'}, process.env.SECRET_KEY, {expiresIn: process.env.JWT_EXP})
        res.cookie('Token', Token, {maxAge: parseInt(process.env.JWT_MAX_AGE)})

        res.status(201).json({

            _id: user._id,
            firstName: user.firstName,
            emailId : user.emailId,
            role: user.role,
            message: 'User registered successully'

        })


    } catch (error) {
        res.status(401).json({
            message: 'server error', 
            error: error.message
        })
    }
}



const login = async (req, res)=>{

    try {
        
        const {emailId, password} = req.body
        // console.log(password)
        if(!emailId || !password)
            return res.status(404).json({
                messages: 'Invalid credential', 
            })

        const user = await User.findOne({emailId})
        if(!user)
            return res.status(400).json({
                messages: 'user not found'
            })
            
        const isMatched = await bcrypt.compare(password, user.password)

        if(!isMatched)
            return res.status(404).json({message: 'Invalid credential'})


        const Token = jwt.sign({_id: user._id, emailId: emailId, role: user.role}, process.env.SECRET_KEY, {expiresIn: process.env.JWT_EXP})
        res.cookie('Token', Token, {maxAge: process.env.JWT_MAX_AGE})


        res.status(201).json({

            _id: user._id,
            firstName: user.firstName,
            emailId : user.emailId,
            role: user.role,
            message: 'user Logged in successully'
        })

    } catch (error) {
        res.status(500).send(error.message)
    }
}



const logout = async (req, res)=>{

    try {
        const {Token} = req.cookies

        const payload = jwt.decode(Token)
        // console.log('decode')

        await redisClient.set(`Token: ${Token}`, 'Blocked')
        await redisClient.expireAt(`Token: ${Token}`, payload.exp)

        res.clearCookie('Token', null, {expiresIn: new Date(Date.now())})
        res.status(400).json({message: 'user logged out successfully'})

    } catch (error) {
        res.status(500).json({message:'Internal error', error:error.message})
    }
}


const registerAdmin = async (req, res)=>{

    try {
        
        const {emailId, password} = req.body
        if(!emailId || !password)
            throw new Error('Missing required field')

        const isUser = await User.findOne({emailId})
        if(isUser)
            return res.status(400).json({message: 'User already Registered'})

        const result = validate(req.body)
        if(!result?.success)
            return res.status(400).json({message: result?.message})

        req.body.password = await  bcrypt.hash(password, 10);

        //Making admin
        req.body.role = 'admin'

        
        const user = await User.create(req.body)
        if(!user)
            throw new Error('Internal error')

        const Token = jwt.sign({_id: user._id, emailId: user?.emailId, role: 'user'}, process.env.SECRET_KEY, {expiresIn: process.env.JWT_EXP})
        res.cookie('Token', Token, {maxAge: parseInt(process.env.JWT_MAX_AGE)})

        res.status(200).json({
            _id: user._id,
            firstName: user.firstName,
            emailId: user.emailId,
            role: user.role,
            message: 'Admin registered successfully'
        })

    } catch (error) {
        
        res.status(500).json({message: error.message})
    }
}


const deleteUser = async (req, res)=>{


    try {

        const _id = req.user?._id;
        if(!_id)
            return res.status(400).json({message: 'User not found'})
        
        const user = await User.findByIdAndDelete(_id)
        if(!user)
            return res.status(400).json({message: 'User not found.'})


        res.status(200).json({
            user: user,
            message: 'User deleted successfully'
        })
        
        
    } catch (error) {
        
        res.status(500).json({message: error.message})
    }
}



const updateUserInfo = async (req, res)=>{

    try {

        const {emailId, password} = req.body
        if(!emailId || !password)
            return res.status(400).json({message: 'Field missing'})

        
        const result = validate(req.body)
        if(!result.success)
            return res.status(400).json({message: 'Invalid data'})

        const _id = req.user._id

        req.body.password = await bcrypt.hash(password, 10);

        const user = await User.findByIdAndUpdate(_id, req.body)
        if(!user)
            throw new Error('user not found')

        res.status(200).json({
            _id: user._id,
            firstName: user.firstName,
            emailId: user.emailId,
            role: user.role,
            message: 'User info updated successfully'
        })

    } catch (error) {
        
        res.status(500).json({
            message: 'Internal Error',
            error: error.message
        })
    }
}



module.exports = {register, login, logout, registerAdmin, deleteUser, updateUserInfo}