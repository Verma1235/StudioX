// import { Server } from "socket.io";
// import CreateAiAgent from "../genAi2.js";

// class NewSocketConnection {
//   constructor(server) {
//     this.server = server;
//     this.connectedUsers = new Map();
//     this.io = new Server(server, {
//       cors: {
//         origin: process.env.FRONTED_URL || "*",
//         methods: ["GET", "POST"],
//       },
//     });
//   }

//   setupSocket() {
//     this.io.on("connection", (socket) => {
//       console.log(`New Connection: ${socket.id}`);

//       this.connectedUsers.set(socket.id, socket);

//       // Create AI agent for this user
//       const agent = new CreateAiAgent(socket);

//       // First message from frontend
//       socket.on("messageFromClient", async (data) => {
//         console.log("Stage 3");
//         try {
//           console.log("Client Message:", data);
//           const response = await agent.startAiAgent(data);

//         } catch (error) {
//           console.log("Stage 4");

//         }
//       });

//       // Frontend replies to AI questions


//       socket.on("disconnect", () => {
//         this.connectedUsers.delete(socket.id);

//         console.log("Disconnected:", socket.id);
//       });
//     });
//   }
// }

// export default NewSocketConnection;

// socket/NewSocketConnection.js

import { Server } from "socket.io";
import StudioXAIAgent from "../genAi3.js";

class NewSocketConnection {
  constructor(server) {
    this.io = new Server(server, {
      cors: {
        origin: process.env.FRONTED_URL || "*",
        methods: ["GET", "POST"],
      },
    });

    this.connectedUsers = new Map();
  }

  setupSocket() {
    this.io.on("connection", (socket) => {
      console.log("✅ User Connected:", socket.id);

      this.connectedUsers.set(socket.id, socket);

      // Create AI agent per user
      const agent = new StudioXAIAgent(socket);

      // =========================
      // CLIENT MESSAGE
      // =========================

      socket.on(
        "messageFromClient",
        async (message) => {
          try {
            console.log(
              "📩 Client Message:",
              message
            );

            await agent.startAiAgent(message);
          } catch (error) {
            console.log(
              "SOCKET MESSAGE ERROR:",
              error.message
            );

            socket.emit(
              "messageFromServer",
              "⚠️ Failed to process request."
            );
          }
        }
      );

      // =========================
      // MODEL CHANGE
      // =========================

      socket.on(
        "changeModel",
        (modelState, callback) => {
          try {
            console.log(
              "🔄 Model Changed:",
              modelState
            );

            callback?.("success");

            socket.emit(
              "servertriggerToChangeModel",
              modelState
            );
          } catch (error) {
            console.log(
              "MODEL CHANGE ERROR:",
              error.message
            );
          }
        }
      );

      // =========================
      // DISCONNECT
      // =========================

      socket.on("disconnect", () => {
        console.log(
          "❌ User Disconnected:",
          socket.id
        );

        this.connectedUsers.delete(socket.id);
      });
    });
  }
}

export default NewSocketConnection;