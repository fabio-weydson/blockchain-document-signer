// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.4.16 <0.9.0;

contract DocumentRegistry {
    struct Signature {
        address signerAddress;
        string signerName;
        string signature;
    }
    struct Document {
        string cid;       // IPFS hash
        string name;      // optional name/label
        address owner;    // who uploaded
        bool signed;      // simple "signed" flag
        Signature[] signatures; // array of signatures
    }

    mapping(uint => Document) public documents;
    uint public documentCount;

    event DocumentAdded(uint indexed id, string cid, string name, address owner);
    event DocumentSigned(uint indexed id, address signer);

    function getDocument(uint id) external view returns (Document memory) {
        require(id < documentCount, "Invalid document ID");
        return documents[id];
    }

    function addDocument(string memory _cid, string memory _name) public {
        documents[documentCount] = Document({
            cid: _cid,
            name: _name,
            owner: msg.sender,
            signed: false,
            signatures: new Signature[](0)
        });
        emit DocumentAdded(documentCount, _cid, _name, msg.sender);
        documentCount++;
    }

    function addSignature(uint256 _docId, string memory _signerName, string memory _signature) public {
        require(_docId < documentCount, "Invalid document ID");
        documents[_docId].signatures.push(Signature({
            signerAddress: msg.sender,
            signerName: _signerName,
            signature: _signature
        }));
        documents[_docId].signed = true;
        emit DocumentSigned(_docId, msg.sender);
    }

    function getSignatures(uint256 _docId) external view returns (Signature[] memory) {
        require(_docId < documentCount, "Invalid document ID");
        return documents[_docId].signatures;
    }

    function isDocumentSigned(uint256 _docId) external view returns (bool) {
        require(_docId < documentCount, "Invalid document ID");
        return documents[_docId].signed;
    }

    function getDocumentCount() external view returns (uint) {
        return documentCount;
    }

    // Returns up to `limit` documents starting from `offset` (pagination)
    function getDocuments(uint offset, uint limit) external view returns (Document[] memory) {
        require(offset < documentCount || documentCount == 0, "Offset out of bounds");
        uint end = offset + limit;
        if (end > documentCount) {
            end = documentCount;
        }
        uint resultLength = end > offset ? end - offset : 0;
        Document[] memory docs = new Document[](resultLength);
        for (uint i = 0; i < resultLength; i++) {
            docs[i] = documents[offset + i];
        }
        return docs;
    }
}