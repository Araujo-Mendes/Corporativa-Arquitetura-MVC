import { TecnicoModel } from '../models/TecnicoModel.js';
export class TecnicoController {
    static processarAdimissao(nomeCompleto, credencialAcesso, turnoTrabalho){
        try{
            const tecnicoSalvo = TecnicoModel.contratarTecnico(nomeCompleto, credencialAcesso, turnoTrabalho);
            const respostaView={
                status:201,
                mensagem:"Técnico de suporte admitido com sucesso",
                dados: tecnicoSalvo
            };
            console.log("\n[STATUS 201 CREATED]");
            console.log(JSON.stringify(respostaView, null, 2));
            return respostaView;
        }
        catch(error){
            const respostaErro = {
                status: 400,
                erro: error.message
            };
            console.log("\n [ERRO DE ADMISSÃO RH]");
            console.log(JSON.stringify(respostaErro,null,2));
            return respostaErro
        }
    }

    static consultarEquipe(){
        const equipe = TecnicoModel.listarEquipe();
        console.log("\n=== QUADRO DE TÉCNICOS DE SUPORTE ===");
        if(equipe.length=== 0){
            console.log("Nenhum técnico cadastrado na equipe.");
        } else{ 
            console.table(equipe);
        }
        return equipe
    }
}