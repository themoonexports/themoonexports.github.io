add_executable(test_validation test_validation.c)

target_include_directories(test_validation PRIVATE
  ${modern_c_web_library_SOURCE_DIR}/include
)

target_link_libraries(test_validation PRIVATE weblib)

add_test(NAME validation COMMAND test_validation)
