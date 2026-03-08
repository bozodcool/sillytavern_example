import bodyParser from 'body-parser';
import { Router } from 'express';
import { Chalk } from 'chalk';

interface PluginInfo {
    id: string;
    name: string;
    description: string;
}

interface Plugin {
    init: (router: Router) => Promise<void>;
    exit: () => Promise<void>;
    info: PluginInfo;
}

interface Command {
    name: string;
    description: string;
    helpText: string;
    children: Command[];
}

const chalk = new Chalk();
const MODULE_NAME = '[SillyTavern-Example-Plugin]';

/**
 * Initialize the plugin.
 * @param router Express Router
 */
export async function init(router: Router): Promise<void> {
    const jsonParser = bodyParser.json();
    // Used to check if the server plugin is running
    router.post('/probe', (_req, res) => {
        return res.sendStatus(204);
    });
    // Use body-parser to parse the request body
    router.post('/ping', jsonParser, async (req, res) => {
        try {
            const { message } = req.body;
            return res.json({ message: `Pong! ${message}` });
        } catch (error) {
            console.error(chalk.red(MODULE_NAME), 'Request failed', error);
            return res.status(500).send('Internal Server Error');
        }
    });

    // Register custom commands for SillyTavern chat
    router.get('/commands', (_req, res) => {
        const commands: Command[] = [
            {
                name: 'hello',
                description: 'Say Hello World!',
                helpText: 'Usage: /hello - Displays a Hello World message',
                children: [],
            },
        ];
        return res.json(commands);
    });

    // Execute custom commands
    router.post('/execute', jsonParser, async (req, res) => {
        try {
            const { command, args } = req.body;
            
            if (command === 'hello') {
                return res.json({
                    success: true,
                    response: 'Hello World! 👋',
                });
            }
            
            return res.status(404).json({ error: 'Command not found' });
        } catch (error) {
            console.error(chalk.red(MODULE_NAME), 'Command execution failed', error);
            return res.status(500).send('Internal Server Error');
        }
    });

    console.log(chalk.green(MODULE_NAME), 'Plugin loaded!');
}

export async function exit(): Promise<void> {
    console.log(chalk.yellow(MODULE_NAME), 'Plugin exited');
}

export const info: PluginInfo = {
    id: 'hello-world',
    name: 'Hello World Plugin',
    description: 'A simple example plugin with a /hello chat command.',
};

const plugin: Plugin = {
    init,
    exit,
    info,
};

export default plugin;
