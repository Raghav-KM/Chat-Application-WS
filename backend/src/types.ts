export type ClientMessageType = {
    type: "init" | "message";
    init_body?: {
        userId: string;
        userName: string;
        state: {
            visibility: "offline" | "online";
        };
    };
    message_body?: {
        sender_id: string;
        room_id: string;
        data: string;
    };
};

export type ServerMessageType = {
    type: "state" | "message" | "room_state";
    state_body?: any;
    message_body?: {
        sender_id: string;
        room_id: string;
        data: string;
    };
};

export type RoomType = {
    room_id: string;
    member_ids: string[];
};
