export class EquipamentoModel {
    #tagPatrimonio;
    #tipoEquipamento;
    #capacidadeRam;
    
    //static:define métodos, propriedades ou blocos de inicialização que pertencem à própria classe, em vez de pertencerem às instâncias (objetos) criadas a partir dela.
    static #bancoFalso = [];

    constructor(tagPatrimonio, tipoEquipamento, capacidadeRam) {
        this.#tagPatrimonio = tagPatrimonio;
        this.#tipoEquipamento = tipoEquipamento;
        this.#capacidadeRam = capacidadeRam;
    }

    static registrarAtivo(capacidadeRam, tagPatrimonio, tipoEquipamento) {
        const ramMinima = 8;
        if (capacidadeRam < ramMinima) {
            throw new Error("ERR_RAM_INSUFICIENTE");
        }
        if (!tagPatrimonio || tagPatrimonio.trim() === '') {
        throw new Error("ERR_TAG_VAZIA");
        }
        
       const tiposValidos = ['Desktop', 'Notebook', 'Servidor'];
        const equipamento = tiposValidos.includes(tipoEquipamento);
        if (!equipamento) {
            throw new Error("ERR_TIPO_INVALIDO");

        }
        const novoEquipamento = new EquipamentoModel(tagPatrimonio, tipoEquipamento, capacidadeRam);
        EquipamentoModel.#bancoFalso.push(novoEquipamento);
        return novoEquipamento;

    }

    static listarInventario() {
        return [...EquipamentoModel.bancoFalso];
    }
    get tagPatrimonio() {
        return this.#tagPatrimonio
    }
    get tipoEquipamento() {
        return this.#tipoEquipamento 
    }
    get capacidadeRam() {
        return this.#capacidadeRam
    }
}


