const response = require('../helpers/response')
const Wallet = require('../models/wallet')
const Transaction = require('../models/transaction')

const transactionUserToUser = (req, res) => {
    const {
        carrotAmount,
        transactionNote,
        user2,
        _id,
    } = req.body
    let transactionHistory1 = new Transaction({
        transactionType: 'S',
        user: _id,
        user2: user2,
        flag: 1,
        carrotAmount: carrotAmount,
        transactionNote: transactionNote
    })
    let transactionHistory2 = new Transaction({
        transactionType: 'S',
        user: user2,
        user2: _id,
        flag: 0,
        carrotAmount: carrotAmount,
        transactionNote: transactionNote
    })
    
    Wallet.findOne({
            user: _id
        }).then((data) => {
            if (data.balance < carrotAmount) {
                return response(res, 400, false, 'Transfer failed, insufficient balance')
            } else {
                transactionHistory1.save()
                transactionHistory2.save()
                    .then(transaction => {
                        return response(res, 200, true, 'Transaction success')
                    })
                    .catch(err => {
                        return response(res, 400, false, err)
                    })
            }
        })
        .catch(err => {
            return response(res, 400, false, err)
        })
}

const getUserHistory = (req, res) => {
    const {
        _id
    } = req.body
    Transaction.find({
        user: _id
    }).then((data) => {
        return response(res, 200, true, 'User transaction history', data)
    })
    .catch(err => {
        return response(res, 400, false, err)
    })
}

module.exports = {
    transactionUserToUser,
    getUserHistory
}