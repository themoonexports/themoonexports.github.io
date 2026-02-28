# ── Stage 1: Builder ─────────────────────────────────────────────
FROM ubuntu:22.04 AS builder

RUN apt-get update && \
    apt-get install -y --no-install-recommends \
        gcc g++ make cmake git ca-certificates && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /build
COPY . .

RUN mkdir -p out && cd out && \
    cmake -DCMAKE_BUILD_TYPE=Release -DBUILD_TESTS=OFF .. && \
    make -j"$(nproc)"

# ── Stage 2: Runtime ────────────────────────────────────────────
FROM ubuntu:22.04

RUN apt-get update && \
    apt-get install -y --no-install-recommends curl && \
    rm -rf /var/lib/apt/lists/* && \
    useradd -r -u 1000 -s /usr/sbin/nologin appuser

COPY --from=builder /build/out/tme_backend /usr/local/bin/tme_backend

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:3000/healthz || exit 1

USER appuser

CMD ["tme_backend"]
