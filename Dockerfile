FROM rust:1.80.0 AS development
RUN rustup self update
RUN rustup update
RUN rustup component add clippy rust-analyzer rustfmt
RUN rustup target add aarch64-unknown-linux-musl
ADD Cargo* ./
ADD src/ ./src
RUN export CGO_ENABLED=0
RUN cargo build --release --target aarch64-unknown-linux-musl
CMD ["cargo", "run"]


FROM gcr.io/distroless/static-debian12
WORKDIR /usr/local/bin
COPY --from=development /target/aarch64-unknown-linux-musl/release /usr/local/bin
CMD ["./sample"]
