import { screen } from "@testing-library/react";
import { renderWithQueryClient } from "test-utils";

import { Treatments } from "../Treatments";

test("renders response from query", async () => {
  renderWithQueryClient(<Treatments />);

  const treatmentsTiles = await screen.findAllByRole("heading", {
    name: /facial|massage|scrub/i,
  });
  expect(treatmentsTiles).toHaveLength(3);
});
