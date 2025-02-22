##
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
# http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
##

##########################################################################
#	CMake Build Rules for the Cylon                               #
##########################################################################
# Basic Usage:                                                           #
#   cmake .								 #
#   make  								 #
#   make test                                                            #
# For more information about CMake, see http://www.cmake.org             #
##########################################################################
cmake_minimum_required(VERSION 3.17 FATAL_ERROR)
set(CMAKE_INSTALL_RPATH_USE_LINK_PATH TRUE)

project(CYLON VERSION 0.6.0)

set(CYLON_VERSION 0.6.0)

## defaults to release build
if (NOT CMAKE_BUILD_TYPE)
    set(CMAKE_BUILD_TYPE Release)
endif ()

# cmake modules directories
set(CYLON_ARROW_VERSION 9.0.0)
set(CMAKE_MODULE_PATH "${CMAKE_CURRENT_SOURCE_DIR}/CMake/Modules/" ${CMAKE_MODULE_PATH})
list(APPEND CMAKE_MODULE_PATH ${CYLON_SOURCE_DIR}/CMake)

# Compiler specific flags
IF(MSVC)
    set(CMAKE_WINDOWS_EXPORT_ALL_SYMBOLS TRUE)
    set(BUILD_SHARED_LIBS TRUE)
ELSE()
    set(CMAKE_CXX_FLAGS  "-Wall -Wextra -Wno-error=redundant-move")
ENDIF()

if (NOT DEFINED CYLON_SIMD_LEVEL)
    set("CYLON_SIMD_LEVEL" "SSE4_2") # options: SSE4_2| AVX512 | AVX2
endif ()

# Add common flags
include(SetupCxxFlags)
message("CXX_COMMON_FLAGS: ${CXX_COMMON_FLAGS}")
set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} ${CXX_COMMON_FLAGS}")
set(CMAKE_INSTALL_INCLUDEDIR "include")

# Check build type (debug/ release) and set flags
string(TOUPPER "${CMAKE_BUILD_TYPE}" UPPERCASE_CMAKE_BUILD_TYPE)
if (UPPERCASE_CMAKE_BUILD_TYPE MATCHES "DEBUG")
    message("Running on debug mode...")
    set(CMAKE_CXX_FLAGS_DEBUG "${CMAKE_CXX_FLAGS_DEBUG} -g")

    set(CMAKE_CXX_FLAGS_DEBUG "${CMAKE_CXX_FLAGS_DEBUG} -fsanitize=address -fno-omit-frame-pointer ")
elseif (UPPERCASE_CMAKE_BUILD_TYPE MATCHES "RELEASE")
    message("Running on Release mode...")
    set(CMAKE_CXX_FLAGS_RELEASE "${CMAKE_CXX_FLAGS_RELEASE} -O3")
elseif (UPPERCASE_CMAKE_BUILD_TYPE MATCHES "RELWITHDEBINFO")
    message("Running on RelWithDebInfo mode...")
    set(CMAKE_CXX_FLAGS_RELWITHDEBINFO "${CMAKE_CXX_FLAGS_RELWITHDEBINFO} -O2 -g -fsanitize=address")
else ()
    message(FATAL_ERROR "Unknown CMAKE_BUILD_TYPE ${CMAKE_BUILD_TYPE}! Exiting...")
endif ()

# C++ standard
set(CMAKE_CXX_STANDARD 14)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_CXX_EXTENSIONS OFF)
set(GCC_ABI_COMPILE_FLAGS "-D_GLIBCXX_USE_CXX11_ABI=0")
if (NOT HAVE_EXCLUSIVE_SCAN)
    add_definitions(-DNEED_EXCLUSIVE_SCAN)
endif ()

# check for conda environment
if ("$ENV{CONDA_BUILD}" STREQUAL "1")
    message("CONDA_BUILD detected. BUILD_PREFIX: $ENV{BUILD_PREFIX} PREFIX: $ENV{PREFIX}")

    set(CMAKE_SYSTEM_PREFIX_PATH "$ENV{BUILD_PREFIX};$ENV{PREFIX};${CMAKE_SYSTEM_PREFIX_PATH}")
    set(CONDA_INCLUDE_DIRS "$ENV{BUILD_PREFIX}/include" "$ENV{PREFIX}/include")
    set(CONDA_LINK_DIRS "$ENV{BUILD_PREFIX}/lib" "$ENV{PREFIX}/lib")

    if (NOT ARROW_BUILD_TYPE)
        set(ARROW_BUILD_TYPE "SYSTEM")
    endif()


    set(CMAKE_INSTALL_INCLUDEDIR "$ENV{BUILD_PREFIX}/include")

    message(STATUS "Conda build detected, CMAKE_SYSTEM_PREFIX_PATH set to: ${CMAKE_SYSTEM_PREFIX_PATH}")
    message(STATUS "CONDA_INCLUDE_DIRS set to: ${CONDA_INCLUDE_DIRS}")
    message(STATUS "CONDA_LINK_DIRS set to: ${CONDA_LINK_DIRS}")

    #    if conda build is on, set Python Root DIR to conda
    set(Python3_ROOT_DIR "$ENV{BUILD_PREFIX}")

    set(CYLON_CONDA_BUILD ON)
elseif (DEFINED ENV{CONDA_PREFIX})
    message("CONDA_PREFIX detected: $ENV{CONDA_PREFIX}")

    set(CMAKE_SYSTEM_PREFIX_PATH "$ENV{CONDA_PREFIX};${CMAKE_SYSTEM_PREFIX_PATH}")
    set(CONDA_INCLUDE_DIRS "$ENV{CONDA_PREFIX}/include")
    set(CONDA_LINK_DIRS "$ENV{CONDA_PREFIX}/lib" "$ENV{CONDA_PREFIX}/Library/lib")
    if (NOT ARROW_BUILD_TYPE)
        set(ARROW_BUILD_TYPE "SYSTEM")
    endif()

    message(STATUS "Conda environment detected, CMAKE_SYSTEM_PREFIX_PATH set to: ${CMAKE_SYSTEM_PREFIX_PATH}")
    message(STATUS "CONDA_INCLUDE_DIRS set to: ${CONDA_INCLUDE_DIRS}")
    message(STATUS "CONDA_LINK_DIRS set to: ${CONDA_LINK_DIRS}")

    #    if conda prefix is on, set Python Root DIR to conda
    set(Python3_ROOT_DIR "$ENV{CONDA_PREFIX}")

    set(CYLON_CONDA_BUILD ON)
endif ("$ENV{CONDA_BUILD}" STREQUAL "1")

## PyCylon build
option(PYCYLON_BUILD "Enable PyCylon build" OFF)
if (PYCYLON_BUILD)
    message("Cylon Python Build enabled")

    # LocationByValue Python
    find_package(Python3 COMPONENTS Interpreter Development NumPy REQUIRED)
    message(STATUS "Python3 executable: ${Python3_EXECUTABLE}")
    message(STATUS "Python3 include dir: ${Python3_INCLUDE_DIRS}")
    message(STATUS "Python3 libraries: ${Python3_LIBRARIES}")
    message(STATUS "Python3 NumPy include dir: ${Python3_NumPy_INCLUDE_DIRS}")

    include_directories(SYSTEM ${Python3_INCLUDE_DIRS})
endif (PYCYLON_BUILD)

# Put the libaries and binaries that get built into directories at the
# top of the build.
set(LIBRARY_OUTPUT_PATH ${CMAKE_BINARY_DIR}/lib)
set(EXECUTABLE_OUTPUT_PATH ${CMAKE_BINARY_DIR}/bin)
set(TEST_DATA_DIR ${CYLON_SOURCE_DIR}/data)

# set cmake include directory
if (CYLON_CONDA_BUILD)
    include_directories(SYSTEM "${CONDA_INCLUDE_DIRS}")
endif (CYLON_CONDA_BUILD)
include_directories(src/)

# set cmake link dirs
if (CYLON_CONDA_BUILD)
    link_directories("${CONDA_LINK_DIRS}")
endif (CYLON_CONDA_BUILD)

# LocationByValue MPI
message("Finding MPI")
find_package(MPI REQUIRED COMPONENTS CXX)
message(STATUS "MPI include dir: ${MPI_CXX_INCLUDE_PATH}")
message(STATUS "MPI libs: ${MPI_CXX_LIBRARIES}")

if (CYLON_CUSTOM_MPIRUN)
    set(MPIEXEC_EXECUTABLE ${CYLON_CUSTOM_MPIRUN})
endif (CYLON_CUSTOM_MPIRUN)
message(STATUS "MPI executable: ${MPIEXEC_EXECUTABLE}")

if (CYLON_MPIRUN_PARALLELISM_FLAG)
    set(MPIEXEC_PARALLELISM_FLAG ${CYLON_MPIRUN_PARALLELISM_FLAG})
else ()
    set(MPIEXEC_PARALLELISM_FLAG -np)
endif (CYLON_MPIRUN_PARALLELISM_FLAG)
message(STATUS "MPI parallelism flag: ${MPIEXEC_PARALLELISM_FLAG}")

if (CYLON_CUSTOM_MPIRUN_PARAMS)
    set(MPIEXEC_EXECUTABLE_PARAMS ${CYLON_CUSTOM_MPIRUN_PARAMS})
else ()
    if (WIN32)
        set(MPIEXEC_EXECUTABLE_PARAMS "")
    else ()
        set(MPIEXEC_EXECUTABLE_PARAMS --allow-run-as-root --oversubscribe)
    endif ()
endif (CYLON_CUSTOM_MPIRUN_PARAMS)
message(STATUS "MPI executable params: ${MPIEXEC_EXECUTABLE_PARAMS}")

include_directories(SYSTEM ${MPI_CXX_INCLUDE_PATH})

# Glog
# if conda build, we will get glog from conda instead of building ourselves
if (CYLON_CONDA_BUILD)
    message("Using Conda Glog")
    find_package(glog REQUIRED)
    set(GLOG_LIBRARIES glog::glog)
else ()
    message("Building Glog locally")
    include(ConfigureGlog)
    include_directories(SYSTEM "${GLOG_INCLUDE_DIR}")
    message(STATUS "Glog include dir: ${GLOG_INCLUDE_DIR}")

    install(FILES ${GLOG_LIBRARIES} DESTINATION lib)
    install(DIRECTORY ${GLOG_INCLUDE_DIR}/glog DESTINATION include)
endif (CYLON_CONDA_BUILD)
message(STATUS "Glog libs: ${GLOG_LIBRARIES}")

# this is required on windows to prevent clashes between ERROR abbreviation in logging.h and windows.h
if (WIN32)
    add_definitions("-DGLOG_NO_ABBREVIATED_SEVERITIES")
    add_definitions("-DNOMINMAX=1")
endif ()

# include Modules/Build.cmake
include(Build)

# Off if you dont want to build tests -- ON default
option(CYLON_WITH_TEST "Build Cylon C++ tests." OFF)
if (CYLON_WITH_TEST)
    message("C++ tests enabled")
    set(CYLON_CATCH2_GIT_TAG v2.13.9)
    set(CYLON_CATCH2_HEADER_HASH 27da57c7a06d09be8dd81fab7246b79e7892b6ae7e4e49ba8631f1d5a955e3fc)


    # Ref: https://cliutils.gitlab.io/modern-cmake/chapters/testing/catch.html
    message("Downloading Catch2 header ${CYLON_CATCH2_GIT_TAG}")
    set(catch2_url https://github.com/catchorg/Catch2/releases/download/${CYLON_CATCH2_GIT_TAG}/catch.hpp)
    set(CYLON_CATCH2_HEADER_PATH "${CMAKE_CURRENT_BINARY_DIR}/test/catch.hpp")
    file(DOWNLOAD ${catch2_url} ${CYLON_CATCH2_HEADER_PATH}
            STATUS status
            EXPECTED_HASH SHA256=${CYLON_CATCH2_HEADER_HASH})
    list(GET status 0 error)
    if (error)
        message(FATAL_ERROR "Could not download ${catch2_url}")
    else ()
        message(STATUS "Catch2 header downloaded to ${CYLON_CATCH2_HEADER_PATH}")
    endif ()

    set(CMAKE_CTEST_ARGUMENTS "--output-on-failure")
    enable_testing()
endif(CYLON_WITH_TEST)


# if building gcylon, no need to build cylon
option(GCYLON_BUILD "Build GCylon" OFF)
if (GCYLON_BUILD)
    message("GCylon build enabled")
    add_subdirectory(src/gcylon)
    add_subdirectory(src/examples/gcylon)
    if (CYLON_WITH_TEST)
        add_subdirectory(test/gcylon)
    endif ()
    return()
endif ()


if (CYLON_UCX)
    message("Cylon UCX enabled")
    # Definition used for checking
    add_definitions(-DBUILD_CYLON_UCX)

    if (CONDA_LINK_DIRS)
        message("Using Conda UCX unless UCX_INCLUDEDIR and UCX_LIBDIR is defined")

        if (UCX_INSTALL_PREFIX)
            message("setting UCX include and lib directories from install prefix")
            include_directories(SYSTEM ${UCX_INSTALL_PREFIX}/include)
            set(UCX_LIBRARIES
                ${UCX_INSTALL_PREFIX}/lib/libuct.so
                ${UCX_INSTALL_PREFIX}/lib/libucs.so
                ${UCX_INSTALL_PREFIX}/lib/libucm.so
                ${UCX_INSTALL_PREFIX}/lib/libucp.so)
        else()
            find_library(UCX_UCT uct REQUIRED HINTS ${CONDA_LINK_DIRS})
            find_library(UCX_UCS ucs REQUIRED HINTS ${CONDA_LINK_DIRS})
            find_library(UCX_UCM ucm REQUIRED HINTS ${CONDA_LINK_DIRS})
            find_library(UCX_UCP ucp REQUIRED HINTS ${CONDA_LINK_DIRS})
            set(UCX_LIBRARIES ${UCX_UCT} ${UCX_UCS} ${UCX_UCM} ${UCX_UCP})
        endif ()

    elseif (NOT UCX_INSTALL_PREFIX)
        message("Using locally installed UCX without install prefix")

        # Check if UCX include and lib paths are given
        if (NOT UCX_INCLUDEDIR)
            message(FATAL_ERROR "CYLON_UCX is set, UCX_INCLUDEDIR should also be set")
        endif ()
        if (NOT UCX_LIBDIR)
            message(FATAL_ERROR "CYLON_UCX is set, UCX_LIBDIR should also be set")
        endif ()

        # Set UCX found as true
        set(UCX_FOUND TRUE)

        # Include UCX
        include_directories(SYSTEM ${UCX_INCLUDEDIR})
        # Set library directory for later use
        set(UCX_LIBRARIES
                ${UCX_LIBDIR}/libuct.so
                ${UCX_LIBDIR}/libucs.so
                ${UCX_LIBDIR}/libucm.so
                ${UCX_LIBDIR}/libucp.so)
    else ()
        message("Using locally installed UCX")

        if (NOT UCX_INSTALL_PREFIX)
            message(FATAL_ERROR "CYLON_UCX is set, UCX_INSTALL_PREFIX should also be set")
        endif ()

        # Set UCX found as true
        set(UCX_FOUND TRUE)


        message("setting UCX include and lib directories from install prefix")
        include_directories(SYSTEM ${UCX_INSTALL_PREFIX}/include)
        set(UCX_LIBRARIES
                ${UCX_INSTALL_PREFIX}/lib/libuct.so
                ${UCX_INSTALL_PREFIX}/lib/libucs.so
                ${UCX_INSTALL_PREFIX}/lib/libucm.so
                ${UCX_INSTALL_PREFIX}/lib/libucp.so)

    endif (CONDA_LINK_DIRS)
    message(STATUS "UCX libs: ${UCX_LIBRARIES}")

    if (CYLON_UCC)
        message("Cylon UCC enabled")
        # Definition used for checking
        add_definitions(-DBUILD_CYLON_UCC)

        if (NOT UCC_INSTALL_PREFIX)
            message(FATAL_ERROR "CYLON_UCC is set, but UCC_INSTALL_PREFIX is missing")
        endif ()

        find_package(ucc REQUIRED CONFIG HINTS ${UCC_INSTALL_PREFIX})
        message(STATUS "UCC include dirs: ${UCC_INCLUDE_DIRS}")
        message(STATUS "UCC libs: ${UCC_LIBRARIES}")

        include_directories(SYSTEM ${UCC_INCLUDE_DIRS})
        link_directories(${UCC_LIBRARIES} ${UCC_LIBRARIES}/ucc)
    endif (CYLON_UCC)

    if(CYLON_USE_REDIS)
        message("Cylon Redis Enabled")
        add_definitions(-DBUILD_CYLON_REDIS)


        find_library(HIREDIS_LIB hiredis HINTS ${REDIS_INSTALL_PREFIX}/lib)
        find_library(REDIS_PLUS_PLUS_LIB redis++ HINTS ${REDIS_INSTALL_PREFIX}/lib64)
        set(REDIS_LIBRARIES
                ${HIREDIS_LIB}
                ${REDIS_PLUS_PLUS_LIB})
    endif (CYLON_USE_REDIS)
endif (CYLON_UCX)

# gloo
option(CYLON_GLOO "Build Cylon with Gloo" OFF)
if (CYLON_GLOO)
    message("Cylon Gloo enabled")
    add_definitions(-DBUILD_CYLON_GLOO)

    if (NOT GLOO_INSTALL_PREFIX)
        message(FATAL_ERROR "CYLON_GLOO is set, GLOO_INSTALL_PREFIX should also be set")
    endif ()

    find_package(Gloo REQUIRED CONFIG HINTS ${GLOO_INSTALL_PREFIX})
    message(STATUS "gloo include dirs: ${GLOO_INCLUDE_DIRS}")
    message(STATUS "gloo libs: ${GLOO_LIBRARIES}")

    include_directories(SYSTEM ${GLOO_INCLUDE_DIRS})
    link_directories(${GLOO_LIBRARIES})

    if (EXISTS "${GLOO_INCLUDE_DIRS}/gloo/mpi/context.h")
        set(GLOO_USE_MPI ON)
    else ()
        set(GLOO_USE_MPI OFF)
    endif ()
    message(STATUS "gloo use mpi: ${GLOO_USE_MPI}")
    add_definitions(-DGLOO_USE_MPI)
endif()


# Arrow
if (NOT ARROW_BUILD_TYPE)
    set(ARROW_BUILD_TYPE "SOURCE")
endif()

if (${ARROW_BUILD_TYPE} STREQUAL "SYSTEM")
    message("Finding Arrow from SYSTEM")
    find_package(Arrow REQUIRED)
    message(STATUS "Arrow ver: ${ARROW_FULL_SO_VERSION}")
    message(STATUS "Arrow include dir: ${ARROW_INCLUDE_DIR}")
    message(STATUS "Arrow lib dir: ${ARROW_LIB_DIR}")

    find_library(ARROW_LIB arrow ${CYLON_ARROW_VERSION} REQUIRED)
    message(STATUS "Arrow lib: ${ARROW_LIB}")

    find_library(ARROW_DATASET_LIB arrow_dataset ${CYLON_ARROW_VERSION} REQUIRED)
    message(STATUS "Arrow dataset lib: ${ARROW_DATASET_LIB}")

    if (PYCYLON_BUILD)
        find_library(ARROW_PY_LIB arrow_python ${CYLON_ARROW_VERSION} REQUIRED)
        message(STATUS "Arrow py lib: ${ARROW_PY_LIB}")
    endif (PYCYLON_BUILD)

elseif (${ARROW_BUILD_TYPE} STREQUAL "SOURCE")
    message("Building Arrow from SOURCE")
    include(ConfigureArrow)
    include_directories(SYSTEM "${ARROW_INCLUDE_DIR}")
elseif (${ARROW_BUILD_TYPE} STREQUAL "CUSTOM")
    message("Using CUSTOM Arrow installation")

    if (NOT ARROW_LIB_DIR)
        message(FATAL_ERROR "ARROW_BUILD_TYPE is set to CUSTOM, ARROW_LIB_DIR should be set")
    endif ()

    if (NOT ARROW_INCLUDE_DIR)
        message(FATAL_ERROR "ARROW_BUILD_TYPE is set to CUSTOM, ARROW_INCLUDE_DIR should be set")
    endif ()

    add_definitions(${GCC_ABI_COMPILE_FLAGS})

    string(REPLACE "." "" ARROW_SO_VERSION ${CYLON_ARROW_VERSION})
    list(APPEND CMAKE_FIND_LIBRARY_SUFFIXES ".so.${ARROW_SO_VERSION}")

    include_directories(SYSTEM ${ARROW_INCLUDE_DIR})
    link_directories(${ARROW_LIB_DIR})

    find_library(ARROW_LIB arrow ${CYLON_ARROW_VERSION} REQUIRED HINTS "${ARROW_LIB_DIR}")
    message(STATUS "Arrow lib: ${ARROW_LIB}")

    if (PYCYLON_BUILD)
        find_library(ARROW_PY_LIB arrow_python ${CYLON_ARROW_VERSION} REQUIRED HINTS "${ARROW_LIB_DIR}")
        message(STATUS "Arrow py lib: ${ARROW_PY_LIB}")
    endif (PYCYLON_BUILD)
else ()
    message(FATAL_ERROR "ARROW_BUILD_TYPE should be SYSTEM, SOURCE or CUSTOM. Given ${ARROW_BUILD_TYPE}")
endif ()

# parquet
message("Cylon Parquet enabled")
add_definitions(-DBUILD_CYLON_PARQUET)
find_library(PARQUET_LIB parquet REQUIRED HINTS "${ARROW_LIB_DIR}")
message(STATUS "Parquet lib: ${PARQUET_LIB}")

add_subdirectory(src/cylon)
add_subdirectory(src/examples)

include(GNUInstallDirs)

# installing lib files if built locally
if (${ARROW_BUILD_TYPE} STREQUAL "SOURCE")
    #    Following variables will be populated by FindPackage(Arrow...) in ConfigureArrow.cmake
    message(STATUS "Arrow include dir: ${ARROW_INCLUDE_DIR}")
    message(STATUS "Arrow libs: ${ARROW_SHARED_LIB} ${ARROW_STATIC_LIB}")

    # install locally built arrow files
    install(DIRECTORY ${ARROW_INCLUDE_DIR}/arrow DESTINATION include)
    install(DIRECTORY ${CMAKE_BINARY_DIR}/arrow/install/${CMAKE_INSTALL_LIBDIR}/ DESTINATION lib
            PATTERN ${ARROW_INCLUDE_DIR}/cmake EXCLUDE
            PATTERN ${ARROW_INCLUDE_DIR}/pkgconfig EXCLUDE)

    # glog.a file
    install(FILES ${GLOG_LIBRARIES} DESTINATION lib)
endif ()

# Off if you dont want to build tests -- ON default
if (CYLON_WITH_TEST)
    add_subdirectory(test)
endif ()
