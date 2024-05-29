import prisma from '../db/index.js';

export const getAllTransaction = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 25;
        const skip = (page - 1) * limit;
        const search = req.query.search || '';
        const prnum = req.query.PR_NUM || '';
        const desc = req.query.DESCRIPTION || '';
        const value = parseFloat(req.query.TotalValue) || 0;
        const prStatus = req.query.PR_STATUS || '';
        const dateFrom = req.query.dateFrom;
        const dateTo = req.query.dateTo;

        const whereClause = {
            AND: [],
            OR: []
        };

        if (search) {
            whereClause.OR.push({ DESCRIPTION: { contains: search} });
            whereClause.OR.push({ PR_NUM: { contains: search  } });
            whereClause.OR.push({ PR_STATUS: { contains: search } });
            whereClause.OR.push({ TotalValue: parseFloat(search) });
        }

        if (desc) {
            whereClause.AND.push({ DESCRIPTION: { contains: desc } });
        }

        if (prStatus) {
            whereClause.AND.push({ PR_STATUS: prStatus });
        }

        if (value) {
            whereClause.AND.push({ TotalValue: value });
        }

        if (dateFrom && dateTo) {
            whereClause.AND.push({ ENTERDATE: { gte: new Date(dateFrom), lte: new Date(dateTo) } });
        } else if (dateFrom) {
            whereClause.AND.push({ ENTERDATE: { gte: new Date(dateFrom) } });
        } else if (dateTo) {
            whereClause.AND.push({ ENTERDATE: { lte: new Date(dateTo) } });
        }

        if (prnum.length > 0) {
            whereClause.AND.push({ PR_NUM: { contains: prnum } });
        }

        if (whereClause.OR.length === 0) {
            delete whereClause.OR;
        }

        const transactions = await prisma.tBL_PRMASTER.findMany({
            skip: skip,
            take: limit,
            where: whereClause,
        });

        const totalTransactions = await prisma.tBL_PRMASTER.count({
            where: whereClause,
        });

        const totalPages = Math.ceil(totalTransactions / limit);
        const currentPage = Math.ceil(skip / limit) + 1;
        const hasPrevPage = currentPage > 1;
        const hasNextPage = currentPage < totalPages;

        return res.status(200).json({
            message: "PRMASTER Data Fetched Successfully",
            data: transactions,
            pagination: {
                currentPage: currentPage,
                pageSize: limit,
                totalDocs: totalTransactions,
                totalPages: totalPages,
                hasPrevPage: hasPrevPage,
                hasNextPage: hasNextPage
            }
        });

    } catch (error) {
        console.error(error);
        return res.status(400).json({
            error: error.message || "An error occurred while fetching transactions",
        });
    }
};







    export const createTransaction = async (req, res, next) => {
        try {
            const data = req.body;

            // if(data.ENTERDATE){
            //     const fomattedDate = new Date(data.ENTERDATE).toISOString()
            // }

            const newTransaction = await prisma.tBL_PRMASTER.create({ data });
            res.status(201).json({
                message: "PRMASTER Data Created Successfully",
                data: newTransaction,
            });
        } catch (error) {
            console.log(error);
            res.status(400).json({
                error: error.message || "An error occurred while creating the transaction",
            });
        }
    };





