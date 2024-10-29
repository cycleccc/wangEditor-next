#!/bin/bash

## One-click build script for all packages

# 获取 yarn dev/build 类型
buildType=build
if [ -z "$1" ]; then
  echo "No build type specified, defaulting to 'build'"
elif [ "$1" != "dev" ] && [ "$1" != "build" ]; then
  echo "Error: Build type must be either 'dev' or 'build'"
  exit 1
else
  buildType=$1
fi

cd ./packages || { echo "Error: packages directory not found"; exit 1; }


# Initialize build status tracking
declare -A build_status
build_start_time=$(date +%s)

# Function to log build status
log_status() {
    local package=$1
    local status=$2
    build_status["$package"]=$status
}

# Function to print build summary
print_summary() {
    build_end_time=$(date +%s)
    build_duration=$((build_end_time - build_start_time))

    echo -e "\nBuild Summary:"
    echo "=============="
    for package in "${!build_status[@]}"; do
        status="${build_status[$package]}"
        if [ "$status" = "success" ]; then
            echo "✅ $package: Success"
        else
            echo "❌ $package: Failed"
        fi
    done
    echo -e "\nTotal build time: ${build_duration}s"
}

# Update build_package function
build_package() {
    local package_name=$1
    local timeout=1800  # 30 minutes timeout
    echo "Building package: $package_name"
    if cd "$package_name"; then
        rm -rf dist
        if timeout $timeout yarn "$buildType" 2> build_error.log; then
            rm -f build_error.log
            log_status "$package_name" "success"
        else
            if [ -f build_error.log ]; then
                echo "Build failed for $package_name. Error:"
                cat build_error.log
                rm -f build_error.log
            fi
            log_status "$package_name" "failed"
            cd ..
            return 1
        fi
        log_status "$package_name" "success"
        cd ..
    else
        echo "Failed to enter directory: $package_name"
        log_status "$package_name" "failed"
        return 1
    fi
}

# Build packages in dependency order
build_package "core"
build_package "basic-modules"
build_package "code-highlight"
build_package "list-module"
build_package "table-module"
build_package "upload-image-module"
build_package "video-module"
build_package "editor"

# Add trap for summary printing
trap print_summary EXIT
