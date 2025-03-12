const express = require('express');
const cors = require('cors');
const reservasRoutes = require('./routes/reservas');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/reservas', reservasRoutes);

app.listen(PORT, () => {
    console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
});
