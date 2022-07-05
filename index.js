const express = require('express')
const mongoose = require('mongoose')
const app = express()
const RestaurantModel = require('./models/restaurant')
const cors = require('cors')
const FeedBack = require('./models/feedback')

app.use(express.json())
app.use(cors())

mongoose.connect('mongodb+srv://dbArman:dbArman@restaurants.zjz05.mongodb.net/test', {
    useNewUrlParser: true
})

// app.get('/', async (req, res) => {
//     const restaurant = new RestaurantModel({
//         name: "Yeraz Restaurant",
//         rate: 4, serviceOptions: "Dine-in · Takeaway", address: "Tbilisyan Hwy, Yerevan", phone: "041 262262"
//     })
//
//     try {
//         await restaurant.save()
//
//     } catch (err) {
//         console.log(err)
//     }
// })

app.get('/restaurants', (req, res) => {
    RestaurantModel.find({}, (result, err) => {
        if (err) {
            res.send(err)
        } else {
            res.send(result)
        }
    }).sort('rate')
})

app.get('/restaurant/:id', async (req, res) => {
    return res.send(await RestaurantModel.findOne({_id: req.params.id}))
})

app.post('/sendFeedback/:id', async (req, res) => {
    const { rate, message } = req.body
    const id = req.params.id

    try {
        const feedBack = await FeedBack.create({
            restaurant: id,
            rate,
            message
        })

        const feedBackList = await FeedBack.find({ restaurant: id })
        if (feedBackList.length) {
            let total = 0
            feedBackList.forEach(item => total += item.rate)
            if ((total / feedBackList.length) > 0) {
                await RestaurantModel.updateOne({_id: id}, { rate: total / feedBackList.length })
            }
        } else {
            await  RestaurantModel.updateOne({_id: id}, { rate })
        }

        return res.send({ message: 'ok', data: feedBack })
    } catch(e) {
        res.status(500).send({ message: 'Something went wrong' })
    }
})

app.get('/feedback/:id', async (req, res) => {
    const feedback = await FeedBack.find({
        restaurant: req.params.id
    })
    return res.send({message: 'list', data: feedback})
})

app.listen(3001, () => {
    console.log('Server running on port 3001...')
})
