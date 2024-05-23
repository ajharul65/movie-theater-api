const express = require("express")
const port = 3000;
const app = express();
const userRoutes = require('./routes/users');
const showRoutes = require('./routes/shows');

app.use(express.json())
app.use(express.urlencoded({extended: true}));

app.use('/users', userRoutes);
app.use('/shows', showRoutes);
// const { User, Show } = require('./models')
// Express Routes

// const userrouter = require('./routes/users')


app.listen(port, () => {
    console.log(`App listening on http://localhost:${port}`)
})
