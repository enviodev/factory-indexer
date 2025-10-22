import assert from "assert";
import { 
  TestHelpers,
  UniswapV3Factory_PoolCreated,
  UniswapV3Pool_Swap
} from "generated";
const { MockDb, UniswapV3Factory, UniswapV3Pool } = TestHelpers;

describe("UniswapV3Factory contract PoolCreated event tests", () => {
  // Create mock db
  const mockDb = MockDb.createMockDb();

  // Creating mock for UniswapV3Factory contract PoolCreated event
  const event = UniswapV3Factory.PoolCreated.createMockEvent({/* It mocks event fields with default values. You can overwrite them if you need */});

  it("UniswapV3Factory_PoolCreated is created correctly", async () => {
    // Processing the event
    const mockDbUpdated = await UniswapV3Factory.PoolCreated.processEvent({
      event,
      mockDb,
    });

    // Getting the actual entity from the mock database
    let actualUniswapV3FactoryPoolCreated = mockDbUpdated.entities.UniswapV3Factory_PoolCreated.get(
      `${event.chainId}_${event.params.pool}`
    );

    // Creating the expected entity
    const expectedUniswapV3FactoryPoolCreated: UniswapV3Factory_PoolCreated = {
      id: `${event.chainId}_${event.params.pool}`,
      token0: event.params.token0,
      token1: event.params.token1,
      fee: event.params.fee,
      tickSpacing: event.params.tickSpacing,
      pool: event.params.pool,
    };
    // Asserting that the entity in the mock database is the same as the expected entity
    assert.deepEqual(actualUniswapV3FactoryPoolCreated, expectedUniswapV3FactoryPoolCreated, "Actual UniswapV3FactoryPoolCreated should be the same as the expectedUniswapV3FactoryPoolCreated");
  });
});
