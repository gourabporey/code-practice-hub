FROM golang:1.21

WORKDIR /app

COPY . .

RUN go mod download

EXPOSE 9999

RUN go build -v -o bin

CMD [ "/app/bin" ]
