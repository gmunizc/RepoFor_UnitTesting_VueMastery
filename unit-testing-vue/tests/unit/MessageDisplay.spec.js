import MessageDisplay from "@/components/MessageDisplay";
import { mount } from "@vue/test-utils";
import { getMessage } from "@/services/axios.js";
import flushPromises from "flush-promises";

jest.mock("@/services/axios.js");

describe("MessageDisplay", () => {
  it("Calls getMessage and displays message", async () => {
    const wrapper = mount(MessageDisplay);
    // mock the API call
    const mockMessage = "Hello from the db";
    getMessage.mockResolvedValueOnce({ text: mockMessage });
    // wait for promise to resolve
    await flushPromises();
    // check that call happened once
    expect(getMessage).toHaveBeenCalledTimes(1);
    // check that component displays message
    const message = wrapper.find('[data-testid="message"]').element.textContent;
    expect(message).toEqual(mockMessage);
  });

  it("Displays an error when getMessage call fails", async () => {
    // const wrapper = mount(MessageDisplay);
    // mock the failed API call
    // wait for promise to resolve
    // check that call happened once
    // check that component displays error
  });
});
