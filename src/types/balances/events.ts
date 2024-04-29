import {sts, Block, Bytes, Option, Result, EventType, RuntimeCtx} from '../support'
import * as v101 from '../v101'

export const transfer =  {
    name: 'Balances.Transfer',
    /**
     * Transfer succeeded.
     */
    v101: new EventType(
        'Balances.Transfer',
        sts.struct({
            from: v101.AccountId32,
            to: v101.AccountId32,
            amount: sts.bigint(),
        })
    ),
}
