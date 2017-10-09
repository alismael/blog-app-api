# -*- mode: ruby -*-
# vi: set ft=ruby :

# All Vagrant configuration is done below. The "2" in Vagrant.configure
# configures the configuration version (we support older styles for
# backwards compatibility). Please don't change it unless you know what
# you're doing.
Vagrant.configure(2) do |config|
  # The most common configuration options are documented and commented below.
  # For a complete reference, please see the online documentation at
  # https://docs.vagrantup.com.

  # Every Vagrant development environment requires a box. You can search for
  # boxes at https://atlas.hashicorp.com/search.
  config.vm.box = "ubuntu/trusty64"

  config.vm.provider "virtualbox" do |v|
    v.memory = 2048
    v.cpus = 2
  end

  # don't mount vagrant shared folder
  config.vm.synced_folder ".", "/vagrant", disabled: true
  config.vm.synced_folder ".", "/vagrant", type: "nfs", mount_options: ['actimeo=2']

  # Disable automatic box update checking. If you disable this, then
  # boxes will only be checked for updates when the user runs
  # `vagrant box outdated`. This is not recommended.
  # config.vm.box_check_update = false

  # Create a forwarded port mapping which allows access to a specific port
  # within the machine from a port on the host machine. In the example below,
  # accessing "localhost:8080" will access port 80 on the guest machine.

  # mysql
  config.vm.network "forwarded_port", guest: 3306, host: 3306

  # api
  config.vm.network "forwarded_port", guest: 3000, host: 3000

  # front-end
  config.vm.network "forwarded_port", guest: 8001, host: 8001

  # Create a private network, which allows host-only access to the machine
  # using a specific IP.
  config.vm.network "private_network", ip: "192.168.34.56"

  # Enable provisioning with a shell script. Additional provisioners such as
  # Puppet, Chef, Ansible, Salt, and Docker are also available. Please see the
  # documentation for more information about their specific syntax and use.
  config.vm.provision "shell", inline: <<-SHELL
    echo "Checking curl"
    if [[ -n $(curl --version) ]]; then
      echo "curl already installed"
    else
      sudo apt-get update
      sudo apt-get install -y -q curl
    fi

    DOCKER_VERSION="1.8.1"
    echo "Checking docker"
    if [[ $(docker version --format '{{.Server.Version}}') == *"$DOCKER_VERSION"* ]]; then
      echo "docker $DOCKER_VERSION already installed"
    else
      echo "Installing docker version $DOCKER_VERSION"
      curl -sSL https://get.docker.com/ | sh
      sudo usermod -aG docker vagrant
    fi

    echo "Checking pip"
    if [[ -n $(pip --version) ]]; then
      echo "pip already installed"
    else
      sudo apt-get install -y -q python-pip build-essential
      echo "Checking docker-compose"
    fi

    if [[ -n $(docker-compose --version) ]]; then
      echo "docker-compose already installed"
    else
      sudo pip install -U docker-compose
      sudo chmod +x /usr/local/bin/docker-compose
    fi

    NODE_VERSION="8.6.0"
    echo "Checking nodejs"
    if [[ $('node -v') == *"$NODE_VERSION"* ]]; then
      echo "node $NODE_VERSION already installed"
    else
      echo "Installing node version $NODE_VERSION"
      curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
      sudo apt-get install -y nodejs
      sudo apt-get install -y build-essential      
    fi

    # install gulp
    sudo npm install -g gulp
    
    # install knex
    sudo npm install -g knex

    export COMPOSE_FILE=/vagrant/docker/docker-compose.yml
    docker-compose up -d
  SHELL
end
