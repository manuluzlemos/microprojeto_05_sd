# Microprojeto 05 - Sistemas Distribuídos 2021.2

#### **Autora**: Emanuelle Lemos


### **Descrição:**

Implementação de um serviço de supermercado delivery ***(MQTT)*** para fins de comunicação entre um cliente e o servidor.


### **Funcionalidades obrigatórias:**

* Listar os produtos disponíveis (***consultar-catalogo***):
    - listar o código, o nome e o preço dos produtos em catálogo.
* Adicionar produto ao carrinho (***adicionar-carrinho***):
    - adicionar o código e a quantidade de itens do produto.
* Remover produto do carrinho (***remover-carrinho***):
    - remover com base no código do produto.
* Pagar o pedido (***pagar-pedido***):
    - insere o código, o valor total **do pedido e a quantidade de produtos em uma lista para posterior solicitação de entrega;
    - seta o status de entrega como ***null***;
    - remove os produtos do carrinho;
    - fornece o total pago.
* Solicitar entrega (***solicitar-entrega***):
    - solicitar a entrega de pedido e informar os dados do endereço (rua, bairro e cidade).


### **Funcionalidades extras:**

* Listar os produtos adicionados ao carrinho (***exibir-carrinho***):
    - listar o código e a quantidade dos produtos do carrinho.
* Listar os pedidos realizados (***consultar-pedidos***):
    - listar o código do pedido, o preço total, a quantidade de produtos e os dados do endereço de entrega (caso tenha sido solicitada).


***Exemplos***:

* Produto do catálogo
    
    ```
    produto = {
        codigo: 7,
        nome: "Macarrão",
        preco: 10.00
    }
    ```

* Produto no carrinho
    
    ```
    produto = {
        codigo: 7,
        quantidade: 2
    }
    ```

* Pedido logo após ser efetuado o pagamento
    
    ```
    const pedido = {
        codigo: 7,
        quantidade_produtos: 10,
        total: 124.55,
        solicitacao_entrega: null
    }
    ```

* Pedido após solicitação de entrega
    
    ```
    const pedido = {
        codigo: 7,
        quantidade_produtos: 10,
        total: 124.55,
        solicitacao_entrega: {
            rua: "Principal",
            bairro: "Maioba",
            cidade: "Paço do Lumiar"
        }
    }
    ```

### **Instruções para rodar localmente**

1) Baixar o repositório:

    ```
    git clone 
    ```

2) Instalar as dependências:

    ```
    yarn install 
    ```

    ou

    ```
    npm install
    ```

3) Rodar o servidor

    ```
    yarn pub
    ```

4) Rodar o cliente

    ```
    yarn sub
    ```

