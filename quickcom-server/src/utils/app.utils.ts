import express from 'express';
import cors from 'cors';

export class AppServer {
	server: express.Application;

	constructor() {
		this.server = express();
		this.init();
	}

	/**
	 * Initialize the express server.
	 *
	 * This method configures the server to parse JSON and URL encoded requests,
	 * and to use CORS to allow cross-origin requests.
	 */
	private init() {
		this.server.use(express.json());
		this.server.use(express.urlencoded({ extended: true }));
		this.server.use(cors());
	}

	/**
	 * Start the server.
	 *
	 * This method starts the server listening on the given port, or port 8000 if
	 * no port is specified.
	 *
	 * @param port The port number to listen on.
	 */
	start(port: number = 8000) {
		this.server.listen(port, () => {
			console.log(`Server listening on port ${port}`);
		});
	}

	/**
	 * Return an instance of the Express Router class.
	 *
	 * @returns {express.Router} An instance of the Express Router class.
	 */
	static getRouter() {
		return express.Router();
	}
}
