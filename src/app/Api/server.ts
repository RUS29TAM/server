import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
const port = 5000;
app.use(cors());
app.use(bodyParser.json());

// Подключение к базе данных MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/wordsdatabase', {
    // useNewUrlParser: true,
    // useUnifiedTopology: true
}).then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB...', err));

// Определение схемы и модели
const formSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String
});

const FormModel = mongoose.model('Form', formSchema);

// Маршрут для обработки формы
app.post('/api/form', async (req, res) => {
    const formData = new FormModel(req.body);

    try {
        const savedData = await formData.save();
        res.status(200).send(savedData);
    } catch (error) {
        res.status(500).send('Error saving data');
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
