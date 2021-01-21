export class dialogItem {
    _id: string;
    created_at: string;
    last_message: string;
    last_message_date_sent: number;
    last_message_id: string;
    last_message_user_id: number;
    name: string;
    occupants_ids: number[];
    photo: string;
    type: number;
    updated_at: string;
    user_id: number;
    xmpp_room_jid: string;
    unread_messages_count: number;
}