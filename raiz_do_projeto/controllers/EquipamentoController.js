import { EquipamentoModel } from '../models/EquipamentoModel.js';
 
export class EquipamentoController {
  static processarEntradaEquipamento(tagPatrimonio, tipoEquipamento, capacidadeRam) {
    try {
      const equipamento = EquipamentoModel.registrarAtivo(
        tagPatrimonio,
        tipoEquipamento,
        capacidadeRam
      );
 
      return {
        status: 201,
        mensagem: 'Equipamento registrado com sucesso',
        dados: equipamento
      };
    } catch (erro) {
      return {
        status: 400,
        erro: EquipamentoController.traduzirErro(erro.message)
      };
    }
  }
 
  static consultarCatalogo() {
    return EquipamentoModel.listarInventario();
  }
 
  static traduzirErro(codigoErro) {
    const mensagens = {
      ERR_RAM_INSUFICIENTE: 'A RAM é inválida ou insuficiente (mínimo de 8 GB).',
      ERR_TAG_VAZIA: 'A Tag de Patrimônio está vazia.',
      ERR_TIPO_INVALIDO: 'Tipo inválido. Use Desktop, Notebook ou Servidor.'
    };
    return mensagens[codigoErro] ?? codigoErro;
  }
}