package main

import "time"

type MemberType struct {
	ID   string `json:"id"`
	Name string `json:"name"`
}

type FormDetails struct {
	ClubID           string       `json:"clubId"`
	FormID           string       `json:"formId"`
	Title            string       `json:"title"`
	Description      string       `json:"description,omitempty"`
	RegistrationOpens time.Time    `json:"registrationOpens"`
	MemberTypes      []MemberType `json:"memberTypes"`
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