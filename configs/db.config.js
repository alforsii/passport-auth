const mongoose = require('mongoose');
// MongoDB connection with mongoose
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then((db) =>
    console.log(`MongoDB connected. Database name ${db.connections[0].name}`)
  )
  .catch((err) => console.log(`Error with mongoDB connection ${err}`));
