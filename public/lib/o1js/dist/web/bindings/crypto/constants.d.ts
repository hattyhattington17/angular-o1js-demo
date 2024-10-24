export { prefixes, prefixHashes, prefixHashesLegacy, versionBytes, protocolVersions, poseidonParamsKimchiFp, poseidonParamsLegacyFp, mocks };
declare let prefixes: {
    event: string;
    events: string;
    sequenceEvents: string;
    zkappBodyMainnet: string;
    zkappBodyTestnet: string;
    accountUpdateCons: string;
    accountUpdateNode: string;
    zkappMemo: string;
    signatureMainnet: string;
    signatureTestnet: string;
    zkappUri: string;
    deriveTokenId: string;
    sideLoadedVK: string;
};
declare let prefixHashes: {
    "CodaReceiptUC*******": string[];
    "CodaReceiptZkapp****": string[];
    "Coinbase************": string[];
    "PendingCoinbases****": string[];
    "CoinbaseStackData***": string[];
    CoinbaseStackStaHash: string[];
    "CoinbaseStack*******": string[];
    "MinaCheckpoints*****": string[];
    "MinaMergeSnark******": string[];
    "MinaBaseSnark*******": string[];
    "MinaProtoState******": string[];
    "MinaProtoStateBody**": string[];
    "MinaVrfMessage******": string[];
    MinaSignatureMainnet: string[];
    "CodaSignature*******": string[];
    "MinaVrfOutput*******": string[];
    "MinaVrfEvaluation***": string[];
    "MinaEpochSeed*******": string[];
    "MinaTransitionSnark*": string[];
    "MinaAccount*********": string[];
    "MinaSideLoadedVk****": string[];
    "MinaZkappAccount****": string[];
    "MinaZkappPayload****": string[];
    "MainnetZkappBody****": string[];
    "TestnetZkappBody****": string[];
    "MinaZkappPred*******": string[];
    "MinaZkappPredAcct***": string[];
    "MinaZkappPredPS*****": string[];
    "MinaAcctUpdAcctPred*": string[];
    "MinaAcctUpdateCons**": string[];
    "MinaAcctUpdateNode**": string[];
    "MinaAcctUpdStckFrm**": string[];
    MinaActUpStckFrmCons: string[];
    "MinaZkappUri********": string[];
    "MinaZkappEvent******": string[];
    "MinaZkappEvents*****": string[];
    "MinaZkappSeqEvents**": string[];
    "MinaZkappMemo*******": string[];
    "MinaZkappTest*******": string[];
    "MinaDeriveTokenId***": string[];
    CodaReceiptEmpty: string[];
    MinaZkappEventsEmpty: string[];
    MinaZkappActionsEmpty: string[];
    MinaZkappActionStateEmptyElt: string[];
    CoinbaseStack: string[];
    PendingCoinbaseMerkleTree: string[];
};
declare let prefixHashesLegacy: {
    "CodaReceiptUC*******": string[];
    MinaSignatureMainnet: string[];
    "CodaSignature*******": string[];
};
declare let versionBytes: {
    tokenIdKey: number;
    receiptChainHash: number;
    ledgerHash: number;
    epochSeed: number;
    stateHash: number;
    publicKey: number;
    userCommandMemo: number;
    privateKey: number;
    signature: number;
    transactionHash: number;
    signedCommandV1: number;
};
declare let protocolVersions: {
    txnVersion: number;
};
declare let poseidonParamsKimchiFp: {
    mds: string[][];
    roundConstants: string[][];
    fullRounds: number;
    partialRounds: number;
    hasInitialRoundConstant: boolean;
    stateSize: number;
    rate: number;
    power: number;
};
declare let poseidonParamsLegacyFp: {
    mds: string[][];
    roundConstants: string[][];
    fullRounds: number;
    partialRounds: number;
    hasInitialRoundConstant: boolean;
    stateSize: number;
    rate: number;
    power: number;
};
declare let mocks: {
    dummyVerificationKeyHash: string;
};
