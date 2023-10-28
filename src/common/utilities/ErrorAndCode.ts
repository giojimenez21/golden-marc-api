export class ErrorAndCode extends Error {
    statusCode: number;
    constructor(statusCode: number, message: string) {
        super(message);
        this.name = this.constructor.name;
        this.statusCode = statusCode;
        // Asegurar que la instancia de Error tenga la propiedad message
        Object.setPrototypeOf(this, new.target.prototype);
    }
}
