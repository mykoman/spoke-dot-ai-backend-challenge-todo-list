import { SuccessResponse } from "../../src/helpers/success-response";

describe("test success response class", () => {
  it("should return response with message created and status as done when passed as argument", () => {
    const message = "Created";
    const status = "Done"
    const response = new SuccessResponse({message, status })
    expect(response.message).toBe(message);
    expect(response.status).toBe(status);
  });

});

