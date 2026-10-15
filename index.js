import readline from 'readline';
import EquipamentoController from '.EquipamentoController.js';
import TecnicoController from '.TecnicoController.js';
import AuditoriaController from '.AuditoriaController.js';

const rl = readline.createInterface({input, output});

const question = (query) => new Promise((resolve) => rl.question(query, resolve));

async function exibirMenu() {

  while (true) {
    console.log('========================================');
    console.log('  SISTEMA DE GERENCIAMENTO DE EQUIPAMENTOS E TÉCNICOS');
    console.log('========================================');
    console.log('1 - Cadastrar Equipamento');
    console.log('2 - Listar Equipamentos');
    console.log('3 - Cadastrar Técnico');
    console.log('4 - Listar Técnicos');
    console.log('5 - Relatório de Auditoria Geral');
    console.log('0 - Sair do Sistema');

    const opcao = await question('Escolha uma opção: ');

    switch (opcao) {
      case '1': {
        console.log('\n--- Cadastro de Equipamento ---');
        const tipo = await question('Tipo (Desktop/Notebook/Servidor): ');
        const tag = await question('Tag de Patrimônio: ');
        const ram = await question('Capacidade de RAM (GB): ');
        
        const resultado = EquipamentoController.processarEntradaEquipamento(tag, tipo, ram);
        console.log('Resposta:', JSON.stringify(resultado, null, 2));
        break;
      }

      case '2': {
        console.log('--- Lista de Equipamentos ---');
        const lista = EquipamentoController.consultarCatalogo();
        console.log(JSON.stringify(lista, null, 2));
        break;
      }

      case '3': {
        console.log('--- Cadastro de Técnico ---');
        const nome = await question('Nome Completo: ');
        const credencial = await question('Credencial de Acesso: ');
        const turno = await question('Turno (Manhã/Tarde/Noite): ');

        const resultado = TecnicoController.processarAdmissao(nome, credencial, turno);
        console.log('Resposta:', JSON.stringify(resultado, null, 2));
        break;
      }

      case '4': {
        console.log('--- Lista de Técnicos ---');
        const lista = TecnicoController.consultarEquipe();
        console.log(JSON.stringify(lista, null, 2));
        break;
      }

      case '5': {
        console.log('--- Relatório de Auditoria Geral ---');
        const relatorio = AuditoriaController.gerarRelatorioGeral();
        console.log(JSON.stringify(relatorio, null, 2));
        break;
      }

      case '0':
        console.log('Encerrando o sistema...');
        rl.close();
        return;

      default:
        console.log('Opção inválida! Tente novamente.');
        break;
    }
  }
}

exibirMenu();