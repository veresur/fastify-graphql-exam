"use strict";

// Faker dokumentáció, API referencia: https://fakerjs.dev/guide/#node-js
const { faker } = require("@faker-js/faker");
const chalk = require("chalk");
// TODO: Importáld be a modelleket
const { Player, Result, Team } = require("../models");

module.exports = {
    up: async (queryInterface, Sequelize) => {
        // TODO: Ide dolgozd ki a seeder tartalmát:
        // ...
        const teamCount = faker.datatype.number({ min: 10, max: 30 });
        const teams = [];
        for (let i = 0; i < teamCount; i++) {
            teams.push(
                await Team.create({
                    name: faker.company.name()
                })
            );
        }

        const playerCount = faker.datatype.number({ min: 10, max: 30 });
        const players = [];
        for (let i = 0; i < playerCount; i++) {
            players.push(
                await Player.create({
                    name: faker.person.fullName(),
                    email: faker.helpers.unique(faker.internet.email),
                    age: faker.datatype.number({min: 18, max: 69}),
                    active: faker.datatype.boolean(),
                    TeamId: faker.helpers.arrayElement(teams).id
                })
            );
        }

        const resultCount = faker.datatype.number({ min: 10, max: 30 });
        const results = [];
        for (let i = 0; i < resultCount; i++) {
            results.push(
                await Result.create({
                    score: faker.datatype.number({min:0, max:999999}),
                    verifiedAt: faker.date.anytime(),
                    PlayerId: faker.helpers.arrayElement(players).id
                })
            );
        }


        console.log(chalk.green("A DatabaseSeeder lefutott"));
    },

    // Erre alapvetően nincs szükséged, mivel a parancsok úgy vannak felépítve,
    // hogy tiszta adatbázist generálnak, vagyis a korábbi adatok enélkül is elvesznek
    down: async (queryInterface, Sequelize) => {},
};
