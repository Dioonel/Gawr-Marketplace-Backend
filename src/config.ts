import { registerAs } from "@nestjs/config";

export default registerAs('config', () => {
  return {
    db: {
      user: process.env.MONGO_USER,
      password: process.env.MONGO_PASSWORD
    }
  }
});
