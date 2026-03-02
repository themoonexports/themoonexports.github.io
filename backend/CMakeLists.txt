cmake_minimum_required(VERSION 3.10)
project(tme_backend C)

set(CMAKE_C_STANDARD 11)
set(CMAKE_C_STANDARD_REQUIRED ON)

# ── modern-c-web-library dependency ──────────────────────────────
# The library is fetched at configure time via FetchContent.
# Pinned to a specific commit SHA for reproducible builds.
# To upgrade: update GIT_TAG to a newer commit SHA after testing.
include(FetchContent)
FetchContent_Declare(
  modern_c_web_library
  GIT_REPOSITORY https://github.com/kamrankhan78694/modern-c-web-library.git
  GIT_TAG        90f0de911f7d9cee97ab58861d156151d4853868
)

# Disable library sub-projects we don't need
set(BUILD_EXAMPLES OFF CACHE BOOL "" FORCE)

FetchContent_MakeAvailable(modern_c_web_library)

# ── Backend executable ───────────────────────────────────────────
add_executable(tme_backend
  src/main.c
  src/routes/products.c
  src/routes/contact.c
)

target_include_directories(tme_backend PRIVATE
  ${CMAKE_CURRENT_SOURCE_DIR}/include
  ${CMAKE_CURRENT_SOURCE_DIR}/src
)

target_link_libraries(tme_backend PRIVATE weblib pthread)

# ── Tests ────────────────────────────────────────────────────────
option(BUILD_TESTS "Build test suite" ON)
if(BUILD_TESTS)
  enable_testing()
  add_subdirectory(tests)
endif()
