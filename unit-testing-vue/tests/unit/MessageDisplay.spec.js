import MessageDisplay from "@/components/MessageDisplay";
import { mount } from "@vue/test-utils";
import { getMessage } from "@/services/axios.js";
import flushPromises from "flush-promises";

jest.mock("@/services/axios.js");
beforeEach(() => {
  jest.clearAllMocks();
});

describe("MessageDisplay", () => {
  it("Calls getMessage and displays message", async () => {
    // mock the API call
    const mockMessage = "Hello from the db";
    getMessage.mockResolvedValueOnce({ text: mockMessage });
    const wrapper = mount(MessageDisplay);
    // wait for promise to resolve
    await flushPromises();
    // check that call happened once
    expect(getMessage).toHaveBeenCalledTimes(1);
    // check that component displays message
    const message = wrapper.find('[data-testid="message"]').element.textContent;
    expect(message).toEqual(mockMessage);
  });

  it("Displays an error when getMessage call fails", async () => {
    // mock the API call
    const mockError = "Oops! Something went wrong.";
    getMessage.mockRejectedValueOnce({ text: mockError });
    const wrapper = mount(MessageDisplay);
    // wait for promise to resolve
    await flushPromises();
    // check that call happened once
    expect(getMessage).toHaveBeenCalledTimes(1);
    // check that component displays error
    const error = wrapper.find('[data-testid="message-error"]').element
      .textContent;
    expect(error).toEqual(mockError);
  });
});
