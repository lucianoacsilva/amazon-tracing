# amazon-tracing

*Framework* para rastreamento de geolocalização de espécimes de fauna e flora utiliznado **tecnologia de livro-razão** distribuído (***Distributed Ledger Technology***).

## Pré-requisitos

- ***Visual Studio Code* (versão ^1.55.0)**;
- Extensão ***IBM Blockchain Platform*** para o ***Visual Studio Code*** (versão 1.0.40);
- ***Dokcer*** versão **v.17.06.2-ce** ou superior;

### Dependências opcionais

- ***Node*** **v10** (**v10.15.3** ou superior) ou **v12** (**v12.13.1** ou superior) e ***npm*** **v6.x** ou superior.

## Criação e inicialização da rede Fabric

- Abrir a extensão **IBM Blockchain Platform** no editor **Visual Studio Code**;
![drawing](img/ext-button.png)

- Clicar sobre o botão **Adicionar Ambiente (*Add Environment*)**, situado no canto superior direito da aba ***Fabric Environments***;
![drawing](img/add-environment.png)

- Selecionar a primeira opção - **Criar uma nova a partir de modelo (*Create new from template*)**;
![drawing](img/create-from-template.png)

- Selecionar a segunda opção - ***2 Org template (2 CAs, 2 peers, 1 channel)***;
![drawing](img/2-org-template.png)

- Digite um nome para o ambiente (guarde este, pois deverá ser usado futuramente);
![drawing](img/enter-name.png)

## Gerenciamento do contrato inteligente

### Encapsulamento do contrato inteligente

Se ainda não existe um pacote do contrato inteligente gerado, proceder da seguinte forma:

- Abra o ***Visual Studio Code*** da pasta ***Chaincode**;
- Clicar sobre o botão ***More Actions***, no canto superior da aba ***Smart Contracts***;
![drawing](img/enter-name.png)

- Clicar sobre o botão ***Package Open Project*** na caixa de diálogo que surgirá.
![drawing](img/package-open-project.png)

**Obs.:** Para o correto funcionamento do processo, deve-se gerar o pacote com uma versão ainda não existente na aba ***Smart Contracts***, caso contrário, resultará em erro. Tal parâmetro é definido no arquivo **package.json**, situado na raiz do projeto.


### Instalação do contrato inteligente

Assegure que a extensão esteja conectada ao ambiente ***TwoOrgEnv***. Caso não esteja, faça-o segundo  seguinte instrução:

- Clique sobre o nome do ambiente ***TwoOrgEnv*** na aba ***Fabric Environments***. Isso solicitará a conexão da extensão ao ambiente automaticamente.

Com o ambiente conectado:

- Clique sobre o botão ***+ Install***;
- ![drawing](img/install.png)

- Selecione os *peers* nos quais será instalado o contrato inteligente (no caso, todos os *peers* da rede);
![drawing](img/select-peers.png)

- Selecione o pacote do contrato inteligente gerado na seção anterior.
![drawing](img/select-package.png)

### Instanciação do contrato inteligente no canal

Na aba ***Fabric Environments***:

- Clique sobre o botão ***+ Instantiate***, situado dentro da guia ***Instantiated***, para instanciar um novo contrato inteligente;
![drawing](img/instantiate.png)

- Caso já exista um contrato inteligente instanciado com o mesmo nome, clique sobre o já instanciado com o botão direito (dentro da guia ***Instantiated***) e em ***Upgrade Smart Contract***, que aparecerá numa caixa de diálogo;
![drawing](img/upgrade-chaincode.png)

- Selecione o pacote gerado na etapa **Encapsulamento do contrato inteligente**;
![drawing](img/select-package.png)

- No caso deste projeto, não foram programados métodos para serem acionados no momento da instanciação do contrato inteligente. Portanto, deixe em branco e aperte ***Enter***;
![drawing](img/blank.png)

- Na caixa de diálogo que surgir, selecione ***Yes*** (nela, a extensão pergunta se será utilizado um arquivo de configuração para coleções privadas);
![drawing](img/private-collection.png)

- Clique em ***Browse*** na caixa de diálogo subsequente;
![drawing](img/browse-collection.png)

- Selecione o arquivo de coleções privadas **collections.json**;
![drawing](img/select-collection.png)

- Selecioned como política de endosso ***Default (single endorser, any org)***, a padrão oferecida pela extensão.
![drawing](img/endorsment-policy.png)

## Execução do serviço *REST*

- No diretório ***Backend***, crie um arquivo denominado **env.js** utilizando como modelo **env_template.js**. Ele contém os atributos;
    - ***envName***: nome do ambiente **Fabric** inicializado. No caso deste tutorial, **TwoOrgEnv**;
    - ***orgName***: nome de uma organização da rede. Neste tutorial, foram criadas ***Org1*** e ***Org2***;
    - ***identityName***: identidade presente na carteira da organização anteriormente configurada. Neste exemplo, por padrão, as duas organizações possuem as identidades ***admin*** e ***OrgXAdmin***;
    - ***ccName***: nome do contrato inteligente, definido no arquivo ***package.json*** do diretório ***Chaincode***. Neste tutorial, por padrão, o nome escolhido é ***amazon-tracing***.
    - ***channelName***: canal no qual foi instanciado o contrato inteligente. Neste exemplo, foi utilizado ***mychannel***.
- Através do terminal, entre no diretório ***Backend***;
- Execute o comando **npm run start**.

**Obs.:** Os nomes dos parâmetros utilizados no exemplo podem ser modificados segundo a preferência do usuário.





