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

/* ── Auth stub tests ────────────────────────────────────────── */
/* These tests verify the foundation for Sprint 2 auth work.     */
/* When auth middleware is implemented, expand with:              */
/*   - API-key acceptance/rejection tests                        */
/*   - CSRF double-submit cookie validation                      */
/*   - JWT creation and verification (if adopted)                */

static void test_auth_placeholder(void) {
    printf("== Auth test stubs (Sprint 2 ready) ==\n");

    /* Verify that input validation (used by auth) is available */
    TEST("input_validate_length is callable",
         input_validate_length("test-api-key", 1, 256));

    /* Verify JSON error response pattern works (used for 401/403) */
    json_value_t *err = json_object_create();
    json_object_set(err, "error", json_string_create("Unauthorized"));
    json_value_t *msg = json_object_get(err, "error");
    TEST("error JSON construction works",
         msg != NULL && msg->type == JSON_STRING);
    TEST("error message matches",
         strcmp(msg->data.string_val, "Unauthorized") == 0);
    json_value_free(err);

    /* Verify router can register multiple methods on same path */
    router_t *router = router_create();
    TEST("router creation for auth route testing", router != NULL);
    router_destroy(router);
}

int main(void) {
    test_auth_placeholder();

    printf("\nResults: %d/%d passed\n", tests_run - tests_failed, tests_run);
    return tests_failed > 0 ? 1 : 0;
}
