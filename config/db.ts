import mongoose from "mongoose";
import config from 'config';
import Logger from './logger';


const connect = async() => {
  
  const dbUri = config.get<string>("dbUri");

  try {

    await mongoose.connect(dbUri);
    Logger.info("Banco de dados conectado com sucesso!");
    
  } catch (e) {
    Logger.error("Não foi possível se conectar ao banco de dados");
    Logger.error(`Erro: ${e}`);
    process.exit(1);
  }
}

export default connect;