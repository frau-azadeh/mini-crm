export type Contact = {
    id: number,
    firstName: string,
    lastName: string,
}

type DummyUserResponse = {
    users: Array<{
        id: number;
        firstName: string;
        lastName: string;
        email: string;
    }>

    total: number;
    skip: number;
    limit: number;
}