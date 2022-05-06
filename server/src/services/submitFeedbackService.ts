import { MailAdapter } from "../adapters/mailAdapter";
import { FeedbacksRepository } from "../repositories/feedbacksRepository";

interface SubmitFeedbackServiceRequest {
  type: string;
  comment: string;
  screenshot?: string;
}

export class SubmitFeedbackService {
  constructor(
    private feedbacksRepository: FeedbacksRepository,
    private mailAdapter: MailAdapter
  ) {}

  async execute(request: SubmitFeedbackServiceRequest) {
    const { type, comment, screenshot } = request;

    if (!type) {
      throw new Error("Type is required");
    }

    if (!comment) {
      throw new Error("Comment is required");
    }

    if (screenshot && !screenshot.startsWith("data:image/png;base64")) {
      throw new Error("Invalid screenshot format.");
    }

    await this.feedbacksRepository.create({
      type,
      comment,
      screenshot,
    });

    await this.mailAdapter.sendMail({
      subject: "Novo feedback",
      body: [
        `<div style="font-family: Verdana; font-size: 16px; color: #111">`,
        `<p>Tipo do feedback: <strong>${`${
          type === "BUG" ? "Problema" : type === "IDEA" ? "Ideia" : "Outro"
        }`}</strong></p>`,
        `<p>Comentário: <strong>${comment}</strong></p>`,
        screenshot === "data:image/png;base64,null"
          ? ""
          : `<img src="${screenshot}" />`,
        `</div>`,
      ].join("\n"),
    });
  }
}
