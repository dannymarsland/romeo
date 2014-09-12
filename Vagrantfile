IP = "192.168.66.9"
NAME = "romeo.dev"

Vagrant.configure("2") do |config|

    config.vm.box = "precise64"
    config.vm.box_url = "http://files.vagrantup.com/precise64.box"
    config.vm.network :private_network, ip: IP

    config.vm.provider :virtualbox do |virtualbox|
        virtualbox.customize ["modifyvm", :id, "--name", NAME]
        virtualbox.customize ["modifyvm", :id, "--natdnshostresolver1", "on"]
        virtualbox.customize ["modifyvm", :id, "--memory", "512"]
        virtualbox.customize ["setextradata", :id, "--VBoxInternal2/SharedFoldersEnableSymlinksCreate/v-root", "1"]
    end

    config.ssh.username = "vagrant"
    config.ssh.shell = "bash -l"
    config.ssh.keep_alive = true
    config.ssh.forward_agent = false
    config.ssh.forward_x11 = false
    config.vagrant.host = :detect

    config.vm.synced_folder "~/.hamlet/", "/home/vagrant/.hamlet"

    config.vm.provision :shell, path: "provision/install.sh"

end
