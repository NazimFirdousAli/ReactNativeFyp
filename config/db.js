const mongoose = require('mongoose')

mongoose.connect(`mongodb+srv://admin:admin@cluster0.m13ywei.mongodb.net/?retryWrites=true&w=majority`,
    {
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
        useCreateIndex: true
    }
)
mongoose.set('useNewUrlParser', true)
mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true)
mongoose.set('useUnifiedTopology', true)

module.exports = mongoose