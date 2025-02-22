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

#ifndef CYLON_ARROW_H
#define CYLON_ARROW_H

#include <arrow/api.h>
#include <arrow/table.h>

#include "cylon/net/ops/all_to_all.hpp"
#include "cylon/arrow/arrow_buffer.hpp"

namespace cylon {
// lets define some integers to indicate the state of the data transfer using headers
enum ArrowHeader {
  ARROW_HEADER_INIT = 0,
  // wea are still sending the data about the column
  ARROW_HEADER_COLUMN_CONTINUE = 1,
  // this is the end of the column
  ARROW_HEADER_COLUMN_END = 2
};

/**
 * Keep track of the items to send for a target
 */
struct PendingSendTable {
  // the target
  int target{};
  // pending tables to be sent with it's reference
  std::queue<std::pair<std::shared_ptr<arrow::Table>, int32_t>> pending{};

  // keep the current table, reference pair
  std::pair<std::shared_ptr<arrow::Table>, int32_t> currentTable{};

  // state of the send
  ArrowHeader status = ARROW_HEADER_INIT;
  // the current column we are sending
  int columnIndex{};
  // the array we are sending of this column
  int arrayIndex{};
  // the current buffer inde
  int bufferIndex{};
};

struct PendingReceiveTable {
  // the source from which we are receiving
  int source{};
  // the current data column index
  int columnIndex{};
  // the current buffer inde
  int bufferIndex{};
  // number of buffers
  int noBuffers{};
  // the number of arrays in a chunked array
  int noArray{};
  // the length of the current array data
  int length{};
  // the reference
  int reference{};
  // keep the current columns
  std::vector<std::shared_ptr<arrow::ChunkedArray>> currentArrays;
  // keep the current buffers
  std::vector<std::shared_ptr<arrow::Buffer>> buffers;
  // keep the current arrays
  std::vector<std::shared_ptr<arrow::Array>> arrays;
};

/**
 * This function is called when a data is received
 * @param source the source
 * @param buffer the buffer allocated by the system, we need to free this
 * @param length the length of the buffer
 * @param reference reference sent by the sender
 * @return true if we accept this buffer
 */
using ArrowCallback = std::function<bool(int source, const std::shared_ptr<arrow::Table> &table,
                                         int reference)>;

/**
 * We are going to take a table as input and send its columns one by one
 */
class ArrowAllToAll : public ReceiveCallback {
 public:
  /**
   * Constructor
   * @param worker_id
   * @param all_workers
   * @return
   */
  ArrowAllToAll(const std::shared_ptr<cylon::CylonContext> &ctx,
                const std::vector<int> &source,
                const std::vector<int> &targets,
                int edgeId,
                ArrowCallback callback,
                std::shared_ptr<arrow::Schema> schema);

  /**
   * Insert a buffer to be sent, if the buffer is accepted return true
   *
   * @param buffer the buffer to send
   * @param length the length of the message
   * @param target the target to send the message
   * @return true if the buffer is accepted
   */
  int insert(const std::shared_ptr<arrow::Table> &arrow, int32_t target);

  /**
   * Insert a buffer to be sent, if the buffer is accepted return true
   *
   * @param buffer the buffer to send
   * @param length the length of the message
   * @param target the target to send the message
   * @param reference a reference that can be sent in the header
   * @return true if the buffer is accepted
   */
  int insert(const std::shared_ptr<arrow::Table> &arrow, int32_t target, int32_t reference);

  /**
   * Check weather the operation is complete, this method needs to be called until the operation is complete
   * @return true if the operation is complete
   */
  bool isComplete();

  /**
   * When this function is called, the operation finishes at both receivers and targets
   * @return
   */
  void finish();

  /*
   * Close the operation
   */
  void close();

  /**
   * We implement the receive complete callback from alltoall
   * @param receiveId
   * @param buffer
   * @param length
   */
  bool onReceive(int source, std::shared_ptr<Buffer> buffer, int length) override;

  /**
   * We implement the receive callback
   * @param request the original request, we can free it now
   */
  bool onReceiveHeader(int source, int finished, int *buffer, int length) override;

  bool onSendComplete(int target, const void *buffer, int length) override;

 private:
  /**
   * The targets
   */
  std::vector<int> targets_;

  /**
   * The sources
   */
  std::vector<int> srcs_;

  /**
   * The underlying alltoall communication
   */
  std::shared_ptr<AllToAll> all_;

  /**
   * Keep track of the inputs
   */
  std::unordered_map<int, std::shared_ptr<PendingSendTable>> inputs_;

  /**
   * Keep track of the receives
   */
  std::unordered_map<int, std::shared_ptr<PendingReceiveTable>> receives_;

  /**
   * Adding receive callback
   */
  ArrowCallback recv_callback_;

  /**
   * The schema of the arrow
   */
  std::shared_ptr<arrow::Schema> schema_;

  /**
   * We have received the finish
   */
  bool finished = false;

  /**
   * Finished sources
   */
  std::vector<int> finishedSources_;

  /**
   * Keep a count of received buffers
   */
  int receivedBuffers_;

  /**
   * The worker id
   */
  int workerId_;

  /**
   * The memory pool
   */
  arrow::MemoryPool *pool_;
  // this is the allocator to create memory when receiving
  ArrowAllocator *allocator_;

  bool completed_;
  bool finishCalled_;
};
}
#endif //CYLON_ARROW_H
