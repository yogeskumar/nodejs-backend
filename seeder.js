const axios = require('axios');
const Product = require('./product');

const seedDatabase = async () => {
    try {
        const isSeeded = await Product.exists();

        if (isSeeded) {
            console.log('Database already seeded');
            return
        }
        const response = await axios.get('https://s3.amazonaws.com/roxiler.com/product_transaction.json');
        const products = response.data;

        await Product.insertMany(products);
        console.log('Database seeded');
    } catch (error) {
        console.error('Error seeding database', error);
    }
};

module.exports = seedDatabase;
