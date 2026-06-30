const fs = require('fs');
const path = require('path');

// @route   GET /api/logs
// @access  superadmin
const getLogs = async (req, res) => {
  try {
    const logPath = path.join(__dirname, '..', 'logs', 'error.log');

    if (!fs.existsSync(logPath)) {
      return res.json({ logs: [] });
    }

    const fileContent = fs.readFileSync(logPath, 'utf-8');
    const lines = fileContent.trim().split('\n').filter(Boolean);

    const logs = lines.map((line) => {
      try {
        return JSON.parse(line);
      } catch {
        return null;
      }
    }).filter(Boolean);

    // جدیدترین‌ها اول
    logs.reverse();

    res.json({ total: logs.length, logs });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @route   DELETE /api/logs
// @access  superadmin
const clearLogs = async (req, res) => {
  try {
    const logPath = path.join(__dirname, '..', 'logs', 'error.log');

    if (fs.existsSync(logPath)) {
      fs.writeFileSync(logPath, '');
    }

    res.json({ message: 'لاگ‌ها پاک شدند' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getLogs, clearLogs };