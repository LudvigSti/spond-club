package main

import (
	"context"
	"encoding/json"
	"log"
	"os"
	"time"

	"github.com/jackc/pgx/v5/pgxpool"
)

var dbPool *pgxpool.Pool

func initDatabase() {
	connStr := "postgres://spond_user:spond_password@localhost:5432/spond_club"
	var err error
	dbPool, err = pgxpool.New(context.Background(), connStr)
	if err != nil {
		log.Fatalf("%v", err)
	}

	ctx := context.Background()

	sqlFile, err := os.ReadFile("init.sql")
	if err != nil {
		log.Fatalf("%v", err)
	}

	_, err = dbPool.Exec(ctx, string(sqlFile))
	if err != nil {
		log.Fatalf("%v", err)
	}

	seedDatabase(ctx)
}

func seedDatabase(ctx context.Context) {
	var count int
	err := dbPool.QueryRow(ctx, "SELECT COUNT(*) FROM forms").Scan(&count)
	if err != nil || count > 0 {
		return
	}

	lynTypes := `[{"id": "active", "name": "Aktiv utøver (Spiller)"}, {"id": "support", "name": "Støttemedlem (Supporter)"}, {"id": "coach", "name": "Trener / Lagleder"}]`
	sinsenTypes := `[{"id": "beginner", "name": "Nybegynner kurs"}, {"id": "advanced", "name": "Viderekomne / Senior"}]`

	insertQuery := `
		INSERT INTO forms (id, title, description, registration_date, member_types)
		VALUES ($1, $2, $3, $4, $5), ($6, $7, $8, $9, $10);
	`

	_, _ = dbPool.Exec(ctx, insertQuery,
		"lyn-fotball-2026", "Lyn Fotball - Sesongen 2026", "Velkommen til registrering for Lyn Fotball.", time.Now().Add(-24*time.Hour), lynTypes,
		"sinsen-tennis-2026", "Sinsen Tennisklubb - Høstkurs", "Påmelding til høstens tenniskurs på Sinsen.", time.Now().Add(7*24*time.Hour), sinsenTypes,
	)
}

func GetFormsFromDB() ([]FormDetails, error) {
	query := `SELECT id, title, description, registration_date, member_types FROM forms`
	rows, err := dbPool.Query(context.Background(), query)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var forms []FormDetails
	for rows.Next() {
		var f FormDetails
		var memberTypesJSON []byte

		err := rows.Scan(&f.ID, &f.Title, &f.Description, &f.RegistrationDate, &memberTypesJSON)
		if err != nil {
			return nil, err
		}

		if len(memberTypesJSON) > 0 {
			_ = json.Unmarshal(memberTypesJSON, &f.MemberTypes)
		}

		forms = append(forms, f)
	}
	return forms, nil
}

func SaveSubmissionToDB(input SubmissionInput, birthDate time.Time) error {
	query := `
		INSERT INTO submissions (form_id, first_name, last_name, email, phone, birth_date, member_type)
		VALUES ($1, $2, $3, $4, $5, $6, $7)
	`
	_, err := dbPool.Exec(context.Background(), query, input.FormID, input.FirstName, input.LastName, input.Email, input.Phone, birthDate, input.MemberType)
	return err
}