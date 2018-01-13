# Chair
#
# VERSION 1.0.0

FROM acs-reg.alipay.com/dockerlab/centos6:0.1.2
MAINTAINER guangao <guangao@alipay.com>

EXPOSE 80
ENV HOME="/home/admin" \
  BUILD_DIR="/home/admin/build" \
  RELEASE_DIR="/home/admin/release" \
  SCRIPT_DIR="/home/admin/scripts" \
  TMPDIR="/home/admin/.tmp" \
  CHAIR_SCRIPT_BOOT="http://enclose.alipay.net/packages/@alipay/chair-script-boot/1.x/chair-script-boot/linux-x64" \
  PATH="/home/admin/release/node_modules/.bin":$PATH \
  JDK_URL="https://render.prefromoffice.alipay.net/p/u/i_rmsportal_6114_jdk-7u71-linux-x64.gz" \
  TERM=xterm \
  NODE_ENV=production

USER root

RUN rm -f /etc/yum.repos.d/* \
  && sed -i 's/enabled=1/enabled=0/g' /etc/yum/pluginconf.d/fastestmirror.conf
COPY yum.repos.d/ /etc/yum.repos.d/
RUN echo "Alibaba Group Enterprise Linux Server release 6.2 (DogTag)" > /etc/redhat-release \
  && yum install -y taobao-repo-utils sudo \
  && yum clean all \
  && rpm --rebuilddb
COPY ./scripts $SCRIPT_DIR
RUN sh $SCRIPT_DIR/root.sh

# onbuild
ONBUILD COPY . $BUILD_DIR
ONBUILD RUN chown -R admin:admin $BUILD_DIR
ONBUILD USER admin
ONBUILD RUN $SCRIPT_DIR/build.sh

ENTRYPOINT ["/home/admin/scripts/deploy.sh"]