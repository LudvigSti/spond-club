package main

import "time"

type MemberType struct {
	ID   string `json:"id"`
	Name string `json:"name"`
}

type FormDetails struct {
	ID               string       `json:"id"`
	Title            string       `json:"title"`
	Description      string       `json:"description"`
	RegistrationDate time.Time    `json:"registrationDate"`
	MemberTypes     []MemberType `json:"memberTypes"`
}

type SubmissionInput struct {
	FormID    string `json:"formId"`
	FirstName string `json:"firstName"`
	LastName  string `json:"lastName"`
	Email     string `json:"email"`
	Phone     string `json:"phone"`
	BirthDate string `json:"birthDate"`
	MemberType string `json:"memberType"`
}