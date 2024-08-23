import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

const app = express();
const port = 5000;
app.use(cors());
app.use(express.json());

// Подключение к базе данных MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/wordsdatabase', {

}).then(() => console.log('Connected to MongoDB ʕっ•ᴥ•ʔっ '))
    .catch(err => console.error('Could not connect to MongoDB... ┐(￣ヘ￣)┌ ', err));

// Определение схемы и модели
const formSchema = new mongoose.Schema({
    author: String,
    age: String,
    word: String,
    description: String,
});

const FormModel = mongoose.model('Form', formSchema);

// Маршрут для обработки формы
app.post('/api/data', async (req, res) => {
    const formData = new FormModel(req.body);

    try {
        const savedData = await formData.save();
        res.status(200).send(savedData);
    } catch (error) {
        res.status(500).send('Error saving data');
    }
});

// Обработка GET-запроса для получения данных из MongoDB
app.get('/api/data', async (req, res) => {
    try {
        const data = await FormModel.find(); // Получение всех документов из коллекции
        res.json(data);
    } catch (err) {
        console.error('Ошибка при получении данных:', err);
        res.status(500).send('Server error');
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
