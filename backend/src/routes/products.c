#include "routes/products.h"
#include "config.h"
#include <stdio.h>
#include <string.h>

/* ── GET /api/products ───────────────────────────────────────── */
static void handle_list_products(http_request_t *req, http_response_t *res) {
    (void)req;

    json_value_t *root = json_object_create();
    json_value_t *items = json_array_create();

    /* Example seed data — will be replaced by a data-file loader. */
    const char *categories[] = {"Horn Crafts", "Wooden Crafts", "Resin Products"};
    for (int i = 0; i < 3; i++) {
        json_value_t *item = json_object_create();
        json_object_set(item, "id",       json_number_create(i + 1));
        json_object_set(item, "category", json_string_create(categories[i]));
        json_array_push(items, item);
    }

    json_object_set(root, "products", items);
    http_response_send_json(res, HTTP_OK, root);
    json_value_free(root);
}

/* ── GET /api/products/:id ───────────────────────────────────── */
static void handle_get_product(http_request_t *req, http_response_t *res) {
    const char *id = http_request_get_param(req, "id");
    if (!id) {
        json_value_t *err = json_object_create();
        json_object_set(err, "error", json_string_create("Missing product id"));
        http_response_send_json(res, HTTP_BAD_REQUEST, err);
        json_value_free(err);
        return;
    }

    json_value_t *obj = json_object_create();
    json_object_set(obj, "id",   json_string_create(id));
    json_object_set(obj, "name", json_string_create("Sample Product"));
    json_object_set(obj, "note", json_string_create("Replace with real data source"));
    http_response_send_json(res, HTTP_OK, obj);
    json_value_free(obj);
}

/* ── Route registration ──────────────────────────────────────── */
void tme_register_product_routes(router_t *router) {
    router_add_route(router, HTTP_GET, TME_API_PREFIX "/products",     handle_list_products);
    router_add_route(router, HTTP_GET, TME_API_PREFIX "/products/:id", handle_get_product);
}
