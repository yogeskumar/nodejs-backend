const express = require('express');
const Product = require('./product');
const axios = require('axios');

const router = express.Router();

// API endpoint for statistics
router.get('/statistics/:month', async (req, res) => {
    console.log("statistics api got hit")
    try {
        const { month } = req.params;
        const totalSaleAmount = await Product.aggregate([
            {
                $match: { $expr: { $eq: [{ $month: '$dateOfSale' }, parseInt(month)] } },
            },
            {
                $group: { _id: null, total: { $sum: '$price' } },
            },
        ]);

        const totalSoldItems = await Product.countDocuments({
            $expr: { $and: [{ $eq: [{ $month: '$dateOfSale' }, parseInt(month)] }, { $eq: ['$sold', true] }] },
        });

        const totalNotSoldItems = await Product.countDocuments({
            $expr: { $and: [{ $eq: [{ $month: '$dateOfSale' }, parseInt(month)] }, { $eq: ['$sold', false] }] },
        });

        res.json({ totalSaleAmount: totalSaleAmount[0].total, totalSoldItems, totalNotSoldItems });
    } catch (error) {
        console.error('Error retrieving statistics', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// API endpoint for bar chart
router.get('/bar-chart/:month', async (req, res) => {
    console.log("bar chart api got hit")
    try {
        const { month } = req.params;

        const priceRanges = [
            { min: 0, max: 100 },
            { min: 101, max: 200 },
            { min: 201, max: 300 },
            { min: 301, max: 400 },
            { min: 401, max: 500 },
            { min: 501, max: 600 },
            { min: 601, max: 700 },
            { min: 701, max: 800 },
            { min: 801, max: 900 },
            { min: 901, max: Infinity },
        ];

        const priceRangeCounts = [];
        for (const range of priceRanges) {
            const count = await Product.countDocuments({
                $expr: {
                    $and: [
                        { $eq: [{ $month: '$dateOfSale' }, parseInt(month)] },
                        { $gte: ['$price', range.min] },
                        { $lte: ['$price', range.max] },
                    ],
                },
            });
            priceRangeCounts.push(count);
        }

        res.json({ priceRanges, priceRangeCounts });
    } catch (error) {
        console.error('Error retrieving bar chart data', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// API endpoint for pie chart
router.get('/pie-chart/:month', async (req, res) => {
    console.log("statistics api got hit")
    try {
        const { month } = req.params;

        const categoryCounts = await Product.aggregate([
            {
                $match: { $expr: { $eq: [{ $month: '$dateOfSale' }, parseInt(month)] } },
            },
            {
                $group: { _id: '$category', count: { $sum: 1 } },
            },
        ]);

        res.json({ categoryCounts });
    } catch (error) {
        console.error('Error retrieving pie chart data', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// API endpoint for combined data
router.get('/combined-data/:month', async (req, res) => {
    console.log("combined api got hit")
    try {
        const { month } = req.params;

        const totalSaleAmount = await Product.aggregate([
            {
                $match: { $expr: { $eq: [{ $month: '$dateOfSale' }, parseInt(month)] } },
            },
            {
                $group: { _id: null, total: { $sum: '$price' } },
            },
        ]);

        const totalSoldItems = await Product.countDocuments({
            $expr: { $and: [{ $eq: [{ $month: '$dateOfSale' }, parseInt(month)] }, { $eq: ['$sold', true] }] },
        });

        const totalNotSoldItems = await Product.countDocuments({
            $expr: { $and: [{ $eq: [{ $month: '$dateOfSale' }, parseInt(month)] }, { $eq: ['$sold', false] }] },
        });

        const priceRanges = [
            { min: 0, max: 100 },
            { min: 101, max: 200 },
            { min: 201, max: 300 },
            { min: 301, max: 400 },
            { min: 401, max: 500 },
            { min: 501, max: 600 },
            { min: 601, max: 700 },
            { min: 701, max: 800 },
            { min: 801, max: 900 },
            { min: 901, max: Infinity },
        ];

        const priceRangeCounts = [];
        for (const range of priceRanges) {
            const count = await Product.countDocuments({
                $expr: {
                    $and: [
                        { $eq: [{ $month: '$dateOfSale' }, parseInt(month)] },
                        { $gte: ['$price', range.min] },
                        { $lte: ['$price', range.max] },
                    ],
                },
            });
            priceRangeCounts.push(count);
        }

        const categoryCounts = await Product.aggregate([
            {
                $match: { $expr: { $eq: [{ $month: '$dateOfSale' }, parseInt(month)] } },
            },
            {
                $group: { _id: '$category', count: { $sum: 1 } },
            },
        ]);

        res.json({
            totalSaleAmount: totalSaleAmount.length > 0 ? totalSaleAmount[0].total : 0,
            totalSoldItems,
            totalNotSoldItems,
            priceRanges,
            priceRangeCounts,
            categoryCounts,
        });
    } catch (error) {
        console.error('Error retrieving combined data', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});



module.exports = router;
