import Job from "../models/JobModel.js";
import { Response } from "express";
import { StatusCodes } from "http-status-codes";
import { AuthenticatedRequest } from "../middleware/authMiddleware.js";
import mongoose, { QueryOptions } from "mongoose";
import day from "dayjs";

type sortType = "newest" | 'oldest' | 'a-z' | 'z-a'

export const getAllJobs = async (req: AuthenticatedRequest, res: Response) => {
    console.log(req.query.search);
    const { search, jobStatus, jobType, sort } = req.query;

    const queryObject: QueryOptions = {
        createdBy: req.user?.userId
    };

    if (search) {
        queryObject.$or = [
            { position: { $regex: search, $options: "i" } },
            { company: { $regex: search, $options: "i" } },
        ];
    }

    if(jobStatus && jobStatus !== 'all') {
        queryObject.jobStatus = jobStatus
    }

    if(jobType && jobType !== 'all') {
        queryObject.jobType = jobType
    }

    const sortOptions = {
        newest: '-createdAt',
        oldest: 'createdAt',
        'a-z': 'position',
        'z-a': '-position'
    }

    const sortKey = sort ? sortOptions[sort as sortType] : sortOptions.newest

    // setup pagination
    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 5
    const skip = (page - 1
        ) * limit

    const jobs = await Job.find(queryObject).sort(sortKey).skip(skip).limit(limit);

    const totalJobs = await Job.countDocuments(queryObject)
    const numOfPages = Math.ceil(totalJobs / limit)
    res.status(StatusCodes.OK).json({ totalJobs, numOfPages, jobs, currentPage: page });
};

export const createJob = async (req: AuthenticatedRequest, res: Response) => {
    req.body.createdBy = req.user?.userId;
    const job = await Job.create(req.body);
    res.status(StatusCodes.CREATED).json(job);
};

export const getSingleJob = async (
    req: AuthenticatedRequest,
    res: Response
) => {
    const job = await Job.findById(req.params.id);

    res.status(StatusCodes.OK).json(job);
};

export const updateJob = async (req: AuthenticatedRequest, res: Response) => {
    const updatedJob = await Job.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    });

    res.status(StatusCodes.OK).json({ msg: "job modified", updatedJob });
};

export const deleteJob = async (req: AuthenticatedRequest, res: Response) => {
    const removedJob = await Job.findByIdAndDelete(req.params.id);

    res.status(StatusCodes.OK).json({
        msg: `job position:${removedJob!.position} was deleted`,
    });
};

export const showStats = async (req: AuthenticatedRequest, res: Response) => {
    let stats: StatsAggregationType[] | StatsReducerType = await Job.aggregate([
        {
            $match: {
                createdBy: new mongoose.Types.ObjectId(req.user?.userId),
            },
        },
        {
            $group: {
                _id: "$jobStatus",
                count: { $sum: 1 },
            },
        },
    ]);

    stats = stats.reduce((acc, curr) => {
        const { _id: title, count } = curr;
        acc[title] = count;
        return acc;
    }, {} as Record<string, number>) as StatsReducerType;

    const defaultStats = {
        pending: stats.pending || 0,
        interview: stats.interview || 0,
        declined: stats.declined || 0,
    };

    let monthlyApplications = await Job.aggregate([
        {
            $match: {
                createdBy: new mongoose.Types.ObjectId(req.user?.userId),
            },
        },
        {
            $group: {
                _id: {
                    year: { $year: "$createdAt" },
                    month: { $month: "$createdAt" },
                },
                count: { $sum: 1 },
            },
        },
        { $sort: { "_id.year": -1, "_id.month": -1 } },
        { $limit: 6 },
    ]);

    monthlyApplications = monthlyApplications.map((item) => {
        const {
            _id: { year, month },
            count,
        } = item;
        return {
            date: day().year(year).month(month).format("MMM YY"),
            count,
        };
    });

    res.status(StatusCodes.OK).json({ defaultStats, monthlyApplications });
};

type StatsAggregationType = { _id: string; count: number };
export type MonthlyApplicationsType = { date: string; count: number };
export type StatsReducerType = {
    pending: number;
    interview: number;
    declined: number;
};

export type StatsResponseType = {
    defaultStats: StatsReducerType;
    monthlyApplications: MonthlyApplicationsType[];
};
