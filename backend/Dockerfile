FROM ubuntu:22.04

RUN apt-get update && \
    apt-get install -y --no-install-recommends \
        gcc make cmake git ca-certificates && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /app
COPY . .

RUN mkdir -p build && cd build && cmake .. && make

EXPOSE 3000

CMD ["./build/tme_backend"]
