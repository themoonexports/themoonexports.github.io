#include "weblib.h"
#include "config.h"
#include "routes/products.h"
#include "routes/contact.h"
#include <stdio.h>
#include <stdlib.h>

/* ── Health-check handler ────────────────────────────────────── */
static void handle_health(http_request_t *req, http_response_t *res) {
    (void)req;
    json_value_t *obj = json_object_create();
    json_object_set(obj, "status", json_string_create("ok"));
    json_object_set(obj, "service", json_string_create("tme-backend"));
    http_response_send_json(res, HTTP_OK, obj);
    json_value_free(obj);
}

/* ── Root welcome ────────────────────────────────────────────── */
static void handle_root(http_request_t *req, http_response_t *res) {
    (void)req;
    http_response_send_text(res, HTTP_OK,
        "The Moon Exports — Backend API (modern-c-web-library v1.0.0)");
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

    /* Core routes */
    router_add_route(router, HTTP_GET, "/",        handle_root);
    router_add_route(router, HTTP_GET, "/healthz", handle_health);

    /* Feature routes */
    tme_register_product_routes(router);
    tme_register_contact_routes(router);

    /* Attach router and start */
    http_server_set_router(server, router);

    printf("The Moon Exports backend starting on port %d …\n", port);
    http_server_listen(server, port);

    /* Cleanup (reached on graceful shutdown) */
    router_destroy(router);
    http_server_destroy(server);
    return 0;
}
