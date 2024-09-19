import express from "express";
import { WebSocket } from "ws";
import { v4 as uuidv4 } from "uuid";

const app = express();
const httpServer = app.listen(3000, () => {
    console.log("Listening to Port : 3000");
});
const wss = new WebSocket.Server({ server: httpServer });

type ClientMessageType = {
    type: "init" | "message";
    init_body?: {
        userId: string;
        userName: string;
    };
    message_body: {
        data: any;
    };
};

type ServerMessageType = {
    type: "state" | "message";
    state_body?: any;
    message_body?: any;
};

const connections: {
    [key: string]: {
        userId: string;
        ws: WebSocket;
    };
} = {};

const user_details: {
    [key: string]: {
        userId: string;
        userName: string;
        state: {
            visibility: "online" | "offline";
        };
    };
} = {
    admin_user_1: {
        userId: "admin_user_1",
        userName: "User A",
        state: {
            visibility: "offline",
        },
    },
    admin_user_2: {
        userId: "admin_user_2",
        userName: "User B",
        state: {
            visibility: "offline",
        },
    },
    admin_user_3: {
        userId: "admin_user_3",
        userName: "User C",
        state: {
            visibility: "offline",
        },
    },
};

wss.on("connection", (ws: WebSocket) => {
    const uuid = uuidv4();
    init_connection(uuid, ws);

    ws.on("message", (message: any) =>
        handle_message(uuid, JSON.parse(message))
    );
    ws.on("close", () => {
        console.log(`Connection Closed : ${uuid}`);
        delete_user(uuid);
    });
});

const init_connection = (uuid: string, ws: WebSocket) => {
    connections[uuid] = {
        userId: "",
        ws: ws,
    };
    const message: ServerMessageType = {
        type: "state",
        state_body: {
            users: Object.keys(user_details).map((key) => user_details[key]),
        },
    };
    ws.send(JSON.stringify(message));
};

const delete_user = (uuid: string) => {
    if (connections[uuid].userId != "") {
        user_details[connections[uuid].userId].state.visibility = "offline";
        broadcast_user_details();
    }
    delete connections[uuid];
};

const handle_message = (uuid: string, message: any) => {
    if (message.type == "init") {
        connections[uuid].userId = message.init_body.userId;
        user_details[connections[uuid].userId] = message.init_body;
        broadcast_user_details();
    }
};

const broadcast_user_details = (uuid?: string) => {
    Object.keys(connections).forEach((key) => {
        if (key != uuid) {
            const ws = connections[key].ws;
            const message: ServerMessageType = {
                type: "state",
                state_body: {
                    users: Object.keys(user_details).map(
                        (key) => user_details[key]
                    ),
                },
            };
            ws.send(JSON.stringify(message));
        }
    });
};
