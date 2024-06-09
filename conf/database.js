const mongoose = require('mongoose');

const connectDB = async () => {
    try {
      url = 'mongodb+srv://jrvn:8IomPIKpnA44Jufg@cluster0.d6xrlh1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
      await mongoose.connect(url);
      console.log('MongoDB conectado...');
    } catch (err) {
      console.error(err.message);
      process.exit(1); // Saída do processo com falha
    }
  };
  
  module.exports = connectDB;