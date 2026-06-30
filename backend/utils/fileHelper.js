const fs = require('fs');
const path = require('path');

const deleteFile = (filename) => {
  if (!filename) return;

  const filePath = path.join(__dirname, '..', 'uploads', filename);

  fs.unlink(filePath, (err) => {
    if (err && err.code !== 'ENOENT') {
      console.error('خطا در حذف فایل:', err.message);
    }
  });
};

const deleteFiles = (filenames) => {
  if (!filenames || filenames.length === 0) return;
  filenames.forEach((filename) => deleteFile(filename));
};

module.exports = { deleteFile, deleteFiles };