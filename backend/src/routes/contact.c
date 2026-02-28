#include "routes/contact.h"
#include "config.h"
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

/* Helper: send a JSON error response */
static void send_error(http_response_t *res, http_status_t status, const char *msg) {
    json_value_t *err = json_object_create();
    json_object_set(err, "error", json_string_create(msg));
    http_response_send_json(res, status, err);
    json_value_free(err);
}

/* ── POST /api/contact ───────────────────────────────────────── */
static void handle_contact_submit(http_request_t *req, http_response_t *res) {
    /* Body is a struct field, not a function */
    const char *body = req->body;
    if (!body || body[0] == '\0') {
        send_error(res, HTTP_BAD_REQUEST, "Request body is empty");
        return;
    }

    /* Parse JSON body */
    json_value_t *parsed = json_parse(body);
    if (!parsed) {
        send_error(res, HTTP_BAD_REQUEST, "Invalid JSON in request body");
        return;
    }

    /* Extract fields */
    json_value_t *name_val = json_object_get(parsed, "name");
    json_value_t *email_val = json_object_get(parsed, "email");
    json_value_t *message_val = json_object_get(parsed, "message");

    if (!name_val || name_val->type != JSON_STRING) {
        json_value_free(parsed);
        send_error(res, HTTP_BAD_REQUEST, "Field 'name' is required and must be a string");
        return;
    }
    if (!email_val || email_val->type != JSON_STRING) {
        json_value_free(parsed);
        send_error(res, HTTP_BAD_REQUEST, "Field 'email' is required and must be a string");
        return;
    }
    if (!message_val || message_val->type != JSON_STRING) {
        json_value_free(parsed);
        send_error(res, HTTP_BAD_REQUEST, "Field 'message' is required and must be a string");
        return;
    }

    /* Validate name length (1–100 chars) */
    if (!input_validate_length(name_val->data.string_val, 1, 100)) {
        json_value_free(parsed);
        send_error(res, HTTP_BAD_REQUEST, "Name must be between 1 and 100 characters");
        return;
    }

    /* Validate email format */
    if (!input_validate_email(email_val->data.string_val)) {
        json_value_free(parsed);
        send_error(res, HTTP_BAD_REQUEST, "Invalid email address");
        return;
    }

    /* Validate message length (1–2000 chars) */
    if (!input_validate_length(message_val->data.string_val, 1, 2000)) {
        json_value_free(parsed);
        send_error(res, HTTP_BAD_REQUEST, "Message must be between 1 and 2000 characters");
        return;
    }

    /* Sanitize name and message against XSS; email is already format-validated */
    char *safe_name = input_sanitize_html(name_val->data.string_val);
    char *safe_message = input_sanitize_html(message_val->data.string_val);

    printf("[contact] Received submission from: %s <%s>\n",
           safe_name, email_val->data.string_val);

    /* Build success response */
    json_value_t *ok = json_object_create();
    json_object_set(ok, "status",  json_string_create("received"));
    json_object_set(ok, "message", json_string_create("Thank you for contacting us."));
    http_response_send_json(res, HTTP_OK, ok);
    json_value_free(ok);

    free(safe_name);
    free(safe_message);
    json_value_free(parsed);
}

/* ── Route registration ──────────────────────────────────────── */
void tme_register_contact_routes(router_t *router) {
    router_add_route(router, HTTP_POST, TME_API_PREFIX "/contact", handle_contact_submit);
}
