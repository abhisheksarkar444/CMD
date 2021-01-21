import { attachment } from './attachments.type';

export class item {
    _id: string;
    created_at: Date;
    updated_at: Date;
    attachments: attachment;
    read_ids: number[];
    delivered_ids: number[];
    chat_dialog_id: string;
    date_sent: number;
    message: string;
    recipient_id: number[];
    sender_id: number;
    read: number;
}