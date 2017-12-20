import * as path from 'path';
import { Sequelize } from 'sequelize-typescript';

const sequelize = new Sequelize({
  dialect: 'postgres',
  url: process.env.POSTGRES_URL,
  modelPaths: [path.join(__dirname, 'models')]
});

sequelize.sync();

export default sequelize;
