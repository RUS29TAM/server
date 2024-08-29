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
// Коллекция для хранения использованных слов
const usedWordsSchema = new mongoose.Schema({
    word: String,
});

const UsedWordsModel = mongoose.model('UsedWords', usedWordsSchema);
// Эндпоинт для проверки существования слова
app.get('/api/check-word', async (req, res) => {
    const { word } = req.query; // Получаем слово из запроса

    try {
        const existingWord = await FormModel.findOne({ word });
        if (existingWord) {
            return res.status(200).json({ exists: true });
        } else {
            return res.status(200).json({ exists: false });
        }
    } catch (err) {
        console.error('Ошибка при проверке слова:', err);
        res.status(500).send('Server error');
    }
});


// Маршрут для обработки случайного слова в игре "Угадай что сказал автор"
app.get('/api/random-word', async (req, res) => {
    try {
        // Получаем все слова
        const allWords = await FormModel.find({});
        const usedWords = await UsedWordsModel.find({});

        // Фильтруем использованные слова
        const usedWordList = usedWords.map(doc => doc.word);
        const availableWords = allWords.filter(wordDoc => !usedWordList.includes(wordDoc.word));

        // Если все слова использованы, очищаем список использованных слов
        if (availableWords.length === 0) {
            await UsedWordsModel.deleteMany({});
            return res.status(404).send('Все слова были использованы. Начинаем сначала.');
        }

        // Выбираем случайное слово
        const randomIndex = Math.floor(Math.random() * availableWords.length);
        const randomWordDoc = availableWords[randomIndex];

        // Сохраняем использованное слово
        await new UsedWordsModel({ word: randomWordDoc.word }).save();

        res.json({ word: randomWordDoc.word });
    } catch (err) {
        console.error('Ошибка при получении случайного слова:', err);
        res.status(500).send('Server error');
    }
});

// Маршрут для проверки соответствия описания случайного слова в игре "Угадай что сказал автор"
app.post('/api/check-description', async (req, res) => {
    const { word, description } = req.body;
    try {
        const wordDoc = await FormModel.findOne({ word: word });

        if (wordDoc) {
            const isCorrect = wordDoc.description === description;
            res.json({ correct: isCorrect });
        } else {
            res.status(404).send('Word not found');
        }
    } catch (err) {
        console.error('Ошибка при проверке описания:', err);
        res.status(500).send('Server error');
    }
});

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

// Обработка DELETE-запроса для удаления элемента данных по его _id
app.delete('/api/data/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const result = await FormModel.findByIdAndDelete(id); // Удаление документа по _id
        if (result) {
            res.status(200).send(`Document with id ${id} deleted`);
        } else {
            res.status(404).send('Document not found');
        }
    } catch (err) {
        console.error('Ошибка при удалении данных:', err);
        res.status(500).send('Server error');
    }
});

// Обработка PUT-запроса для изменения элемента данных по его _id
app.put('/api/data/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updatedData = req.body; // Данные для обновления
        const result = await FormModel.findByIdAndUpdate(id, updatedData, { new: true });
        if (result) {
            res.status(200).json(result);
        } else {
            res.status(404).send('Document not found');
        }
    } catch (err) {
        console.error('Ошибка при обновлении данных:', err);
        res.status(500).send('Server error');
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
