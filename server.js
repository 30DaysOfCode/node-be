var app = require('./src/app');

const PORT = process.env.PORT || 8010;

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));