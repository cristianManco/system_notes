export const dbConfig = () => {
    const db = {
      connection: process.env.DB_CONNECTION,
      host_local: process.env.DB_HOST_LOCAL,
      host_remote: process.env.DB_HOST_REMOTE,
      name_local: process.env.DB_NAME_LOCAL,
      name_remote: process.env.DB_NAME_REMOTE,
      user: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
    };
    const env = process.env.ENVIRONMENT || 'local';
    
    const uriDb = env === 'local'
      ? `mongodb+srv://${db.user}:${db.password}${db.host_remote}/${db.name_remote}?retryWrites=true&w=majority`
      : `mongodb+srv://${db.user}:${db.password}${db.host_remote}/${db.name_remote}?retryWrites=true&w=majority`;
    
    return { uri: uriDb };
};
  