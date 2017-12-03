# install docker-compose using pip
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

# install node
echo "Installing node"
curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
sudo apt-get install -y nodejs
sudo apt-get install -y build-essential 

# install gulp
echo "Installing node"
sudo npm install -g gulp
