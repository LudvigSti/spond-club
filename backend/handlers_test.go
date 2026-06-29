package main

import (
	"bytes"
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/gin-gonic/gin"
)

func TestSubmitFormHandler_MissingFields(t *testing.T) {
	gin.SetMode(gin.TestMode)
	r := gin.New()
	r.POST("/api/submit", submitFormHandler)

	invalidInput := SubmissionInput{
		FormID:    "lyn-fotball-2026",
		FirstName: "",
		LastName:  "Nordmann",
		Email:     "ola@nordmann.no",
		Phone:     "99988777",
		BirthDate: "2000-01-01",
		MemberType: "active",
	}

	jsonBytes, _ := json.Marshal(invalidInput)
	req, _ := http.NewRequest("POST", "/api/submit", bytes.NewBuffer(jsonBytes))
	w := httptest.NewRecorder()

	r.ServeHTTP(w, req)

	if w.Code != http.StatusBadRequest {
		t.Errorf("Expected status 400, got %d", w.Code)
	}
}

func TestSubmitFormHandler_InvalidDateFormat(t *testing.T) {
	gin.SetMode(gin.TestMode)
	r := gin.New()
	r.POST("/api/submit", submitFormHandler)

	invalidInput := SubmissionInput{
		FormID:    "lyn-fotball-2026",
		FirstName: "Ola",
		LastName:  "Nordmann",
		Email:     "ola@nordmann.no",
		Phone:     "99988777",
		BirthDate: "01-01-2000",
		MemberType: "active",
	}

	jsonBytes, _ := json.Marshal(invalidInput)
	req, _ := http.NewRequest("POST", "/api/submit", bytes.NewBuffer(jsonBytes))
	w := httptest.NewRecorder()

	r.ServeHTTP(w, req)

	if w.Code != http.StatusBadRequest {
		t.Errorf("Expected status 400, got %d", w.Code)
	}
}