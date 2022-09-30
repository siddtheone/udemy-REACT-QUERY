import { rest } from "msw";

import {
  mockAppointments,
  mockStaff,
  mockTreatments,
  mockUserAppointments,
} from "./mockData";

export const handlers = [
  rest.get("https://z3f4lo-3030.preview.csb.app/treatments", (req, res, ctx) => {
    return res(ctx.json(mockTreatments));
  }),
  rest.get("https://z3f4lo-3030.preview.csb.app/staff", (req, res, ctx) => {
    return res(ctx.json(mockStaff));
  }),
  rest.get(
    "https://z3f4lo-3030.preview.csb.app/appointments/:year/:month",
    (req, res, ctx) => {
      return res(ctx.json(mockAppointments));
    }
  ),
  rest.get("https://z3f4lo-3030.preview.csb.app/user/:id/appointments", (req, res, ctx) => {
    return res(ctx.json({ appointments: mockUserAppointments }));
  }),
  rest.patch("https://z3f4lo-3030.preview.csb.app/appointment/:id", (req, res, ctx) => {
    return res(ctx.status(200));
  }),
];
