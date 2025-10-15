/*
 * Please refer to https://docs.envio.dev for a thorough guide on all Envio indexer features
 */
import { UniswapV3Factory, UniswapV3Pool } from "generated";

UniswapV3Factory.PoolCreated.handler(async ({ event, context }) => {
  const entity = {
    id: `${event.chainId}_${event.params.pool}`,
    token0: event.params.token0,
    token1: event.params.token1,
    fee: event.params.fee,
    tickSpacing: event.params.tickSpacing,
    pool: event.params.pool,
  };

  context.UniswapV3Factory_PoolCreated.set(entity);
});

UniswapV3Factory.PoolCreated.contractRegister(({ event, context }) => {
  context.addUniswapV3Pool(event.params.pool);
});

UniswapV3Pool.Initialize.handler(async ({ event, context }) => {
  const entity = {
    id: `${event.chainId}_${event.srcAddress}`,
    sqrtPriceX96: event.params.sqrtPriceX96,
    tick: event.params.tick,
    pool: event.srcAddress,
    poolDetails: `${event.chainId}_${event.srcAddress}`,
  };

  context.UniswapV3Pool_Initialize.set(entity);
});
