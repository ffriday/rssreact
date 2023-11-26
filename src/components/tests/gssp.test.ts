import { setupServer } from "msw/node";
import { GetServerSidePropsContext } from "next";
import { createRequest, createResponse } from "node-mocks-http";
import { handlers } from "./mockHandlers";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { getServerSideProps as gSSPindex } from "@/pages";
import { afterEach } from "node:test";
import { getServerSideProps as gSSPsearch } from "@/pages/[search]";

export const gsspCtx = (
  ctx?: Partial<GetServerSidePropsContext>
): GetServerSidePropsContext => ({
  req: createRequest(),
  res: createResponse(),
  params: undefined,
  query: {},
  resolvedUrl: "",
  ...ctx,
});

const server = setupServer(...handlers);

describe("SSP", async () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it("SSP index loads data", async () => {
    const props = await gSSPindex(gsspCtx());
    expect(props).toBeTruthy()
  });

  it("SSP search loads data", async () => {
    const props = await gSSPsearch(gsspCtx());
    expect(props).toBeTruthy()
  });
});