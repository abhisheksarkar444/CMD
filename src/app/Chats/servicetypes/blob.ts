import { Blob_Object_Access } from './blob_object_access';

export class Blob {

    id: number;
    uid: string;
    content_type: string;
    name: string;
    size: string;
    created_at: string;
    updated_at: string;
    blob_status: string;
    set_completed_at: string;
    public: boolean;
    account_id: number;
    app_id: number;
    blob_object_access: Blob_Object_Access;
}