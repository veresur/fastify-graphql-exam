const { StatusCodes } = require("http-status-codes");
const S = require("fluent-json-schema");
const db = require("../models");
const { Sequelize, sequelize } = db;
const { ValidationError, DatabaseError, Op } = Sequelize;
// TODO: Importáld a modelleket
// const { /* modellek importálása itt */ } = db;
const { Player, Result, Team } = require("../models");

module.exports = function (fastify, opts, next) {
    // http://127.0.0.1:4000/
    fastify.get("/", async (request, reply) => {
        reply.send({ message: "Gyökér végpont" });

        // NOTE: A send alapból 200 OK állapotkódot küld, vagyis az előző sor ugyanaz, mint a következő:
        // reply.status(200).send({ message: "Gyökér végpont" });

        // A 200 helyett használhatsz StatusCodes.OK-ot is (így szemantikusabb):
        // reply.status(StatusCodes.OK).send({ message: "Gyökér végpont" });
    });

    // http://127.0.0.1:4000/auth-protected
    fastify.get("/auth-protected", { onRequest: [fastify.auth] }, async (request, reply) => {
        reply.send({ user: request.user });
    });

    fastify.get('/players', async (request, reply) => {
        const players = await Player.findAll({where: {'active': true}, attributes: ['id', 'name', 'age'], order: [['name', 'ASC']]});
        return reply.send(players);
    });

    fastify.get(
        "/players/:id",
        {
            schema: {
                params: {
                    type: "object",
                    properties: {
                        id: { type: "integer" },
                    },
                },
            },
        },
        async (request, reply) => {
            const player = await Player.findByPk(request.params.id);
            if (!player) return reply.status(404).send({ message: "Player not found." });
            const results = await player.getResults();
            var max = results[0].score;
            results.forEach(result => {if (result.score > max) max = result.score});
            player.dataValues.personalBest = max;
            return reply.send(player);
        }
    );

    fastify.post(
        "/players",
        {
            schema: {
                body: {
                    type: "object",
                    required: ["name", "email", "age", "TeamId"],
                    properties: {
                        name: { type: "string" },
                        email: { type: "string" },
                        age: { type: "integer" },
                        active: { type: "boolean", nullable: true, default: true },
                        TeamId: { type: "integer" },
                    },
                },
            },
        },
        async (request, reply) => {
            try {
                const team = await Team.findByPk(request.body.TeamId);
                if (!team) {
                    return reply.status(404).send('NOT FOUND');
                }

                const player = await Player.create(request.body);
                return reply.status(201).send(player);
            } catch (error) {
                return reply.status(409).send({ message: "Email must be unique." });
            }
        }
    );

    fastify.post(
        "/login",
        {
            schema: {
                body: {
                    type: "object",
                    required: ["email"],
                    properties: {
                        email: { type: "string" },
                    },
                },
            },
        },
        async (request, reply) => {
            const { email } = request.body;
            const user = await Player.findOne({ where: { email } });
            if (!user) return reply.status(404).send({ message: "Player not found." });
            const token = fastify.jwt.sign(user.toJSON());
            return reply.send({ token });
        }
    );

    fastify.get("/my-team", { onRequest: [fastify.auth] }, async (request, reply) => {
        console.log(request.user);
        var team = await Team.findOne({where: {'Id': request.user.TeamId}});
        console.log(team);
        var players = await Player.findAll({where: {'TeamId': team.dataValues.id}});
        
        for (let i = 0; i < players.length; i++) {
            delete players[i].dataValues.TeamId;
        }

        team.dataValues.Players = players;
        return reply.send(team.dataValues);

        //return reply.send(await presenter.getPresentations());
    });

    fastify.get("/stats", async (request, reply) => {
        const activePlayers = await Player.findAll({where: {'active': true}});
        const totalActivePlayers = activePlayers.length;

        const teams = await Team.findAll();
        var maxActivePlayers = 0;
        teams.forEach(async team => {
            const teamPlayers = await Player.findAll({where: {'TeamId': team.id}});
            const activePlayersOfTeam = teamPlayers.length;
            maxActivePlayers = activePlayersOfTeam > maxActivePlayers ? activePlayersOfTeam : maxActivePlayers;
        })

        const results = await Result.findAll({order: [['score', 'DESC']], where: {'verifiedAt': {[Op.not]: null}}})

        const player = await Player.findByPk(results[0].dataValues.PlayerId);
        const team = await Team.findByPk(player.dataValues.TeamId);

        reply.send({
            totalActivePlayers,
            maxActivePlayers,
            highestVerifiedScore: results[0].score,
            highestScoringTeam: team.dataValues.name
        });
    });

    next();
};

module.exports.autoPrefix = "/";
