import { render, screen } from "@testing-library/react";
import { renderWithQueryClient } from "test-utils";

import { rest } from "msw";
// import { defaultQueryClientOptions } from '../../../react-query/queryClient';
import { server } from "mocks/server";
import { AllStaff } from "../AllStaff";
import { mockTreatments } from "mocks/mockData";
import { QueryClient, QueryClientProvider, setLogger } from "react-query";
import { generateQueryClient } from "react-query/queryClient";

test("renders response from query", async () => {
  renderWithQueryClient(<AllStaff />);

  const staffs = await screen.findAllByRole("heading", {
    name: /divya|sandra|michael|mateo/i,
  });

  expect(staffs).toHaveLength(4);
});

test("handles query error", async () => {
  // (re)set handler to return a 500 error for staff
  server.resetHandlers(
    rest.get("https://z3f4lo-3030.preview.csb.app/staff", (req, res, ctx) => {
      return res(ctx.status(500));
    })
  );

  const qc = generateQueryClient();
  const op = qc.getDefaultOptions();
  op.queries = { ...op.queries, retry: false };
  qc.setDefaultOptions(op);

  render(
    <QueryClientProvider client={qc}>
      <AllStaff />
    </QueryClientProvider>
  );
  const alertToast = await screen.findByRole("alert");
  expect(alertToast).toHaveTextContent("Request failed with status code 500");
});
