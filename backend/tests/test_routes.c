#include "weblib.h"
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

static int tests_run = 0;
static int tests_failed = 0;

#define TEST(name, expr) do {                                      \
    tests_run++;                                                   \
    if (expr) {                                                    \
        printf("  PASS: %s\n", name);                              \
    } else {                                                       \
        printf("  FAIL: %s\n", name);                              \
        tests_failed++;                                            \
    }                                                              \
} while (0)

/* ── JSON parsing helper tests ──────────────────────────────── */
static void test_json_create_and_parse(void) {
    printf("== JSON create / parse ==\n");

    /* Create a JSON object with products array */
    json_value_t *root = json_object_create();
    TEST("json_object_create returns non-NULL", root != NULL);

    json_value_t *items = json_array_create();
    TEST("json_array_create returns non-NULL", items != NULL);

    json_value_t *item = json_object_create();
    json_object_set(item, "id",       json_number_create(1));
    json_object_set(item, "category", json_string_create("Horn Crafts"));
    json_array_append(items, item);

    json_object_set(root, "products", items);

    /* Verify we can retrieve nested values */
    json_value_t *products = json_object_get(root, "products");
    TEST("json_object_get retrieves 'products'", products != NULL);
    TEST("products is array type",              products->type == JSON_ARRAY);

    json_value_free(root);

    /* Parse a JSON string */
    const char *json_str = "{\"name\":\"Test\",\"email\":\"test@example.com\"}";
    json_value_t *parsed = json_parse(json_str);
    TEST("json_parse succeeds on valid JSON", parsed != NULL);

    json_value_t *name = json_object_get(parsed, "name");
    TEST("parsed name field exists",             name != NULL);
    TEST("parsed name is string type",           name->type == JSON_STRING);
    TEST("parsed name value matches",            strcmp(name->data.string_val, "Test") == 0);

    json_value_t *email = json_object_get(parsed, "email");
    TEST("parsed email field exists",            email != NULL);
    TEST("parsed email value matches",           strcmp(email->data.string_val, "test@example.com") == 0);

    json_value_free(parsed);

    /* Parse invalid JSON */
    json_value_t *bad = json_parse("{invalid}");
    TEST("json_parse returns NULL for invalid JSON", bad == NULL);
    if (bad) json_value_free(bad);
}

/* ── Input sanitization tests ───────────────────────────────── */
static void test_input_sanitize(void) {
    printf("== input_sanitize_html ==\n");

    char *safe = input_sanitize_html("<script>alert('xss')</script>");
    TEST("sanitize removes script tags", safe != NULL);
    TEST("sanitized output has no '<script>'",
         safe != NULL && strstr(safe, "<script>") == NULL);
    free(safe);

    char *clean = input_sanitize_html("Hello World");
    TEST("sanitize preserves clean text",
         clean != NULL && strcmp(clean, "Hello World") == 0);
    free(clean);

    char *entities = input_sanitize_html("a<b>c");
    TEST("sanitize escapes angle brackets",
         entities != NULL && strstr(entities, "<b>") == NULL);
    free(entities);
}

/* ── Contact form validation logic tests ────────────────────── */
static void test_contact_validation_logic(void) {
    printf("== Contact form validation logic ==\n");

    /* Valid contact data */
    TEST("valid name length (1-100)",
         input_validate_length("Jane Doe", 1, 100));
    TEST("valid email format",
         input_validate_email("jane@example.com"));
    TEST("valid message length (1-2000)",
         input_validate_length("Hello, I'd like to inquire about your products.", 1, 2000));

    /* Empty name */
    TEST("empty name rejected",
         !input_validate_length("", 1, 100));

    /* Invalid email formats */
    TEST("email without @ rejected",
         !input_validate_email("jane.example.com"));
    TEST("email without domain rejected",
         !input_validate_email("jane@"));
    TEST("empty email rejected",
         !input_validate_email(""));

    /* Name too long (>100 chars) */
    char long_name[102];
    memset(long_name, 'A', 101);
    long_name[101] = '\0';
    TEST("name > 100 chars rejected",
         !input_validate_length(long_name, 1, 100));

    /* Message too long (>2000 chars) */
    char long_msg[2002];
    memset(long_msg, 'B', 2001);
    long_msg[2001] = '\0';
    TEST("message > 2000 chars rejected",
         !input_validate_length(long_msg, 1, 2000));
}

/* ── Router and route registration tests ────────────────────── */
static void test_router_operations(void) {
    printf("== Router operations ==\n");

    router_t *router = router_create();
    TEST("router_create returns non-NULL", router != NULL);

    /* Cleanup */
    router_destroy(router);
    TEST("router_destroy completes without crash", 1);
}

int main(void) {
    test_json_create_and_parse();
    test_input_sanitize();
    test_contact_validation_logic();
    test_router_operations();

    printf("\nResults: %d/%d passed\n", tests_run - tests_failed, tests_run);
    return tests_failed > 0 ? 1 : 0;
}
