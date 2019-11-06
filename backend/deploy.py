#!/usr/bin/env python3

import subprocess as sp
import sys
import os
import logging

logging.basicConfig(level=logging.DEBUG)


def usage():
    print("usage")


def ssh_run(cmds, host, skip=False):
    # to_run = ['ssh', host, "\"{0}\"".format(cmd)]
    # logging.info("going to run: {0}".format(to_run))

    if sp.run(["ssh", host, "-q"], input=bytes(';'.join(cmds), 'utf-8')).returncode != 0:
        logging.info("ssh cmd '{0}' at '{1}' failed".format(cmds, host))
        if not skip:
            exit(1)
    return


if len(sys.argv) == 1:
    usage()
    exit(1)

svc_name = sys.argv[1:][0]
cur_dir = os.getcwd()

svc_hosts = {
    "web": [('admin@84.201.160.40', "8080"), ],
    "trends": [('admin@84.201.160.40', "8081"), ],
    "content": [('admin@84.201.160.40', "8082"), ],
}

if svc_name != "all" and svc_name not in svc_hosts:
    print("Unknown service, ", svc_name)
    exit(1)

to_deploy = []

if svc_name == "all":
    for svc in svc_hosts:
        to_deploy.append(svc)
else:
    to_deploy.append(svc_name)

for svc_name in to_deploy:
    svc_path = os.path.join(cur_dir, svc_name)

    print("Running tests...")
    # if sp.run(["pytest", "tests"]).returncode != 0:
    #    exit(1)

    for host in svc_hosts[svc_name]:
        print("Uploading...")
        host_fullpath = host[0] + ':/home/admin'
        if sp.run(['scp', '-rp', svc_name, host_fullpath]).returncode != 0:
            exit(1)

        docker_tag = "trends/{0}:latest".format(svc_name)

        cmds = []
        # docker build -t trends/web:latest web/
        cmds.append("docker build -t {0} /home/admin/{1}/".format(docker_tag, svc_name))

        # docker stop $(docker ps -q --filter ancestor=trends/web:latest )
        cmds.append("docker stop $(docker ps -q --filter ancestor={0} )".format(docker_tag))

        # docker run -e DATABASE_URL=postgresql://me:hackme@0.0.0.0/trends -p8080:8080 -d trends/web:latest
        cmds.append(
            "docker run -e DATABASE_URL=postgresql://me:hackme@0.0.0.0/trends -p{0}:8080 -d -it {1}".format(
                host[1], docker_tag))

        ssh_run(cmds, host[0])
