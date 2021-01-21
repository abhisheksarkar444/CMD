export enum typesEnum { PUBLIC_GROUP, GROUP, PRIVATE }

export class Dialog {
        _id: string;
        created_at: Date;
        last_message: string;
        last_message_date_sent: number;
        last_message_id: string;
        last_message_user_id: number;
        name: string;
        occupants_ids: number[];
        photo: string;
        type: typesEnum;
        updated_at: Date;
        user_id: number;
        xmpp_room_jid: string;
        unread_messages_count: number;
}