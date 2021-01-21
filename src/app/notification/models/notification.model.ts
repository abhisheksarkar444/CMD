import { NotificationType } from './notificationtype.model';

export class Notification {
    id: number;
    receiver_UserID: string;
    notificationtime: any;
    notificationType: NotificationType;
    description: string;
    heading: string;
    navigation: string;
    isDeleted: boolean;
    isRead: boolean;
    sender_UserID: string;
    expiryTime_Minutes: number;

}