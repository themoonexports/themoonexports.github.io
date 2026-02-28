add_executable(test_validation test_validation.c)

target_link_libraries(test_validation PRIVATE weblib)

add_test(NAME validation COMMAND test_validation)
