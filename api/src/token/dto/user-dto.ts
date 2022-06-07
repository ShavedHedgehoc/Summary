export class UserDto {
    email: string;
    id: number;

    constructor(model) {
        this.email = model.email;
        this.id = model.id;
    }
}