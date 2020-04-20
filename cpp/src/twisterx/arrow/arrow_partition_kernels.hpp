#ifndef TWISTERX_ARROW_PARTITION_KERNELS_H
#define TWISTERX_ARROW_PARTITION_KERNELS_H

#include <memory>
#include <vector>
#include <arrow/api.h>
#include <glog/logging.h>

#include "../util/murmur3.hpp"
#include "../status.hpp"

namespace twisterx {

class ArrowPartitionKernel {
 public:
  explicit ArrowPartitionKernel(
      arrow::MemoryPool *pool) : pool_(pool) {}

  /**
   * We partition the table and return the indexes as an array
   * @param ctx
   * @param values
   * @param out
   * @return
   */
  virtual int Partition(const std::shared_ptr<arrow::Array> &values, const std::vector<int> &targets,
                        std::vector<int64_t> *partitions) = 0;

  virtual uint32_t ToHash(const std::shared_ptr<arrow::Array> &values,
                          int16_t index) = 0;
 protected:
  arrow::MemoryPool *pool_;
};

template<typename TYPE>
class NumericHashPartitionKernel : public ArrowPartitionKernel {
 public:
  explicit NumericHashPartitionKernel(arrow::MemoryPool *pool) : ArrowPartitionKernel(pool) {}

  uint32_t ToHash(const std::shared_ptr<arrow::Array> &values,
                  int16_t index) {
    auto reader = std::static_pointer_cast<arrow::NumericArray<TYPE>>(values);
    auto type = std::static_pointer_cast<arrow::FixedWidthType>(values->type());
    int bitWidth = type->bit_width();
    if (values->IsNull(index)) {
      return 0;
    } else {
      auto lValue = reader->Value(index);
      uint32_t hash = 0;
      uint32_t seed = 0;
      void *val = (void *) &(lValue);
      // do the hash as we know the bit width
      twisterx::util::MurmurHash3_x86_32(val, bitWidth, seed, &hash);
      return hash;
    }

  }

  int Partition(const std::shared_ptr<arrow::Array> &values, const std::vector<int> &targets,
                std::vector<int64_t> *partitions) override {
    auto reader = std::static_pointer_cast<arrow::NumericArray<TYPE>>(values);
    auto type = std::static_pointer_cast<arrow::FixedWidthType>(values->type());
    int bitWidth = type->bit_width();
    for (int64_t i = 0; i < reader->length(); i++) {
      auto lValue = reader->Value(i);
      void *val = (void *) &(lValue);
      uint32_t hash = 0;
      uint32_t seed = 0;
      // do the hash as we know the bit width
      twisterx::util::MurmurHash3_x86_32(val, bitWidth, seed, &hash);
      // this is the hash
      partitions->push_back(targets.at(hash % targets.size()));
    }
    // now build the
    return 0;
  }
};

using UInt8ArrayHashPartitioner = NumericHashPartitionKernel<arrow::UInt8Type>;
using UInt16ArrayHashPartitioner = NumericHashPartitionKernel<arrow::UInt16Type>;
using UInt32ArrayHashPartitioner = NumericHashPartitionKernel<arrow::UInt32Type>;
using UInt64ArrayHashPartitioner = NumericHashPartitionKernel<arrow::UInt64Type>;
using Int8ArrayHashPartitioner = NumericHashPartitionKernel<arrow::Int8Type>;
using Int16ArrayHashPartitioner = NumericHashPartitionKernel<arrow::Int16Type>;
using Int32ArrayHashPartitioner = NumericHashPartitionKernel<arrow::Int32Type>;
using Int64ArrayHashPartitioner = NumericHashPartitionKernel<arrow::Int64Type>;
using HalfFloatArrayHashPartitioner = NumericHashPartitionKernel<arrow::HalfFloatType>;
using FloatArrayHashPartitioner = NumericHashPartitionKernel<arrow::FloatType>;
using DoubleArrayHashPartitioner = NumericHashPartitionKernel<arrow::DoubleType>;

twisterx::Status HashPartitionArray(arrow::MemoryPool *pool,
                                 std::shared_ptr<arrow::Array> values,
                                 const std::vector<int> &targets,
                                 std::vector<int64_t> *outPartitions);

twisterx::Status HashPartitionArrays(arrow::MemoryPool *pool,
                                  std::vector<std::shared_ptr<arrow::Array>> values,
                                  int64_t length,
                                  const std::vector<int> &targets,
                                  std::vector<int64_t> *outPartitions);

}

#endif //TWISTERX_ARROW_PARTITION_KERNELS_H
