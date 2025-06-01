resource "null_resource" "run_ansible" {
  provisioner "local-exec" {
    command = "ansible-playbook playbook.yml -i inventory.ini"
  }
}