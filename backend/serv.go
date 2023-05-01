package main

import (
    "fmt"
    "log"
    "net/http"
)

func main() {
    fmt.Printf("Starting server at port 6969\n")
    log.Default()

    http.HandleFunc("/hello", func(w http.ResponseWriter, r *http.Request){
        fmt.Fprintf(w, "Hello!")
    })
    if err := http.ListenAndServe(":6969", nil); err != nil {
        log.Fatal(err)
    }
}
