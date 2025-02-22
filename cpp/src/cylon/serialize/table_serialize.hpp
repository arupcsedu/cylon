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

#ifndef CYLON_CPP_SRC_CYLON_NET_TABLE_SERIALIZE_HPP_
#define CYLON_CPP_SRC_CYLON_NET_TABLE_SERIALIZE_HPP_

#include "cylon/table.hpp"
#include "cylon/net/serialize.hpp"

namespace cylon{

class CylonTableSerializer : public TableSerializer {
 public:
  CylonTableSerializer(std::shared_ptr<arrow::Table> table,
                       std::vector<int32_t> buffer_sizes,
                       std::vector<const uint8_t *> data_buffers,
                       arrow::BufferVector extra_buffers);

  static Status Make(const std::shared_ptr<Table> &table,
                     std::shared_ptr<TableSerializer> *serializer);

  const std::vector<int32_t> &getBufferSizes() override {
    return buffer_sizes_;
  }
  int getNumberOfBuffers() override {
    return num_buffers_;
  }
  std::vector<int32_t> getEmptyTableBufferSizes() override;

  const std::vector<const uint8_t *> &getDataBuffers() override {
    return data_buffers_;
  }

  std::vector<int32_t> getDataTypes() override;

  const arrow::BufferVector &extra_buffers() const;

 private:

  const std::shared_ptr<arrow::Table> table_;
  const int32_t num_buffers_;
  const std::vector<int32_t> buffer_sizes_;
  const std::vector<const uint8_t *> data_buffers_;

  // when there are boolean buffers with non-byte-boundary-offsets, we can not get a byte* to the
  // data start. So, we'll have to make copy to new buffer. These new buffers will be kept here.
  const arrow::BufferVector extra_buffers_;
};

/**
 * Deserialize table with a set of cylon buffers. The buffers will be static casted to
 * cylon::ArrowBuffers.
 * @param ctx
 * @param schema
 * @param received_buffers
 * @param buffer_sizes
 * @param output
 * @param buffer_offsets Optional: Sometimes, there may be a displacement from the Cylon buffer to
 * start reading data. size = num_buffers
 * @return
 */
Status DeserializeTable(const std::shared_ptr<CylonContext> &ctx,
                        const std::shared_ptr<arrow::Schema> &schema,
                        const std::vector<std::shared_ptr<Buffer>> &received_buffers,
                        const std::vector<int32_t> &buffer_sizes,
                        const std::vector<int32_t> &buffer_offsets,
                        std::shared_ptr<Table> *output);
Status DeserializeTable(const std::shared_ptr<CylonContext> &ctx,
                        const std::shared_ptr<arrow::Schema> &schema,
                        const std::vector<std::shared_ptr<Buffer>> &received_buffers,
                        const std::vector<int32_t> &buffer_sizes,
                        std::shared_ptr<Table> *output);
Status DeserializeTable(const std::shared_ptr<CylonContext> &ctx,
                        const std::shared_ptr<arrow::Schema> &schema,
                        const std::vector<std::shared_ptr<Buffer>> &received_buffers,
                        std::shared_ptr<Table> *output);

/**
 * Deserialize a world_size number of tables generated from an operation like AllGather.
 *
 * @param ctx
 * @param schema
 * @param received_buffers
 * @param buffer_sizes_per_table
 * |b_0, ..., b_n-1|...|b_0, ..., b_n-1|
 *  <--- tbl_0 --->     <--- tbl_m --->
 * m = num tables (i.e. world size), n = num buffers (i.e. 3*num columns)
 * @param buffer_offsets_per_table
 * |b_0, ..., b_n-1|...|b_0, ..., b_n-1|
 *  <--- tbl_0 --->     <--- tbl_m --->
 * @param output
 * @return
 */
Status DeserializeTables(const std::shared_ptr<CylonContext> &ctx,
                         const std::shared_ptr<arrow::Schema> &schema,
                         int num_tables,
                         const std::vector<std::shared_ptr<Buffer>> &received_buffers,
                         const std::vector<int32_t> &buffer_sizes_per_table,
                         const std::vector<int32_t> &buffer_offsets_per_table,
                         std::vector<std::shared_ptr<Table>> *output);

class CylonColumnSerializer : public ColumnSerializer {
 public:
  CylonColumnSerializer(std::shared_ptr<arrow::Array> array,
                        const std::array<const uint8_t *, 3> &data_bufs,
                        const std::array<int32_t, 3> &buf_sizes,
                        arrow::BufferVector extra_buffers);

  const std::array<const uint8_t *, 3> &data_buffers() const override;

  const std::array<int32_t, 3> &buffer_sizes() const override;

  int32_t getDataTypeId() const override;

  static Status Make(const std::shared_ptr<arrow::Array> &column,
                     std::shared_ptr<ColumnSerializer> *serializer,
                     arrow::MemoryPool *pool = arrow::default_memory_pool());
  static Status Make(const std::shared_ptr<arrow::ChunkedArray> &column,
                     std::shared_ptr<ColumnSerializer> *serializer,
                     arrow::MemoryPool *pool = arrow::default_memory_pool());
  static Status Make(const std::shared_ptr<Column> &column,
                     std::shared_ptr<ColumnSerializer> *serializer,
                     MemoryPool *pool = nullptr);

 private:
  const std::shared_ptr<arrow::Array> array_;
  const std::array<const uint8_t *, 3> data_bufs_;
  const std::array<int32_t, 3> buf_sizes_;
  const arrow::BufferVector extra_buffers_;
};

Status DeserializeColumn(const std::shared_ptr<arrow::DataType> &data_type,
                         const std::array<std::shared_ptr<Buffer>, 3> &received_buffers,
                         const std::array<int32_t, 3> &buffer_sizes,
                         const std::array<int32_t, 3> &buffer_offsets,
                         std::shared_ptr<Column> *output);
Status DeserializeColumn(const std::shared_ptr<arrow::DataType> &data_type,
                         const std::array<std::shared_ptr<Buffer>, 3> &received_buffers,
                         const std::array<int32_t, 3> &buffer_sizes,
                         std::shared_ptr<Column> *output);

}

#endif //CYLON_CPP_SRC_CYLON_NET_TABLE_SERIALIZE_HPP_
