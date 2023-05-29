FROM  golang:alpine

ARG DBUSER
ARG DBPASS
ARG DATABASE

WORKDIR /App
COPY . .

RUN go build -o serv serv.go

CMD [ "./serv" ]
