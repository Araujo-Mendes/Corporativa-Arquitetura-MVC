import readline from 'readline';
import { stdin as input, stdout as output } from 'process';
import { EquipamentoController } from './raiz_do_projeto/controllers/EquipamentoController.js';
import { TecnicoController } from './raiz_do_projeto/controllers/TecnicoController.js';
import { AuditoriaController } from './raiz_do_projeto/controllers/AuditoriaController.js';
 
const rl = readline.createInterface({ input, output });
 
const question = (query) => new Promise((resolve) => rl.question(query, resolve));
 
function mostrarEquipamento(e, i) {
  console.log(`${i + 1}. Tag: ${e.tagPatrimonio} | Tipo: ${e.tipoEquipamento} | RAM: ${e.capacidadeRam} GB`);
//i + 1: exibe o índice do equipamento na lista, começando de 1
//e, i: e representa o equipamento atual, i representa o índice do equipamento na lista
//e.tagPatrimonio, e.tipoEquipamento, e.capacidadeRam: exibe as informações do equipamento atual
}
 
function mostrarTecnico(t, i) {
  console.log(`${i + 1}. Nome: ${t.nomeCompleto} | Turno: ${t.turnoTrabalho}`);
  //i + 1: exibe o índice do técnico na lista, começando de 1
  //t, i: t representa o técnico atual, i representa o índice do técnico na lista
  //t.nomeCompleto, t.turnoTrabalho: exibe as informações do técnico atual
}
 
async function exibirMenu() {
  while (true) {
    console.log('\n========================================');
    console.log('  SISTEMA DE GERENCIAMENTO DE EQUIPAMENTOS E TÉCNICOS');
    console.log('========================================');
    console.log('1 - Cadastrar Equipamento');
    console.log('2 - Listar Equipamentos');
    console.log('3 - Cadastrar Técnico');
    console.log('4 - Listar Técnicos');
    console.log('5 - Relatório de Auditoria Geral');
    console.log('0 - Sair do Sistema');
 
    const opcao = (await question('Escolha uma opção: ')).trim();
 
    switch (opcao) {
      case '1': {
        console.log('\n--- Cadastro de Equipamento ---');
        const tipo = await question('Tipo (Desktop/Notebook/Servidor): ');
        const tag = await question('Tag de Patrimônio: ');
        const ram = await question('Capacidade de RAM (GB): ');
 
        const resultado = EquipamentoController.processarEntradaEquipamento(tag, tipo, ram);
        if (resultado.status === 201) {
          console.log(`\n${resultado.mensagem}`);
          console.log(`Tag: ${resultado.dados.tagPatrimonio}`);
          console.log(`Tipo: ${resultado.dados.tipoEquipamento}`);
          console.log(`RAM: ${resultado.dados.capacidadeRam} GB`);
        } else {
          console.log(`\nErro: ${resultado.erro}`);
        }
        break;
      }
 
      case '2': {
        console.log('\n--- Lista de Equipamentos ---');
        const lista = EquipamentoController.consultarCatalogo();
        if (lista.length === 0) {
          console.log('Nenhum equipamento cadastrado.');
        } else {
          lista.forEach(mostrarEquipamento);
        }
        break;
      }
 
      case '3': {
        console.log('\n--- Cadastro de Técnico ---');
        const nome = await question('Nome Completo: ');
        const credencial = await question('Credencial de Acesso: ');
        const turno = await question('Turno (Manhã/Tarde/Noite): ');
 
        const resultado = TecnicoController.processarAdmissao(nome, credencial, turno);
        if (resultado.status === 201) {
          console.log(`\n${resultado.mensagem}`);
          console.log(`Nome: ${resultado.dados.nomeCompleto}`);
          console.log(`Turno: ${resultado.dados.turnoTrabalho}`);
        } else {
          console.log(`\nErro: ${resultado.erro}`);
        }
        break;
      }
 
      case '4': {
        console.log('\n--- Lista de Técnicos ---');
        const lista = TecnicoController.consultarEquipe();
        if (lista.length === 0) {
          console.log('Nenhum técnico cadastrado na equipe.');
        } else {
          lista.forEach(mostrarTecnico);
        }
        break;
      }
 
      case '5': {
        console.log('\n--- Relatório de Auditoria Geral ---');
        const r = AuditoriaController.gerarRelatorioGeral();
        if (r.status !== 200) {
          console.log(`Erro: ${r.erro}`);
          break;
        }
        console.log(`Data: ${r.dataGeracao}`);
        console.log(`Total de equipamentos: ${r.resumo.totalEquipamentos}`);
        console.log(`Total de técnicos: ${r.resumo.totalTecnicos}`);
 
        console.log('\nEquipamentos:');
        if (r.detalhes.inventarioEquipamentos.length === 0) {
          console.log('Nenhum equipamento cadastrado.');
        } else {
          r.detalhes.inventarioEquipamentos.forEach(mostrarEquipamento);
        }
 
        console.log('\nTécnicos:');
        if (r.detalhes.equipeTecnicos.length === 0) {
          console.log('Nenhum técnico cadastrado.');
        } else {
          r.detalhes.equipeTecnicos.forEach(mostrarTecnico);
        }
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
 
