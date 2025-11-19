/*
 * Please refer to https://docs.envio.dev for a thorough guide on all Envio indexer features
 */
import {
  UniswapV3Factory,
  UniswapV3Pool,
  UniswapV3Factory_PoolCreated,
  UniswapV3Pool_Swap,
} from "generated";

// Handle PoolCreated events emitted by the UniswapV3Factory
UniswapV3Factory.PoolCreated.handler(async ({ event, context }) => {
  const entity: UniswapV3Factory_PoolCreated = {
    id: `${event.chainId}_${event.params.pool}`,   // Unique ID for the pool
    token0: event.params.token0,                  // Token0 address
    token1: event.params.token1,                  // Token1 address
    fee: event.params.fee,                        // Pool fee tier
    tickSpacing: event.params.tickSpacing,        // Tick spacing for ticks
    pool: event.params.pool,                      // Pool contract address
  };

  context.UniswapV3Factory_PoolCreated.set(entity); // Store pool entity
});

// Register the newly created pool so HyperIndex listens to its events
UniswapV3Factory.PoolCreated.contractRegister(({ event, context }) => {
  context.addUniswapV3Pool(event.params.pool);      // Begin indexing this pool
});

// Handle Swap events emitted by the registered Uniswap V3 pools
UniswapV3Pool.Swap.handler(async ({ event, context }) => {
  const entity: UniswapV3Pool_Swap = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`, // Unique swap ID
    sqrtPriceX96: event.params.sqrtPriceX96,                        // Post-swap sqrt price
    liquidity: event.params.liquidity,                              // Liquidity after the swap
    amount0: event.params.amount0,                                  // Token0 delta
    amount1: event.params.amount1,                                  // Token1 delta
    sender: event.params.sender,                                    // Swap initiator
    recipient: event.params.recipient,                              // Swap output recipient
    poolId: `${event.chainId}_${event.srcAddress}`,                 // Link back to pool entity
  };

  context.UniswapV3Pool_Swap.set(entity);                           // Store swap entity
});