import QuestionRepo from "./repo.js";
import grpc from "@grpc/grpc-js";

export class QuestionService {
  constructor() {
    this.repoOBJ = new QuestionRepo();
  }

  async getQuestions(call, callback) {
    try {
      const page = parseInt(call.request.page || "1", 10);
      const pageSize = 10;
      const { type, title } = call.request;
      const filter = {};
      if (type) filter.type = { $regex: type, $options: "i" };
      if (title) filter.title = { $regex: title, $options: "i" };
      const data = await this.repoOBJ.get(filter, page, pageSize);

      if (!data || !Array.isArray(data.data)) {
        console.error("Data is not in expected format or is missing.");
        callback({
          code: grpc.status.NOT_FOUND,
          details: "No questions found",
        });
        return;
      }

      const response = {
        total: data.total,
        page: data.page,
        pageSize: data.pageSize,
        data: data.data.map((q) => {
          const blocks = q.blocks
            ? q.blocks.map((block) => ({
                text: block.text,
                showInOption: block.showInOption,
                isAnswer: block.isAnswer,
              }))
            : [];

          const options = q.options
            ? q.options.map((option) => ({
                text: option.text,
                isCorrect: option.isCorrectAnswer,
              }))
            : [];

          return {
            id: q._id.toString(),
            type: q.type,
            anagramType: q.anagramType,
            blocks: blocks,
            options: options,
            siblingId: q.siblingId ? q.siblingId.toString() : null,
            solution: q.solution,
            title: q.title,
          };
        }),
      };

      callback(null, response);
    } catch (err) {
      console.error("Error fetching questions:", err);
      callback({
        code: grpc.status.INTERNAL,
        details: "Internal Server Error",
      });
    }
  }
}
