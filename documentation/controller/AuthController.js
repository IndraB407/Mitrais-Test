const User = require('../models/User')
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')






module.exports.users_post = async (req, res) => {
    const user = new User(req.body)
    try {
        const token = await user.generateAuthToken()
        res.status(201).send({user, token})
    } catch (err) {
        res.status(400).send(err.message)
    }
}

module.exports.users_get = async (req, res) => {
    try {
        const users = await User.find({})
        if(!users){
            return res.status(400).send()
        }
            res.status(200).send(users)
    } catch (err) {
        res.status(500).send(err.message)
    }
}

module.exports.users_getId = async (req, res) => {
    try {
        const users = await User.findById(req.params.id)
        if(!users){
            return res.status(400).send()
        }
            res.status(200).send(users)
    } catch (err) {
        res.status(500).send(err.message)
    }
}

module.exports.users_login = async (req, res) => {
    try {
       const users = await User.findByCredentials(req.body.username, req.body.password)
       res.status(200).send(users)
    } catch (err) {
        res.status(400).send(err)
    }
}

