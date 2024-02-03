FROM golang:1.21

WORKDIR /app

COPY go.* .

RUN go mod download

COPY . .

RUN go build -v -o bin

CMD [ "/app/bin" ]