const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// Thư mục gốc chứa ảnh (đầu vào)
const INPUT_DIR = path.join(__dirname, 'input');
// Thư mục lưu webp (đầu ra)
const OUTPUT_DIR = path.join(__dirname, 'output');

// Tạo folder output nếu chưa tồn tại
if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR);
}

// Lấy danh sách file trong input
typeof fs.readdir === 'function' && fs.readdir(INPUT_DIR, (err, files) => {
    if (err) return console.error('Error reading input directory:', err);

    files.forEach(file => {
        const ext = path.extname(file).toLowerCase();
        if (ext === '.jpg' || ext === '.jpeg' || ext === '.png') {
            const inputPath = path.join(INPUT_DIR, file);
            const outputFile = path.basename(file, ext) + '.webp';
            const outputPath = path.join(OUTPUT_DIR, outputFile);

            sharp(inputPath)
                .webp({ quality: 80 })       // quality: 0-100
                .toFile(outputPath)
                .then(() => console.log(`Converted: ${file} → ${outputFile}`))
                .catch(err => console.error(`Error converting ${file}:`, err));
        }
    });
});