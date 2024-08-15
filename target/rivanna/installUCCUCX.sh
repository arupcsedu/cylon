#! /bin/sh


PWD=`pwd`
BUILD_PATH=$PWD/build

module load  intel-compilers/2023.1.0  impi/2021.9.0 gcc/11.4.0 openmpi/4.1.4 python/3.9.16 cmake/3.23.3

python -m venv $PWD/CYLON-ENV

source $PWD/CYLON-ENV/bin/activate

# pip install -r $PWD/requirements.txt
pip install pip -U
pip install pytest
pip install -U pytest-mpi
pip install numpy
pip install cloudmesh-openstack

# pip install pyarrow==9.0.0

export CC=`which gcc`
export CXX=`which g++`
CC=gcc MPICC=mpicc pip install --no-binary mpi4py install mpi4py
UCC_INSTALL=/scratch/qad5gv/ucc/install
UCX_INSTALL=/scratch/qad5gv/ucx/install
REDIS_INSTALL=/scratch/qad5gv/redis_install
pip install urllib3==1.26.6


rm -rf build

export LD_LIBRARY_PATH=$BUILD_PATH/install/lib:$UCX_INSTALL/lib:$UCC_INSTALL/lib:$REDIS_INSTALL/lib:$REDIS_INSTALL/lib64:$LD_LIBRARY_PATH

time ./build.sh -j$(nproc) -pyenv $PWD/CYLON-ENV -bpath $PWD/build -ucxpath $UCX_INSTALL -uccpath $UCC_INSTALL -redispath $REDIS_INSTALL --cpp --python --cython --cmake-flags "-DMPI_C_COMPILER=$(which mpicc) -DMPI_CXX_COMPILER=$(which mpicxx) -DCYLON_UCX=1 -DUCX_INSTALL_PREFIX=$UCX_INSTALL -DCYLON_UCC=1 -DUCC_INSTALL_PREFIX=$UCC_INSTALL -DCYLON_USE_REDIS=1 -DREDIS_INSTALL_PREFIX=$REDIS_INSTALL"
