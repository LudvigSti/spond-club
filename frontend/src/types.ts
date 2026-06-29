export interface MemberType {
    id: string;
    name: string;
}

export interface FormDetails {
    id: string;
    title: string;
    description: string;
    registrationDate: string;
    memberTypes: MemberType[];
}

export interface FormData {
    formId: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    birthDate: string;
    memberType: string;
}