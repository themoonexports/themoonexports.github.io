#include "weblib.h"
#include <stdio.h>
#include <stdlib.h>

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

/* ── Email validation tests ──────────────────────────────────── */
static void test_validate_email(void) {
    printf("== input_validate_email ==\n");
    TEST("valid simple email",       input_validate_email("user@example.com"));
    TEST("valid with subdomain",     input_validate_email("user@mail.example.com"));
    TEST("valid with plus",          input_validate_email("user+tag@example.com"));
    TEST("valid with dots",          input_validate_email("first.last@example.com"));
    TEST("invalid: no @",          ! input_validate_email("userexample.com"));
    TEST("invalid: no domain",     ! input_validate_email("user@"));
    TEST("invalid: no local part", ! input_validate_email("@example.com"));
    TEST("invalid: empty string",  ! input_validate_email(""));
    TEST("invalid: NULL",          ! input_validate_email(NULL));
}

/* ── Length validation tests ─────────────────────────────────── */
static void test_validate_length(void) {
    printf("== input_validate_length ==\n");
    TEST("exact min length",         input_validate_length("ab", 2, 10));
    TEST("exact max length",         input_validate_length("abcdefghij", 2, 10));
    TEST("within range",             input_validate_length("hello", 1, 100));
    TEST("too short",              ! input_validate_length("a", 2, 10));
    TEST("too long",               ! input_validate_length("abcdefghijk", 2, 10));
    TEST("empty with min 1",       ! input_validate_length("", 1, 10));
    TEST("empty with min 0",        input_validate_length("", 0, 10));
    TEST("NULL string",            ! input_validate_length(NULL, 1, 10));
}

int main(void) {
    test_validate_email();
    test_validate_length();

    printf("\nResults: %d/%d passed\n", tests_run - tests_failed, tests_run);
    return tests_failed > 0 ? 1 : 0;
}
