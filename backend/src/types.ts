export type ClientMessageType = {
    type: "init" | "message";
    init_body?: {
        user_id: string;
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
    state_body?: {
        users?: any;
        rooms?: any;
    };
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
export type UserType = {
    user_id: string;
    userName: string;
    state: {
        visibility: "online" | "offline";
    };
};
