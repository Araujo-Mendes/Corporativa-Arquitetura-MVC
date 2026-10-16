export class EquipamentoModel {
  #tagPatrimonio;
  #tipoEquipamento;
  #capacidadeRam;
 
  // static: pertence à classe, não às instâncias
  static #bancoFalso = [];
 
  constructor(tagPatrimonio, tipoEquipamento, capacidadeRam) {
    this.#tagPatrimonio = tagPatrimonio;
    this.#tipoEquipamento = tipoEquipamento;
    this.#capacidadeRam = capacidadeRam;
  }
 
  static registrarAtivo(tagPatrimonio, tipoEquipamento, capacidadeRam) {
    const ramMinima = 8;
    const ram = Number(capacidadeRam);
 
    if (!tagPatrimonio || tagPatrimonio.trim() === '') {
      throw new Error('ERR_TAG_VAZIA');
    }
 
    const tiposValidos = ['Desktop', 'Notebook', 'Servidor'];
    const tipoFormatado = String(tipoEquipamento || '').trim();
    const tipoValido = tiposValidos.find(
      (t) => t.toLowerCase() === tipoFormatado.toLowerCase()
       //toLowerCase para não diferenciar maiúsculas de minúsculas
    );
    if (!tipoValido) {
      throw new Error('ERR_TIPO_INVALIDO');
    }
 
    if (Number.isNaN(ram) || ram < ramMinima) {
      throw new Error('ERR_RAM_INSUFICIENTE');
    }
 
    const novoEquipamento = new EquipamentoModel(tagPatrimonio.trim(), tipoValido, ram);
    EquipamentoModel.#bancoFalso.push(novoEquipamento);
    return novoEquipamento;
  }
 
  static listarInventario() {
    return [...EquipamentoModel.#bancoFalso];
     //...: operador de espalhamento, cria uma cópia do array
  }
 
  get tagPatrimonio() {
    return this.#tagPatrimonio;
  }
 
  get tipoEquipamento() {
    return this.#tipoEquipamento;
  }
 
  get capacidadeRam() {
    return this.#capacidadeRam;
  }
 
  
  toJSON() {
    // Método que retorna um objeto JSON com os dados do equipamento
    return {
      tagPatrimonio: this.#tagPatrimonio,
      tipoEquipamento: this.#tipoEquipamento,
      capacidadeRam: this.#capacidadeRam
    };
    // Retorna a mensagem personalizada correspondente ao erro.
    // Se a chave não existir no objeto 'mensagens' (retornar null ou undefined),
    // o operador '??' (coalescência nula) retorna o próprio 'codigoErro'.
      return mensagens[codigoErro] ?? codigoErro;
      //
  }
}