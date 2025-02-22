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

#ifndef CYLON_EXAMPLE_UTILS_HPP
#define CYLON_EXAMPLE_UTILS_HPP

#include <glog/logging.h>
#include <chrono>
#include <string>
#include <utility>
#include <memory>

#include <net/mpi/mpi_communicator.hpp>
#include <ctx/cylon_context.hpp>
#include <table.hpp>
#include <ops/dis_join_op.hpp>
#include <string>

namespace cylon {
namespace examples {

void create_int64_table(int64_t count, double dup,
                        std::shared_ptr<cylon::CylonContext> &ctx,
                        arrow::MemoryPool *pool,
                        std::shared_ptr<arrow::Table> &left_table,
                        std::shared_ptr<arrow::Table> &right_table);

int create_two_in_memory_tables_from_arrow_tables(std::shared_ptr<cylon::CylonContext> &ctx,
                                                  std::shared_ptr<arrow::Table> left_table,
                                                  std::shared_ptr<arrow::Table> right_table,
                                                  std::shared_ptr<cylon::Table> &first_table,
                                                  std::shared_ptr<cylon::Table> &second_table);

int create_two_in_memory_tables(int64_t count,
                                double dup,
                                std::shared_ptr<cylon::CylonContext> &ctx,
                                std::shared_ptr<cylon::Table> &first_table,
                                std::shared_ptr<cylon::Table> &second_table,
                                double null_prob = 0.0);

int create_in_memory_tables(int64_t count,
                            double dup,
                            std::shared_ptr<cylon::CylonContext> &ctx,
                            std::shared_ptr<cylon::Table> &first_table,
                            double null_prob = 0.0);
}
}
#endif //CYLON_EXAMPLE_UTILS_HPP
