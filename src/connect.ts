import mongoose from 'mongoose';


export default (db: string) => {
    const connect = async () => {
        await mongoose
        .connect(db, {
            useNewUrlParser: true, 
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        })
        .then(() => {
            return console.log(`Successfully connected to ${db}`);
        })
        .catch(error => {
            console.log("Error connecting to database: ", error);
            return process.exit(1);
        });
    };
    connect();

    // mongoose.connection.on("disconnected", connect);
}
