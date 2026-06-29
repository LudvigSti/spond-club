package main

import (
	"context"
	"fmt"
	"log"
	"net/http"
	"strings"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/jackc/pgx/v5/pgxpool"
)

type MemberType struct {
	ID   string `json:"id"`
	Name string `json:"name"`
}

type FormDetails struct {
	ID              string       `json:"id"`
	Title           string       `json:"title"`
	Description     string       `json:"description"`
	RegistrationDate time.Time    `json:"registrationDate"`
	MemberTypes     []MemberType `json:"memberTypes"`
}

type SubmissionInput struct {
	FormID     string `json:"formId"`
	Name       string `json:"name"`
	Email      string `json:"email"`
	Phone      string `json:"phone"`
	BirthDate  string `json:"birthDate"`
	MemberType string `json:"memberType"`
}

var dbPool *pgxpool.Pool

func main() {
	connStr := "postgres://spond_user:spond_password@localhost:5432/spond_club"

	var err error
	dbPool, err = pgxpool.New(context.Background(), connStr)
	if err != nil {
		log.Fatalf("Klarte ikke å opprette database-pool: %v\n", err)
	}
	defer dbPool.Close()

	err = dbPool.Ping(context.Background())
	if err != nil {
		log.Fatalf("Klarte ikke å pinge databasen. Er Docker-containeren i gang? %v\n", err)
	}
	fmt.Println("🎉 Suksessfullt koblet til PostgreSQL i Docker!")

	r := gin.Default()

	r.GET("/api/form", func(c *gin.Context) {
		form := FormDetails{
			ID:               "spond-club-registration-123",
			Title:            "Medlemsregistrering for Spond Club",
			Description:      "Velkommen til vår klubb! Vennligst fyll ut skjemaet nedenfor for å registrere deg som medlem.",
			RegistrationDate: time.Now(),
			MemberTypes: []MemberType{
				{ID: "adult", Name: "Voksen (fylt 18 år)"},
				{ID: "child", Name: "Barn (under 18 år)"},
				{ID: "support", Name: "Støttemedlem"},
			},
		}
		c.JSON(http.StatusOK, form)
	})

	r.POST("/api/submit", func(c *gin.Context) {
		var input SubmissionInput

		if err := c.ShouldBindJSON(&input); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Ugyldig JSON-format"})
			return
		}

		if strings.TrimSpace(input.Name) == "" ||
		   strings.TrimSpace(input.Email) == "" ||
		   strings.TrimSpace(input.Phone) == "" ||
		   strings.TrimSpace(input.MemberType) == "" {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Alle felt må fylles ut"})
			return
		}

		if !strings.Contains(input.Email, "@") {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Ugyldig e-postadresse"})
			return
		}

		parsedBirthDate, err := time.Parse("2006-01-02", input.BirthDate)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Ugyldig datoformat. Bruk YYYY-MM-DD"})
			return
		}

		query := `
			INSERT INTO submissions (form_id, name, email, phone, birth_date, member_type)
			VALUES ($1, $2, $3, $4, $5, $6)
		`

		_, err = dbPool.Exec(context.Background(), query,
			input.FormID,
			input.Name,
			input.Email,
			input.Phone,
			parsedBirthDate,
			input.MemberType,
		)

		if err != nil {
			log.Printf("Kunne ikke lagre til DB: %v", err)
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Kunne ikke lagre registreringen"})
			return
		}

		c.JSON(http.StatusOK, gin.H{"message": "Registrering mottatt og lagret!"})
	})

	r.Run(":8080")
}