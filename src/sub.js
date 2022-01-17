/*
* Subscribe ---> Cliente 
*/

var mqtt = require('mqtt');

var client  = mqtt.connect('mqtt://test.mosquitto.org');

const p1 = {
  codigo: 5,
  quantidade: 1
}

const p2 = {
  codigo: 7,
  quantidade: 2
}

const p3 = {
  codigo: 3,
  quantidade: 10
}


client.on('connect', () => {

  client.subscribe('resultado-consultar-catalogo', (error) => {
    if (!error) {
      console.log("Subscrito no tópico 'resultado-consultar-catalogo' com sucesso!");
    }
  });

  client.subscribe('resultado-exibir-carrinho', (error) => {
    if (!error) {
      console.log("Subscrito no tópico 'resultado-exibir-carrinho' com sucesso!");
    }
  });

  client.subscribe('resultado-consultar-pedidos', (error) => {
    if (!error) {
      console.log("Subscrito no tópico 'resultado-consultar-pedidos' com sucesso!");
    }
  });

  client.subscribe('resultado-pagar-pedido', (error) => {
      if (!error) {
          console.log("Subscrito no tópico 'resultado-pagar-pedido' com sucesso!");
      }
  });
  
  client.publish('adicionar-carrinho', JSON.stringify(p1));
  client.publish('adicionar-carrinho', JSON.stringify(p2));
  client.publish('adicionar-carrinho', JSON.stringify(p3));
  client.publish('exibir-carrinho');
  client.publish('remover-carrinho', JSON.stringify({codigo: 7}));
  client.publish('exibir-carrinho');
  client.publish('pagar-pedido');
  client.publish('solicitar-entrega', JSON.stringify({
    codigo: 1, 
    rua: 'Principal', 
    bairro: 'Maioba',
    cidade: 'Paço do Lumiar'
  }));
  client.publish('exibir-carrinho');
  client.publish('consultar-pedidos');
});


client.on('message', (topic, message) => {
  
  if (topic === "resultado-consultar-catalogo"){
    try {
      const lista_1 = JSON.parse(message.toString());
      console.log("\nPRODUTOS DISPONÍVEIS NO CATÁLOGO:");
      for(let i = 0; i < lista_1.length; i++){
        console.log(`- Produto ${lista_1[i].codigo}: ${lista_1[i].nome} - R$ ${lista_1[i].preco.toFixed(2)}`); 
      }
      console.log("--------------------------------");        
    } catch (error) {
      console.log(error);
    }

  }else if(topic === "resultado-exibir-carrinho"){
    try {
      const lista_2 = JSON.parse(message.toString());
      console.log("\nPRODUTOS NO CARRINHO:");
      for(let i = 0; i < lista_2.length; i++){
        console.log(`- ${lista_2[i].quantidade} unidades do produto ${lista_2[i].codigo}`); 
      }
      console.log("--------------------------------");
    } catch (error) {
      console.log(error);
    }

  }else if (topic === "resultado-consultar-pedidos"){
    try {
      const lista_3 = JSON.parse(message.toString());
      console.log("\nPEDIDOS EFETUADOS:");
      for(let i = 0; i < lista_3.length; i++){
        console.log(`Pedido nº ${lista_3[i].codigo}: 
          - ${lista_3[i].quantidade_produtos} tipos de produto 
          - R$ ${lista_3[i].total}
          - Entrega ${lista_3[i].solicitacao_entrega !== null ? 
          ('em Rua ' + lista_3[i].solicitacao_entrega.rua + 
          ' no bairro ' + lista_3[i].solicitacao_entrega.bairro +
          ' da cidade ' + lista_3[i].solicitacao_entrega.cidade) : 'não solicitada\n'}`
        ); 
      }
      console.log("--------------------------------");
    } catch (error) {
      console.log(error);
    }

  }else if (topic === "resultado-pagar-pedido"){
    try {
      const lista_6 = JSON.parse(message.toString());
      console.log(lista_6.status);
      console.log("--------------------------------");
    } catch (error) {
      console.log(error);
    }
  }
});