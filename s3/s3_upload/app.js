const express = require('express');
const AWS = require('aws-sdk');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const app = express();
const upload = multer({ dest: 'uploads/' });

// Configuration du client S3 pour MinIO
const s3 = new AWS.S3({
    endpoint: 'http://localhost:9000',
    accessKeyId: 'admin',
    secretAccessKey: 'password',
    s3ForcePathStyle: true, // Nécessaire pour MinIO
});

// Nom du bucket
const bucketName = 'mon-bucket-exemple';

// Vérifier si le bucket existe, sinon le créer
s3.headBucket({ Bucket: bucketName }, function (err, data) {
    if (err && err.code === 'NotFound') {
        s3.createBucket({ Bucket: bucketName }, function (err, data) {
            if (err) {
                console.log('Erreur lors de la création du bucket:', err);
            } else {
                console.log('Bucket créé avec succès:', data.Location);
            }
        });
    } else if (err) {
        console.log('Erreur lors de l\'accès au bucket:', err);
    } else {
        console.log('Le bucket existe déjà.');
    }
});

// Servir le fichier HTML statique
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Endpoint pour gérer l'upload du fichier
app.post('/upload', upload.single('file'), (req, res) => {
    const fileContent = fs.readFileSync(req.file.path);

    console.log('should upload to s3', req.file.originalname);
});

// Nouveau endpoint pour télécharger un fichier depuis S3
// /download/:fileName
app.get('/download/:fileName', (req, res) => {
    const fileName = req.params.fileName;
    console.log('should download from s3', fileName);
});

// Démarrer le serveur
app.listen(3000, () => {
    console.log('Serveur démarré sur http://localhost:3000');
});
