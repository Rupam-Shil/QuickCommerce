import express from 'express';
export class AppServer {
	server: express.Application;

	constructor() {
		this.server = express();
	}

	start(port: number = 8000) {
		this.server.listen(port, () => {
			console.log(`Server listening on port ${port}`);
		});
	}
}
