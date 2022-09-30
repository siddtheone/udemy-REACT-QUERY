import { useStaff } from "../hooks/useStaff";
import { act, renderHook } from "@testing-library/react-hooks";
import { createQueryClientWrapper } from "test-utils";

test("filter staff", async () => {
  // the magic happens here
  const { result, waitFor } = renderHook(useStaff, {
    wrapper: createQueryClientWrapper(),
  });

  await waitFor(() => result.current.staff.length > 0);

  const allStaff = result.current.staff.length;
  act(() => result.current.setFilter("massage"));

  await waitFor(() => result.current.staff.length < allStaff);
});
