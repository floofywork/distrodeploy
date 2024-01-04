import Dockerode from 'dockerode'
import OperatingSystem from '../../OperatingSystem'
import Provider, { ICreateVMOptions } from '../Base/Provider'
import VM from '../Base/VM'
import DockerVM from './DockerVM'

class DockerProvider extends Provider {
	private docker = new Dockerode()

	async createVM(
		os: OperatingSystem,
		options: ICreateVMOptions
	): Promise<VM> {
		const imageName = this.getDockerImageNameFromOS(os)

		if (imageName === null) {
			throw new Error(
				`Docker provider doesn't support os ${OperatingSystem[os]}`
			)
		}

		const pullStream = await this.docker.pull(imageName)

		await new Promise((resolve, reject) => {
			this.docker.modem.followProgress(pullStream, (err, res) =>
				err ? reject(err) : resolve(res)
			)
		})

		// https://gdevillele.github.io/engine/reference/api/docker_remote_api_v1.24/#/create-a-container
		const container = await this.docker.createContainer({
			Image: imageName,
			Cmd: ['sleep', 'infinity'],
			HostConfig: {
				Memory: options.memory,
				CpuPeriod: Math.floor(options.cpus) * 100000,
				CpuQuota: options.cpus * 100000,
			},
		})

		return new DockerVM(container)
	}

	async getByID(id: string): Promise<VM> {
		return new DockerVM(this.docker.getContainer(id))
	}

	private getDockerImageNameFromOS(os: OperatingSystem): string | null {
		switch (os) {
			case OperatingSystem['Ubuntu:22.04']:
				return 'ubuntu:22.04'
			default:
				return null
		}
	}
}

export default DockerProvider