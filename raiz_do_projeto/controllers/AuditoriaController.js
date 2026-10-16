import { EquipamentoModel } from '../models/EquipamentoModel.js';
import { TecnicoModel } from '../models/TecnicoModel.js';
 
export class AuditoriaController {
  static gerarRelatorioGeral() {
    try {
      const equipamentos = EquipamentoModel.listarInventario();
      const tecnicos = TecnicoModel.listarEquipe();
 
      return {
        status: 200,
       
        //data e hora atuais em formato brasileiro
        resumo: {
          totalEquipamentos: equipamentos.length,
          totalTecnicos: tecnicos.length
        },
        detalhes: {
          inventarioEquipamentos: equipamentos,
          equipeTecnicos: tecnicos
        }
      };
    } catch (error) {
      return {
        status: 500,
        erro: `Erro ao gerar relatório de auditoria: ${error.message}`
      };
    }
  }
}