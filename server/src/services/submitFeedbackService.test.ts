import { SubmitFeedbackService } from "./submitFeedbackService";

const createFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn();

const submitFeedback = new SubmitFeedbackService(
  { create: createFeedbackSpy},
  { sendMail: sendMailSpy }
);

describe("Submit feedback", () => {
  it("should be able to submit feedback", async () => {
    await expect(
      submitFeedback.execute({
        type: "bug",
        comment: "example comment",
        screenshot: "data:image/png;base64,13214124124124124",
      })
    ).resolves.not.toThrow();

    expect(createFeedbackSpy).toHaveBeenCalled();
    expect(sendMailSpy).toHaveBeenCalled();
  });

  it("should not be able to submit feedback without type", async () => {
    await expect(
      submitFeedback.execute({
        type: "",
        comment: "example comment",
        screenshot: "data:image/png;base64,13214124124124124",
      })
    ).rejects.toThrow();
  });

  it("should not be able to submit feedback without commnet", async () => {
    await expect(
      submitFeedback.execute({
        type: "bug",
        comment: "",
        screenshot: "data:image/png;base64,13214124124124124",
      })
    ).rejects.toThrow();
  });

  it("should not be able to submit feedback with an invalid screenshot", async () => {
    await expect(
      submitFeedback.execute({
        type: "bug",
        comment: "tá tudo bugado",
        screenshot: "test.jpg",
      })
    ).rejects.toThrow();
  });
});
