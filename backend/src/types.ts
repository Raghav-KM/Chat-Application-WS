export type ClientMessageType = {
    type: "init" | "message";
    init_body?: {
        userId: string;
        userName: string;
    };
    message_body: {
        data: any;
    };
};

export type ServerMessageType = {
    type: "state" | "message";
    state_body?: any;
    message_body?: any;
};
