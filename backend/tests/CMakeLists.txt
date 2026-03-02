add_executable(test_validation test_validation.c)
target_link_libraries(test_validation PRIVATE weblib)
add_test(NAME validation COMMAND test_validation)

add_executable(test_routes test_routes.c)
target_link_libraries(test_routes PRIVATE weblib)
add_test(NAME routes COMMAND test_routes)

add_executable(test_auth test_auth.c)
target_link_libraries(test_auth PRIVATE weblib)
add_test(NAME auth COMMAND test_auth)
