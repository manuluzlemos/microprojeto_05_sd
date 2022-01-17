/*
* Publish ---> Servidor
*/
var mqtt = require('mqtt');
const { bd } = require('./model/bd');

/*
const express = require('express');
const app = express();
app.use(express.json());

app.get("/", (request, response) => {
    response.sendFile(__dirname + '/index.html');
});

 */

var server  = mqtt.connect('mqtt://test.mosquitto.org'); 

const CONSULTAR_CATALOGO = "consultar-catalogo"; 
const ADICIONAR_CARRINHO = "adicionar-carrinho";
const REMOVER_CARRINHO = "remover-carrinho";
const PAGAR_PEDIDO = "pagar-pedido";
const SOLICITAR_ENTREGA = "solicitar-entrega";
const CONSULTAR_PEDIDOS = "consultar-pedidos";
const EXIBIR_CARRINHO = "exibir-carrinho"

server.on('connect', () => {
    server.subscribe(CONSULTAR_CATALOGO, (error) => {
        if (!error) {
            console.log(`Subscrito no tópico '${CONSULTAR_CATALOGO}' com sucesso!`);
        }
    });

    server.subscribe(EXIBIR_CARRINHO, (error) => {
        if (!error) {
            console.log(`Subscrito no tópico ${EXIBIR_CARRINHO} com sucesso!`);
        }
    });

    server.subscribe(CONSULTAR_PEDIDOS, (error) => {
        if (!error) {
            console.log(`Subscrito no tópico ${CONSULTAR_PEDIDOS} com sucesso!`);
        }
    });
    
    server.subscribe(ADICIONAR_CARRINHO, (error) => {
        if (!error) {
            console.log(`Subscrito no tópico '${ADICIONAR_CARRINHO}' com sucesso!`);
        }
    });
    
    server.subscribe(REMOVER_CARRINHO, (error) => {
        if (!error) {
            console.log(`Subscrito no tópico ${REMOVER_CARRINHO} com sucesso!`);
        }
    });

    server.subscribe(PAGAR_PEDIDO, (error) => {
        if (!error) {
            console.log(`Subscrito no tópico ${PAGAR_PEDIDO} com sucesso!`);
        }
    });

    server.subscribe(SOLICITAR_ENTREGA, (error) => {
        if (!error) {
            console.log(`Subscrito no tópico ${SOLICITAR_ENTREGA} com sucesso!`);
        }
    });
});

server.on('message', (topic, message) => {

    switch(topic){
        case CONSULTAR_CATALOGO:
            console.log("PRODUTOS DO CATÁLOGO");
            server.publish('resultado-consultar-catalogo', JSON.stringify(bd.catalogo));
            break;
        
        case EXIBIR_CARRINHO:
            console.log("EXIBIR CARRINHO");
            server.publish('resultado-exibir-carrinho', JSON.stringify(bd.carrinho));
            break;
        
        case CONSULTAR_PEDIDOS:
            console.log("PEDIDOS REALIZADOS");
            server.publish('resultado-consultar-pedidos', JSON.stringify(bd.pedidos));
            break;
        
        case ADICIONAR_CARRINHO:
            console.log("ADICIONAR PRODUTO AO CARRINHO");
            const prod_add = JSON.parse(message);
            bd.carrinho.push(prod_add);
            break;
        
        case REMOVER_CARRINHO:
            console.log("REMOVER PRODUTO DO CARRINHO");
            const prod_remove = JSON.parse(message);
            let prod = bd.carrinho.find(prod => prod.codigo === prod_remove.codigo);
        
            if(prod){
                let indice = bd.carrinho.indexOf(prod);
                bd.carrinho.splice(indice, 1);
            }
            break;
        
        case PAGAR_PEDIDO:
            console.log("PAGAMENTO DO PEDIDO");

            if(bd.carrinho.length === 0){
                server.publish('resultado-pagar-pedido', JSON.stringify({status: "O carrinho não possui produtos adicionados!"}));

            }else{
                let total =0;
                for(let i = 0; i < bd.carrinho.length; i++){
                    let preco = 0;

                    for(let j = 0; j < bd.catalogo.length; j++){
                        if(bd.catalogo[j].codigo === bd.carrinho[i].codigo){
                            preco = bd.catalogo[j].preco;
                        }
                    }

                    total += (bd.carrinho[i].quantidade * preco);
                }

                bd.pedidos.push({
                    codigo: bd.pedidos.length + 1,
                    quantidade_produtos: bd.carrinho.length,
                    total: total,
                    solicitacao_entrega: null
                });

                bd.carrinho = [];

                server.publish('resultado-pagar-pedido', JSON.stringify({status: `O total corresponde a R$ ${total}`}));;
            }
            break;
        
        case SOLICITAR_ENTREGA:
            console.log("SOLICITAÇÃO DE ENTREGA");

            const entrega = JSON.parse(message);
            for(let i = 0; i < bd.pedidos.length; i++){
                if(bd.pedidos[i].codigo === entrega.codigo){
                    bd.pedidos[i].solicitacao_entrega = {
                        rua: entrega.rua,
                        bairro: entrega.bairro,
                        cidade: entrega.cidade
                    };
                }
            }
            break;

    }
    console.log(message.toString());
});
