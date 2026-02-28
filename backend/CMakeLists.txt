cmake_minimum_required(VERSION 3.10)
project(tme_backend C)

set(CMAKE_C_STANDARD 11)
set(CMAKE_C_STANDARD_REQUIRED ON)

# ── modern-c-web-library dependency ──────────────────────────────
# The library is fetched at configure time via FetchContent.
# Release: https://github.com/kamrankhan78694/modern-c-web-library/releases/tag/v1.0.0
include(FetchContent)
FetchContent_Declare(
  modern_c_web_library
  GIT_REPOSITORY https://github.com/kamrankhan78694/modern-c-web-library.git
  GIT_TAG        v1.0.0
)
FetchContent_MakeAvailable(modern_c_web_library)

# Fix: library's CMakeLists uses CMAKE_SOURCE_DIR which doesn't work
# with FetchContent. Add the correct include paths to the weblib target.
target_include_directories(weblib PUBLIC
  ${modern_c_web_library_SOURCE_DIR}/include
  ${modern_c_web_library_SOURCE_DIR}/src
)

# ── Backend executable ───────────────────────────────────────────
add_executable(tme_backend
  src/main.c
  src/routes/products.c
  src/routes/contact.c
)

target_include_directories(tme_backend PRIVATE
  ${CMAKE_CURRENT_SOURCE_DIR}/include
  ${modern_c_web_library_SOURCE_DIR}/include
)

target_link_libraries(tme_backend PRIVATE weblib pthread)

# ── Tests ────────────────────────────────────────────────────────
option(BUILD_TESTS "Build test suite" ON)
if(BUILD_TESTS)
  enable_testing()
  add_subdirectory(tests)
endif()
