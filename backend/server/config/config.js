// NODE SERVER PORT
process.env.PORT = process.env.PORT || 3000;

// URL CONNECTION MONGODB
process.env.URL_DB = 'mongodb+srv://task-definition:BIWICks6DhzuEj6P@cluster0.npidi.mongodb.net/task-definition';


// SEED
process.env.SEED = 'f3-42trfef-4224wh-5y5rh3w3-$-%-TQ-$T-';

// END TOKEN
process.env.END_TOKEN = 60;


//Facebook credentials
process.env.CLIENT_ID = 163519308853119;
process.env.CLIENT_SECRET = '30e58b285061ef48c4f355863564d163';
process.env.CALLBACK_FB = 'http://localhost:3000/auth/facebook/task';