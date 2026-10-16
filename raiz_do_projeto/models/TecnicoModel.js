export class TecnicoModel {
  #nomeCompleto;
  #credencialAcesso;
  #turnoTrabalho;
 
  static #equipe = [];
 
  constructor(nomeCompleto, credencialAcesso, turnoTrabalho) {
    this.#nomeCompleto = nomeCompleto;
    this.#credencialAcesso = credencialAcesso;
    this.#turnoTrabalho = turnoTrabalho;
  }
 
  static contratarTecnico(nomeCompleto, credencialAcesso, turnoTrabalho) {
    if (!credencialAcesso || credencialAcesso.trim() === '') {
      throw new Error(
        'Regra de Segurança Violada: A credencial de acesso é obrigatória e não pode ficar em branco.'
      );
    }
 
    const turnosValidos = ['Manhã', 'Tarde', 'Noite'];
    const turnoFormatado = String(turnoTrabalho || '').trim();
    const turnoValido = turnosValidos.find(
      (t) => t.toLowerCase() === turnoFormatado.toLowerCase()
      //t serve para verificar se o turno informado é válido, caso contrário, será lançada uma exceção
    );
    if (!turnoValido) {
      throw new Error('Regra de Segurança Violada: Turno inválido.');
    }
 
    const novoTecnico = new TecnicoModel(
      nomeCompleto ? nomeCompleto.trim() : 'Não Informado',
       // ? serve para verificar se o nomeCompleto é válido, caso contrário, aparecerá "Não Informado"
      credencialAcesso.trim(),
      turnoValido
    );
 
    TecnicoModel.#equipe.push(novoTecnico);
    return novoTecnico;
  }
 
  static listarEquipe() {
    return [...TecnicoModel.#equipe];
  }
 
  get nomeCompleto() {
    return this.#nomeCompleto;
  }
 
  get credencialAcesso() {
    return this.#credencialAcesso;
  }
 
  get turnoTrabalho() {
    return this.#turnoTrabalho;
  }
  
  toJSON() {
    return {
      nomeCompleto: this.#nomeCompleto,
      turnoTrabalho: this.#turnoTrabalho
    };
  }
}
