#include "routes/contact.h"
#include "config.h"
#include <stdio.h>
#include <string.h>

/* ── POST /api/contact ───────────────────────────────────────── */
static void handle_contact_submit(http_request_t *req, http_response_t *res) {
    const char *body = http_request_get_body(req);
    if (!body || body[0] == '\0') {
        json_value_t *err = json_object_create();
        json_object_set(err, "error", json_string_create("Request body is empty"));
        http_response_send_json(res, HTTP_BAD_REQUEST, err);
        json_value_free(err);
        return;
    }

    /*
     * TODO: parse body JSON (name, email, message),
     *       validate fields, forward to mail service / Zoho CRM.
     */
    printf("[contact] Received submission: %s\n", body);

    json_value_t *ok = json_object_create();
    json_object_set(ok, "status",  json_string_create("received"));
    json_object_set(ok, "message", json_string_create("Thank you for contacting us."));
    http_response_send_json(res, HTTP_OK, ok);
    json_value_free(ok);
}

/* ── Route registration ──────────────────────────────────────── */
void tme_register_contact_routes(router_t *router) {
    router_add_route(router, HTTP_POST, TME_API_PREFIX "/contact", handle_contact_submit);
}
