export interface UploadFileInfo {
    Type: string;
    Id: string;
    Url: string;
}

export interface CreateFileInfo {
    Uid: string;
    Id: number;
    Params: Array<ParamInfo>;
}

export interface ParamInfo {
    Key: string;
    Value: string;
}