const xee = { "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjoiNjdlYTU2NzJkODE3NjViM2M4ZmEyYmYyIiwiaWF0IjoxNzQzNjAzNDI3LCJleHAiOjE3NDM2ODk4Mjd9.2BCWu0BrcEwNBuMK1nByXOu0tBKgpE9cdsoh8Z8_luw", "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjoiNjdlYTU2NzJkODE3NjViM2M4ZmEyYmYyIiwiaWF0IjoxNzQzNjAzNDI3LCJleHAiOjE3NDM2MDQwMjd9.mZ-YTTHHDSNiJiVn5R04wRgg3j3v4l7JMjkLoCLcVWw", "user": { "reports": [], "_id": "67ea5672d81765b3c8fa2bf2", "email": "onikhalidayo@gmail.com", "password": "$2b$10$h.Ox7VHXb5TnalXyJc6YqOp6xVOn8YdAp7L.JMYjaI8KWFcVgzS2.", "stage": "complete", "hasManagement": false, "status": "Active", "createdAt": "2025-03-31T08:46:42.871Z", "updatedAt": "2025-03-31T08:51:46.330Z", "__v": 0, "verificationDetails": { "verificationCode": "81869", "reason": "verifyEmail", "createdAt": "2025-03-31T08:46:42.836Z" }, "artistName": "Khalidee", "city": "Lagos", "country": "Nigeria", "firstName": "Khalid", "lastName": "Oni", "phoneNumber": "8167168616", "bankDetails": { "bankName": "Palmpay", "accountName": "Oni Khalid Ayobami", "accountNumber": 8167168616, "ibanSwiftCode": null, "currency": null, "sortCode": null, "paymentOption": null } } }

interface RootObject {
    accessToken: string;
    refreshToken: string;
    user: User;
}

interface User {
    reports: any[];
    _id: string;
    email: string;
    password: string;
    stage: string;
    hasManagement: boolean;
    status: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
    verificationDetails: VerificationDetails;
    artistName: string;
    city: string;
    country: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    bankDetails: BankDetails;
}

interface BankDetails {
    bankName: string;
    accountName: string;
    accountNumber: number;
    ibanSwiftCode: null;
    currency: null;
    sortCode: null;
    paymentOption: null;
}

interface VerificationDetails {
    verificationCode: string;
    reason: string;
    createdAt: string;
}