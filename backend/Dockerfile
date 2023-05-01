FROM  golang:alpine

WORKDIR /App
COPY . .
RUN go build serv.go
CMD [ "serv" ]

