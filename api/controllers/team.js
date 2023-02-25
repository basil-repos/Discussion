import Team from "../models/Team.js";

export const create = async (req, res, next) => {
    try {
        const newTeam = new Team(req.body);

        const team = await newTeam.save();

        res.status(200).json("Team Created Successfully");
    } catch (error) {
        next(error);
    }
}

export const getTeams = async (req, res, next) => {
    try {
        const teams = await Team.find().sort({ createdAt: -1 });
        res.status(200).json(teams);
    } catch (error) {
        next(error);
    }
}

export const getTeam = async (req, res, next) => {
    try {
        const team = await Team.findById(req.params.id);
        res.status(200).json(team);
    } catch (error) {
        next(error);
    }
}