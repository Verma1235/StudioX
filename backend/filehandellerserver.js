import express from 'express'
import multer from 'multer'
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from "url";
const app = express();
const PORT = 9999;

// ✅ 1. Uploads Folder Setup
// Ye current directory mein 'uploads' folder banayega
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// const PUBLIC_DIR = path.join(__dirname, "public");
const uploadDir = path.join(__dirname, 'uploads');

if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
    console.log("📁 Created Directory:", uploadDir);
}

// ✅ 2. Multer Storage Configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        // Unique filename: Timestamp + Original Name
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + '-' + file.originalname);
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 50 * 1024 * 1024 } // 50MB limit (Adjust as needed)
});

// ✅ 3. API Route
app.post('/upload', upload.single('file'), (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                status: 'error',
                message: 'No file received'
            });
        }

        console.log(`✅ Received: ${req.file.filename}`);

        res.status(200).json({
            status: 'success',
            message: 'File uploaded successfully',
            data: {
                fileName: req.file.filename,
                path: req.file.path,
                size: req.file.size
            }
        });
    } catch (error) {
        console.error("❌ Server Error:", error);
        res.status(500).json({ status: 'error', message: error.message });
    }
});

// ✅ 4. Health Check (To verify server is live)
app.get('/', (req, res) => {
    res.send("🚀 File Receiver API is running!");
});


// ✅ 5. Start Server
app.listen(PORT, () => {
    console.log(`-----------------------------------------`);
    console.log(`🌐 API Server: http://localhost:${PORT}`);
    console.log(`📂 Storage: ${uploadDir}`);
    console.log(`-----------------------------------------`);
});