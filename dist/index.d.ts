type TypeOfObjectString = {
    [key: string]: string;
};
declare class BimaDB {
    table: string;
    where: {
        [key: string]: string;
    };
    apiURL: string;
    from: (table: string) => this;
    eq: (key: string, value: string) => this;
    clearProps: () => void;
    constructor(apiURL: string);
    doLogin: (username: string, password: string) => Promise<Boolean>;
    doUpdate: (data: TypeOfObjectString) => Promise<{
        msg: {
            count: number;
        };
    }>;
    doDelete: () => Promise<{
        msg: {
            count: number;
        };
    }>;
    doInsert: (data: TypeOfObjectString[]) => Promise<{
        msg: number;
    }>;
    doGet: (columns?: string[]) => Promise<{
        [key: string]: any;
    }[]>;
}
export default BimaDB;
