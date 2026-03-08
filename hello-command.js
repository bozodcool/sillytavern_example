/**
 * Hello World Command for SillyTavern
 * 
 * This client-side script registers a /hello slash command in SillyTavern.
 * Place this file in your SillyTavern plugins folder and load it via a script tag
 * or use it as part of a client-side plugin.
 */

// Wait for SillyTavern to be ready
window.addEventListener('load', () => {
    // Check if SlashCommandParser is available
    if (typeof window.SlashCommandParser === 'undefined' && 
        typeof window.registerSlashCommand === 'undefined') {
        console.warn('[Hello-World] Slash commands not ready yet, will retry...');
        setTimeout(registerHelloCommand, 1000);
        return;
    }
    
    registerHelloCommand();
});

function registerHelloCommand() {
    try {
        // Import SlashCommand from the global scope if available
        const SlashCommand = window.SlashCommand;
        const SlashCommandParser = window.SlashCommandParser;
        
        if (!SlashCommandParser) {
            console.error('[Hello-World] SlashCommandParser not found');
            return;
        }
        
        // Create the hello command
        const helloCommand = SlashCommandParser.addCommandObject(
            SlashCommand.fromProps({
                name: 'hello',
                callback: () => {
                    return 'Hello World! 👋';
                },
                helpString: 'Displays a Hello World message',
            })
        );
        
        console.log('[Hello-World] /hello command registered successfully');
    } catch (error) {
        console.error('[Hello-World] Failed to register command:', error);
    }
}

// Alternative: If SillyTavern has a plugin system for client scripts
if (typeof window.pluginReady === 'function') {
    window.pluginReady();
}
