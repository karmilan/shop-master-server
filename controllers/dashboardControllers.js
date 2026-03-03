import Profit from '../models/profitModel.js';
import Expense from '../models/expenseModel.js';
import Credit from '../models/creditModel.js';
import Customer from '../models/customerModel.js';
import Dealer from '../models/dealerModel.js';
import Employee from '../models/employeeModel.js';
import CashPayment from '../models/cashPaymentModel.js';
import CheqPayment from '../models/cheqPaymentModel.js';
import CredPayment from '../models/credPaymentModel.js';
import mongoose from 'mongoose';

export const getDashboardStats = async (req, res) => {
    try {
        const { shopId } = req.query;
        const filter = shopId ? { shop: new mongoose.Types.ObjectId(shopId) } : {};

        // 1. Total Sales & Expenses (direct filter)
        const totalSales = await Profit.aggregate([
            { $match: filter },
            { $group: { _id: null, total: { $sum: "$amount" } } }
        ]);

        const totalExpenses = await Expense.aggregate([
            { $match: filter },
            { $group: { _id: null, total: { $sum: "$amount" } } }
        ]);

        // 2. Total Credits (Join with Customer to filter by Shop)
        const creditLookupFilter = shopId ? { "customerInfo.shop": new mongoose.Types.ObjectId(shopId) } : {};
        const totalCredits = await Credit.aggregate([
            {
                $lookup: {
                    from: 'customers',
                    localField: 'customer',
                    foreignField: '_id',
                    as: 'customerInfo'
                }
            },
            { $unwind: { path: "$customerInfo", preserveNullAndEmptyArrays: true } },
            { $match: creditLookupFilter },
            { $group: { _id: null, total: { $sum: "$amount" } } }
        ]);

        // 3. Entity Counts
        const customerCount = await Customer.countDocuments(filter);
        const dealerCount = await Dealer.countDocuments(filter);
        const employeeCount = await Employee.countDocuments(filter);

        res.status(200).json({
            totalSales: totalSales[0]?.total || 0,
            totalExpenses: totalExpenses[0]?.total || 0,
            totalCredits: totalCredits[0]?.total || 0,
            customerCount,
            dealerCount,
            employeeCount
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getChartData = async (req, res) => {
    try {
        const { shopId } = req.query;
        const filter = shopId ? { shop: new mongoose.Types.ObjectId(shopId) } : {};

        const last7Days = [];
        for (let i = 6; i >= 0; i--) {
            const date = new Date();
            date.setDate(date.getDate() - i);
            date.setHours(0, 0, 0, 0);
            last7Days.push(date);
        }

        const chartData = await Promise.all(last7Days.map(async (date) => {
            const nextDate = new Date(date);
            nextDate.setDate(date.getDate() + 1);

            const daySales = await Profit.aggregate([
                { $match: { ...filter, date: { $gte: date, $lt: nextDate } } },
                { $group: { _id: null, total: { $sum: "$amount" } } }
            ]);

            const dayExpenses = await Expense.aggregate([
                { $match: { ...filter, date: { $gte: date, $lt: nextDate } } },
                { $group: { _id: null, total: { $sum: "$amount" } } }
            ]);

            return {
                name: date.toLocaleDateString('en-US', { weekday: 'short' }),
                sales: daySales[0]?.total || 0,
                expenses: dayExpenses[0]?.total || 0
            };
        }));

        const expenseCategories = await Expense.aggregate([
            { $match: filter },
            { $group: { _id: "$category", value: { $sum: "$amount" } } }
        ]);

        const categories = expenseCategories.map(item => ({
            name: item._id,
            value: item.value
        }));

        res.status(200).json({
            timeSeries: chartData,
            categories
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getRecentActivity = async (req, res) => {
    try {
        const { shopId } = req.query;
        const dealerPopulateMatch = shopId ? { shop: new mongoose.Types.ObjectId(shopId) } : {};

        const [cashPayments, cheqPayments, credPayments] = await Promise.all([
            CashPayment.find().sort({ createdAt: -1 }).limit(20).populate({
                path: 'dealer',
                match: dealerPopulateMatch,
                select: 'name shop'
            }),
            CheqPayment.find().sort({ createdAt: -1 }).limit(20).populate({
                path: 'dealer',
                match: dealerPopulateMatch,
                select: 'name shop'
            }),
            CredPayment.find().sort({ createdAt: -1 }).limit(20).populate({
                path: 'dealer',
                match: dealerPopulateMatch,
                select: 'name shop'
            })
        ]);

        // Filter out payments where dealer didn't match the shop if shopId was provided
        const filteredCash = cashPayments.filter(p => p.dealer);
        const filteredCheq = cheqPayments.filter(p => p.dealer);
        const filteredCred = credPayments.filter(p => p.dealer);

        const activity = [
            ...filteredCash.map(p => ({ ...p._doc, type: 'Cash Payment' })),
            ...filteredCheq.map(p => ({ ...p._doc, type: 'Cheque Payment' })),
            ...filteredCred.map(p => ({ ...p._doc, type: 'Credit Payment' }))
        ].sort((a, b) => b.createdAt - a.createdAt).slice(0, 10);

        res.status(200).json(activity);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
