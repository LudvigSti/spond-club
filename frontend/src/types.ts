export interface MemberType {
    id: string;
    name: string;
}

export interface FormDetails {
    clubId: string;
    formId: string;
    title: string;
    description: string;
    registrationOpens: string;
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