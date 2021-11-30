#!/bin/bash
# Copyright 2021 Google LLC
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     https://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
set -ex

# This script is intended to be run within the base image from
# net/grpc/gateway/docker/prereqs/Dockerfile

# Ensures all Bazel targets builds
cd /github/grpc-web && \
  bazel clean && \
  bazel build \
    //javascript/net/grpc/web/generator/... \
    //net/grpc/gateway/examples/echo/...
