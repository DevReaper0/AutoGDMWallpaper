const { Gio } = imports.gi;

const DEFAULT_SCHEME_NAME = 'default';
const LIGHT_SCHEME_NAME = 'prefer-light';
const DARK_SCHEME_NAME = 'prefer-dark';

class Extension {
    constructor() {
    }
    
    handleCurrentTheme = () => {
        let proc = Gio.Subprocess.new(['bash', '/home/robert/.local/share/gnome-shell/extensions/autogdmwallpaper@darubyminer360.gmail.com/switch.sh'/*, '||', 'bash', '/usr/share/gnome-shell/extensions/autogdmwallpaper@darubyminer360.gmail.com/switch.sh'*/], Gio.SubprocessFlags.STDOUT_PIPE | Gio.SubprocessFlags.STDERR_PIPE);

        proc.wait_check_async(null, (proc, result) => {
            try {
                if (proc.wait_check_finish(result)) {
                    log('the process succeeded');
                }
                else {
                    log('the process failed');
                }
            } catch (e) {
                logError(e);
            }
        });
    }

    enable() {
        this.schema = Gio.Settings.new('org.gnome.desktop.interface');
        this.id = this.schema.connect('changed::color-scheme', () => {
            this.handleCurrentTheme();
        });
        this.handleCurrentTheme();
    }

    disable() {
        if (this.schema) {
            if (this.id) {
                this.schema.disconnect(this.id)
                this.id = null
            }
            this.schema = null
        }
    }
   
}

function init() {
    return new Extension();
}
