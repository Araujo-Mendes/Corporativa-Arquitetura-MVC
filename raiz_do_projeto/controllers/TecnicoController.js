import { TecnicoModel } from '../models/TecnicoModel.js';
 
export class TecnicoController {
  static processarAdmissao(nomeCompleto, credencialAcesso, turnoTrabalho) {
    try {
      const tecnicoSalvo = TecnicoModel.contratarTecnico(
        nomeCompleto,
        credencialAcesso,
        turnoTrabalho
      );
 
      return {
        status: 201,
        mensagem: 'Técnico de suporte admitido com sucesso',
        dados: tecnicoSalvo
      };
    } catch (error) {
      return {
        status: 400,
        erro: error.message
      };
    }
  }
 
  static consultarEquipe() {
    return TecnicoModel.listarEquipe();
  }
}
 
