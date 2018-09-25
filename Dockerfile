FROM registry-vpc.cn-beijing.aliyuncs.com/rsq-public/node:8.11.3

LABEL name="rishiqing-oss-sts-server" \
       description="rishqiing sts-server for aliyun on nodejs" \
       maintainer="Wallace Mao, rishiqing group" \
       org="rishiqing"

# set default time zone to +0800 (Shanghai)
ENV TIME_ZONE=Asia/Shanghai
RUN ln -snf /usr/share/zoneinfo/$TIME_ZONE /etc/localtime && echo $TIME_ZONE > /etc/timezone

# default config path
ENV NODE_CONFIG_DIR=/etc/rsq-oss-sts-server

WORKDIR /usr/src/rsq-oss-sts-server
COPY . .
RUN npm install --registry=https://registry.npm.taobao.org

EXPOSE 3000
CMD ["node", "index.js"]