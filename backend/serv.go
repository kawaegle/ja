package main

import (
	"database/sql"
	"fmt"
	"log"
	"net/http"
	"os"
	"strconv"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/go-sql-driver/mysql"
)

type Asso struct {
    ID     int    `json:"id"`
    Name   string   `json:"name"`
    Desc   string   `json:"description"`
}

type Time struct {
    ID              int    `json:"id"`
    Activity_ID     int     `json:"activity_id"`
    Debut           string   `json:"debut"`
    Fin             string   `json:"fin"`
}

type Activi struct {
    ID     int    `json:"id"`
    Name   string   `json:"name"`
    Desc   string   `json:"description"`
    Asso_Id int   `json:"asso"`
    Place   int     `json:"places"`
}

type JsonUser struct {
    Id      int
    Name    string  `json:"name"`
    Surname string  `json:"surname"`
}

func getAsso(c *gin.Context) {
    var asso []Asso

    rows, err := db.Query("SELECT * FROM association")
    if err != nil {
        return
    }
    defer rows.Close()
    // Loop through rows, using Scan to assign column data to struct fields.
    for rows.Next() {
        var tmp Asso
        if err := rows.Scan(&tmp.ID, &tmp.Name, &tmp.Desc); err != nil {
            return
        }
        asso = append(asso, tmp)
    }
    if err := rows.Err(); err != nil {
        return
    }
    c.IndentedJSON(http.StatusOK, asso)
    return
}

func getActivity(c *gin.Context) {
    var activity []Activi

    rows, err := db.Query("SELECT * FROM activite")
    if err != nil {
        return
    }
    defer rows.Close()
    // Loop through rows, using Scan to assign column data to struct fields.
    for rows.Next() {
        var tmp Activi
        if err := rows.Scan(&tmp.ID, &tmp.Name, &tmp.Desc, &tmp.Asso_Id, &tmp.Place); err != nil {
            return
        }
        activity = append(activity, tmp)
    }
    if err := rows.Err(); err != nil {
        return
    }
    c.IndentedJSON(http.StatusOK, activity)
    return
}

func getTime(c *gin.Context) {
    var time []Time

    rows, err := db.Query("SELECT * FROM horaire")
    if err != nil {
        return
    }
    defer rows.Close()
    // Loop through rows, using Scan to assign column data to struct fields.
    for rows.Next() {
        var tmp Time
        if err := rows.Scan(&tmp.ID, &tmp.Activity_ID, &tmp.Debut, &tmp.Fin); err != nil {
            return
        }
        fmt.Println(tmp)
        time = append(time, tmp)
    }
    if err := rows.Err(); err != nil {
        return
    }
    c.IndentedJSON(http.StatusOK, time)
    return
}

func getTime_by_activity(c *gin.Context) {
    var activity []Activi
    id, _:= strconv.Atoi(c.Param("id"))

    rows, err := db.Query("SELECT * FROM activite")
    if err != nil {
        return
    }
    defer rows.Close()
    // Loop through rows, using Scan to assign column data to struct fields.
    for rows.Next() {
        var tmp Activi
        if err := rows.Scan(&tmp.ID, &tmp.Name, &tmp.Desc, &tmp.Asso_Id, &tmp.Place); err != nil {
            return
        }
        activity = append(activity, tmp)
    }
    if err := rows.Err(); err != nil {
        return
    }
        for _, a := range activity {
        if a.Asso_Id == id {
            c.IndentedJSON(http.StatusOK, a)
            return
        }
    }
    return
}

var db *sql.DB

func connectDb (){
    cfg := mysql.Config{
        User:   os.Getenv("DBUSER"),
        Passwd: os.Getenv("DBPASS"),
        DBName: os.Getenv("DATABASE"),
        Net:    "tcp",
        Addr:   "db:3306",
        AllowNativePasswords: true,
    }
    fmt.Printf("%s\n%s\n%s\n", os.Getenv("DBUSER"), os.Getenv("DBPASS"), os.Getenv("DATABASE"))
    var err error
    db, err = sql.Open("mysql", cfg.FormatDSN())
    if err != nil {
        log.Fatal(err)
        os.Exit(1)
    }
    err = db.Ping()
    if err != nil {
        log.Fatal(err)
        os.Exit(2)
    }
    fmt.Println("Connected!")
    return
}

func see_user(c *gin.Context) {
    var user []JsonUser

    rows, err := db.Query("SELECT * FROM participant")
    if err != nil {
        return
    }
    defer rows.Close()
    // Loop through rows, using Scan to assign column data to struct fields.
    for rows.Next() {
        var tmp JsonUser
        if err := rows.Scan(&tmp.Id, &tmp.Surname, &tmp.Name); err != nil {
            return
        }
        fmt.Println(tmp)
        user = append(user, tmp)
    }
    if err := rows.Err(); err != nil {
        return
    }
    c.IndentedJSON(http.StatusOK, user)
    return
}

func main() {
    // gin.SetMode(gin.ReleaseMode)
    router := gin.Default()
    connectDb()
    router.Use(cors.Default())
    router.GET("/associations", getAsso)
    router.GET("/activites", getActivity)
    router.GET("/horaires", getTime)
    router.GET("/horaires/:id", getTime_by_activity)
    router.POST("/register", register_user)
    router.GET("/register", see_user)
    router.GET("/mlp", teapot)
    router.Run("0.0.0.0:6969")
}

func teapot (c*gin.Context) {
    c.String(http.StatusTeapot, "I'm a fucking teapot")
}

func search_user (name string, surname string) (int, error) {
    var user []JsonUser

    rows, err := db.Query("SELECT * FROM participant")
    if err != nil {
        return -1, err
    }
    defer rows.Close()
    // Loop through rows, using Scan to assign column data to struct fields.
    for rows.Next() {
        var tmp JsonUser
        if err := rows.Scan(&tmp.Id, &tmp.Name, &tmp.Surname); err != nil {
            return -1, err
        }
        user = append(user, tmp)
    }
    if err := rows.Err(); err != nil {
        return -1, err
    }
    for _, a := range user {
        if a.Surname == surname && a.Name == name {
            fmt.Println("ah bah fuck")
            return 1, nil
        }
    }
    return 0, nil
}

func register_user(c *gin.Context) {
    var user JsonUser
    err := c.BindJSON(&user)
    if err != nil {
        c.String(http.StatusBadRequest, "bad request bro")
        return
    }
    ret, err := search_user(user.Name, user.Surname)
    if (ret != 0 || err != nil) {
        if (ret == 1) {
            c.String(http.StatusConflict, "already exist")
            return
        }
        fmt.Println(err)
        return
    }
    if id, err := add_user(user); id != 0 && err != nil {
        c.String(http.StatusInternalServerError, "IDK too bro")
        return
    }
    c.IndentedJSON(http.StatusCreated, user)
}

func add_user(user JsonUser) (int64, error) {
    result, err := db.Exec("INSERT INTO participant (prenom, nom) VALUES (?, ?)", user.Name, user.Surname)
    if err != nil {
        return 0, fmt.Errorf("addUser: %v", err)
    }
    id, err := result.LastInsertId()
    if err != nil {
        return 0, fmt.Errorf("addUser: %v", err)
    }
    return id, nil
}
