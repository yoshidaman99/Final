interface Board{
    columns : Map<TypedColumn, Column>
}

type TypedColumn = 'todo' | 'inprogress' | 'done'

interface Column {
    id: TypedColumn,
    todo: Todo[]
}

interface Todo {
    id?: string;
    $id: string;
    title: string;
    message: string,
    status: TypedColumn;
    user: number;
    role?: string;
    type_Request: string,
    archive: boolean,
    image?: Image;
}

type RoleColumns = 'Admin' | 'Cashier' | 'Registral'

interface RoleUser{
    job_role: RoleColumns,
    user: Users[]
}

interface Users{
    $id: string,
    ID: string,
    first_name: string,
    last_name: string,
    Email: string,
    status: string,
    job_role: string,
    department: string,
}

interface Image {
    bucketId: string,
    fileId: string,
}