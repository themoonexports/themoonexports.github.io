#include "weblib.h"
#include "config.h"
#include "routes/products.h"
#include "routes/contact.h"
#include <signal.h>
#include <stdio.h>
#include <stdlib.h>

/* ── Graceful shutdown ───────────────────────────────────────── */
static http_server_t *s_server = NULL;

static void signal_handler(int sig) {
    (void)sig;
    printf("\nShutting down server…\n");
    if (s_server) {
        http_server_stop(s_server);
    }
}

/* ── Root welcome ────────────────────────────────────────────── */
static void handle_root(http_request_t *req, http_response_t *res) {
    (void)req;
    http_response_send_text(res, HTTP_OK,
        "The Moon Exports — Backend API " TME_VERSION);
}

int main(int argc, char *argv[]) {
    int port = TME_DEFAULT_PORT;
    if (argc > 1) {
        port = atoi(argv[1]);
        if (port <= 0 || port > 65535) {
            fprintf(stderr, "Invalid port: %s\n", argv[1]);
            return 1;
        }
    }

    /* Create server & router */
    http_server_t *server = http_server_create();
    router_t      *router = router_create();

    /* Store for signal handler */
    s_server = server;
    signal(SIGINT, signal_handler);
    signal(SIGTERM, signal_handler);

    /* ── CORS middleware ─────────────────────────────────────── */
    const char *allowed_origins[] = {
        TME_CORS_ORIGIN,
        TME_CORS_ORIGIN_DEV,
        NULL
    };
    cors_options_t cors_opts = {
        .allowed_origins   = allowed_origins,
        .allowed_methods   = "GET, POST, OPTIONS",
        .allowed_headers   = "Content-Type, Authorization",
        .allow_credentials = true,
        .max_age           = 86400
    };
    middleware_fn_t cors_mw = cors_middleware_create(&cors_opts);
    router_use_middleware(router, cors_mw);

    /* ── Rate limiting middleware ─────────────────────────────── */
    ratelimit_config_t rl_cfg = {
        .requests_per_window = TME_RATE_LIMIT_MAX,
        .window_seconds      = TME_RATE_LIMIT_WINDOW,
        .burst_size          = TME_RATE_LIMIT_MAX * 2
    };
    middleware_fn_t rl_mw = ratelimit_middleware_create(&rl_cfg);
    router_use_middleware(router, rl_mw);

    /* ── Logging middleware ───────────────────────────────────── */
    log_config_t log_cfg = {
        .level  = TME_LOG_LEVEL,
        .output = stdout
    };
    middleware_fn_t log_mw = log_middleware_create(&log_cfg);
    router_use_middleware(router, log_mw);

    /* Core routes */
    router_add_route(router, HTTP_GET, "/", handle_root);
    health_check_register(router);
    metrics_register(router);

    /* Feature routes */
    tme_register_product_routes(router);
    tme_register_contact_routes(router);

    /* Attach router and start */
    http_server_set_router(server, router);

    printf("The Moon Exports backend v%s starting on port %d …\n",
           TME_VERSION, port);
    http_server_listen(server, port);

    /* Cleanup (reached after graceful shutdown) */
    cors_middleware_destroy();
    ratelimit_middleware_destroy();
    log_middleware_destroy();
    router_destroy(router);
    http_server_destroy(server);
    s_server = NULL;
    return 0;
}
