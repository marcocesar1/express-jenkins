const typeORM = require("typeorm");
const { faker } = require('@faker-js/faker');

const AppDataSource = new typeORM.DataSource({
  type: "postgres",
  host: process.env.DB_HOST || "localhost",
  port: 5432,
  username: process.env.DB_USER || "postgress",
  password: process.env.DB_PASSWORD || "password",
  database: process.env.DB_NAME || "mydb",
  synchronize: true,
  logging: false,
  entities: [require("./user")],
  subscribers: [],
  migrations: [],
});

const generateRandomUsers = async () => {
  const userRepo = AppDataSource.getRepository("User");

  const users = await userRepo.find();
  if (users.length) return;

  function createRandomUser() {
    return {
      name: faker.internet.userName(),
      email: faker.internet.email(),
    };
  }

  const USERS = faker.helpers.multiple(createRandomUser, {
    count: 10,
  });

  for (let index = 0; index < USERS.length; index++) {
    const element = USERS[index];

    await userRepo.save(element);
  }
};

module.exports = { AppDataSource, generateRandomUsers };
