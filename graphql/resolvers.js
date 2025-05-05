const auth = require("./auth");
const db = require("../models");
const { Sequelize, sequelize } = db;
const { ValidationError, DatabaseError, Op } = Sequelize;
// TODO: Importáld a modelleket
// const { /* modellek importálása itt */ } = db;
const { Player, Result, Team } = require("../models");

module.exports = {
    Query: {
        // Elemi Hello World! példa:
        helloWorld: () => "Hello World!",

        // Példa paraméterezésre:
        helloName: (_, { name }) => `Hello ${name}!`,

        // TODO: Dolgozd ki a további resolver-eket a schema-val összhangban
        players: async (_, {activeOnly}) => {
            return activeOnly ? await Player.findAll({where: {'active': true}}) : await Player.findAll();
        },
        player: async (_, {id}) => {
            const player = await Player.findByPk(id);
            if (!player) return null;
            return player;
        },
        intervals: async () => {
            var intervals = [];
            for (let i = 0; i < 999999; i += 10000) {
                const results_in_interval = await Result.findAll({where: {'verifiedAt': {[Op.not]: null}, 'score': {[Op.between]: [i, i+10000]}}});
                const interval = {
                    lower: i,
                    upper: i+9999,
                    count: results_in_interval.length
                };
                intervals.push(interval);
            }

            return intervals;
        }
    },
    Player: {
        teamName: async (player) => {
            const team = await Team.findByPk(player.TeamId);
            return team.name;
        },
        scores: async (player) => {
            const results = await Result.findAll({where: {'PlayerId': player.id}});
            const scores = [];
            results.forEach(result => scores.push(result.score))
            return scores;
        }
    },
    Mutation: {
        createResult: async (_, {playerEmail, score, verified}) => {
            const player = await Player.findOne({where: {'email': playerEmail}});
            if (!player) return 'PLAYER NOT FOUND';

            if (score < 0 || score > 999999) return 'INVALID SCORE';

            const result = await Result.create({
                PlayerId: player.id,
                verifiedAt: verified ? Date.now() : null,
                score: score
            })

            console.log(result.dataValues);

            return result.dataValues.id;
        },
        setPlayerActive: async (_, {id, active}) => {
            const player = Player.findByPk(id);
            if (!player) return null;
            
            await Player.update({'active': active}, {where: {Id: id}});

            return Player.findByPk(id);
        }
    }
};
