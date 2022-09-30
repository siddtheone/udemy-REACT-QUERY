import { screen } from "@testing-library/react";
import { renderWithQueryClient } from "test-utils";

import { rest } from "msw";
import { server } from "mocks/server";
import { defaultQueryClientOptions } from "react-query/queryClient";
import { Calendar } from "../Calendar";

// mocking useUser to mimic a logged-in user
// jest.mock('../../user/hooks/useUser', () => ({
//   __esModule: true,
//   useUser: () => ({ user: mockUser }),
// }));

test("Reserve appointment error", async () => {
  // (re)set handler to return a 500 error for appointments
  server.resetHandlers(
    rest.get(
      "https://z3f4lo-3030.preview.csb.app/appointments/:month/:year",
      (req, res, ctx) => {
        return res(ctx.status(500));
      }
    )
  );

  //   renderWithQueryClient(<Calendar />);
  //   const alertToast = await screen.findByRole("alert");
  //   expect(alertToast).toHaveTextContent("Request failed with status code 500");
});
