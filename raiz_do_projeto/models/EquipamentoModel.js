import { EquipamentoModel } from "../models/EquipamentoModel"; 

export class EquipamentoController {
    constructor() {}
processarEntradaEquipamento(tagPatrimonio, tipoEquipamento, capacidadeRam) {
    try {
        console.log(`\n[TECH PRIME] Iniciando entrada...`);
        
    const equipamento = EquipamentoModel.registrarAtivo(tagPatrimonio, tipoEquipamento, capacidadeRam);

        console.log(`[TECH PRIME] Registro feito com sucesso!`);
        console.log(`[TECH PRIME] Tag: ${equipamento.tagPatrimonio} || Tipo: ${equipamento.tipoEquipamento} | RAM: ${equipamento.capacidadeRam}GB`);
    } 
    catch (erroCapturado ) {
        console.log(`[TECH PRIME] Erro identificado no equipamento`);
        this.traduzirErro(erroCapturado.message);
    }
}
consultarCatalogo() {
    const inventario = EquipamentoModel.listarInventario();

    console.log(`\n[TECH PRIME] === CATÁLOGO DE EQUIPAMENTOS ===`);

    if (inventario.length === 0) {
        console.log(`[TECH PRIME] Nenhum equipamento cadastrado.`);
        return;
    }

    for (let i=0; i < inventario.length; i++) {
        const equipamento = inventario[i];
        console.log(`${i+1}. Tag: ${equipamento.tagPatrimonio} | Tipo: ${equipamento.tipoEquipamento} | RAM: ${equipamento.capacidadeRam}GB`);
    }
}
    traduzirErro(codigoErro) {
        if (codigoErro === "ERR_RAM_INSUFICIENTE") {
            console.log(`[TECH PRIME] A memória RAM da máquina tem uma quantidade insuficiente de RAM`);
        }
        else if (codigoErro === "ERR_TAG_VAZIA") {
            console.log(`[TECH PRIME] A Tag de Patrimônio está vazia!`);
        }
    }
}