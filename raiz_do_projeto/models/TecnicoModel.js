export class TecnicoModel {
    static #equipe=[];
    constructor(nomeCompleto, credencialAcesso, turnoTrabalho) {
        this.nomeCompleto = nomeCompleto;
        this.credencialAcesso = credencialAcesso;
        this.turnoTrabalho = turnoTrabalho;
    }
    static contratarTecnico(nomeCompleto, credencialAcesso, turnoTrabalho){
        if(!credencialAcesso || credencialAcesso.trim() === "") {
            throw new Error("Regra de Segurança Violada: A credencial de acesso é obrigatória e não pode ficar em branco.");
        }
        const turnoValidos=["Manhã", "Tarde", "Noite"];
        const turnoFormatado = String(turnoTrabalho || "").trim();
        const turnoValido = turnoValidos.find(
            (t) => t.toLowerCase() === turnoFormatado.toLowerCase()
        );
        if(!turnoValido){
            throw new Error("Regra de Segurança Violada: Turno inválido.");
        }
        const novoTecnico = new TecnicoModel(
            nomeCompleto ? nomeCompleto.trim() : "Não Informado",
            credencialAcesso.trim(),
            turnoValido
    );

        TecnicoModel.#equipe.push(novoTecnico);
    return novoTecnico;
  }

  static listarEquipe() {
    return [...TecnicoModel.#equipe];
  }
}