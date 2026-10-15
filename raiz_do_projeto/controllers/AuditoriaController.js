import EquipamentoModel from '../models/EquipamentoModel.js';
import TecnicoModel from '../models/TecnicoModel.js';

class AuditoriaController {
  gerarRelatorioGeral() {
    try {
      const equipamentos = EquipamentoModel.listarInventario();
      const tecnicos = TecnicoModel.listarEquipe();
      const relatorio = {
        dataGeracao: new Date().toLocaleString('pt-BR'),
        resumo: {
          totalEquipamentos: equipamentos.length,
          totalTecnicos: tecnicos.length
        },
        detalhes: {
          inventarioEquipamentos: equipamentos,
          equipeTecnicos: tecnicos
        }
      };

      console.log('\n=== RELATÓRIO DE AUDITORIA GERAL ===');
      console.log(JSON.stringify(relatorio, null, 2));
    } catch (error) {
      console.error(`Erro ao gerar relatório de auditoria: ${error.message}`);
    }
  }
}
export default new AuditoriaController();