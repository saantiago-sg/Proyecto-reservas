const express = require('express');
const XLSX = require('xlsx');
const fs = require('fs');

const router = express.Router();
const FILE_PATH = 'reservas.xlsx';

// 📌 Obtener todas las reservas
router.get('/', (req, res) => {
    if (!fs.existsSync(FILE_PATH)) return res.json([]);

    const workbook = XLSX.readFile(FILE_PATH);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const data = XLSX.utils.sheet_to_json(sheet);
    
    res.json(data);
});

// 📌 Crear una nueva reserva
router.post('/', (req, res) => {
    const { nombre, apellido, fecha, hora } = req.body;

    if (!nombre || !apellido || !fecha || !hora) {
        return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

    let workbook, sheet, data = [];
    if (fs.existsSync(FILE_PATH)) {
        workbook = XLSX.readFile(FILE_PATH);
        sheet = workbook.Sheets[workbook.SheetNames[0]];
        data = XLSX.utils.sheet_to_json(sheet);
    } else {
        workbook = XLSX.utils.book_new();
    }

    data.push({ ID: data.length + 1, Nombre: nombre, Apellido: apellido, Fecha: fecha, Hora: hora });

    sheet = XLSX.utils.json_to_sheet(data);
    XLSX.utils.book_append_sheet(workbook, sheet, 'Reservas');
    XLSX.writeFile(workbook, FILE_PATH);

    res.json({ message: 'Reserva creada con éxito', reserva: data });
});

// 📌 Editar una reserva
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { nombre, apellido, fecha, hora } = req.body;

    if (!fs.existsSync(FILE_PATH)) return res.status(404).json({ message: 'Archivo no encontrado' });

    const workbook = XLSX.readFile(FILE_PATH);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    let data = XLSX.utils.sheet_to_json(sheet);

    let reserva = data.find(r => r.ID == id);
    if (!reserva) return res.status(404).json({ message: 'Reserva no encontrada' });

    reserva.Nombre = nombre || reserva.Nombre;
    reserva.Apellido = apellido || reserva.Apellido;
    reserva.Fecha = fecha || reserva.Fecha;
    reserva.Hora = hora || reserva.Hora;

    sheet = XLSX.utils.json_to_sheet(data);
    XLSX.utils.book_append_sheet(workbook, sheet, 'Reservas');
    XLSX.writeFile(workbook, FILE_PATH);

    res.json({ message: 'Reserva actualizada', reserva });
});

// 📌 Eliminar una reserva
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    if (!fs.existsSync(FILE_PATH)) return res.status(404).json({ message: 'Archivo no encontrado' });

    const workbook = XLSX.readFile(FILE_PATH);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    let data = XLSX.utils.sheet_to_json(sheet);

    const newData = data.filter(r => r.ID != id);
    if (data.length === newData.length) return res.status(404).json({ message: 'Reserva no encontrada' });

    sheet = XLSX.utils.json_to_sheet(newData);
    XLSX.utils.book_append_sheet(workbook, sheet, 'Reservas');
    XLSX.writeFile(workbook, FILE_PATH);

    res.json({ message: 'Reserva eliminada' });
});

module.exports = router;
