_Blockchain PDF Signer_

Uma aplicação simples em React/Vite + Wagmi para assinar documentos PDF e registrar sua integridade em uma blockchain de teste (Sepolia).

Estou desenvolvendo este projeto como um exercício de aprendizado para entender como integrar tecnologia blockchain com aplicações web.

**Aviso:** Este projeto está sendo desenvolvido apenas para fins de aprendizado sobre integração de blockchain com aplicações web usando Wagmi e IPFS. Não é destinado para uso em produção.

🚀 **Tecnologias**

- React (Vite + TailwindCSS)
- Wagmi + MetaMask
- IPFS (P2P file storage)
- Sepolia test network

📌 **Funcionalidades**

- Upload de PDF pelo usuário
- Geração de hash SHA-256 do documento
- Upload do arquivo para IPFS
- Assinatura via carteira Ethereum (MetaMask)
- Registro na blockchain: hash + signatário + timestamp
- Histórico de documentos assinados
