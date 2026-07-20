import dotenv from 'dotenv';

dotenv.config({
  path: process.env.NODE_ENV === 'production' ? './.env.production' : './.env.development',
});

const config = {
  apiUrl: process.env.API_URL,
  useMocks: process.env.USE_MOCKS === "true",
  pseudo: process.env.FAKE_PSEUDO,
  mdp: process.env.FAKE_MDP,
};

export default config;