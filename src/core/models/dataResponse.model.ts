interface IEntity{};

export interface DataResponse<T extends IEntity>{
    ok: boolean,
    data: T,
}
