// Mock data for the banking dashboard

export interface ROData {
  sno: number;
  roName: string;
  totalPoints: number;
  activePoints: number;
  selectionPending: number;
  pointNotRequired: number;
  branches: number;
}

export interface TransactionData {
  sno: number;
  roName: string;
  onusTxnCount: number;
  offusTxnCount: number;
  fiTxnCount: number;
  cardTxnCount: number;
  totalTxnCount: number;
}

export interface SSSData {
  sno: number;
  roName: string;
  apy: number;
  pmjjby: number;
  pmsby: number;
}

export interface BranchData {
  sno: number;
  branchName: string;
  onusTxnCount: number;
  offusTxnCount: number;
  fiTxnCount: number;
  cardTxnCount: number;
  totalTxnCount: number;
  bankTotalCount: number;
}

export interface CSPData {
  sno: number;
  cspName: string;
  onusTxnCount: number;
  offusTxnCount: number;
  fiTxnCount: number;
  cardTxnCount: number;
  totalTxnCount: number;
  bankTotalCount: number;
}

// Mock RO Data
export const roPointsData: ROData[] = [
  { sno: 1, roName: "Anakapalli RO", totalPoints: 237, activePoints: 209, selectionPending: 26, pointNotRequired: 2, branches: 49 },
  { sno: 2, roName: "BCM-Anakapalli RO", totalPoints: 55, activePoints: 53, selectionPending: 0, pointNotRequired: 2, branches: 8 },
  { sno: 3, roName: "Parvathipuram RO", totalPoints: 124, activePoints: 113, selectionPending: 6, pointNotRequired: 5, branches: 40 },
  { sno: 4, roName: "Srikakulam RO", totalPoints: 20, activePoints: 18, selectionPending: 0, pointNotRequired: 2, branches: 15 },
  { sno: 5, roName: "Vishakapatnam RO", totalPoints: 104, activePoints: 81, selectionPending: 13, pointNotRequired: 10, branches: 31 },
  { sno: 6, roName: "Vizianagaram RO", totalPoints: 225, activePoints: 206, selectionPending: 12, pointNotRequired: 7, branches: 47 }
];

// Mock Transaction Data
export const roTransactionData: TransactionData[] = [
  { sno: 1, roName: "Anakapalli RO", onusTxnCount: 177879, offusTxnCount: 48732, fiTxnCount: 241218, cardTxnCount: 4127, totalTxnCount: 471956 },
  { sno: 2, roName: "BCM-Anakapalli RO", onusTxnCount: 38971, offusTxnCount: 15638, fiTxnCount: 30295, cardTxnCount: 1299, totalTxnCount: 86203 },
  { sno: 3, roName: "Parvathipuram RO", onusTxnCount: 93608, offusTxnCount: 22692, fiTxnCount: 148514, cardTxnCount: 1171, totalTxnCount: 265985 },
  { sno: 4, roName: "Srikakulam RO", onusTxnCount: 13567, offusTxnCount: 3381, fiTxnCount: 23591, cardTxnCount: 1377, totalTxnCount: 41916 },
  { sno: 5, roName: "Vishakapatnam RO", onusTxnCount: 68009, offusTxnCount: 19557, fiTxnCount: 103413, cardTxnCount: 1030, totalTxnCount: 192009 },
  { sno: 6, roName: "Vizianagaram RO", onusTxnCount: 189870, offusTxnCount: 60626, fiTxnCount: 302497, cardTxnCount: 2099, totalTxnCount: 555092 }
];

// Mock SSS Data
export const roSSSData: SSSData[] = [
  { sno: 1, roName: "Anakapalli RO", apy: 49, pmjjby: 528, pmsby: 534 },
  { sno: 2, roName: "BCM-Anakapalli RO", apy: 8, pmjjby: 382, pmsby: 429 },
  { sno: 3, roName: "Parvathipuram RO", apy: 55, pmjjby: 194, pmsby: 186 },
  { sno: 4, roName: "Srikakulam RO", apy: 48, pmjjby: 18, pmsby: 28 },
  { sno: 5, roName: "Vishakapatnam RO", apy: 32, pmjjby: 126, pmsby: 203 },
  { sno: 6, roName: "Vizianagaram RO", apy: 48, pmjjby: 296, pmsby: 324 }
];

// Mock Branch Data for specific ROs
export const branchDataByRO: { [key: string]: BranchData[] } = {
  "Anakapalli RO": [
    { sno: 1, branchName: "Anakapalli Branch", onusTxnCount: 38096, offusTxnCount: 9308, fiTxnCount: 50890, cardTxnCount: 699, totalTxnCount: 98993, bankTotalCount: 95000 },
    { sno: 2, branchName: "Kakinada Branch", onusTxnCount: 35000, offusTxnCount: 8500, fiTxnCount: 45000, cardTxnCount: 650, totalTxnCount: 89150, bankTotalCount: 85000 },
    { sno: 3, branchName: "Rajam Branch", onusTxnCount: 28000, offusTxnCount: 7200, fiTxnCount: 38000, cardTxnCount: 580, totalTxnCount: 73780, bankTotalCount: 70000 }
  ],
  "Vizianagaram RO": [
    { sno: 1, branchName: "Badangi Branch", onusTxnCount: 45000, offusTxnCount: 12000, fiTxnCount: 60000, cardTxnCount: 800, totalTxnCount: 117800, bankTotalCount: 110000 },
    { sno: 2, branchName: "Nellimarla Branch", onusTxnCount: 42000, offusTxnCount: 11500, fiTxnCount: 55000, cardTxnCount: 750, totalTxnCount: 109250, bankTotalCount: 105000 },
    { sno: 3, branchName: "Alamanda Branch", onusTxnCount: 38000, offusTxnCount: 10500, fiTxnCount: 50000, cardTxnCount: 700, totalTxnCount: 99200, bankTotalCount: 95000 }
  ]
};

// Mock CSP Data for specific branches
export const cspDataByBranch: { [key: string]: CSPData[] } = {
  "Badangi Branch": [
    { sno: 1, cspName: "Appikonda Ramakrishna/30123648", onusTxnCount: 74, offusTxnCount: 63, fiTxnCount: 103, cardTxnCount: 0, totalTxnCount: 240, bankTotalCount: 180 },
    { sno: 2, cspName: "Kamisetty Kumar/30126007", onusTxnCount: 22, offusTxnCount: 10, fiTxnCount: 85, cardTxnCount: 0, totalTxnCount: 117, bankTotalCount: 110 },
    { sno: 3, cspName: "KDN Narayana/30118906", onusTxnCount: 115, offusTxnCount: 31, fiTxnCount: 119, cardTxnCount: 1, totalTxnCount: 266, bankTotalCount: 250 },
    { sno: 4, cspName: "Ammavari Rao Radhee/30111289", onusTxnCount: 87, offusTxnCount: 36, fiTxnCount: 154, cardTxnCount: 0, totalTxnCount: 277, bankTotalCount: 260 },
    { sno: 5, cspName: "Muchala Lakskhmi/30110213", onusTxnCount: 213, offusTxnCount: 62, fiTxnCount: 251, cardTxnCount: 0, totalTxnCount: 526, bankTotalCount: 500 },
    { sno: 6, cspName: "Tantu Parvathi/30123209", onusTxnCount: 168, offusTxnCount: 59, fiTxnCount: 244, cardTxnCount: 0, totalTxnCount: 471, bankTotalCount: 450 },
    { sno: 7, cspName: "Tetti Satyanarayana/30112676", onusTxnCount: 15, offusTxnCount: 7, fiTxnCount: 186, cardTxnCount: 1, totalTxnCount: 209, bankTotalCount: 195 }
  ],
  "Anakapalli Branch": [
    { sno: 1, cspName: "Padderu CSP 1", onusTxnCount: 1500, offusTxnCount: 450, fiTxnCount: 2100, cardTxnCount: 35, totalTxnCount: 4085, bankTotalCount: 3900 },
    { sno: 2, cspName: "Anakapalli CSP 2", onusTxnCount: 1800, offusTxnCount: 520, fiTxnCount: 2400, cardTxnCount: 42, totalTxnCount: 4762, bankTotalCount: 4500 },
    { sno: 3, cspName: "Thatipalam CSP", onusTxnCount: 1200, offusTxnCount: 380, fiTxnCount: 1800, cardTxnCount: 28, totalTxnCount: 3408, bankTotalCount: 3200 }
  ]
};

export const monthlyData = [
  { month: 'Jan', transactions: 120000, amount: 2400000 },
  { month: 'Feb', transactions: 135000, amount: 2700000 },
  { month: 'Mar', transactions: 148000, amount: 2960000 },
  { month: 'Apr', transactions: 162000, amount: 3240000 },
  { month: 'May', transactions: 158000, amount: 3160000 },
  { month: 'Jun', transactions: 175000, amount: 3500000 },
  { month: 'Jul', transactions: 185000, amount: 3700000 }
];