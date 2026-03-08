/**
 * Hello World Command Extension for SillyTavern
 *
 * This extension registers a /hello slash command in SillyTavern.
 * When users type /hello in chat, they will receive a "Hello World!" response.
 */

// Default settings
const DEFAULT_SETTINGS = {
    imageRoot: '',
};

// Storage key for localStorage
const STORAGE_KEY = 'helloWorldSettings';

// Store context for later use
let savedContext = null;

/**
 * Load settings from localStorage
 */
function loadSettings() {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            return JSON.parse(stored);
        }
    } catch (e) {
        console.error('[Hello-World] Error loading settings:', e);
    }
    return { ...DEFAULT_SETTINGS };
}

/**
 * Save settings to localStorage
 */
function saveSettings(settings) {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    } catch (e) {
        console.error('[Hello-World] Error saving settings:', e);
    }
}

/**
 * Initialize the extension
 */
function init() {
    console.log('[Hello-World] Initializing Hello World command extension');

    // Get the SlashCommand and SlashCommandParser from SillyTavern's context
    const context = SillyTavern.getContext();

    if (!context) {
        console.warn('[Hello-World] SillyTavern context not ready, will retry...');
        setTimeout(init, 100);
        return;
    }

    const { SlashCommand, SlashCommandParser } = context;

    // Check if SlashCommandParser is available
    if (!SlashCommandParser) {
        console.warn('[Hello-World] SlashCommandParser not ready, will retry...');
        setTimeout(init, 100);
        return;
    }

    // Check if SlashCommand is available
    if (!SlashCommand) {
        console.warn('[Hello-World] SlashCommand not ready, will retry...');
        setTimeout(init, 100);
        return;
    }

    // Save context for settings UI
    savedContext = context;

    // Load settings from localStorage
    const settings = loadSettings();

    // Register the hello command
    SlashCommandParser.addCommandObject(
        SlashCommand.fromProps({
            name: 'hello',
            callback: async () => {
                // Get the image root from settings
                const imageRoot = settings.imageRoot || 'No image root set';

                // Display a toast notification with the greeting and settings
                if (typeof toastr !== 'undefined') {
                    toastr.success(`Hello World! 👋\nImage Root: ${imageRoot}`, 'Greeting');
                }
                return `Hello World! 👋\nImage Root: ${imageRoot}`;
            },
            helpString: 'Displays a Hello World message. Usage: /hello',
            returns: 'Hello World greeting',
        })
    );

    console.log('[Hello-World] /hello command registered successfully');

    // Try to add settings UI after a delay
    setTimeout(() => {
        tryAddSettings(settings);
    }, 2000);
}

/**
 * Try to add settings UI
 */
function tryAddSettings(settings) {
    try {
        // Check if jQuery is ready
        if (typeof jQuery === 'undefined' || typeof $ === 'undefined') {
            console.warn('[Hello-World] jQuery not ready for settings UI');
            setTimeout(() => tryAddSettings(settings), 500);
            return;
        }

        // Check if extensions_settings2 exists
        if ($('#extensions_settings2').length === 0) {
            console.warn('[Hello-World] Extensions panel not found for settings UI');
            setTimeout(() => tryAddSettings(settings), 500);
            return;
        }

        // Check if settings container already exists
        if ($('#hello_world_container').length > 0) {
            console.log('[Hello-World] Settings container already exists');
            return;
        }

        // Create container for our settings
        const containerHtml = `
            <div id="hello_world_container" class="extension_container">
                <div class="extension_block">
                    <div class="extension_description">
                        <b>Hello World Command</b>
                        <br/>
                        <small>Configure the Hello World extension settings</small>
                    </div>
                    <div class="extension_settings">
                        <div class="form-group">
                            <label for="hello_world_image_root">Image Root Directory:</label>
                            <input type="text" id="hello_world_image_root" class="text_input" placeholder="e.g., C:/images" value="${settings.imageRoot || ''}" />
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Append to extensions_settings2 (right column)
        $('#extensions_settings2').append(containerHtml);
        console.log('[Hello-World] Settings UI added!');

        // Add event listener for the input
        $('#hello_world_image_root').on('input', function () {
            settings.imageRoot = String($(this).val());
            saveSettings(settings);
            console.log('[Hello-World] Image root updated:', settings.imageRoot);
        });

    } catch (error) {
        console.error('[Hello-World] Error adding settings UI:', error);
        setTimeout(() => tryAddSettings(settings), 500);
    }
}

// Start initialization
init();
