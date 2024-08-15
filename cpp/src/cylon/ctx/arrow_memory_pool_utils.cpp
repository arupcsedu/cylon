/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

#include <cylon/ctx/arrow_memory_pool_utils.hpp>

arrow::MemoryPool *cylon::ToArrowPool(const std::shared_ptr<cylon::CylonContext> &ctx) {
  return ToArrowPool(ctx->GetMemoryPool());
}

arrow::MemoryPool *cylon::ToArrowPool(cylon::CylonContext *ctx) {
  return ToArrowPool(ctx->GetMemoryPool());
}

arrow::MemoryPool *cylon::ToArrowPool(cylon::MemoryPool *pool) {
  if (pool == nullptr) {
    return arrow::default_memory_pool();
  } else {
    // todo this is dangerous! return a smart pointer
    //return new ProxyMemoryPool(pool);
    return arrow::default_memory_pool();
  }
}
