import {assertNotNull} from '@subsquid/util-internal'
import {
    BlockHeader,
    DataHandlerContext,
    SubstrateBatchProcessor,
    SubstrateBatchProcessorFields,
    Event as _Event,
    Call as _Call,
    Extrinsic as _Extrinsic
} from '@subsquid/substrate-processor'

import {events} from './types'

export const processor = new SubstrateBatchProcessor()
    // Lookup archive by the network name in Subsquid registry
    // See https://docs.subsquid.io/substrate-indexing/supported-networks/
    .setGateway('https://v2.archive.subsquid.io/network/bittensor')
    // Chain RPC endpoint is required on Substrate for metadata and real-time updates
    .setRpcEndpoint({
        // Set via .env for local runs or via secrets when deploying to Subsquid Cloud
        // https://docs.subsquid.io/deploy-squid/env-variables/
        url: assertNotNull(process.env.RPC_ENDPOINT),
        // More RPC connection options at https://docs.subsquid.io/substrate-indexing/setup/general/#set-data-source
        rateLimit: 10,
        maxBatchCallSize: 128,
        capacity: 16,
    })
    .addEvent({
        name: [events.balances.transfer.name],
        extrinsic: true
    })
    .setBlockRange({ from: 3067900 })
    .setFields({
        event: {
            args: true
        },
        extrinsic: {
            hash: true,
            fee: true,
            success: true,

        },
        block: {
            timestamp: true
        }
    })
    // Uncomment to disable RPC ingestion and drastically reduce no of RPC calls
    // .setRpcDataIngestionSettings({disabled: true})   

export type Fields = SubstrateBatchProcessorFields<typeof processor>
export type Block = BlockHeader<Fields>
export type Event = _Event<Fields>
export type Call = _Call<Fields>
export type Extrinsic = _Extrinsic<Fields>
export type ProcessorContext<Store> = DataHandlerContext<Store, Fields>
