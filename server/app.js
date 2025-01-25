import express from "express";
import grpc from "@grpc/grpc-js";
import protoLoader from "@grpc/proto-loader";
import { QuestionService } from "./src/controller.js";
import connect from "./config/configdata.js";
import { ReflectionService } from "@grpc/reflection";
import cors from "cors";

const PROTO_PATH = "./src/questions.proto";

const app = express();
app.use(cors());
const port = 3000;
const grpcPort = 50051;

app.use(express.json());

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {});
const questionProto =
  grpc.loadPackageDefinition(packageDefinition).questionService;

const grpcServer = new grpc.Server();

grpcServer.addService(
  questionProto.QuestionService.service,
  new QuestionService()
);

const reflection = new ReflectionService(packageDefinition);
reflection.addToServer(grpcServer);

connect()
  .then(() => {
    grpcServer.bindAsync(
      `127.0.0.1:${grpcPort}`,
      grpc.ServerCredentials.createInsecure(),
      () => {
        console.log(`gRPC server running at http://127.0.0.1:${grpcPort}`);
        grpcServer.start();
      }
    );
    app.listen(port, () => {
      console.log(`Express server running at http://127.0.0.1:${port}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection failed:", error);
  });

app.get("/api/questions", (req, res) => {
  const { page = 1, type, title } = req.query;
  const client = new questionProto.QuestionService(
    "127.0.0.1:50051",
    grpc.credentials.createInsecure()
  );
  client.GetQuestions(
    { page: parseInt(page), type, title },
    (error, response) => {
      if (error) {
        console.error("Error from gRPC server:", error);
        return res.status(500).json({ error: "Internal Server Error" });
      }
      res.json(response);
    }
  );
});


