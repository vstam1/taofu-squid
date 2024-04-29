interface TransferEvent {
    id: string;
    blockNumber: number;
    timestamp: Date;
    extrinsicHash?: string;
    from: string;
    to: string;
    amount: bigint;
    success: boolean;
    fee?: bigint;
  }